import React from 'react'
import { Link } from 'react-router'
import { useAuth } from '../store/authStore'
import { Sparkles, PenTool, ArrowRight } from 'lucide-react'
import {
  pageBackground,
  primaryBtn,
  secondaryBtn,
} from '../styles/common'

function Home() {
  const user = useAuth((state) => state.currentUser)
  const isAuthenticated = useAuth((state) => state.isAuthenticated)

  const getWriteOrDashboardPath = () => {
    if (!user) return "/register";
    switch (user.role) {
      case "AUTHOR":
        return "/author-profile/write-article";
      case "ADMIN":
        return "/admin-profile";
      default:
        return "/user-profile";
    }
  }


  return (
    <div className={`${pageBackground} min-h-screen relative overflow-x-hidden`}>
      {/* ─── HERO SECTION ─── */}
      <section className="relative overflow-hidden pt-24 pb-20 px-6 max-w-5xl mx-auto flex flex-col items-center justify-center text-center animate-fade-up">

        {/* Main Brand Title */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#1d1d1f] leading-none mb-6">
          Where ideas take shape.<br />
          <span className="bg-linear-to-r from-[#0066cc] to-[#00a3ff] bg-clip-text text-transparent">
            Words that inspire.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-[#6e6e73] font-normal leading-relaxed max-w-2xl mt-4 mb-10">
          Welcome to Blog App, a premium writing and reading ecosystem. 
          Publish your thoughts, master your craft, and engage with a global circle of thinkers.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-16 relative z-10">
          {isAuthenticated ? (
            <>
              <Link to={getWriteOrDashboardPath()} className={`${primaryBtn} shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition duration-200 flex items-center gap-2 px-8 py-3 text-base rounded-full`}>
                <PenTool size={18} /> Write a Story
              </Link>
              {user.role === "AUTHOR" && (
                <Link to="/author-profile/articles" className={`${secondaryBtn} flex items-center gap-2 px-8 py-3 text-base rounded-full hover:bg-slate-100 transition-colors`}>
                  Read Latest Stories <ArrowRight size={18} />
                </Link>
              )}
              {user.role === "USER" && (
                <Link to="/user-profile" className={`${secondaryBtn} flex items-center gap-2 px-8 py-3 text-base rounded-full hover:bg-slate-100 transition-colors`}>
                  Read Latest Stories <ArrowRight size={18} />
                </Link>
              )}
              {user.role === "ADMIN" && (
                <Link to="/admin-profile/users" className={`${secondaryBtn} flex items-center gap-2 px-8 py-3 text-base rounded-full hover:bg-slate-100 transition-colors`}>
                  Manage Users <ArrowRight size={18} />
                </Link>
              )}
            </>
          ) : (
            <>
              <Link to="/register" className={`${primaryBtn} shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition duration-200 flex items-center gap-2 px-8 py-3 text-base rounded-full`}>
                Get Started Free <Sparkles size={16} />
              </Link>
              <Link to="/login" className={`${secondaryBtn} flex items-center gap-2 px-8 py-3 text-base rounded-full hover:bg-slate-100 transition-colors`}>
                Explore Dashboard <ArrowRight size={16} />
              </Link>
            </>
          )}
        </div>

        </section>
    </div>
  )
}

export default Home