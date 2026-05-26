import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { toast } from 'react-hot-toast'
import axios from 'axios'
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

function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      role: 'USER',
      email: '',
      newPassword: '',
    }
  })
  const [loading, setLoading] = useState(false)
  const [resetError, setResetError] = useState(null)
  const navigate = useNavigate()

  const onResetPassword = async (formData) => {
    try {
      setLoading(true)
      setResetError(null)
      const response = await axios.post('https://blogapp-backend-7kra.onrender.com/common-api/forgot-password', formData)
      toast.success(response.data.message || 'Password reset successful')
      navigate('/login')
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Reset failed'
      setResetError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`${pageBackground} flex items-center justify-center py-20 min-h-screen`}>
      <div className={formCard}>
        <h2 className={formTitle}>Reset Password</h2>

        {resetError && <p className={`${errorClass} mb-5`}>{resetError}</p>}
        {loading && <p className={loadingClass}>Resetting...</p>}

        <form onSubmit={handleSubmit(onResetPassword)} className="flex flex-col gap-3">
          <div className={formGroup}>
            <p className={labelClass}>Select Role</p>
            <div className="flex gap-4 mt-1">
              <label className={`${bodyText} flex items-center gap-2 cursor-pointer`}>
                <input type="radio" {...register('role', { required: true })} value="USER" /> User
              </label>
              <label className={`${bodyText} flex items-center gap-2 cursor-pointer`}>
                <input type="radio" {...register('role', { required: true })} value="AUTHOR" /> Author
              </label>
              <label className={`${bodyText} flex items-center gap-2 cursor-pointer`}>
                <input type="radio" {...register('role', { required: true })} value="ADMIN" /> Admin
              </label>
            </div>
          </div>

          <div className={formGroup}>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register('email', { required: 'Email is required' })}
              className={inputClass}
            />
            {errors.email && <p className={errorClass}>{errors.email.message}</p>}
          </div>

          <div className={formGroup}>
            <label className={labelClass}>New Password</label>
            <input
              type="password"
              placeholder="••••••••"
              {...register('newPassword', { required: 'New password is required' })}
              className={inputClass}
            />
            {errors.newPassword && <p className={errorClass}>{errors.newPassword.message}</p>}
          </div>

          <button type="submit" className={submitBtn} disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
          
          <button 
            type="button" 
            onClick={() => navigate('/login')}
            className="mt-3 text-sm text-cyan-400 hover:text-cyan-300 transition-colors text-center w-full"
          >
            Back to Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
