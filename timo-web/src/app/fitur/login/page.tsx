// src/components/SignUpCard.jsx
'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { User, Mail, Lock } from 'lucide-react' // Menggunakan lucide-react untuk icon agar mirip dengan desain

export default function SignUpCard() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Proses registrasi di sini
    console.log(formData)
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#256c75] p-4 bg-opacity-95 bg-[radial-gradient(#2d828d_1px,transparent_1px)] [background-size:16px_16px]">
      
      {/* Container Utama (Card) */}
      <div className="w-full max-w-5xl bg-[#fbf9e6] rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden min-h-[600px]">
        
        {/* KOLOM KIRI: Ilustrasi */}
        <div className="w-full md:w-1/2 p-8 flex items-end justify-center relative bg-[#fbf9e6]">
          <div className="w-full max-w-sm aspect-square relative mb-8">
            {/* Ganti src dengan path ilustrasi yang kamu export dari Figma */}
            <Image  
              src="/images/signup-illustration.png" 
              alt="Sign Up Illustration"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>

        {/* KOLOM KANAN: Form Sign Up */}
        <div className="w-full md:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Sign Up</h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            {/* Input Name Group (First & Last Name) */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                  <User size={18} />
                </span>
                <input 
                  type="text" 
                  placeholder="Enter First Name"
                  className="w-full pl-12 pr-4 py-3 bg-[#f2edd0] border border-gray-400 rounded-xl focus:outline-none focus:border-[#387a84] text-gray-700 placeholder-gray-500 transition-colors"
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                />
              </div>
              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                  <User size={18} />
                </span>
                <input 
                  type="text" 
                  placeholder="Enter Last Name"
                  className="w-full pl-12 pr-4 py-3 bg-[#f2edd0] border border-gray-400 rounded-xl focus:outline-none focus:border-[#387a84] text-gray-700 placeholder-gray-500 transition-colors"
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                />
              </div>
            </div>

            {/* Input Username */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                <User size={18} />
              </span>
              <input 
                type="text" 
                placeholder="Enter Username"
                className="w-full pl-12 pr-4 py-3 bg-[#f2edd0] border border-gray-400 rounded-xl focus:outline-none focus:border-[#387a84] text-gray-700 placeholder-gray-500 transition-colors"
                onChange={(e) => setFormData({...formData, username: e.target.value})}
              />
            </div>

            {/* Input Email */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                <Mail size={18} />
              </span>
              <input 
                type="email" 
                placeholder="Enter Email"
                className="w-full pl-12 pr-4 py-3 bg-[#f2edd0] border border-gray-400 rounded-xl focus:outline-none focus:border-[#387a84] text-gray-700 placeholder-gray-500 transition-colors"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            {/* Input Password */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                <Lock size={18} />
              </span>
              <input 
                type="password" 
                placeholder="Enter Password"
                className="w-full pl-12 pr-4 py-3 bg-[#f2edd0] border border-gray-400 rounded-xl focus:outline-none focus:border-[#387a84] text-gray-700 placeholder-gray-500 transition-colors"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            {/* Input Confirm Password */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                <Lock size={18} />
              </span>
              <input 
                type="password" 
                placeholder="Confirm Password"
                className="w-full pl-12 pr-4 py-3 bg-[#f2edd0] border border-gray-400 rounded-xl focus:outline-none focus:border-[#387a84] text-gray-700 placeholder-gray-500 transition-colors"
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>

            {/* Checkbox Terms & Conditions */}
            <div className="flex items-center gap-2 mt-2">
              <input 
                type="checkbox" 
                id="terms"
                className="w-4 h-4 rounded border-gray-400 text-[#3d7a82] focus:ring-[#3d7a82] bg-[#f2edd0]"
                onChange={(e) => setFormData({...formData, agreeTerms: e.target.checked})}
              />
              <label htmlFor="terms" className="text-sm text-gray-700 select-none">
                I agree to all terms
              </label>
            </div>

            {/* Button Register */}
            <button 
              type="submit"
              className="mt-2 w-full md:w-auto md:self-start px-8 py-3 bg-[#3d7a82] text-white font-medium rounded-lg hover:bg-[#2f5f65] transition-colors shadow-md"
            >
              Register
            </button>
          </form>

          {/* Footer Text */}
          <p className="text-sm text-gray-700 mt-6">
            Already have an account?{' '}
            <Link href="/signin" className="text-[#00a3c4] hover:underline font-medium">
              Sign In
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}