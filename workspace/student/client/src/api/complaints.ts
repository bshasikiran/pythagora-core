import api from './api';

// Description: Submit a new complaint
// Endpoint: POST /api/complaints/submit
// Request: { title: string, description: string, category: string, attachments: File[] }
// Response: { success: boolean, message: string, complaint: { _id: string, title: string, description: string, category: string, status: string, createdAt: string, attachments: string[] } }
export const submitComplaint = async (data: { title: string; description: string; category: string; attachments?: File[] }) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Complaint submitted successfully',
        complaint: {
          _id: Math.random().toString(36).substr(2, 9),
          ...data,
          attachments: data.attachments?.map(() => 'mock-file-url.pdf') || [],
          status: 'Pending',
          createdAt: new Date().toISOString()
        }
      });
    }, 500);
  });
};

// Description: Get all complaints for a user
// Endpoint: GET /api/complaints/user
// Request: {}
// Response: { complaints: Array<{ _id: string, title: string, description: string, category: string, status: string, createdAt: string, attachments: string[] }> }
export const getUserComplaints = async () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        complaints: [
          {
            _id: '1',
            title: 'Network Issues',
            description: 'Poor internet connectivity in Lab 3',
            category: 'Infrastructure',
            status: 'Pending',
            attachments: ['network-report.pdf'],
            createdAt: '2024-03-20'
          },
          {
            _id: '2',
            title: 'Library Access',
            description: 'Unable to access digital library resources',
            category: 'Academic',
            status: 'In Progress',
            attachments: ['screenshot.png'],
            createdAt: '2024-03-19'
          },
          {
            _id: '3',
            title: 'Course Registration',
            description: 'Unable to register for elective courses',
            category: 'Administrative',
            status: 'Resolved',
            attachments: [],
            createdAt: '2024-03-18'
          }
        ]
      });
    }, 500);
  });
};

// Description: Delete a complaint
// Endpoint: DELETE /api/complaints/:id
// Request: {}
// Response: { success: boolean, message: string }
export const deleteComplaint = async (id: string) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Complaint deleted successfully'
      });
    }, 500);
  });
};

// Description: Edit a complaint
// Endpoint: PUT /api/complaints/:id
// Request: { title: string, description: string, category: string }
// Response: { success: boolean, message: string }
export const editComplaint = async (id: string, data: { title: string; description: string; category: string }) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Complaint updated successfully'
      });
    }, 500);
  });
};