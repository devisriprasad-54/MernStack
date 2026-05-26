import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { PenTool, Tag, FileText, Send, Loader2, Type } from "lucide-react";
import {
  formCard,
  formTitle,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
  errorClass,
  loadingClass,
} from "../styles/common";
import { useAuth } from '../store/authStore';

function WriteArticle() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const currentUser = useAuth((state) => state.currentUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitArticle = async (articleObj) => {
    if (!currentUser) {
      toast.error("User session not found. Please login again.");
      return;
    }

    setLoading(true);

    //add authorId to articleObj
    const authorId = currentUser._id || currentUser.userId;
    articleObj.author = authorId;
    try {
      const res = await axios.post(
        "https://blogapp-backend-7kra.onrender.com/author-api/articles",
        articleObj,
        { withCredentials: true }
      );

      toast.success("Article published successfully!");

      reset();

      navigate(`/article/${res.data.article._id}`, { state: res.data.article });

    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to publish article");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={formCard}>
      <div className="flex items-center gap-3 mb-6">
        <PenTool className="text-cyan-400" size={28} />
        <h2 className={`${formTitle} mb-0`}>Write New Article</h2>
      </div>

      <form onSubmit={handleSubmit(submitArticle)}>

        {/* Title */}
        <div className={formGroup}>
          <label className={`${labelClass} flex items-center gap-2`}>
            <Type size={16} /> Title
          </label>

          <input
            type="text"
            className={inputClass}
            placeholder="Enter article title"
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 5,
                message: "Title must be at least 5 characters",
              },
            })}
          />

          {errors.title && (
            <p className={errorClass}>{errors.title.message}</p>
          )}
        </div>

        {/* Category */}
        <div className={formGroup}>
          <label className={`${labelClass} flex items-center gap-2`}>
            <Tag size={16} /> Category
          </label>

          <select
            className={inputClass}
            {...register("category", {
              required: "Category is required",
            })}
          >
            <option value="">Select category</option>
            <option value="technology">Technology</option>
            <option value="programming">Programming</option>
            <option value="ai">AI</option>
            <option value="web-development">Web Development</option>
          </select>

          {errors.category && (
            <p className={errorClass}>{errors.category.message}</p>
          )}
        </div>

        {/* Content */}
        <div className={formGroup}>
          <label className={`${labelClass} flex items-center gap-2`}>
            <FileText size={16} /> Content
          </label>

          <textarea
            rows="8"
            className={inputClass}
            placeholder="Write your article content..."
            {...register("content", {
              required: "Content is required",
              minLength: {
                value: 50,
                message: "Content must be at least 50 characters",
              },
            })}
          />

          {errors.content && (
            <p className={errorClass}>{errors.content.message}</p>
          )}
        </div>

        {/* Submit */}
        <button className={`${submitBtn} flex items-center justify-center gap-2`} type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Publishing...
            </>
          ) : (
            <>
              <Send size={18} />
              Publish Article
            </>
          )}
        </button>

        {loading && (
          <p className={loadingClass}>Publishing article...</p>
        )}
      </form>
    </div>
  );
}

export default WriteArticle;