import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { session, loading } = useAuth();
  if (loading) return <div className="center-screen">Loading secure session...</div>;
  if (!session?.token) return <Navigate to="/login" replace />;
  return children;
}
