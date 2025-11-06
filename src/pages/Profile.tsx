import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { usePlatform } from '../hooks/usePlatform';
import BottomTabNavigation from '../components/BottomTabNavigation';

const Profile: React.FC = () => {
  const history = useHistory();
  const { user, logout, updateProfile } = useAuth();
  const { isNative, isMobile } = usePlatform();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || ''
  });

  if (!user) {
    history.push('/login');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    history.push('/home');
  };

  const getRoleBadge = (role: string) => {
    const badges = {
      user: { text: 'User', color: 'bg-blue-100 text-blue-700' },
      admin: { text: 'Admin', color: 'bg-purple-100 text-purple-700' },
      receptionist: { text: 'Resepsionis', color: 'bg-green-100 text-green-700' }
    };
    return badges[role as keyof typeof badges] || badges.user;
  };

  const badge = getRoleBadge(user.role);

  return (
    <div className={`min-h-screen overflow-x-hidden bg-gradient-to-br from-cyan-50 via-white to-teal-50 ${isNative || isMobile ? 'pb-20 pt-0' : ''}`}>
      {/* Header - Desktop Only */}
      {!isNative && !isMobile && (
        <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50 backdrop-blur-md animate-fadeInDown">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => history.push('/home')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-all transform hover:scale-105 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Kembali</span>
              </button>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">Profile Saya</h1>
                  <p className="text-sm text-gray-500">Kelola informasi pribadi Anda</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Status Bar Space & Settings Button */}
      {(isNative || isMobile) && (
        <div className="bg-gradient-to-br from-cyan-50 to-white pt-12 px-4 pb-4 flex justify-end">
          {/* Settings Button */}
          <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all active:scale-95">
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      )}

      <div className={`max-w-7xl mx-auto ${isNative || isMobile ? 'px-4 py-4' : 'px-4 sm:px-6 lg:px-8 py-8'}`}>
        {/* Profile Header Card */}
        <div className={`relative overflow-hidden ${isNative || isMobile ? 'rounded-2xl mb-6' : 'rounded-3xl mb-8'} animate-fadeInUp`}>
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-teal-500 to-cyan-600"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNk0wIDIwYzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
          
          <div className={`relative ${isNative || isMobile ? 'px-5 py-6' : 'px-6 sm:px-8 py-8 sm:py-12'}`}>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Avatar */}
              <div className="relative group">
                <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className={`relative ${isNative || isMobile ? 'w-24 h-24' : 'w-28 h-28 sm:w-32 sm:h-32'} bg-white rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-105 transition-all duration-300`}>
                  <span className={`${isNative || isMobile ? 'text-4xl' : 'text-5xl sm:text-6xl'} font-bold bg-gradient-to-br from-cyan-500 to-teal-600 bg-clip-text text-transparent`}>
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center sm:text-left">
                <h1 className={`${isNative || isMobile ? 'text-2xl' : 'text-3xl sm:text-4xl'} font-bold text-white mb-2 tracking-tight`}>
                  {user.name}
                </h1>
                <p className={`text-cyan-50 ${isNative || isMobile ? 'text-base' : 'text-lg'} mb-4 flex items-center justify-center sm:justify-start gap-2 ${isNative || isMobile ? 'break-all' : ''}`}>
                  <svg className={`${isNative || isMobile ? 'w-4 h-4' : 'w-5 h-5'} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="truncate">{user.email}</span>
                </p>
                
                {/* Role Badge - Only for Admin & Receptionist */}
                {(user.role === 'admin' || user.role === 'receptionist') && (
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-lg`}>
                    {user.role === 'admin' ? (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Administrator
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Resepsionis
                      </>
                    )}
                  </span>
                )}
              </div>

              {/* Quick Actions */}
              <div className={`flex ${isNative || isMobile ? 'flex-row w-full' : 'sm:flex-col'} gap-3 ${isNative || isMobile ? 'mt-4' : ''}`}>
                {user.role === 'admin' && (
                  <button
                    onClick={() => history.push('/admin/dashboard')}
                    className={`${isNative || isMobile ? 'flex-1' : ''} px-6 py-3 bg-white text-cyan-600 rounded-xl font-semibold hover:bg-cyan-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Dashboard
                  </button>
                )}
                {user.role === 'receptionist' && (
                  <button
                    onClick={() => history.push('/receptionist/dashboard')}
                    className={`${isNative || isMobile ? 'flex-1' : ''} px-6 py-3 bg-white text-cyan-600 rounded-xl font-semibold hover:bg-cyan-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Dashboard
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className={`${isNative || isMobile ? 'flex-1' : ''} px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Keluar
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">

          {/* Profile Details */}
          <div className="lg:col-span-3 space-y-6">
            {/* Personal Information */}
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl border border-gray-100 animate-fadeInUp delay-100">
              {/* Header with gradient accent */}
              <div className="relative bg-gradient-to-r from-cyan-50 to-teal-50 px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-100">
                <div className={`flex ${isNative || isMobile ? 'flex-col gap-4' : 'items-center justify-between'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`${isNative || isMobile ? 'w-10 h-10' : 'w-12 h-12'} bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <svg className={`${isNative || isMobile ? 'w-5 h-5' : 'w-6 h-6'} text-white`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`${isNative || isMobile ? 'text-lg' : 'text-xl'} font-bold text-gray-800`}>Informasi Pribadi</h3>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">Kelola data pribadi Anda</p>
                    </div>
                  </div>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className={`${isNative || isMobile ? 'w-full' : ''} px-4 py-2.5 sm:py-2 bg-white text-cyan-600 rounded-xl font-semibold hover:bg-cyan-50 transition-all shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 border border-cyan-200`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <span className={isNative || isMobile ? '' : 'hidden sm:inline'}>Edit Profile</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="p-6 sm:p-8">

              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <svg className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all text-gray-800 font-medium hover:border-gray-300"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <svg className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        disabled
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 text-gray-500 font-medium cursor-not-allowed"
                      />
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Email tidak dapat diubah untuk keamanan akun
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <svg className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Nomor Telepon
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all text-gray-800 font-medium hover:border-gray-300"
                      placeholder="+62 812 3456 7890"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button type="submit" className="flex-1 px-6 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-bold hover:from-cyan-600 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Simpan Perubahan
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          name: user.name,
                          phone: user.phone || '',
                          email: user.email
                        });
                      }}
                      className="flex-1 px-6 py-4 bg-white text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all border-2 border-gray-200 hover:border-gray-300 transform hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Batal
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-50 to-teal-50 p-6 border-2 border-cyan-100 hover:border-cyan-300 transition-all hover:shadow-lg">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-500 mb-1">Nama Lengkap</p>
                        <p className="text-lg font-bold text-gray-800 truncate">{user.name}</p>
                      </div>
                    </div>
                  </div>

                  <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-50 to-teal-50 p-6 border-2 border-cyan-100 hover:border-cyan-300 transition-all hover:shadow-lg">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-500 mb-1">Email</p>
                        <p className="text-lg font-bold text-gray-800 truncate">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  {user.phone && (
                    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-50 to-teal-50 p-6 border-2 border-cyan-100 hover:border-cyan-300 transition-all hover:shadow-lg">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-500 mb-1">Nomor Telepon</p>
                          <p className="text-lg font-bold text-gray-800 truncate">{user.phone}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              </div>
            </div>

          </div>
        </div>
      </div>
      
      {/* Bottom Tab Navigation - Only on Mobile/Native */}
      {(isNative || isMobile) && <BottomTabNavigation />}
    </div>
  );
};

export default Profile;
