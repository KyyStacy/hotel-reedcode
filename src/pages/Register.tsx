import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { usePlatform } from '../hooks/usePlatform';
import BottomTabNavigation from '../components/BottomTabNavigation';

const Register: React.FC = () => {
  const history = useHistory();
  const { register } = useAuth();
  const { isNative, isMobile } = usePlatform();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
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

    if (formData.password !== formData.confirmPassword) {
      setError('Password tidak cocok');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password minimal 6 karakter');
      setIsLoading(false);
      return;
    }

    const success = await register(formData.name, formData.email, formData.password, formData.phone);

    if (success) {
      setTimeout(() => {
        const redirectPath = localStorage.getItem('redirectAfterLogin');
        if (redirectPath) {
          localStorage.removeItem('redirectAfterLogin');
          history.push(redirectPath);
        } else {
          history.push('/home');
        }
      }, 500);
    } else {
      setError('Email sudah terdaftar');
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${isNative || isMobile ? 'pb-20' : ''}`}>
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
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-3xl transform rotate-6 opacity-20"></div>
            <div className="relative bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center gap-4 animate-fadeInUp">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">Kamar Premium</h3>
                    <p className="text-gray-600 text-sm">Berbagai pilihan kamar mewah</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 animate-fadeInUp delay-100">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">Booking Cepat</h3>
                    <p className="text-gray-600 text-sm">Proses pemesanan mudah & cepat</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 animate-fadeInUp delay-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">Aman & Terpercaya</h3>
                    <p className="text-gray-600 text-sm">Data Anda terlindungi dengan baik</p>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl animate-fadeInUp delay-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex -space-x-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-teal-400 border-2 border-white"></div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-blue-400 border-2 border-white"></div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 border-2 border-white"></div>
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">1000+ Tamu Puas</p>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm italic">"Pengalaman menginap yang luar biasa! Highly recommended!"</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="animate-slideInRight">
          <div className="text-center mb-8">
            {/* Mobile Header - Compact */}
            {(isNative || isMobile) ? (
              <>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-xl">
                    <span className="text-3xl">🏨</span>
                  </div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                    Reed Hotel
                  </h1>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Buat Akun Baru</h2>
                <p className="text-sm text-gray-600">Daftar untuk mulai memesan kamar</p>
              </>
            ) : (
              /* Desktop Header */
              <>
                <div className="inline-block animate-bounce mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-3xl flex items-center justify-center shadow-2xl transform rotate-12">
                    <span className="text-4xl transform -rotate-12">✨</span>
                  </div>
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent mb-2 animate-fadeInDown">
                  Reed Hotel
                </h1>
                <h2 className="text-2xl font-bold text-gray-800 mb-2 animate-fadeInDown delay-100">Buat Akun Baru</h2>
                <p className="text-gray-600 animate-fadeInDown delay-200">Daftar untuk mulai memesan kamar</p>
              </>
            )}
          </div>

          <div className="card p-8 animate-scaleIn delay-300">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
              )}

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nama Lengkap
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
                placeholder="John Doe"
              />
              </div>

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
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Nomor Telepon
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
                placeholder="08xxxxxxxxxx"
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
                <p className="mt-1 text-xs text-gray-500">Minimal 6 karakter</p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Konfirmasi Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
                placeholder="••••••••"
              />
              </div>

              <div className="flex items-start">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded mt-1"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                Saya setuju dengan{' '}
                <a href="#" className="text-cyan-600 hover:text-cyan-500">
                  syarat dan ketentuan
                </a>{' '}
                yang berlaku
              </label>
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
                'Daftar'
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
                Sudah punya akun?{' '}
                <Link to="/login" className="font-medium text-cyan-600 hover:text-cyan-500">
                  Masuk sekarang
                </Link>
              </p>
            </div>
            </div>
          
          {/* Back to Home - Hidden on Mobile/Native */}
          {!isNative && !isMobile && (
            <div className="mt-8 text-center">
              <Link to="/home" className="text-sm text-gray-600 hover:text-cyan-600 flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Kembali ke Beranda
              </Link>
            </div>
          )}
          </div>
        </div>
      </div>
      
      {/* Bottom Tab Navigation - Only on Mobile/Native */}
      {(isNative || isMobile) && <BottomTabNavigation />}
    </div>
  );
};

export default Register;
