import { NavLink, Outlet } from 'react-router'
import { useAuth } from '../store/authStore'
import { pageWrapper, navLinkClass, navLinkActiveClass, divider, headingClass } from '../styles/common'
import { useState, useEffect } from 'react'

function AdminDashboard() {
  const user = useAuth((state) => state.currentUser)
  const [defaultActive, setDefaultActive] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDefaultActive(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className={pageWrapper}>
      <div className="mb-6">
        <h1 className={headingClass}>Admin Dashboard</h1>
        {user && (
          <p className="text-lg text-slate-500 mt-1">
            Welcome back, <span className="font-semibold text-blue-500">{user.firstName || "Admin"} {user.lastName || ""}</span>!
          </p>
        )}
      </div>
      
      {/* Admin Navigation */}
      <div className="flex gap-6 mb-6">
       <NavLink
  to="users"
  className={({ isActive }) =>
    isActive || defaultActive
      ? navLinkActiveClass
      : navLinkClass
  }
>
  Users List
</NavLink>

        <NavLink
          to="authors"
          className={({ isActive }) => (isActive ? navLinkActiveClass : navLinkClass)}
        >
          Authors List
        </NavLink>
      </div>

      <div className={divider}></div>

      {/* Nested route content */}
      <Outlet />
    </div>
  )
}

export default AdminDashboard