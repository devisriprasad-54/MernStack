import { useNavigate, Outlet } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../store/authStore";

import {
  articleGrid,
  articleCardClass,
  articleTitle,
  ghostBtn,
  loadingClass,
  errorClass,
  timestampClass,
} from "../styles/common.js";

function UserDashboard() {
  const navigate = useNavigate();
  const user = useAuth((state) => state.currentUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://blogapp-backend-7kra.onrender.com/user-api/articles", { withCredentials: true });
        setArticles(res.data.articles || []);
      } catch (err) {
        setError(err.response?.data?.error || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    getArticles();
  }, []);

  const formatDateIST = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const navigateToArticleByID = (articleObj) => {
    navigate(`/article/${articleObj._id}`, {
      state: articleObj,
    });
  };

  if (loading) {
    return <p className={loadingClass}>Loading articles...</p>;
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {error && <p className={errorClass}>{error}</p>}

      {/* Dynamic Welcome Message */}
      <div className="mb-8 border-b border-slate-100 pb-6">
        <h1 className="text-3xl font-extrabold text-[#1d1d1f] tracking-tight">Profile</h1>
        {user && (
          <p className="text-lg text-slate-500 mt-1">
            Welcome back, <span className="font-semibold text-blue-500">{user.firstName || "Reader"} {user.lastName || ""}</span>!
          </p>
        )}
      </div>

      <div className={articleGrid}>
        {articles.map((articleObj) => (
          <div className={articleCardClass} key={articleObj._id}>
            <div className="flex flex-col h-full">
              <div>
                <p className={articleTitle}>{articleObj.title}</p>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {articleObj.content?.slice(0, 100)}...
                </p>
                <p className={timestampClass}>{formatDateIST(articleObj.createdAt)}</p>
              </div>
              <button 
                className={`${ghostBtn} mt-auto pt-4 text-left`} 
                onClick={() => navigateToArticleByID(articleObj)}
              >
                Read Article →
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* For nested routes like /user-profile/articles if needed */}
      <Outlet />
    </div>
  );
}

export default UserDashboard;