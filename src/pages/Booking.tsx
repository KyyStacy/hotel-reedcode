import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

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
  const room = rooms.find(r => r.id === parseInt(id));

  const [selectedImage, setSelectedImage] = useState(0);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    checkIn: '',
    checkOut: '',
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

  const calculateNights = () => {
    if (formData.checkIn && formData.checkOut) {
      const checkIn = new Date(formData.checkIn);
      const checkOut = new Date(formData.checkOut);
      const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    return room.price * nights;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.checkIn || !formData.checkOut) {
      alert('Mohon lengkapi semua data');
      return;
    }

    if (new Date(formData.checkOut) <= new Date(formData.checkIn)) {
      alert('Tanggal check-out harus setelah check-in');
      return;
    }

    const bookingData = {
      room,
      ...formData,
      nights: calculateNights(),
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
                <span className="text-2xl">🏨</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-white">Reed Hotel</h1>
                <p className="text-xs text-cyan-100">Detail Kamar</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Room Details */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Image Gallery */}
            <div className="card overflow-hidden animate-fadeInUp shadow-xl">
              <div className="relative h-96">
                <img
                  src={room.images[selectedImage]}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 sm:p-4 grid grid-cols-3 gap-2 sm:gap-4">
                {room.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-16 sm:h-20 md:h-24 rounded-lg overflow-hidden ${
                      selectedImage === index ? 'ring-2 sm:ring-4 ring-primary-500' : ''
                    }`}
                  >
                    <img src={img} alt={`${room.name} ${index + 1}`} className="w-full h-full object-cover" />
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
                    Check-out
                  </label>
                  <input
                    type="date"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleInputChange}
                    min={formData.checkIn || getTodayDate()}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    required
                  />
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

                {calculateNights() > 0 && (
                  <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-5 rounded-xl space-y-2 border border-cyan-100">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Harga per malam</span>
                      <span className="font-semibold">{formatPrice(room.price)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Jumlah malam</span>
                      <span className="font-semibold">{calculateNights()} malam</span>
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
    </div>
  );
};

export default Booking;
