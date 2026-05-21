'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// ============================================================
// TYPES
// ============================================================
interface RegisterForm {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreeTerms?: string;
  general?: string;
}

// ============================================================
// VALIDATION HELPER
// ============================================================
function validateForm(form: RegisterForm): FormErrors {
  const errors: FormErrors = {};

  if (!form.firstName.trim()) {
    errors.firstName = 'First name tidak boleh kosong';
  }

  if (!form.lastName.trim()) {
    errors.lastName = 'Last name tidak boleh kosong';
  }

  if (!form.username.trim()) {
    errors.username = 'Username tidak boleh kosong';
  } else if (form.username.length < 3) {
    errors.username = 'Username minimal 3 karakter';
  } else if (!/^[a-zA-Z0-9_]+$/.test(form.username)) {
    errors.username = 'Username hanya boleh huruf, angka, dan underscore';
  }

  if (!form.email.trim()) {
    errors.email = 'Email tidak boleh kosong';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Format email tidak valid';
  }

  if (!form.password) {
    errors.password = 'Password tidak boleh kosong';
  } else if (form.password.length < 6) {
    errors.password = 'Password minimal 6 karakter';
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = 'Konfirmasi password tidak boleh kosong';
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Password tidak cocok';
  }

  if (!form.agreeTerms) {
    errors.agreeTerms = 'Kamu harus menyetujui syarat dan ketentuan';
  }

  return errors;
}

// ============================================================
// ICON COMPONENTS
// ============================================================
function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function UserTagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function EyeIcon({ show }: { show: boolean }) {
  return show ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function LoadingSpinner() {
  return (
    <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

// ============================================================
// INPUT FIELD COMPONENT (reusable)
// ============================================================
interface InputFieldProps {
  icon: React.ReactNode;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  autoComplete?: string;
  error?: string;
  rightElement?: React.ReactNode;
}

function InputField({
  icon,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  autoComplete,
  error,
  rightElement,
}: InputFieldProps) {
  return (
    <div>
      <div
        className={`flex items-center gap-3 border-2 rounded-lg px-4 py-2.5 transition-colors ${
          error
            ? 'border-red-400 bg-red-50'
            : 'border-[#c8a96e] focus-within:border-[#0d4a5a] bg-white'
        }`}
      >
        <span className="text-slate-400 shrink-0">{icon}</span>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="flex-1 outline-none text-slate-700 placeholder-slate-400 text-sm bg-transparent"
        />
        {rightElement && (
          <span className="shrink-0">{rightElement}</span>
        )}
      </div>
      {error && (
        <p className="mt-1 text-red-500 text-xs">{error}</p>
      )}
    </div>
  );
}

// ============================================================
// MAIN REGISTER PAGE COMPONENT
// ============================================================
export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState<RegisterForm>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Hapus error field saat user mulai mengetik
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi form
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'register',
          email: form.email,
          password: form.password,
          // Data tambahan untuk profil user
          firstName: form.firstName,
          lastName: form.lastName,
          username: form.username,
        }),
      });

      const data = await res.json();

      if (data.error) {
        // Cek apakah email sudah terdaftar
        if (data.error.toLowerCase().includes('already')) {
          setErrors({ email: 'Email ini sudah terdaftar. Coba login.' });
        } else {
          setErrors({ general: 'Registrasi gagal. Silakan coba lagi.' });
        }
        return;
      }

      // Registrasi berhasil → redirect ke login
      router.push('/login?registered=true');
    } catch {
      setErrors({ general: 'Terjadi kesalahan. Periksa koneksi internet kamu.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d4a5a] relative overflow-hidden py-8">

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-16 h-16 border-2 border-white rounded-full" />
        <div className="absolute top-32 right-20 w-8 h-8 border-2 border-white rounded" />
        <div className="absolute bottom-20 left-32 w-12 h-12 border-2 border-white" style={{ transform: 'rotate(45deg)' }} />
        <div className="absolute bottom-40 right-10 w-20 h-20 border-2 border-white rounded-full" />
        <div className="absolute top-1/2 left-5 w-6 h-6 border-2 border-white rounded-full" />
        <div className="absolute top-1/4 right-1/4 w-10 h-10 border-2 border-white" style={{ transform: 'rotate(30deg)' }} />
      </div>

      {/* Card utama */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-4 flex overflow-hidden">

        {/* Sisi kiri — ilustrasi */}
        <div className="hidden md:flex flex-1 items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-10">
          <div className="text-center">
            {/* Ilustrasi task management */}
            <div className="relative mx-auto w-52 h-60">
              {/* Layar utama */}
              <div className="absolute left-4 top-0 w-36 h-48 bg-[#1a6b7c] rounded-2xl shadow-xl flex flex-col p-3 gap-2">
                {/* Header bar */}
                <div className="w-full h-5 bg-white rounded opacity-30" />
                {/* Task items */}
                <div className="flex flex-col gap-2 mt-1">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border-2 border-white opacity-70 shrink-0" />
                      <div className={`h-3 bg-white rounded opacity-${i === 1 ? '80' : i === 2 ? '50' : '30'}`} style={{ width: `${70 - i * 10}%` }} />
                    </div>
                  ))}
                </div>
                {/* Progress bar */}
                <div className="mt-auto">
                  <div className="w-full h-2 bg-white rounded-full opacity-20">
                    <div className="w-2/3 h-2 bg-[#5bc8dc] rounded-full" />
                  </div>
                </div>
              </div>

              {/* Panel melayang */}
              <div className="absolute right-0 top-8 w-20 h-28 bg-[#5bc8dc] rounded-xl shadow-lg flex flex-col items-center justify-center gap-2 p-2">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a6b7c" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="w-12 h-2 bg-white rounded opacity-60" />
                <div className="w-10 h-2 bg-white rounded opacity-40" />
              </div>

              {/* Dekorasi */}
              <div className="absolute -top-3 -right-3 w-12 h-12 bg-amber-300 rounded-full opacity-70" />
              <div className="absolute -bottom-3 left-0 w-8 h-8 bg-purple-300 rounded-full opacity-70" />
            </div>

            <p className="mt-8 text-slate-500 text-sm font-medium">
              Daftar dan mulai kelola tugasmu
            </p>
          </div>
        </div>

        {/* Sisi kanan — form register */}
        <div className="flex-1 flex flex-col justify-center px-8 py-8 md:px-12">

          <h1 className="text-3xl font-bold text-slate-800 mb-6">Sign Up</h1>

          {/* General error */}
          {errors.general && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-3">

            {/* First Name & Last Name — 2 kolom */}
            <div className="grid grid-cols-2 gap-3">
              <InputField
                icon={<UserIcon />}
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Enter First Name"
                autoComplete="given-name"
                error={errors.firstName}
              />
              <InputField
                icon={<UserIcon />}
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Enter Last Name"
                autoComplete="family-name"
                error={errors.lastName}
              />
            </div>

            {/* Username */}
            <InputField
              icon={<UserTagIcon />}
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              autoComplete="username"
              error={errors.username}
            />

            {/* Email */}
            <InputField
              icon={<MailIcon />}
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter Email"
              autoComplete="email"
              error={errors.email}
            />

            {/* Password */}
            <InputField
              icon={<LockIcon />}
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter Password"
              autoComplete="new-password"
              error={errors.password}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                >
                  <EyeIcon show={showPassword} />
                </button>
              }
            />

            {/* Confirm Password */}
            <InputField
              icon={<LockIcon />}
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              autoComplete="new-password"
              error={errors.confirmPassword}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={showConfirmPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                >
                  <EyeIcon show={showConfirmPassword} />
                </button>
              }
            />

            {/* Agree Terms */}
            <div>
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={form.agreeTerms}
                  onChange={handleChange}
                  className="w-4 h-4 mt-0.5 rounded border-slate-300 accent-[#0d4a5a] cursor-pointer shrink-0"
                />
                <label htmlFor="agreeTerms" className="text-sm text-slate-600 cursor-pointer select-none">
                  I agree to all terms
                </label>
              </div>
              {errors.agreeTerms && (
                <p className="mt-1 text-red-500 text-xs">{errors.agreeTerms}</p>
              )}
            </div>

            {/* Tombol Register */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-[#1a6b7c] hover:bg-[#0d4a5a] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-lg py-3 transition-colors duration-200 mt-2"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner />
                  <span>Mendaftar...</span>
                </>
              ) : (
                'Register'
              )}
            </button>

          </form>

          {/* Link ke Login */}
          <p className="mt-5 text-sm text-slate-500">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-[#1a6b7c] font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}