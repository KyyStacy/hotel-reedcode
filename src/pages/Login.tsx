import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const history = useHistory();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const success = await login(formData.email, formData.password);

    if (success) {
      setTimeout(() => {
        const storedUser = localStorage.getItem('user');
        const redirectPath = localStorage.getItem('redirectAfterLogin');
        
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          
          if (userData.role === 'admin') {
            history.push('/admin/dashboard');
          } else if (userData.role === 'receptionist') {
            history.push('/receptionist/dashboard');
          } else {
            if (redirectPath) {
              localStorage.removeItem('redirectAfterLogin');
              history.push(redirectPath);
            } else {
              history.push('/home');
            }
          }
        } else {
          history.push('/home');
        }
      }, 500);
    } else {
      setError('Email atau password salah');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float delay-200"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float delay-400"></div>
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left Side - Illustration */}
        <div className="hidden lg:block animate-slideInLeft">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-3xl transform -rotate-6 opacity-20"></div>
            <div className="relative bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
              <div className="space-y-6">
                <div className="text-center mb-8 animate-fadeInUp">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center shadow-2xl mb-4">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Akses Aman</h3>
                  <p className="text-gray-600">Login untuk mengakses semua fitur</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-cyan-50 to-teal-50 rounded-xl animate-fadeInUp delay-100">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Booking Instan</p>
                      <p className="text-sm text-gray-600">Pesan kamar dengan cepat</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl animate-fadeInUp delay-200">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Riwayat Pemesanan</p>
                      <p className="text-sm text-gray-600">Akses semua booking Anda</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl animate-fadeInUp delay-300">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Penawaran Khusus</p>
                      <p className="text-sm text-gray-600">Dapatkan promo eksklusif</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl text-white animate-fadeInUp delay-400">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-lg">Butuh Bantuan?</p>
                      <p className="text-cyan-100 text-sm">Hubungi customer service kami</p>
                    </div>
                  </div>
                  <a href="https://wa.me/6285171713355" target="_blank" rel="noopener noreferrer" className="block w-full bg-white text-cyan-600 text-center py-3 rounded-xl font-semibold hover:bg-cyan-50 transition-colors">
                    Chat WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="animate-slideInRight">
          <div className="text-center mb-8">
            <div className="inline-block animate-bounce mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-3xl flex items-center justify-center shadow-2xl transform -rotate-12">
                <span className="text-4xl transform rotate-12">🏨</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent mb-2 animate-fadeInDown">
              Reed Hotel
            </h1>
            <h2 className="text-2xl font-bold text-gray-800 mb-2 animate-fadeInDown delay-100">Selamat Datang Kembali</h2>
            <p className="text-gray-600 animate-fadeInDown delay-200">Masuk ke akun Anda untuk melanjutkan</p>
          </div>

          <div className="card p-8 animate-scaleIn delay-300">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  Ingat saya
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-cyan-600 hover:text-cyan-500">
                  Lupa password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Memproses...
                </>
              ) : (
                'Masuk'
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Atau</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Belum punya akun?{' '}
                <Link to="/register" className="font-medium text-cyan-600 hover:text-cyan-500">
                  Daftar sekarang
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-cyan-50 rounded-lg">
            <p className="text-xs text-cyan-800 font-semibold mb-2">Demo Accounts:</p>
            <div className="text-xs text-cyan-700 space-y-1">
              <p>👤 User: user@test.com / user123</p>
              <p>👨‍💼 Admin: admin@reedhotel.com / admin123</p>
              <p>🏨 Receptionist: receptionist@reedhotel.com / receptionist123</p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Link to="/home" className="text-sm text-gray-600 hover:text-cyan-600 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Kembali ke Beranda
            </Link>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
