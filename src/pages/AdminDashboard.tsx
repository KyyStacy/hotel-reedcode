import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface Booking {
  id: string;
  bookingId: string;
  room: {
    name: string;
    type: string;
    price: number;
  };
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  total: number;
  status: 'pending' | 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled';
  paymentStatus: string;
  createdAt: string;
}

const AdminDashboard: React.FC = () => {
  const history = useHistory();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'rooms' | 'users'>('overview');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    if (!user || (user.role !== 'admin' && user.role !== 'receptionist')) {
      history.push('/login');
      return;
    }

    const storedBookings = JSON.parse(localStorage.getItem('allBookings') || '[]');
    setBookings(storedBookings);
  }, [user, history]);

  if (!user || (user.role !== 'admin' && user.role !== 'receptionist')) {
    return null;
  }

  const stats = {
    totalBookings: bookings.length,
    todayCheckIns: bookings.filter(b => {
      const today = new Date().toDateString();
      return new Date(b.checkIn).toDateString() === today;
    }).length,
    activeGuests: bookings.filter(b => b.status === 'checked-in').length,
    revenue: bookings.reduce((sum, b) => sum + b.total, 0)
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-700',
      confirmed: 'bg-blue-100 text-blue-700',
      'checked-in': 'bg-green-100 text-green-700',
      'checked-out': 'bg-gray-100 text-gray-700',
      cancelled: 'bg-red-100 text-red-700'
    };
    return badges[status as keyof typeof badges] || badges.pending;
  };

  const updateBookingStatus = (bookingId: string, newStatus: string) => {
    const updatedBookings = bookings.map(b =>
      b.bookingId === bookingId ? { ...b, status: newStatus as any } : b
    );
    setBookings(updatedBookings);
    localStorage.setItem('allBookings', JSON.stringify(updatedBookings));
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || booking.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">Dashboard {user.role === 'admin' ? 'Admin' : 'Resepsionis'}</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => history.push('/profile')}
                className="flex items-center gap-2 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">
                  {user.name.charAt(0)}
                </div>
                <span className="hidden sm:block">{user.name}</span>
              </button>
              <button
                onClick={() => {
                  logout();
                  history.push('/home');
                }}
                className="hover:bg-white/10 px-4 py-2 rounded-lg transition-colors"
              >
                Keluar
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 border-t border-white/20 pt-4">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'bg-white text-cyan-600'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
                activeTab === 'bookings'
                  ? 'bg-white text-cyan-600'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Pemesanan
            </button>
            <button
              onClick={() => setActiveTab('rooms')}
              className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
                activeTab === 'rooms'
                  ? 'bg-white text-cyan-600'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Kamar
            </button>
            {user.role === 'admin' && (
              <button
                onClick={() => setActiveTab('users')}
                className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
                  activeTab === 'users'
                    ? 'bg-white text-cyan-600'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                Users
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-1">Total Pemesanan</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalBookings}</p>
              </div>

              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-1">Check-in Hari Ini</p>
                <p className="text-3xl font-bold text-gray-800">{stats.todayCheckIns}</p>
              </div>

              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-1">Tamu Aktif</p>
                <p className="text-3xl font-bold text-gray-800">{stats.activeGuests}</p>
              </div>

              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-1">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-800">{formatPrice(stats.revenue)}</p>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="card p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Pemesanan Terbaru</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Booking ID</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Tamu</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Kamar</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Check-in</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.slice(0, 5).map((booking) => (
                      <tr key={booking.bookingId} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm font-medium text-gray-800">{booking.bookingId}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{booking.name}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{booking.room.name}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {new Date(booking.checkIn).toLocaleDateString('id-ID')}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(booking.status || 'confirmed')}`}>
                            {booking.status || 'Confirmed'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="card p-6">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Cari booking ID, nama, atau email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
                >
                  <option value="all">Semua Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="checked-in">Checked In</option>
                  <option value="checked-out">Checked Out</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="space-y-4">
                {filteredBookings.map((booking) => (
                  <div key={booking.bookingId} className="border-2 border-gray-200 rounded-xl p-6 hover:border-cyan-300 transition-colors">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-bold text-gray-800">{booking.bookingId}</h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(booking.status || 'confirmed')}`}>
                            {booking.status || 'Confirmed'}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-1">{booking.name} • {booking.email}</p>
                        <p className="text-gray-600 mb-1">{booking.room.name} • {booking.nights} malam</p>
                        <p className="text-sm text-gray-500">
                          {new Date(booking.checkIn).toLocaleDateString('id-ID')} - {new Date(booking.checkOut).toLocaleDateString('id-ID')}
                        </p>
                        <p className="text-lg font-bold text-cyan-600 mt-2">{formatPrice(booking.total)}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {booking.status !== 'checked-in' && booking.status !== 'checked-out' && (
                          <button
                            onClick={() => updateBookingStatus(booking.bookingId, 'checked-in')}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                          >
                            Check In
                          </button>
                        )}
                        {booking.status === 'checked-in' && (
                          <button
                            onClick={() => updateBookingStatus(booking.bookingId, 'checked-out')}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                          >
                            Check Out
                          </button>
                        )}
                        {booking.status !== 'cancelled' && booking.status !== 'checked-out' && (
                          <button
                            onClick={() => updateBookingStatus(booking.bookingId, 'cancelled')}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredBookings.length === 0 && (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p className="text-gray-500">Tidak ada pemesanan ditemukan</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Rooms Tab */}
        {activeTab === 'rooms' && (
          <div className="card p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Manajemen Kamar</h3>
            <p className="text-gray-600">Fitur manajemen kamar akan segera hadir...</p>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && user.role === 'admin' && (
          <div className="card p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Manajemen User</h3>
            <p className="text-gray-600">Fitur manajemen user akan segera hadir...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
