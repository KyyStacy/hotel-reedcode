import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AdminDashboard from './AdminDashboard';

const ReceptionistDashboard: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();

  if (!user || user.role !== 'receptionist') {
    history.push('/login');
    return null;
  }

  return <AdminDashboard />;
};

export default ReceptionistDashboard;
