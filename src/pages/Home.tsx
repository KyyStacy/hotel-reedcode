import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { usePlatform } from '../hooks/usePlatform';
import BottomTabNavigation from '../components/BottomTabNavigation';

interface Room {
  id: number;
  name: string;
  type: string;
  price: number;
  image: string;
  capacity: number;
  size: number;
  amenities: string[];
  description: string;
}

const rooms: Room[] = [
  {
    id: 1,
    name: 'Deluxe Room',
    type: 'Single',
    price: 850000,
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
    capacity: 2,
    size: 32,
    amenities: ['WiFi Gratis', 'TV LED 43"', 'AC', 'Kamar Mandi Pribadi', 'Mini Bar'],
    description: 'Kamar nyaman dengan pemandangan kota yang menakjubkan'
  },
  {
    id: 2,
    name: 'Executive Suite',
    type: 'Suite',
    price: 1500000,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
    capacity: 3,
    size: 48,
    amenities: ['WiFi Gratis', 'TV LED 55"', 'AC', 'Kamar Mandi Pribadi', 'Mini Bar', 'Ruang Tamu', 'Balkon'],
    description: 'Suite mewah dengan ruang tamu terpisah dan balkon pribadi'
  },
  {
    id: 3,
    name: 'Family Room',
    type: 'Family',
    price: 1200000,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
    capacity: 4,
    size: 42,
    amenities: ['WiFi Gratis', 'TV LED 50"', 'AC', '2 Kamar Mandi', 'Mini Bar', 'Sofa Bed'],
    description: 'Kamar luas sempurna untuk keluarga dengan 2 tempat tidur'
  },
  {
    id: 4,
    name: 'Presidential Suite',
    type: 'Presidential',
    price: 3500000,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    capacity: 4,
    size: 85,
    amenities: ['WiFi Gratis', 'TV LED 65"', 'AC', '2 Kamar Mandi', 'Mini Bar', 'Ruang Makan', 'Dapur Kecil', 'Jacuzzi'],
    description: 'Suite presidential dengan fasilitas premium dan pemandangan panorama'
  },
  {
    id: 5,
    name: 'Standard Room',
    type: 'Single',
    price: 550000,
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80',
    capacity: 2,
    size: 24,
    amenities: ['WiFi Gratis', 'TV LED 32"', 'AC', 'Kamar Mandi Pribadi'],
    description: 'Kamar standar yang nyaman dengan fasilitas lengkap'
  },
  {
    id: 6,
    name: 'Superior Room',
    type: 'Double',
    price: 950000,
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80',
    capacity: 2,
    size: 36,
    amenities: ['WiFi Gratis', 'TV LED 43"', 'AC', 'Kamar Mandi Pribadi', 'Mini Bar', 'Coffee Maker'],
    description: 'Kamar superior dengan desain modern dan fasilitas premium'
  }
];

const Home: React.FC = () => {
  const history = useHistory();
  const { user, isAuthenticated } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const filters = ['All', 'Single', 'Double', 'Suite', 'Family', 'Presidential'];

  const { isNative, isMobile } = usePlatform();
  
  const filteredRooms = selectedFilter === 'All' 
    ? rooms 
    : rooms.filter(room => room.type === selectedFilter);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleBookRoom = (roomId: number) => {
    history.push(`/booking/${roomId}`);
  };

  return (
    <div className={`min-h-screen overflow-x-hidden ${isNative || isMobile ? 'pb-20' : ''}`}>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-cyan-500 via-primary-600 to-teal-600 text-white overflow-hidden">
        {/* Animated Background Layers */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNk0wIDIwYzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNiIvPjwvZz48L2c+PC9zdmc+')] opacity-30 animate-fadeIn"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400 rounded-full filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-400 rounded-full filter blur-3xl opacity-20 animate-float delay-200"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl opacity-10 animate-float delay-400"></div>
        
        {/* User Menu - Hidden on Mobile/Native */}
        {!isNative && !isMobile && (
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-end">
              {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 hover:bg-white/30 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl animate-fadeInDown"
                >
                  <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:block">{user.name}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl py-2 z-50 animate-scaleIn border border-gray-100">
                    <button
                      onClick={() => {
                        history.push('/profile');
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile
                    </button>
                    {user.role === 'user' && (
                      <button
                        onClick={() => {
                          history.push('/bookings');
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                        Riwayat Pemesanan
                      </button>
                    )}
                    {user.role === 'admin' && (
                      <button
                        onClick={() => {
                          history.push('/admin/dashboard');
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Dashboard
                      </button>
                    )}
                    {user.role === 'receptionist' && (
                      <button
                        onClick={() => {
                          history.push('/receptionist/dashboard');
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Dashboard
                      </button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-2 sm:gap-4 animate-fadeInDown delay-100">
                <Link
                  to="/login"
                  className="px-4 sm:px-6 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 hover:bg-white/30 transition-all text-sm sm:text-base transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Masuk
                </Link>
                <Link
                  to="/register"
                  className="px-4 sm:px-6 py-2 bg-white rounded-full hover:bg-gray-100 transition-all text-cyan-600 font-semibold text-sm sm:text-base transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Daftar
                </Link>
              </div>
            )}
            </div>
          </div>
        )}
        
        <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center ${isNative || isMobile ? 'py-6' : 'py-12 sm:py-16 lg:py-20'}`}>
          {/* Mobile Header */}
          {(isNative || isMobile) ? (
            <>
              <div className="flex items-center justify-center gap-3 mb-4 animate-fadeInDown">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                  <span className="text-3xl">🏨</span>
                </div>
                <h1 className="text-2xl font-bold">Reed Hotel</h1>
              </div>
              <p className="text-sm text-cyan-50 mb-4 animate-fadeInUp">
                Pengalaman Menginap Terbaik di Batam
              </p>
            </>
          ) : (
            /* Desktop Header */
            <>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-2 animate-fadeInUp">
                Selamat Datang di <span className="text-yellow-300 inline-block animate-bounce">Reed Hotel</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-cyan-50 max-w-3xl mx-auto px-4 animate-fadeInUp delay-200">
                Pengalaman Menginap yang Tak Terlupakan di Bengkong, Batam
              </p>
            </>
          )}
          {/* Feature Badges - Hidden on Mobile */}
          {!isNative && !isMobile && (
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 text-xs sm:text-sm md:text-base px-2 animate-fadeInUp delay-300">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 sm:px-5 py-2 sm:py-3 rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105 cursor-pointer">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
              </svg>
              <span>WiFi Gratis</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 sm:px-5 py-2 sm:py-3 rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105 cursor-pointer">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd"/>
              </svg>
              <span>Check-in 24 Jam</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 sm:px-5 py-2 sm:py-3 rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105 cursor-pointer">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
              </svg>
              <span>Layanan Concierge</span>
            </div>
            </div>
          )}
        </div>
      </div>

      {/* Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent px-4 animate-fadeInDown">
          Pilih Kamar Impian Anda
        </h2>
        <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center px-2 animate-fadeInUp delay-200">
          {filters.map((filter, index) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 ${
                selectedFilter === filter
                  ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg shadow-cyan-500/50 scale-105 sm:scale-110'
                  : 'bg-white text-gray-700 hover:bg-cyan-50 hover:text-cyan-700 shadow-md hover:shadow-lg border-2 border-transparent hover:border-cyan-200'
              }`}
              style={{ animationDelay: `${300 + index * 50}ms` }}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredRooms.map((room, index) => (
            <div
              key={room.id}
              className={`card overflow-hidden group cursor-pointer animate-fadeInUp delay-${Math.min(index * 100, 500)}`}
              onClick={() => handleBookRoom(room.id)}
            >
              <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-500 to-teal-500 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                  <span className="text-white font-bold text-sm">{room.type}</span>
                </div>
              </div>
              
              <div className="p-4 sm:p-5 lg:p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">{room.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{room.description}</p>
                
                <div className="flex items-center gap-3 sm:gap-4 mb-4 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                    </svg>
                    <span>{room.capacity} Tamu</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd"/>
                    </svg>
                    <span>{room.size} m²</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                  {room.amenities.slice(0, 3).map((amenity, index) => (
                    <span
                      key={index}
                      className="text-xs sm:text-xs bg-gradient-to-r from-cyan-50 to-teal-50 text-cyan-700 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-cyan-200 font-medium"
                    >
                      {amenity}
                    </span>
                  ))}
                  {room.amenities.length > 3 && (
                    <span className="text-xs sm:text-xs bg-gradient-to-r from-cyan-50 to-teal-50 text-cyan-700 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-cyan-200 font-medium">
                      +{room.amenities.length - 3} lainnya
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Mulai dari</p>
                    <p className="text-xl sm:text-2xl font-bold text-primary-600">{formatPrice(room.price)}</p>
                    <p className="text-xs text-gray-500">per malam</p>
                  </div>
                  <button className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-bold transition-all duration-300 shadow-lg shadow-cyan-500/50 hover:shadow-xl hover:shadow-cyan-600/50 hover:scale-105 whitespace-nowrap">
                    Pesan
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer - Hidden on Mobile/Native */}
      {!isNative && !isMobile && (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-cyan-900 text-white py-12 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Reed Hotel</h3>
              <p className="text-gray-400">
                Pengalaman menginap terbaik dengan fasilitas premium dan pelayanan berkelas dunia.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Kontak</h3>
              <p className="text-gray-400">Email: support@reedcode.id</p>
              <p className="text-gray-400">WhatsApp: +62 851-7171-3355</p>
              <p className="text-gray-400">Alamat: Bengkong, Batam</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Jam Operasional</h3>
              <p className="text-gray-400">Check-in: 14:00</p>
              <p className="text-gray-400">Check-out: 12:00</p>
              <p className="text-gray-400">Resepsionis: 24 Jam</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Reed Hotel. All rights reserved.</p>
          </div>
          </div>
        </footer>
      )}
      
      {/* Bottom Tab Navigation - Only on Mobile/Native */}
      {(isNative || isMobile) && <BottomTabNavigation />}
    </div>
  );
};

export default Home;
