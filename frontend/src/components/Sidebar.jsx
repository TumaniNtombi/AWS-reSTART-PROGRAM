import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/agents', label: 'AI Agents' },
  { path: '/farm-data', label: 'Farm Data' }
];

export default function Sidebar() {
  const { pathname } = useLocation();
  const { logout, session } = useAuth();
  const navigate = useNavigate();

  return (
    <aside className="sidebar glass">
      <h1>Climate C3</h1>
      <p className="subtle">{session?.username}</p>
      <nav>
        {navItems.map((item) => (
          <Link key={item.path} to={item.path} className={pathname === item.path ? 'active' : ''}>
            {item.label}
          </Link>
        ))}
      </nav>
      <button
        className="logout-btn"
        onClick={() => {
          logout();
          navigate('/login');
        }}
      >
        Logout
      </button>
    </aside>
  );
}
