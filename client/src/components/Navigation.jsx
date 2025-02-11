import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Student Grievance System
        </Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              {user.role === 'user' && (
                <>
                  <Link to="/complaints" className="hover:text-gray-300">
                    My Complaints
                  </Link>
                  <Link to="/complaints/new" className="hover:text-gray-300">
                    New Complaint
                  </Link>
                </>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300">
                Student Login
              </Link>
              <Link to="/admin/login" className="hover:text-gray-300">
                Admin Login
              </Link>
              <Link to="/register" className="hover:text-gray-300">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 