import { useParams, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../store/authStore";
import { toast } from "react-hot-toast";
import { User, Calendar, Tag, Edit, Trash2, RotateCcw, MessageSquare, Send, ArrowLeft, Loader2, Clock } from "lucide-react";
import {
  articlePageWrapper,
  articleHeader,
  articleCategory,
  articleMainTitle,
  articleAuthorRow,
  authorInfo,
  articleContent,
  articleFooter,
  articleActions,
  editBtn,
  deleteBtn,
  loadingClass,
  errorClass,
  inputClass,
} from "../styles/common.js";
import { useForm } from "react-hook-form";

function ArticleByID() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const user = useAuth((state) => state.currentUser);

  const [article, setArticle] = useState(location.state || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getArticle = async () => {
      // Only show full page spinner if we don't have initial location.state
      if (!article) {
        setLoading(true);
      }

      try {
        const res = await axios.get(`https://blogapp-backend-7kra.onrender.com/user-api/article/${id}`, { withCredentials: true });
        setArticle(res.data.payload);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load article");
      } finally {
        setLoading(false);
      }
    };

    getArticle();
  }, [id]);

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // delete & restore article
  const toggleArticleStatus = async () => {
    const newStatus = !article.isArticleActive;

   
    try {
      const res = await axios.patch(
        `https://blogapp-backend-7kra.onrender.com/author-api/articles/${id}/status`,
        { isArticleActive: newStatus },
        { withCredentials: true },
      );

      console.log("SUCCESS:", res.data);

      setArticle(res.data.article || res.data.payload);

      toast.success(res.data.message);
    } catch (err) {
      console.log("ERROR:", err.response);

      const msg = err.response?.data?.message;

      if (err.response?.status === 400) {
        toast(msg); // already deleted/active case
      } else {
        setError(msg || "Operation failed");
      }
    }
  };

  //edit article
  const editArticle = (articleObj) => {
    navigate(`/edit-article/${articleObj._id}`, { state: articleObj });
  };

  //post comment by user
  const addComment = async (commentObj) => {
    //add artcileId and user ID (handle both login/refresh shapes)
    commentObj.articleId = article._id;
    commentObj.user = user.userId || user._id;
    console.log(commentObj);
    let res = await axios.put("https://blogapp-backend-7kra.onrender.com/user-api/articles", commentObj, { withCredentials: true });
    if (res.status === 200 || res.status === 201) {
      toast.success(res.data.message);
      setArticle(res.data.articleWithComment);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 min-h-[50vh]">
      <Loader2 className="animate-spin text-cyan-400 mb-4" size={48} />
      <p className={loadingClass}>Loading article...</p>
    </div>
  );
  if (error) return (
    <div className="flex flex-col items-center justify-center py-20">
      <p className={errorClass}>{error}</p>
      <button onClick={() => navigate(-1)} className="mt-4 flex items-center gap-2 text-cyan-400">
        <ArrowLeft size={18} /> Go Back
      </button>
    </div>
  );
  if (!article) return null;

  return (
    <div className={articlePageWrapper}>
      {/* Header */}
      <div className={articleHeader}>
        <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors">
          <ArrowLeft size={18} /> Back to Articles
        </button>

        <div className="flex items-center gap-2 mb-4">
          <Tag size={16} className="text-cyan-400" />
          <span className={articleCategory}>{article.category}</span>
        </div>

        <h1 className={`${articleMainTitle} uppercase leading-tight`}>{article.title}</h1>

        <div className={articleAuthorRow}>
          <div className={`${authorInfo} flex items-center gap-2`}>
            <div className="bg-slate-800 p-2 rounded-full">
              <User size={18} className="text-cyan-400" />
            </div>
            <span>{article.author?.firstName || "Author"} {article.author?.lastName}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <Calendar size={16} />
            <span>{formatDate(article.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={articleContent}>{article.content}</div>

      {/* AUTHOR actions */}
      {user?.role === "AUTHOR" && (
        <div className={`${articleActions} flex gap-4 mt-8 pt-8 border-t border-slate-800`}>
          <button className={`${editBtn} flex items-center gap-2`} onClick={() => editArticle(article)}>
            <Edit size={18} />
            Edit Article
          </button>

          <button 
            className={`${deleteBtn} flex items-center gap-2 ${article.isArticleActive ? 'bg-red-500/20 text-red-500 border-red-500/50 hover:bg-red-500 hover:text-white' : 'bg-green-500/20 text-green-500 border-green-500/50 hover:bg-green-500 hover:text-white'}`} 
            onClick={toggleArticleStatus}
          >
            {article.isArticleActive ? (
              <>
                <Trash2 size={18} />
                Delete Article
              </>
            ) : (
              <>
                <RotateCcw size={18} />
                Restore Article
              </>
            )}
          </button>
        </div>
      )}
      {/* form to add comment if role is USER */}
      {/* comments */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <MessageSquare size={22} className="text-cyan-400" />
          Comments ({article.comments.length})
        </h2>
        
        {article.comments.map((comment, index) => (
          <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl mt-4" key={comment._id || index}>
            <p className="uppercase text-cyan-400 font-bold mb-3 flex items-center gap-2">
              <User size={14} />
              {typeof comment.user === 'object' && comment.user !== null ? (
                `${comment.user.firstName || "Anonymous"} ${comment.user.lastName || ""}`
              ) : (
                "Reader"
              )}
            </p>
            <p className="text-slate-300">{comment.comment}</p>
          </div>
        ))}
      </div>

      {/* USER actions */}
      {(  user?.role === "USER"|| user?.role=="AUTHOR" )&& (
        <div className="mt-10 bg-slate-800/30 p-8 rounded-3xl border border-slate-700/50">
          <h3 className="text-lg font-semibold mb-4">Leave a comment</h3>
          <form onSubmit={handleSubmit(addComment)} className="flex flex-col gap-4">
            <div className="relative">
              <textarea
                {...register("comment")}
                className={`${inputClass} min-h-[100px] pt-4 pl-4`}
                placeholder="Share your thoughts on this article..."
              />
            </div>
            <button type="submit" className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all w-fit self-end">
              <Send size={18} />
              Post Comment
            </button>
          </form>
        </div>
      )}

     

      {/* Footer */}
      <div className={`${articleFooter} flex items-center gap-2 mt-12 text-slate-500 italic`}>
        <Clock size={14} />
        Last updated: {formatDate(article.updatedAt)}
      </div>
    </div>
  );
}

export default ArticleByID;

// {
//   "user":"6989799b7013502767d3f82b",
//   "articleId":"6989750220ce5bf826ec4f7e",
//   "comment":"good article"

// }