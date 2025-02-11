import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Register from './components/Register';
import ComplaintForm from './components/ComplaintForm';
import ComplaintList from './components/ComplaintList';
import AdminLogin from './components/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Admin routes */}
          <Route path="/admin">
            <Route index element={<Navigate to="/admin/login" replace />} />
            <Route path="login" element={<AdminLogin />} />
            <Route element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
            </Route>
          </Route>

          {/* User routes */}
          <Route path="/" element={<Navigation />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route index element={
              <ProtectedRoute>
                <ComplaintList />
              </ProtectedRoute>
            } />
            <Route path="complaints" element={
              <ProtectedRoute>
                <ComplaintList />
              </ProtectedRoute>
            } />
            <Route path="complaints/new" element={
              <ProtectedRoute>
                <ComplaintForm />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App; 