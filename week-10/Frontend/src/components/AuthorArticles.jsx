import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from '../store/authStore';
import { Tag, Calendar, Eye, Edit3, Trash2, RotateCcw, ArrowRight, Loader2, FileText, AlertCircle } from "lucide-react";
import {
  articleGrid,
  articleCardClass,
  articleTitle,
  articleMeta,
  loadingClass,
  errorClass,
  emptyStateClass,
  pageWrapper,
  headingClass,
} from "../styles/common";

function AuthorArticles() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentUser = useAuth((state) => state.currentUser);

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const navigateToArticleByID = (articleObj) => {
    navigate(`/article/${articleObj._id}`, { state: articleObj });
  };

  useEffect(() => {
    if (!currentUser) return;

    const fetchAuthorArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        const authorId = currentUser._id || currentUser.userId;
        const res = await axios.get(
          `https://blogapp-backend-7kra.onrender.com/author-api/articles/${authorId}`,
          { withCredentials: true }
        );
        setArticles(res.data.articles || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load your articles.");
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorArticles();
  }, [currentUser]);

  return (
    <div className={pageWrapper}>
      <h2 className={headingClass}>Your Articles</h2>
      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="animate-spin text-cyan-400 mb-4" size={40} />
          <p className={loadingClass}>Loading your articles...</p>
        </div>
      )}

      {!loading && error && <p className={errorClass}>{error}</p>}

      {!loading && !error && articles.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500">
          <FileText size={48} className="mb-4 opacity-20" />
          <p className={emptyStateClass}>You haven't published any articles yet.</p>
        </div>
      )}

      {!loading && !error && articles.length > 0 && (
        <div className={articleGrid}>
          {articles.map((article) => (
            <div 
              className={`${articleCardClass} flex flex-col group ${!article.isArticleActive ? "opacity-60 grayscale border-red-500/30" : ""}`} 
              key={article._id}
            >
              <div className="flex justify-between items-start mb-3">
                 <h3 className={`${articleTitle} line-clamp-2`}>{article.title}</h3>
                 {!article.isArticleActive && (
                   <span className="bg-red-500/10 text-red-500 text-[10px] px-2 py-1 rounded-full font-bold uppercase border border-red-500/20 flex items-center gap-1">
                     <AlertCircle size={10} /> Deleted
                   </span>
                 )}
              </div>
              
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
                <Tag size={14} className="text-cyan-400" />
                <p className="m-0 uppercase tracking-wider">{article.category}</p>
              </div>
              
              <button
                className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mt-auto font-medium group-hover:translate-x-1 duration-300"
                onClick={() => navigateToArticleByID(article)}
              >
                {article.isArticleActive ? (
                  <>
                    <Eye size={18} /> View / Edit <ArrowRight size={16} />
                  </>
                ) : (
                  <>
                    <RotateCcw size={18} /> View / Restore <ArrowRight size={16} />
                  </>
                )}
              </button>
              
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-800">
                <Calendar size={14} className="text-slate-500" />
                <p className={`${articleMeta} m-0`}>{formatDate(article.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AuthorArticles;
