import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useAuth } from "../store/authStore";
import axios from "axios";
import { toast } from "react-hot-toast";

import {
  formCard,
  formTitle,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
  errorClass,
} from "../styles/common";

function EditArticle() {
  const location = useLocation();
  const navigate = useNavigate();


  const article = location.state;
  const currentUser = useAuth((state) => state.currentUser);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // prefill form
  useEffect(() => {
    if (!article) return;
    setValue("title", article.title);
    setValue("category", article.category);
    setValue("content", article.content);
  }, [article, setValue]);

  const updateArticle = async (data) => {
    if (!currentUser || !article) {
      toast.error("Unauthorized or missing article data");
      return;
    }
    try {
      setLoading(true);
      const authorId = currentUser._id || currentUser.userId;
      const res = await axios.put(
        `https://blogapp-backend-7kra.onrender.com/author-api/articles/${article._id}/${authorId}`,
        data,
        { withCredentials: true }
      );
      toast.success("Article updated successfully!");
      navigate(`/article/${article._id}`, { state: res.data.article });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update article");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${formCard} mt-10`}>
      <h2 className={formTitle}>Edit Article</h2>

      <form onSubmit={handleSubmit(updateArticle)}>
        {/* Title */}
        <div className={formGroup}>
          <label className={labelClass}>Title</label>

          <input className={inputClass} {...register("title", { required: "Title required" })} />

          {errors.title && <p className={errorClass}>{errors.title.message}</p>}
        </div>

        {/* Category */}
        <div className={formGroup}>
          <label className={labelClass}>Category</label>

          <select className={inputClass} {...register("category", { required: "Category required" })}>
            <option value="">Select category</option>
            <option value="technology">Technology</option>
            <option value="programming">Programming</option>
            <option value="ai">AI</option>
            <option value="web-development">Web Development</option>
          </select>

          {errors.category && <p className={errorClass}>{errors.category.message}</p>}
        </div>

        {/* Content */}
        <div className={formGroup}>
          <label className={labelClass}>Content</label>

          <textarea rows="14" className={inputClass} {...register("content", { required: "Content required" })} />

          {errors.content && <p className={errorClass}>{errors.content.message}</p>}
        </div>

        <button className={submitBtn} disabled={loading}>
          {loading ? "Updating..." : "Update Article"}
        </button>
      </form>
    </div>
  );
}

export default EditArticle;