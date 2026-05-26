import { NavLink, Outlet } from "react-router";
import { useAuth } from "../store/authStore";
import {
  pageWrapper,
  navLinkClass,
  navLinkActiveClass,
  divider,
} from "../styles/common";

function AuthorProfile() {
  const user = useAuth((state) => state.currentUser)

  return (
    <div className={pageWrapper}>
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-[#1d1d1f] tracking-tight">Author Profile</h1>
        {user && (
          <p className="text-lg text-slate-500 mt-1">
            Welcome back, <span className="font-semibold text-blue-500">{user.firstName || "Author"} {user.lastName || ""}</span>!
          </p>
        )}
      </div>
      
      {/* Author Navigation */}
      <div className="flex gap-6 mb-6">

        <NavLink
          to="articles"
          className={({ isActive }) =>
            isActive ? navLinkActiveClass : navLinkClass
          }
        >
          Articles
        </NavLink>

        <NavLink
          to="write-article"
          className={({ isActive }) =>
            isActive ? navLinkActiveClass : navLinkClass
          }
        >
          Write Article
        </NavLink>

      </div>

      <div className={divider}></div>

      {/* Nested route content */}
      <Outlet />

    </div>
  );
}

export default AuthorProfile;