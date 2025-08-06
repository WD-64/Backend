import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { Navigate, Outlet } from 'react-router';

const ProtectedLayout = () => {
  const { user } = useContext(AuthContext);

  return user ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedLayout;
