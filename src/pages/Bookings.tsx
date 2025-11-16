import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { usePlatform } from '../hooks/usePlatform';
import BottomTabNavigation from '../components/BottomTabNavigation';

const Bookings: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();
  const { isNative, isMobile } = usePlatform();

  if (!user) {
    history.push('/login');
    return null;
  }

  const bookingHistory = JSON.parse(localStorage.getItem('userBookings') || '[]')
    .filter((booking: any) => booking.userId === user.id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className={`min-h-screen overflow-x-hidden bg-gradient-to-br from-cyan-50 via-white to-teal-50 ${isNative || isMobile ? 'pb-20 pt-0' : ''}`}>
      {/* Header - Web */}
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">Riwayat Pemesanan</h1>
                  <p className="text-sm text-gray-500">Lihat semua pemesanan kamar Anda</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header - Mobile */}
      {(isNative || isMobile) && (
        <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50 animate-fadeInDown">
          {/* Safe area + Header content */}
          <div className="pt-16 px-4 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-lg font-bold text-gray-800">Riwayat Pemesanan</h1>
                <p className="text-xs text-gray-500 truncate">Lihat semua pemesanan Anda</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={`max-w-7xl mx-auto ${isNative || isMobile ? 'px-4 py-4' : 'px-4 sm:px-6 lg:px-8 py-8'}`}>
        {/* Page Title - Desktop Only */}
        {!isNative && !isMobile && (
          <div className="mb-6 animate-fadeInDown">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Semua Pemesanan</h2>
            <p className="text-gray-600">Kelola dan lihat detail pemesanan Anda</p>
          </div>
        )}

        {bookingHistory.length === 0 ? (
          <div className={`card ${isNative || isMobile ? 'p-8' : 'p-12'} text-center animate-fadeInUp`}>
            <div className={`${isNative || isMobile ? 'w-20 h-20' : 'w-24 h-24'} bg-gradient-to-br from-cyan-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6`}>
              <svg className={`${isNative || isMobile ? 'w-10 h-10' : 'w-12 h-12'} text-cyan-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className={`${isNative || isMobile ? 'text-lg' : 'text-xl'} font-bold text-gray-800 mb-2`}>Belum Ada Pemesanan</h3>
            <p className={`text-gray-600 mb-6 ${isNative || isMobile ? 'text-sm' : ''}`}>Anda belum memiliki riwayat pemesanan</p>
            <button
              onClick={() => history.push('/home')}
              className={`btn-primary ${isNative || isMobile ? 'w-full' : 'inline-block'}`}
            >
              Mulai Pesan Kamar
            </button>
          </div>
        ) : (
          <div className={`space-y-${isNative || isMobile ? '3' : '4'}`}>
            {bookingHistory.map((booking: any, index: number) => (
              <div key={index} className={`card ${isNative || isMobile ? 'p-4' : 'p-6'} hover:shadow-xl transition-all duration-300 animate-fadeInUp border-2 border-gray-100 hover:border-cyan-200`}>
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Room Image */}
                  <div className={`w-full sm:w-48 ${isNative || isMobile ? 'h-40' : 'h-32'} rounded-xl overflow-hidden flex-shrink-0`}>
                    <img
                      src={booking.room.image}
                      alt={booking.room.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Booking Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1 min-w-0 pr-2">
                        <h3 className={`${isNative || isMobile ? 'text-lg' : 'text-xl'} font-bold text-gray-800 mb-1 truncate`}>{booking.room.name}</h3>
                        <p className={`${isNative || isMobile ? 'text-xs' : 'text-sm'} text-gray-600 truncate`}>{booking.bookingId}</p>
                      </div>
                      <span className={`px-3 py-1 bg-green-100 text-green-700 rounded-full ${isNative || isMobile ? 'text-xs' : 'text-sm'} font-semibold flex-shrink-0`}>
                        Selesai
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Check-in</p>
                        <p className={`${isNative || isMobile ? 'text-sm' : 'text-base'} font-semibold text-gray-800`}>
                          {new Date(booking.checkIn).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: isNative || isMobile ? undefined : 'numeric'
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Check-out</p>
                        <p className={`${isNative || isMobile ? 'text-sm' : 'text-base'} font-semibold text-gray-800`}>
                          {new Date(booking.checkOut).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: isNative || isMobile ? undefined : 'numeric'
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Tamu</p>
                        <p className={`${isNative || isMobile ? 'text-sm' : 'text-base'} font-semibold text-gray-800`}>{booking.guests} orang</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Total Bayar</p>
                        <p className={`${isNative || isMobile ? 'text-sm' : 'text-base'} font-bold text-cyan-600`}>{formatPrice(booking.total)}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => history.push(`/booking/${booking.room.id}`)}
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-teal-600 transition-all"
                      >
                        Pesan Lagi
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Tab Navigation - Only on Mobile/Native */}
      {(isNative || isMobile) && <BottomTabNavigation />}
    </div>
  );
};

export default Bookings;
