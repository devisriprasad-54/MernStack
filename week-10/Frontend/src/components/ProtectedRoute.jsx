import React from 'react'
import { useAuth } from '../store/authStore'
import { Navigate } from 'react-router'

function ProtectedRoute({ children, role }) {
    // get user login status from store
    const { currentUser, loading, isAuthenticated } = useAuth();

    if (loading) {
        return <div>Loading...</div>
    }
    if (!isAuthenticated) {
        return <Navigate to="/login" replace /> //replace will remove the previous entry from the history of browser
    }
    //check roles
    if (role && !role.includes(currentUser?.role)) {
        //logout
        // logout()
        return <Navigate to="/Unauthorized" state={{ redirectTo: "/login", delay: 2000 }} replace />
    }
    return children
}

export default ProtectedRoute