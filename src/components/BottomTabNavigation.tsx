import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const BottomTabNavigation: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const tabs = [
    {
      id: 'home',
      label: 'Beranda',
      path: '/home',
      icon: (active: boolean) => (
        <svg className={`w-7 h-7 ${active ? 'text-cyan-600' : 'text-gray-400'}`} fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 0 : 2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      id: 'bookings',
      label: 'Riwayat',
      path: isAuthenticated ? '/bookings' : '/login',
      icon: (active: boolean) => (
        <svg className={`w-7 h-7 ${active ? 'text-cyan-600' : 'text-gray-400'}`} fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 0 : 2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      id: 'profile',
      label: isAuthenticated ? 'Profile' : 'Akun',
      path: isAuthenticated ? '/profile' : '/login',
      icon: (active: boolean) => (
        <svg className={`w-7 h-7 ${active ? 'text-cyan-600' : 'text-gray-400'}`} fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 0 : 2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50 pb-safe">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {tabs.map((tab) => {
          const active = isActive(tab.path) || 
                        (tab.id === 'profile' && (location.pathname === '/profile' || location.pathname === '/login' || location.pathname === '/register')) ||
                        (tab.id === 'bookings' && location.pathname === '/bookings');
          
          return (
            <button
              key={tab.id}
              onClick={() => history.push(tab.path)}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-300 relative ${
                active ? 'transform scale-110' : 'hover:scale-105'
              }`}
            >
              {active && (
                <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-b-full" />
              )}
              
              <div className={`transition-all duration-300 ${active ? 'mb-1.5 -mt-1' : 'mb-1'}`}>
                {tab.icon(active)}
              </div>
              
              <span className={`text-xs font-semibold transition-all duration-300 ${
                active ? 'text-cyan-600 scale-105' : 'text-gray-500'
              }`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomTabNavigation;
