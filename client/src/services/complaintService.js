import axiosInstance from '../utils/axiosConfig';

const createComplaint = async (complaintData) => {
  try {
    const response = await axiosInstance.post('/complaints', complaintData);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to create complaint';
    console.error('Complaint creation error:', error);
    throw new Error(message);
  }
};

const getComplaints = async () => {
  try {
    const response = await axiosInstance.get('/complaints');
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to fetch complaints';
    console.error('Fetch complaints error:', error);
    throw new Error(message);
  }
};

const getComplaintById = async (id) => {
  try {
    const response = await axiosInstance.get(`/complaints/${id}`);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to fetch complaint';
    console.error('Fetch complaint error:', error);
    throw new Error(message);
  }
};

export const complaintService = {
  createComplaint,
  getComplaints,
  getComplaintById
};

export default complaintService; 