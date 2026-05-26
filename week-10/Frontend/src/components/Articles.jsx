import React, { useEffect, useState } from 'react'
import {subHeadingClass, articleGrid, articleCardClass, articleTitle, articleMeta, loadingClass, errorClass, emptyStateClass, pageWrapper, headingClass} from '../styles/common'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { User, Calendar, Tag, ArrowRight, Loader2, BookOpen } from 'lucide-react'

function Articles() {
  const navigate = useNavigate()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const navigateToArticleByID = (articleObj) => {
    navigate(`/article/${articleObj._id}`, { state: articleObj })
  }

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await axios.get('https://blogapp-backend-7kra.onrender.com/user-api/articles', {
          withCredentials: true,
        })
        setArticles(res.data.articles || [])
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load articles.')
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [])

  return (
    <div className={pageWrapper}>
      <h2 className={headingClass}>All Articles</h2>

      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="animate-spin text-cyan-400 mb-4" size={40} />
          <p className={loadingClass}>Loading articles…</p>
        </div>
      )}

      {!loading && error && <p className={errorClass}>{error}</p>}

      {!loading && !error && articles.length === 0 && (
        <p className={emptyStateClass}>No articles found.</p>
      )}

      {!loading && !error && articles.length > 0 && (
        <div className={`${articleGrid}`}>
          {articles.map((article) => (
            <div className={`${articleCardClass} flex flex-col group`} key={article._id}>
              <div className="flex items-center gap-2 mb-2 text-cyan-400">
                <User size={16} />
                <h1 className={`${subHeadingClass} mb-0`}>
                  {article.author?.firstName} {article.author?.lastName}
                </h1>
              </div>
              <h3 className={articleTitle}>{article.title}</h3>
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
                <Tag size={14} />
                <p className="m-0 uppercase tracking-wider">{article.category}</p>
              </div>
              <button 
                className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mt-auto font-medium group-hover:translate-x-1 duration-300" 
                onClick={() => navigateToArticleByID(article)}
              >
                Read Article <ArrowRight size={18} />
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
  )
}

export default Articles
