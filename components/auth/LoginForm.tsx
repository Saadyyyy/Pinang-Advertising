"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "./login-form.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Basic validation
    if (!email || !password) {
      setError("Email dan password harus diisi");
      setIsLoading(false);
      return;
    }

    // Call login API
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          rememberMe
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Redirect to dashboard on successful login
        router.push('/dashboard');
      } else {
        setError(data.message || 'Login gagal');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError("Terjadi kesalahan saat login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-red-500/10 to-purple-500/10"></div>
        
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-full blur-3xl animate-float-slow"></div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-20 right-20 w-4 h-4 bg-orange-400/30 rotate-45 animate-pulse"></div>
        <div className="absolute bottom-32 left-16 w-6 h-6 bg-red-400/30 rotate-12 animate-pulse delay-700"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-purple-400/40 rounded-full animate-pulse delay-1000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg relative z-10 animate-fadeInUp">
        {/* Logo and Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 mb-6 sm:mb-8 relative transform hover:scale-110 transition-all duration-500 group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
            <div className="relative bg-white/10 backdrop-blur-xl rounded-full p-4 border border-white/20">
              <Image
                src="/logo-pinang.svg"
                alt="Pinang Advertising"
                width={80}
                height={80}
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-400 via-red-400 to-purple-400 bg-clip-text text-transparent mb-3 tracking-tight">
            Pinang Advertising
          </h1>
          <div className="space-y-2">
            <p className="text-white/90 text-lg sm:text-xl font-semibold">
              Admin Dashboard
            </p>
            <p className="text-white/60 text-sm sm:text-base">
              Masuk untuk mengelola konten dan portfolio
            </p>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 p-8 sm:p-10 relative transform hover:shadow-3xl transition-all duration-500 group">
          {/* Glassmorphism Border Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 via-red-400/20 to-purple-400/20 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-red-400 to-purple-400 rounded-t-3xl"></div>
          
          <div className="relative z-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/10 backdrop-blur-xl border border-red-400/20 text-red-300 px-4 py-3 rounded-xl text-sm animate-shake">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </div>
                </div>
              )}

              <div className="space-y-4 sm:space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-white/90 mb-2">
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-white/40 group-focus-within:text-orange-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 text-white bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400/50 transition-all duration-300 hover:bg-white/10 focus:bg-white/10 placeholder-white/40"
                      placeholder="admin123@example.com"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-white/90 mb-2">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-white/40 group-focus-within:text-orange-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 text-white bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400/50 transition-all duration-300 hover:bg-white/10 focus:bg-white/10 placeholder-white/40"
                      placeholder="••••••••"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 hover:text-orange-400 transition-colors"
                    >
                      {showPassword ? (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center group cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-white/20 bg-white/5 text-orange-400 shadow-sm focus:border-orange-400 focus:ring focus:ring-orange-400/20 focus:ring-opacity-50 transition-colors"
                  />
                  <span className="ml-2 text-sm text-white/70 group-hover:text-white transition-colors">
                    Ingat saya
                  </span>
                </label>
                <a href="#" className="text-sm text-orange-400 hover:text-orange-300 font-medium transition-colors">
                  Lupa password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-purple-500 text-white py-3 px-4 rounded-xl font-semibold text-lg shadow-2xl hover:from-orange-600 hover:via-red-600 hover:to-purple-600 focus:outline-none focus:ring-4 focus:ring-orange-400/30 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-orange-500/25"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Sedang masuk...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    <span>Masuk ke Dashboard</span>
                  </div>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="text-center">
                <p className="text-sm text-white/70 mb-3 font-medium">
                  🔐 Demo Credentials:
                </p>
                <div className="space-y-1 text-xs text-white/60 bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10">
                  <div><strong className="text-white/80">Super Admin:</strong> admin123@example.com</div>
                  <div><strong className="text-white/80">Admin:</strong> admin@example.com</div>
                  <div><strong className="text-white/80">User:</strong> user@example.com</div>
                  <div className="text-orange-400 font-medium mt-2">Password: secret123</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 sm:mt-8">
          <p className="text-xs sm:text-sm text-gray-500">
            © 2024 Pinang Advertising. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Neon Box • Huruf Timbul • Signage • Branding
          </p>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
          20%, 40%, 60%, 80% { transform: translateX(2px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}