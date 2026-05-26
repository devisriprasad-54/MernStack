import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../store/authStore'
import { useNavigate } from 'react-router'
import { toast } from 'react-hot-toast'
import { Mail, Lock, LogIn, User, PenTool, ShieldCheck, Loader2 } from 'lucide-react'
import {
  pageBackground,
  formCard,
  formTitle,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
  errorClass,
  loadingClass,
  bodyText,
} from '../styles/common'

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      role: 'user',
      email: '',
      password: '',
    }
  })
  const [loading, setLoading] = useState(false)
  const [loginError, setLoginError] = useState(null)

  const login = useAuth(state => state.login)
  const currentUser = useAuth(state => state.currentUser)   // capital U — matches store
  const isAuthenticated = useAuth(state => state.isAuthenticated)
  const Error = useAuth(state=>state.error)
  const navigate = useNavigate()

  const onUserLogin = async (formData) => {
    console.log('[LOGIN FORM] Submitted data:', JSON.stringify(formData))
    try {
      setLoading(true)
      setLoginError(null)
      await login(formData)
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Login failed'
      setLoginError(msg)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      if (currentUser.role === 'USER') {
        navigate('/user-profile')
        toast.success('Logged in successfully')
      } else if (currentUser.role === 'AUTHOR') {
        navigate('/author-profile/articles')
        toast.success('Logged in as Author')
      } else if (currentUser.role === 'ADMIN') {
        navigate('/admin-profile')
        toast.success('Logged in as Admin')
      }
    }
  }, [isAuthenticated, currentUser, navigate])

  return (
    <div className={`${pageBackground} flex items-center justify-center py-20`}>
      <div className={formCard}>
        <div className="flex items-center gap-3 mb-6">
          <LogIn className="text-blue-500 mb-3"size={28} />
          <h2 className={`${formTitle} mb-0 pt-2`}>sign In</h2>
        </div>

        {/* Error message */}
        {(loginError || Error) && <p className={`${errorClass} mb-5`}>{loginError || Error}</p>}
        {/* Loading */}
        {loading && (
          <div className="flex items-center gap-2 mb-4 text-cyan-400">
            <Loader2 className="animate-spin" size={20} />
            <p className={loadingClass}>Signing in…</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onUserLogin)} className="flex flex-col gap-1">

          {/* Role selection */}
          <div className={formGroup}>
            <p className={labelClass}>Select Role</p>
            <div className="flex flex-wrap gap-4 mt-1">
              <label className={`${bodyText} flex items-center gap-2 cursor-pointer`}>
                <input type="radio" {...register('role', { required: true })} value="user" className="accent-cyan-500" /> 
                <User size={16} /> User
              </label>
              <label className={`${bodyText} flex items-center gap-2 cursor-pointer`}>
                <input type="radio" {...register('role', { required: true })} value="author" className="accent-cyan-500" /> 
                <PenTool size={16} /> Author
              </label>
              <label className={`${bodyText} flex items-center gap-2 cursor-pointer`}>
                <input type="radio" {...register('role', { required: true })} value="admin" className="accent-cyan-500" /> 
                <ShieldCheck size={16} /> Admin
              </label>
            </div>
          </div>

          {/* Email */}
          <div className={formGroup}>
            <label className={`${labelClass} flex items-center gap-2`}>
              <Mail size={16} /> Email
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="you@example.com"
                {...register('email', { required: 'Email is required' })}
                className={`${inputClass}`}
              />
            </div>
            {errors.email && <p className={errorClass}>{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className={formGroup}>
            <div className="flex items-center justify-between mb-1">
              <label className={`${labelClass} flex items-center gap-2 mb-0`}>
                <Lock size={16} /> Password
              </label>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/forgot-password'); }} className={`${bodyText} text-sm hover:text-blue-400 transition-colors`}>Forgot password?</a>
            </div>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                {...register('password', { required: 'Password is required' })}
                className={`${inputClass}`}
              />
            </div>
            {errors.password && <p className={errorClass}>{errors.password.message}</p>}
          </div>

          <button type="submit" className={`${submitBtn} flex items-center justify-center gap-2`} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Signing in...
              </>
            ) : (
              <>
                <LogIn size={18} />
                Login
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login