export const initializeSampleData = () => {
  // Initialize demo user account
  const existingUsers = localStorage.getItem('users');
  if (!existingUsers || JSON.parse(existingUsers).length === 0) {
    const demoUsers = [
      {
        id: 'user-demo',
        name: 'Demo User',
        email: 'user@test.com',
        password: 'user123',
        phone: '081234567890',
        role: 'user'
      }
    ];
    localStorage.setItem('users', JSON.stringify(demoUsers));
  }

  // Initialize sample bookings
  const existingBookings = localStorage.getItem('allBookings');
  
  if (!existingBookings || JSON.parse(existingBookings).length === 0) {
    const sampleBookings = [
      {
        id: 'booking-1',
        bookingId: 'RH-2024-001',
        room: {
          name: 'Deluxe Ocean View',
          type: 'Double',
          price: 1500000
        },
        name: 'Budi Santoso',
        email: 'budi.santoso@email.com',
        phone: '081234567890',
        checkIn: new Date(2024, 10, 5).toISOString(),
        checkOut: new Date(2024, 10, 7).toISOString(),
        guests: 2,
        nights: 2,
        total: 3000000,
        status: 'confirmed' as const,
        paymentStatus: 'Paid',
        createdAt: new Date(2024, 10, 1).toISOString()
      },
      {
        id: 'booking-2',
        bookingId: 'RH-2024-002',
        room: {
          name: 'Presidential Suite',
          type: 'Presidential',
          price: 5000000
        },
        name: 'Siti Nurhaliza',
        email: 'siti.nur@email.com',
        phone: '082345678901',
        checkIn: new Date(2024, 10, 5).toISOString(),
        checkOut: new Date(2024, 10, 8).toISOString(),
        guests: 4,
        nights: 3,
        total: 15000000,
        status: 'checked-in' as const,
        paymentStatus: 'Paid',
        createdAt: new Date(2024, 10, 2).toISOString()
      },
      {
        id: 'booking-3',
        bookingId: 'RH-2024-003',
        room: {
          name: 'Family Room',
          type: 'Family',
          price: 2000000
        },
        name: 'Ahmad Wijaya',
        email: 'ahmad.w@email.com',
        phone: '083456789012',
        checkIn: new Date(2024, 10, 6).toISOString(),
        checkOut: new Date(2024, 10, 9).toISOString(),
        guests: 4,
        nights: 3,
        total: 6000000,
        status: 'confirmed' as const,
        paymentStatus: 'Paid',
        createdAt: new Date(2024, 10, 3).toISOString()
      },
      {
        id: 'booking-4',
        bookingId: 'RH-2024-004',
        room: {
          name: 'Executive Suite',
          type: 'Suite',
          price: 3000000
        },
        name: 'Dewi Lestari',
        email: 'dewi.lestari@email.com',
        phone: '084567890123',
        checkIn: new Date(2024, 10, 4).toISOString(),
        checkOut: new Date(2024, 10, 6).toISOString(),
        guests: 2,
        nights: 2,
        total: 6000000,
        status: 'checked-out' as const,
        paymentStatus: 'Paid',
        createdAt: new Date(2024, 9, 30).toISOString()
      },
      {
        id: 'booking-5',
        bookingId: 'RH-2024-005',
        room: {
          name: 'Standard Single',
          type: 'Single',
          price: 800000
        },
        name: 'Rudi Hartono',
        email: 'rudi.h@email.com',
        phone: '085678901234',
        checkIn: new Date(2024, 10, 7).toISOString(),
        checkOut: new Date(2024, 10, 9).toISOString(),
        guests: 1,
        nights: 2,
        total: 1600000,
        status: 'pending' as const,
        paymentStatus: 'Pending',
        createdAt: new Date(2024, 10, 4).toISOString()
      },
      {
        id: 'booking-6',
        bookingId: 'RH-2024-006',
        room: {
          name: 'Deluxe Ocean View',
          type: 'Double',
          price: 1500000
        },
        name: 'Lisa Permata',
        email: 'lisa.p@email.com',
        phone: '086789012345',
        checkIn: new Date(2024, 10, 8).toISOString(),
        checkOut: new Date(2024, 10, 11).toISOString(),
        guests: 2,
        nights: 3,
        total: 4500000,
        status: 'confirmed' as const,
        paymentStatus: 'Paid',
        createdAt: new Date(2024, 10, 5).toISOString()
      },
      {
        id: 'booking-7',
        bookingId: 'RH-2024-007',
        room: {
          name: 'Superior Twin',
          type: 'Double',
          price: 1200000
        },
        name: 'Andi Prasetyo',
        email: 'andi.p@email.com',
        phone: '087890123456',
        checkIn: new Date(2024, 10, 5).toISOString(),
        checkOut: new Date(2024, 10, 7).toISOString(),
        guests: 2,
        nights: 2,
        total: 2400000,
        status: 'checked-in' as const,
        paymentStatus: 'Paid',
        createdAt: new Date(2024, 10, 3).toISOString()
      },
      {
        id: 'booking-8',
        bookingId: 'RH-2024-008',
        room: {
          name: 'Executive Suite',
          type: 'Suite',
          price: 3000000
        },
        name: 'Maya Sari',
        email: 'maya.sari@email.com',
        phone: '088901234567',
        checkIn: new Date(2024, 10, 10).toISOString(),
        checkOut: new Date(2024, 10, 13).toISOString(),
        guests: 2,
        nights: 3,
        total: 9000000,
        status: 'confirmed' as const,
        paymentStatus: 'Paid',
        createdAt: new Date(2024, 10, 5).toISOString()
      },
      {
        id: 'booking-9',
        bookingId: 'RH-2024-009',
        room: {
          name: 'Family Room',
          type: 'Family',
          price: 2000000
        },
        name: 'Hendra Kusuma',
        email: 'hendra.k@email.com',
        phone: '089012345678',
        checkIn: new Date(2024, 10, 3).toISOString(),
        checkOut: new Date(2024, 10, 5).toISOString(),
        guests: 4,
        nights: 2,
        total: 4000000,
        status: 'checked-out' as const,
        paymentStatus: 'Paid',
        createdAt: new Date(2024, 9, 28).toISOString()
      },
      {
        id: 'booking-10',
        bookingId: 'RH-2024-010',
        room: {
          name: 'Presidential Suite',
          type: 'Presidential',
          price: 5000000
        },
        name: 'Diana Putri',
        email: 'diana.putri@email.com',
        phone: '081122334455',
        checkIn: new Date(2024, 10, 12).toISOString(),
        checkOut: new Date(2024, 10, 15).toISOString(),
        guests: 3,
        nights: 3,
        total: 15000000,
        status: 'confirmed' as const,
        paymentStatus: 'Paid',
        createdAt: new Date(2024, 10, 5).toISOString()
      }
    ];

    localStorage.setItem('allBookings', JSON.stringify(sampleBookings));
  }
};
