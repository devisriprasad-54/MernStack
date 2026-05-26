import React from 'react'
import { NavLink } from 'react-router'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import { Home, UserPlus, LogIn, User, LogOut } from 'lucide-react'
import {
  navbarClass,
  navContainerClass,
  navBrandClass,
  navLinksClass,
  navLinkClass,
  navLinkActiveClass,
} from '../styles/common'
import { useAuth } from '../store/authStore'
function Header() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.currentUser);
  const logout = useAuth((state) => state.logout);
// console.log(user)
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success("Successfully logged out");
    navigate("/login");
  };

  // decide profile route based on role
  const getProfilePath = () => {
    if (!user) return "/";

    // console.log("current user", user);
    switch (user.role) {
      case "AUTHOR":
        return "/author-profile/articles";
      case "ADMIN":
        return "/admin-profile";
      default:
        return "/user-profile";
    }
  };
  return (
    <nav className={navbarClass}>
      <div className={navContainerClass}>
        {user && user.profileImageUrl && (
  <img
    src={user.profileImageUrl}
    alt="Profile"
    className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
  />
)}
        {/* Brand */}
        <span className={navBrandClass}>Blog App</span>

        {/* Nav Links */}
        <ul className={navLinksClass}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? `${navLinkActiveClass} flex items-center gap-2` : `${navLinkClass} flex items-center gap-2`)}
            >
              <Home size={18} />
              Home
            </NavLink>
          </li>
{/* Not logged in */}
          {!isAuthenticated && (
            <>
              <li>
                <NavLink to="/register" className={({ isActive }) => (isActive ? `${navLinkActiveClass} flex items-center gap-2` : `${navLinkClass} flex items-center gap-2`)}>
                  <UserPlus size={18} />
                  Register
                </NavLink>
              </li>

              <li>
                <NavLink to="/login" className={({ isActive }) => (isActive ? `${navLinkActiveClass} flex items-center gap-2` : `${navLinkClass} flex items-center gap-2`)}>
                  <LogIn size={18} />
                  Login
                </NavLink>
              </li>
            </>
          )}

          {/* Logged in */}
          {isAuthenticated && (
            <>
              <li>
                <NavLink
                  to={getProfilePath()}
                  className={({ isActive }) => (isActive ? `${navLinkActiveClass} flex items-center gap-2` : `${navLinkClass} flex items-center gap-2`)}
                >
                  <User size={18} />
                  Profile
                </NavLink>
              </li>

              <li>
                <button className={`${navLinkClass} flex items-center gap-2`} onClick={handleLogout}>
                  <LogOut size={18} />
                  Logout
                </button>
              </li>
            </>
          )}        </ul>

      </div>
    </nav>
  )
}

export default Header