import React,{useEffect} from 'react'
import Header from './Header'
import {Outlet} from 'react-router'
import Footer from './Footer'
import { useAuth } from '../store/authStore'
function RootLayout() {
  const checkAuth = useAuth((state) => state.checkAuth)
  const loading = useAuth((state) => state.loading)
  useEffect(()=>{
    checkAuth()
  },[checkAuth])
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-2xl font-semibold text-blue-600 animate-pulse">Loading...</div>
  }
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <main className="flex-grow">
        <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}

export default RootLayout