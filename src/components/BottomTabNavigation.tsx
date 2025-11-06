import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const BottomTabNavigation: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const isActive = (tabId: string, path: string) => {
    // Exact match for home
    if (tabId === 'home') {
      return location.pathname === '/home';
    }
    
    // Bookings tab - only active on /bookings
    if (tabId === 'bookings') {
      return location.pathname === '/bookings';
    }
    
    // Profile/Akun tab - active on profile, login, or register
    if (tabId === 'profile') {
      return location.pathname === '/profile' || 
             location.pathname === '/login' || 
             location.pathname === '/register';
    }
    
    return false;
  };

  const tabs = [
    {
      id: 'home',
      label: 'Beranda',
      path: '/home',
      icon: (active: boolean) => (
        <svg 
          className={`w-6 h-6 transition-all duration-200 ease-out ${
            active 
              ? 'text-cyan-600 scale-110' 
              : 'text-gray-500 group-hover:text-cyan-600 group-hover:scale-110'
          }`} 
          fill={active ? 'currentColor' : 'none'} 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          strokeWidth={active ? 0 : 2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {active ? (
            <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
          ) : null}
          <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
        </svg>
      )
    },
    {
      id: 'bookings',
      label: 'Riwayat',
      path: isAuthenticated ? '/bookings' : '/login',
      icon: (active: boolean) => (
        <svg 
          className={`w-6 h-6 transition-all duration-200 ease-out ${
            active 
              ? 'text-cyan-600 scale-110' 
              : 'text-gray-500 group-hover:text-cyan-600 group-hover:scale-110'
          }`} 
          fill={active ? 'currentColor' : 'none'} 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          strokeWidth={active ? 0 : 2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    },
    {
      id: 'profile',
      label: isAuthenticated ? 'Profile' : 'Akun',
      path: isAuthenticated ? '/profile' : '/login',
      icon: (active: boolean) => (
        <svg 
          className={`w-6 h-6 transition-all duration-200 ease-out ${
            active 
              ? 'text-cyan-600 scale-110' 
              : 'text-gray-500 group-hover:text-cyan-600 group-hover:scale-110'
          }`} 
          fill={active ? 'currentColor' : 'none'} 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          strokeWidth={active ? 0 : 2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      )
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-2xl z-50">
      {/* Safe area for devices with home indicator */}
      <div className="h-safe"></div>
      
      <div className="flex justify-around items-center h-20 max-w-md mx-auto px-2">
        {tabs.map((tab) => {
          const active = isActive(tab.id, tab.path);
          
          return (
            <button
              key={tab.id}
              onClick={() => history.push(tab.path)}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-300 relative group ${
                active ? '' : 'active:scale-95'
              }`}
            >
              {/* Active indicator - top bar */}
              {active && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-linear-to-r from-cyan-500 to-teal-500 rounded-b-full animate-fadeIn" />
              )}
              
              {/* Icon container - fokus pada icon hover */}
              <div className="relative mb-1.5 flex items-center justify-center">
                {/* Icon dengan hover effect yang presisi */}
                <div className="relative transition-all duration-200 ease-out">
                  {tab.icon(active)}
                </div>
              </div>
              
              {/* Label */}
              <span className={`text-[11px] font-medium transition-all duration-200 ease-out ${
                active 
                  ? 'text-cyan-600' 
                  : 'text-gray-500 group-hover:text-gray-600'
              }`}>
                {tab.label}
              </span>
              
              {/* Ripple effect on tap */}
              <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                <div className={`absolute inset-0 bg-cyan-500/10 scale-0 group-active:scale-100 transition-transform duration-200 ease-out rounded-full`} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomTabNavigation;
