import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
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
  images: string[];
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
    description: 'Kamar nyaman dengan pemandangan kota yang menakjubkan',
    images: [
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80'
    ]
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
    description: 'Suite mewah dengan ruang tamu terpisah dan balkon pribadi',
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80'
    ]
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
    description: 'Kamar luas sempurna untuk keluarga dengan 2 tempat tidur',
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80'
    ]
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
    description: 'Suite presidential dengan fasilitas premium dan pemandangan panorama',
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80'
    ]
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
    description: 'Kamar standar yang nyaman dengan fasilitas lengkap',
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80'
    ]
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
    description: 'Kamar superior dengan desain modern dan fasilitas premium',
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80'
    ]
  }
];

const Booking: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, user } = useAuth();
  const { isNative, isMobile } = usePlatform();
  const room = rooms.find(r => r.id === parseInt(id));

  const [selectedImage, setSelectedImage] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    checkIn: '',
    nights: 1,
    guests: 1
  });

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem('redirectAfterLogin', `/booking/${id}`);
      history.push('/login');
    }
  }, [isAuthenticated, history, id]);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name,
        email: user.email,
        phone: user.phone || ''
      }));
    }
  }, [user]);

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Kamar tidak ditemukan</h2>
          <button
            onClick={() => history.push('/home')}
            className="btn-primary"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const calculateCheckOut = () => {
    if (formData.checkIn && formData.nights > 0) {
      const checkIn = new Date(formData.checkIn);
      checkIn.setDate(checkIn.getDate() + formData.nights);
      return checkIn.toISOString().split('T')[0];
    }
    return '';
  };

  const calculateTotal = () => {
    return room.price * formData.nights;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.checkIn || formData.nights < 1) {
      alert('Mohon lengkapi semua data');
      return;
    }

    const checkOut = calculateCheckOut();

    const bookingData = {
      room,
      ...formData,
      checkOut,
      total: calculateTotal(),
      bookingId: `BK${Date.now()}`
    };

    localStorage.setItem('currentBooking', JSON.stringify(bookingData));
    history.push('/payment');
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 via-white to-cyan-50 ${isNative || isMobile ? 'pb-20 pt-0' : ''}`}>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">Pemesanan Kamar</h1>
                  <p className="text-sm text-gray-500">Lengkapi data pemesanan Anda</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header - Mobile */}
      {(isNative || isMobile) && (
        <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50 animate-fadeInDown">
          <div className="pt-16 px-4 pb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => history.push('/home')}
                className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-all active:scale-95"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex-1 min-w-0">
                <h1 className="text-lg font-bold text-gray-800">Pemesanan Kamar</h1>
                <p className="text-xs text-gray-500 truncate">{room.name}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Room Details */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl overflow-hidden animate-fadeInUp shadow-xl border-2 border-gray-100">
              <div className={`relative ${isNative || isMobile ? 'h-64' : 'h-96'} group cursor-pointer`} onClick={() => setShowImageModal(true)}>
                <img
                  src={room.images[selectedImage]}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                    <div className="flex items-center gap-2 text-gray-800">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                      <span className="font-semibold text-sm">Lihat Gambar</span>
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                  <span className="text-sm font-semibold text-gray-800">{selectedImage + 1} / {room.images.length}</span>
                </div>
              </div>
              <div className={`${isNative || isMobile ? 'p-3' : 'p-4'} grid grid-cols-3 gap-2 sm:gap-3 bg-gray-50`}>
                {room.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative ${isNative || isMobile ? 'h-16' : 'h-20 md:h-24'} rounded-xl overflow-hidden transition-all duration-300 ${
                      selectedImage === index 
                        ? 'ring-4 ring-cyan-500 scale-105' 
                        : 'ring-2 ring-gray-200 hover:ring-cyan-300 hover:scale-105'
                    }`}
                  >
                    <img src={img} alt={`${room.name} ${index + 1}`} className="w-full h-full object-cover" />
                    {selectedImage === index && (
                      <div className="absolute inset-0 bg-cyan-500/20"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Room Info */}
            <div className="card p-4 sm:p-5 lg:p-6 animate-fadeInUp delay-100 shadow-xl">
              <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-3 sm:gap-0">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{room.name}</h1>
                  <span className="inline-block bg-primary-100 text-primary-700 px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold">
                    {room.type}
                  </span>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">{formatPrice(room.price)}</p>
                  <p className="text-sm text-gray-500">per malam</p>
                </div>
              </div>

              <p className="text-gray-600 mb-6">{room.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
                <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl border border-cyan-100">
                  <svg className="w-6 h-6 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                  </svg>
                  <div>
                    <p className="text-sm text-cyan-600 font-medium">Kapasitas</p>
                    <p className="font-semibold text-gray-800">{room.capacity} Tamu</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl border border-cyan-100">
                  <svg className="w-6 h-6 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd"/>
                  </svg>
                  <div>
                    <p className="text-sm text-cyan-600 font-medium">Ukuran</p>
                    <p className="font-semibold text-gray-800">{room.size} m²</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Fasilitas Kamar</h3>
                <div className="grid grid-cols-2 gap-3">
                  {room.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-1">
            <div className="card p-4 sm:p-5 lg:p-6 lg:sticky lg:top-24 animate-fadeInUp delay-200 shadow-xl border-2 border-cyan-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">Detail Pemesanan</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    placeholder="Masukkan nama lengkap"
                    required
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
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    placeholder="email@example.com"
                    required
                  />
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    placeholder="08xxxxxxxxxx"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-in
                  </label>
                  <input
                    type="date"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleInputChange}
                    min={getTodayDate()}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jumlah Malam
                  </label>
                  <input
                    type="number"
                    name="nights"
                    value={formData.nights}
                    onChange={handleInputChange}
                    min="1"
                    max="30"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                  {formData.checkIn && formData.nights > 0 && (
                    <p className="mt-2 text-sm text-gray-600">
                      Check-out: <span className="font-semibold text-cyan-600">{new Date(calculateCheckOut()).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jumlah Tamu
                  </label>
                  <input
                    type="number"
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    min="1"
                    max={room.capacity}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>

                {formData.nights > 0 && formData.checkIn && (
                  <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-5 rounded-xl space-y-2 border border-cyan-100">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Harga per malam</span>
                      <span className="font-semibold">{formatPrice(room.price)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Jumlah malam</span>
                      <span className="font-semibold">{formData.nights} malam</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Check-out</span>
                      <span className="font-semibold">{new Date(calculateCheckOut()).toLocaleDateString('id-ID')}</span>
                    </div>
                    <div className="border-t border-cyan-200 pt-3 mt-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-800 text-lg">Total</span>
                        <span className="font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent text-2xl">{formatPrice(calculateTotal())}</span>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full btn-primary"
                >
                  Lanjut ke Pembayaran
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={() => setShowImageModal(false)}>
          <button
            onClick={() => setShowImageModal(false)}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center transition-all z-10"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={room.images[selectedImage]}
              alt={room.name}
              className="w-full h-auto max-h-[85vh] object-contain rounded-2xl"
            />
            
            {/* Navigation Arrows */}
            {room.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage((prev) => (prev === 0 ? room.images.length - 1 : prev - 1));
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage((prev) => (prev === room.images.length - 1 ? 0 : prev + 1));
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
            
            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full">
              <span className="text-white font-semibold">{selectedImage + 1} / {room.images.length}</span>
            </div>
            
            {/* Thumbnail Navigation */}
            <div className="mt-4 flex gap-2 justify-center">
              {room.images.map((img, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(index);
                  }}
                  className={`w-16 h-16 rounded-lg overflow-hidden transition-all ${
                    selectedImage === index ? 'ring-4 ring-white scale-110' : 'ring-2 ring-white/30 hover:ring-white/60'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Tab Navigation - Only on Mobile/Native */}
      {(isNative || isMobile) && <BottomTabNavigation />}
    </div>
  );
};

export default Booking;
