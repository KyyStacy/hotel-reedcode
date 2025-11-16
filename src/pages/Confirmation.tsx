import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Barcode from 'react-barcode';
import { usePlatform } from '../hooks/usePlatform';

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
  paymentMethod: string;
  paymentStatus: string;
  paymentDate: string;
}

const Confirmation: React.FC = () => {
  const history = useHistory();
  const { isNative, isMobile } = usePlatform();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const data = localStorage.getItem('completedBooking');
    if (data) {
      setBookingData(JSON.parse(data));
      setShowSuccess(true);
    } else {
      history.push('/home');
    }
  }, [history]);

  // Scroll to top saat bookingData tersedia
  useEffect(() => {
    if (bookingData) {
      // Scroll to top dengan delay kecil untuk memastikan DOM sudah render
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  }, [bookingData]);

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

  const handleDownloadTicket = () => {
    alert('Fitur download akan tersedia segera. Silakan screenshot halaman ini untuk sementara.');
  };

  const handleNewBooking = () => {
    localStorage.removeItem('completedBooking');
    history.push('/home');
  };

  if (!bookingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-8 ${isNative || isMobile ? 'pt-16' : ''}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Animation */}
        {showSuccess && (
          <div className="mb-8 text-center animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-full mb-4 animate-bounce shadow-lg shadow-cyan-200/50">
              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-linear-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent mb-2 flex items-center justify-center flex-wrap gap-1 sm:gap-2">
                <span>🎉</span>
                <span>Pembayaran Berhasil!</span>
                <span>🎉</span>
              </h1>
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg">Reservasi Anda telah dikonfirmasi</p>
            </div>
          </div>
        )}

        {/* Booking Ticket */}
        <div ref={ticketRef} className="card overflow-hidden mb-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-500 via-primary-600 to-teal-600 text-white p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-3xl font-bold mb-1 drop-shadow-lg">✨ Reed Hotel</h2>
                <p className="text-cyan-100">E-Ticket Reservasi</p>
              </div>
              <div className="bg-white/30 backdrop-blur-md px-5 py-3 rounded-xl border border-white/40 shadow-lg">
                <p className="text-xs text-cyan-100 font-medium">Booking ID</p>
                <p className="font-bold text-lg">{bookingData.bookingId}</p>
              </div>
            </div>
          </div>

          {/* Barcode Section */}
          <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-10 border-b-2 border-dashed border-cyan-300">
            <div className="flex flex-col items-center">
              <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-cyan-200 mb-4">
                <Barcode 
                  value={bookingData.bookingId}
                  width={2}
                  height={80}
                  displayValue={true}
                  fontSize={14}
                />
              </div>
              <p className="text-sm text-gray-600 text-center max-w-md">
                Tunjukkan barcode ini saat check-in di hotel untuk mendapatkan kartu akses kamar Anda
              </p>
            </div>
          </div>

          {/* Booking Details */}
          <div className="p-8 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Detail Tamu</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Nama Lengkap</p>
                    <p className="font-semibold text-gray-800">{bookingData.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Email</p>
                    <p className="text-gray-700">{bookingData.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Nomor Telepon</p>
                    <p className="text-gray-700">{bookingData.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Jumlah Tamu</p>
                    <p className="text-gray-700">{bookingData.guests} Orang</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Detail Kamar</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Tipe Kamar</p>
                    <p className="font-semibold text-gray-800">{bookingData.room.name}</p>
                    <p className="text-sm text-gray-600">{bookingData.room.type}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Check-in</p>
                    <p className="text-gray-700">{formatDate(bookingData.checkIn)}</p>
                    <p className="text-xs text-gray-500">Pukul 14:00 WIB</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Check-out</p>
                    <p className="text-gray-700">{formatDate(bookingData.checkOut)}</p>
                    <p className="text-xs text-gray-500">Pukul 12:00 WIB</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Durasi Menginap</p>
                    <p className="text-gray-700">{bookingData.nights} Malam</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="border-t border-gray-300 pt-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Ringkasan Pembayaran</h3>
              <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-5 rounded-xl space-y-3 border border-cyan-100">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Harga per malam</span>
                  <span className="font-semibold">{formatPrice(bookingData.room.price)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Jumlah malam</span>
                  <span className="font-semibold">{bookingData.nights} malam</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Metode Pembayaran</span>
                  <span className="font-semibold uppercase">{bookingData.paymentMethod}</span>
                </div>
                <div className="border-t border-cyan-200 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-800 text-lg">Total Dibayar</span>
                    <span className="font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent text-2xl">{formatPrice(bookingData.total)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-cyan-600 text-sm pt-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span className="font-semibold">Pembayaran Berhasil</span>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border-t-2 border-amber-200 p-6">
            <div className="flex gap-3">
              <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
              </svg>
              <div>
                <h4 className="font-bold text-amber-900 mb-2">Informasi Penting</h4>
                <ul className="text-sm text-amber-800 space-y-1">
                  <li>• Simpan e-ticket ini dengan baik</li>
                  <li>• Tunjukkan barcode saat check-in untuk mendapatkan kartu akses kamar</li>
                  <li>• Kartu akses akan digunakan untuk membuka pintu kamar Anda</li>
                  <li>• Bawa identitas resmi (KTP/SIM/Paspor) saat check-in</li>
                  <li>• Check-in dimulai pukul 14:00 WIB</li>
                  <li>• Check-out paling lambat pukul 12:00 WIB</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleDownloadTicket}
            className="flex-1 btn-primary flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            Download E-Ticket
          </button>
          <button
            onClick={handleNewBooking}
            className="flex-1 btn-secondary flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            Kembali ke Beranda
          </button>
        </div>

        {/* Contact Support */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-2">Butuh bantuan?</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a href="mailto:support@reedcode.id" className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
              support@reedcode.id
            </a>
            <a href="https://wa.me/6285171713355" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              +62 851-7171-3355
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
