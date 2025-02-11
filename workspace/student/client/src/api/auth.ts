import api from './api';

// Description: Login user
// Endpoint: POST /api/auth/login
// Request: { email: string, password: string }
// Response: { accessToken: string, refreshToken: string, user: { role: string } }
export const login = (email: string, password: string) => {
  // Mocking the response
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === '227r1a66d9@cmrtc.ac.in' && password === 'Shasi@111') {
        resolve({
          accessToken: 'mock_admin_access_token',
          refreshToken: 'mock_admin_refresh_token',
          user: {
            role: 'admin'
          }
        });
      } else if (email.endsWith('@cmrtc.ac.in')) {
        resolve({
          accessToken: 'mock_access_token',
          refreshToken: 'mock_refresh_token',
          user: {
            role: 'user'
          }
        });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 500);
  });
};

// Description: Register user
// Endpoint: POST /api/auth/register
// Request: { email: string, password: string }
// Response: { message: string }
export const register = (email: string, password: string) => {
  // Mocking the response
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email.endsWith('@cmrtc.ac.in')) {
        resolve({ message: 'User registered successfully' });
      } else {
        reject(new Error('Only CMRTC email addresses are allowed'));
      }
    }, 500);
  });
};

// Description: Logout user
// Endpoint: POST /api/auth/logout
// Request: {}
// Response: { success: boolean }
export const logout = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 500);
  });
};