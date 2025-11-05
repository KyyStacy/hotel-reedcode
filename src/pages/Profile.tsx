import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const history = useHistory();
  const { user, logout, updateProfile } = useAuth();
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

  const bookingHistory = JSON.parse(localStorage.getItem('userBookings') || '[]')
    .filter((booking: any) => booking.userId === user.id);

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-cyan-50 via-white to-teal-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500 to-teal-500 shadow-xl sticky top-0 z-50 backdrop-blur-md animate-fadeInDown">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => history.push('/home')}
              className="flex items-center gap-2 text-white hover:text-cyan-100 transition-all transform hover:scale-105 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium">Kembali</span>
            </button>
            
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-white">Reed Hotel</h1>
                <p className="text-xs text-cyan-100">Profile Saya</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="card p-6 text-center animate-fadeInUp shadow-xl border-2 border-cyan-100">
              <div className="mb-4">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-cyan-400 to-teal-400 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg animate-scaleIn">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{user.name}</h2>
              <p className="text-gray-600 mb-4">{user.email}</p>
              <span className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${badge.color}`}>
                {badge.text}
              </span>

              <div className="mt-6 space-y-3">
                {user.role === 'admin' && (
                  <button
                    onClick={() => history.push('/admin/dashboard')}
                    className="w-full btn-primary"
                  >
                    Dashboard Admin
                  </button>
                )}
                {user.role === 'receptionist' && (
                  <button
                    onClick={() => history.push('/receptionist/dashboard')}
                    className="w-full btn-primary"
                  >
                    Dashboard Resepsionis
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full btn-secondary text-red-600 border-red-300 hover:bg-red-50"
                >
                  Keluar
                </button>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="card p-6 animate-fadeInUp delay-100 shadow-xl border-2 border-cyan-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">Informasi Pribadi</h3>
                </div>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      disabled
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-500"
                    />
                    <p className="mt-1 text-xs text-gray-500">Email tidak dapat diubah</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nomor Telepon
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button type="submit" className="flex-1 btn-primary">
                      Simpan
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
                      className="flex-1 btn-secondary"
                    >
                      Batal
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">Nama</p>
                      <p className="font-semibold text-gray-800">{user.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-semibold text-gray-800">{user.email}</p>
                    </div>
                  </div>

                  {user.phone && (
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <div>
                        <p className="text-sm text-gray-500">Telepon</p>
                        <p className="font-semibold text-gray-800">{user.phone}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Booking History */}
            {user.role === 'user' && (
              <div className="card p-6 animate-fadeInUp delay-200 shadow-xl border-2 border-cyan-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">Riwayat Pemesanan</h3>
                </div>
                {bookingHistory.length > 0 ? (
                  <div className="space-y-4">
                    {bookingHistory.map((booking: any, index: number) => (
                      <div key={index} className="p-4 border-2 border-gray-200 rounded-xl hover:border-cyan-300 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold text-gray-800">{booking.room.name}</p>
                            <p className="text-sm text-gray-600">{booking.bookingId}</p>
                          </div>
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                            Selesai
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          <p>Check-in: {new Date(booking.checkIn).toLocaleDateString('id-ID')}</p>
                          <p>Check-out: {new Date(booking.checkOut).toLocaleDateString('id-ID')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <p className="text-gray-500">Belum ada riwayat pemesanan</p>
                    <button
                      onClick={() => history.push('/home')}
                      className="mt-4 text-cyan-600 hover:text-cyan-700 font-medium"
                    >
                      Mulai Pesan Kamar
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
