import api from './api';

// Description: Get all users
// Endpoint: GET /api/admin/users
// Request: {}
// Response: { users: Array<{ _id: string, email: string, role: string, createdAt: string }> }
export const getUsers = async () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        users: [
          {
            _id: '1',
            email: '227r1a66d9@cmrtc.ac.in',
            role: 'admin',
            createdAt: '2024-03-20'
          },
          {
            _id: '2',
            email: 'student1@cmrtc.ac.in',
            role: 'user',
            createdAt: '2024-03-19'
          },
          {
            _id: '3',
            email: 'student2@cmrtc.ac.in',
            role: 'user',
            createdAt: '2024-03-18'
          }
        ]
      });
    }, 500);
  });
};

// Description: Get all complaints for admin
// Endpoint: GET /api/admin/complaints
// Request: { filters?: { status?: string, category?: string, startDate?: string, endDate?: string } }
// Response: { complaints: Array<{ _id: string, title: string, description: string, category: string, status: string, createdAt: string, user: { email: string }, attachments: string[] }> }
export const getAllComplaints = async (filters?: { status?: string; category?: string; startDate?: string; endDate?: string }) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      let complaints = [
        {
          _id: '1',
          title: 'Network Issues',
          description: 'Poor internet connectivity in Lab 3',
          category: 'Infrastructure',
          status: 'Pending',
          createdAt: '2024-03-20',
          attachments: ['network-report.pdf'],
          user: {
            email: 'student1@cmrtc.ac.in'
          }
        },
        {
          _id: '2',
          title: 'Library Access',
          description: 'Unable to access digital library resources',
          category: 'Academic',
          status: 'In Progress',
          createdAt: '2024-03-19',
          attachments: ['screenshot.png'],
          user: {
            email: 'student2@cmrtc.ac.in'
          }
        },
        {
          _id: '3',
          title: 'Course Registration',
          description: 'Unable to register for elective courses',
          category: 'Administrative',
          status: 'Resolved',
          createdAt: '2024-03-18',
          attachments: [],
          user: {
            email: 'student1@cmrtc.ac.in'
          }
        }
      ];

      if (filters) {
        if (filters.status) {
          complaints = complaints.filter(c => c.status === filters.status);
        }
        if (filters.category) {
          complaints = complaints.filter(c => c.category === filters.category);
        }
        if (filters.startDate) {
          complaints = complaints.filter(c => new Date(c.createdAt) >= new Date(filters.startDate));
        }
        if (filters.endDate) {
          complaints = complaints.filter(c => new Date(c.createdAt) <= new Date(filters.endDate));
        }
      }

      resolve({ complaints });
    }, 500);
  });
};

// Description: Update complaint status
// Endpoint: PUT /api/admin/complaints/:id
// Request: { status: string, message?: string }
// Response: { success: boolean, message: string }
export const updateComplaintStatus = async (id: string, status: string, message?: string) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Complaint status updated successfully'
      });
    }, 500);
  });
};

// Description: Send message to user
// Endpoint: POST /api/admin/message
// Request: { email: string, message: string, complaintId: string }
// Response: { success: boolean, message: string }
export const sendMessageToUser = async (email: string, message: string, complaintId: string) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Message sent successfully'
      });
    }, 500);
  });
};

// Description: Generate complaints report
// Endpoint: GET /api/admin/complaints/report
// Request: { format: 'csv' | 'pdf' }
// Response: { url: string }
export const generateReport = async (format: 'csv' | 'pdf') => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        url: `mock-report.${format}`
      });
    }, 500);
  });
};

// Description: Search complaints
// Endpoint: GET /api/admin/complaints/search
// Request: { query: string }
// Response: { complaints: Array<{ _id: string, title: string, description: string, category: string, status: string, createdAt: string, user: { email: string } }> }
export const searchComplaints = async (query: string) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      const complaints = [
        {
          _id: '1',
          title: 'Network Issues',
          description: 'Poor internet connectivity in Lab 3',
          category: 'Infrastructure',
          status: 'Pending',
          createdAt: '2024-03-20',
          user: {
            email: 'student1@cmrtc.ac.in'
          }
        }
      ].filter(c =>
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.description.toLowerCase().includes(query.toLowerCase()) ||
        c.user.email.toLowerCase().includes(query.toLowerCase())
      );

      resolve({ complaints });
    }, 500);
  });
};