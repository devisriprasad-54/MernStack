import React, { useState,useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { UserPlus, User, Mail, Lock, Image, PenTool, Loader2, Upload } from 'lucide-react'
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

function Register() {
  const { register, handleSubmit } = useForm()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [preview, setPreview] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const navigate = useNavigate()

  const handleRegister = handleSubmit(async (data) => {
    setLoading(true)
    setError(null)

    // Validation
    if (!data.role) {
      setError("Please select a role (User or Author)")
      setLoading(false)
      return
    }
    if (!data.firstName || !data.firstName.trim()) {
      setError("First Name is required")
      setLoading(false)
      return
    }
    if (!data.email || !data.email.trim()) {
      setError("Email is required")
      setLoading(false)
      return
    }
    if (!data.password) {
      setError("Password is required")
      setLoading(false)
      return
    }

    // Create form data object
    const formData = new FormData();
    //get user object
    let { role, ...userObj } = data;
    //add all fields except profilePic to FormData object
    Object.keys(userObj).forEach((key) => {
      formData.append(key, userObj[key]);
    });
    // add profilePic to Formdata object using our robust selectedFile state
    if (selectedFile) {
      formData.append("profileImageUrl", selectedFile);
    }

    try {
      if (role === 'user') {
        let res = await axios.post('https://blogapp-backend-7kra.onrender.com/user-api/users', formData)
        if (res.status === 201) {
          navigate('/login')
        }
      }
      if (role === 'author') {
         let res = await axios.post('https://blogapp-backend-7kra.onrender.com/author-api/users', formData)
        if (res.status === 201) {
          setError(null)
          navigate('/login')
        }
      }
      if (role === 'admin') {
        // Admin registration — sends JSON, no profile image required
        let res = await axios.post('https://blogapp-backend-7kra.onrender.com/admin-api/users', {
          ...userObj,
        })
        if (res.status === 201) {
          setError(null)
          navigate('/login')
        }
      }
    } catch (err) {
      let errorMsg = err.response?.data?.message || "Registration failed. Please try again.";
      if (errorMsg === "Duplicate field value" || errorMsg === "Email already registered") {
        errorMsg = "Email already registered";
      } else if (errorMsg === "Validation failed") {
        errorMsg = "Please check your inputs and ensure all required fields are provided.";
      }
      setError(errorMsg)
    } finally {
      setLoading(false)
    }
  })

  //cleanup(remove preview image from browser memory)
  useEffect(()=>{
    return ()=>{
      if(preview){
        URL.revokeObjectURL(preview)
      }
    }
  },[preview])

  //loading
  if(loading){
    return (
      <div className={`${pageBackground} flex flex-col items-center justify-center py-20`}>
        <Loader2 className="animate-spin text-cyan-400 mb-4" size={48} />
        <p className={loadingClass}>Registering…</p>
      </div>
    )
  }

  return (
    <div className={`${pageBackground} flex items-center justify-center py-20`}>
      <div className={formCard}>
        <div className="flex items-center gap-3 mb-6">
          <UserPlus className="text-blue-500 mb-5 " size={28} />
          <h2 className={`${formTitle} mb-0 pt-2`}>Register</h2>
        </div>

        {/* Error message */}
        {error && <p className={`${errorClass} mb-5`}>{error}</p>}

        <form onSubmit={handleRegister} className="flex flex-col gap-1">

          {/* Role selection */}
          <div className={formGroup}>
            <p className={labelClass}>Select Role</p>
            <div className="flex gap-6 mt-1">
              <label className={`${bodyText} flex items-center gap-2 cursor-pointer`}>
                <input type="radio" {...register('role')} value="user" className="accent-cyan-500" /> 
                <User size={16} /> User
              </label>
              <label className={`${bodyText} flex items-center gap-2 cursor-pointer`}>
                <input type="radio" {...register('role')} value="author" className="accent-cyan-500" /> 
                <PenTool size={16} /> Author
              </label>
            </div>
          </div>

          {/* Name row */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className={`${formGroup} flex-1`}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="First name"
                  {...register('firstName')}
                  className={`${inputClass}`}
                />
              </div>
            </div>
            <div className={`${formGroup} flex-1`}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Last name"
                  {...register('lastName')}
                  className={`${inputClass}`}
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className={formGroup}>
            <div className="relative">
              <input
                type="email"
                placeholder="you@example.com"
                {...register('email')}
                className={`${inputClass} pl-10`}
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            </div>
          </div>

          {/* Password */}
          <div className={formGroup}>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                {...register('password')}
                className={`${inputClass} pl-10`}
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            </div>
          </div>

          {/* Profile image URL */}
          <div className={formGroup}>
           <input
            type="file"
            accept="image/png, image/jpeg"
            className="w-full text-sm text-[#6e6e73] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#0066cc]/10 file:text-[#0066cc] hover:file:bg-[#0066cc]/20 cursor-pointer"
            onChange={(e) => {
              //get image file
              const file = e.target.files[0];
              //validation for image format
              if (file) {
                if (!["image/jpeg", "image/png"].includes(file.type)) {
                  setError("Only JPG or PNG allowed");
                  return;
                }
                //validation for file size
                if (file.size > 2 * 1024 * 1024) {
                  setError("File size must be less than 2MB");
                  return;
                }
                setSelectedFile(file);
                //Converts file → temporary browser URL(create preview URL)
                const previewUrl = URL.createObjectURL(file);
                setPreview(previewUrl);
                setError(null);
              } else {
                setSelectedFile(null);
                setPreview(null);
              }
            }}
          />
         {preview && (
                <div className="mt-3 flex justify-center">
                <img
                    src={preview}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-full border"
                />
                </div>
            )}
          </div>

          <button type="submit" className={`${submitBtn} flex items-center justify-center gap-2 mt-4`} disabled={loading}>
            <UserPlus size={18} />
            Register
          </button>
        </form>

      </div>
    </div>
  )
}

export default Register