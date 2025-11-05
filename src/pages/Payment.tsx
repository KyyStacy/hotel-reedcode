import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

interface BookingData {
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
  bookingId: string;
}

const Payment: React.FC = () => {
  const history = useHistory();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    {
      id: 'bca',
      name: 'BCA Virtual Account',
      icon: '🏦',
      type: 'Bank Transfer'
    },
    {
      id: 'mandiri',
      name: 'Mandiri Virtual Account',
      icon: '🏦',
      type: 'Bank Transfer'
    },
    {
      id: 'bni',
      name: 'BNI Virtual Account',
      icon: '🏦',
      type: 'Bank Transfer'
    },
    {
      id: 'gopay',
      name: 'GoPay',
      icon: '💳',
      type: 'E-Wallet'
    },
    {
      id: 'ovo',
      name: 'OVO',
      icon: '💳',
      type: 'E-Wallet'
    },
    {
      id: 'dana',
      name: 'DANA',
      icon: '💳',
      type: 'E-Wallet'
    },
    {
      id: 'qris',
      name: 'QRIS',
      icon: '📱',
      type: 'QR Code'
    }
  ];

  useEffect(() => {
    const data = localStorage.getItem('currentBooking');
    if (data) {
      setBookingData(JSON.parse(data));
    } else {
      history.push('/home');
    }
  }, [history]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handlePayment = () => {
    if (!selectedPayment) {
      alert('Pilih metode pembayaran terlebih dahulu');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const paymentData = {
        ...bookingData,
        paymentMethod: selectedPayment,
        paymentStatus: 'success',
        paymentDate: new Date().toISOString()
      };

      localStorage.setItem('completedBooking', JSON.stringify(paymentData));
      localStorage.removeItem('currentBooking');
      
      setIsProcessing(false);
      history.push('/confirmation');
    }, 2000);
  };

  if (!bookingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-cyan-50 via-white to-teal-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500 to-teal-500 shadow-xl sticky top-0 z-50 backdrop-blur-md animate-fadeInDown">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => history.goBack()}
              className="flex items-center gap-2 text-white hover:text-cyan-100 transition-all transform hover:scale-105 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium">Kembali</span>
            </button>
            
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-2xl">💳</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-white">Reed Hotel</h1>
                <p className="text-xs text-cyan-100">Pembayaran</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center animate-fadeInDown">
          <div className="inline-block w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center mb-4 animate-bounce">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent mb-3">Pembayaran</h1>
          <p className="text-gray-600 text-lg">Pilih metode pembayaran untuk menyelesaikan reservasi Anda</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card p-6 animate-fadeInUp shadow-xl">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Metode Pembayaran</h2>
              
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`w-full p-5 rounded-xl border-2 transition-all duration-300 flex items-center justify-between ${
                      selectedPayment === method.id
                        ? 'border-cyan-500 bg-gradient-to-r from-cyan-50 to-teal-50 shadow-lg shadow-cyan-200/50'
                        : 'border-gray-200 hover:border-cyan-300 bg-white hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{method.icon}</span>
                      <div className="text-left">
                        <p className="font-semibold text-gray-800">{method.name}</p>
                        <p className="text-sm text-gray-500">{method.type}</p>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedPayment === method.id
                        ? 'border-cyan-500 bg-gradient-to-r from-cyan-500 to-teal-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedPayment === method.id && (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Info */}
            <div className="card p-6 bg-gradient-to-br from-cyan-50 to-teal-50 border-2 border-cyan-200 animate-fadeInUp delay-100 shadow-xl">
              <div className="flex gap-3">
                <svg className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                </svg>
                <div>
                  <h3 className="font-semibold text-cyan-900 mb-2">Informasi Pembayaran</h3>
                  <ul className="text-sm text-cyan-800 space-y-1">
                    <li>• Pembayaran harus diselesaikan dalam 24 jam</li>
                    <li>• Setelah pembayaran berhasil, Anda akan menerima barcode konfirmasi</li>
                    <li>• Tunjukkan barcode saat check-in di hotel</li>
                    <li>• Untuk bantuan, hubungi customer service kami</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Ringkasan Pesanan</h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">ID Booking</p>
                  <p className="font-semibold text-gray-800">{bookingData.bookingId}</p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-500 mb-1">Kamar</p>
                  <p className="font-semibold text-gray-800">{bookingData.room.name}</p>
                  <p className="text-sm text-gray-600">{bookingData.room.type}</p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-500 mb-1">Nama Tamu</p>
                  <p className="font-semibold text-gray-800">{bookingData.name}</p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-500 mb-2">Check-in</p>
                  <p className="text-sm text-gray-800">{formatDate(bookingData.checkIn)}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-2">Check-out</p>
                  <p className="text-sm text-gray-800">{formatDate(bookingData.checkOut)}</p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-500 mb-1">Jumlah Tamu</p>
                  <p className="font-semibold text-gray-800">{bookingData.guests} Orang</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-5 rounded-xl space-y-3 mb-6 border border-cyan-100">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Harga per malam</span>
                  <span className="font-semibold">{formatPrice(bookingData.room.price)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Jumlah malam</span>
                  <span className="font-semibold">{bookingData.nights} malam</span>
                </div>
                <div className="border-t border-cyan-200 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-800 text-lg">Total Pembayaran</span>
                    <span className="font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent text-2xl">{formatPrice(bookingData.total)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={!selectedPayment || isProcessing}
                className={`w-full py-4 rounded-lg font-semibold transition-all duration-200 ${
                  !selectedPayment || isProcessing
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'btn-primary'
                }`}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Memproses...
                  </span>
                ) : (
                  'Bayar Sekarang'
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Dengan melanjutkan, Anda menyetujui syarat dan ketentuan kami
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
