import { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.role || user.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchComplaints();
  }, [user, navigate]);

  const fetchComplaints = async () => {
    try {
      const response = await axiosInstance.get('/admin/complaints');
      setComplaints(response.data.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const updateStatus = async (complaintId, newStatus, remarks) => {
    try {
      await axiosInstance.put(`/admin/complaints/${complaintId}`, {
        status: newStatus,
        adminRemarks: remarks
      });
      await fetchComplaints();
      setSelectedComplaint(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredComplaints = complaints.filter(complaint => {
    if (filter === 'all') return true;
    return complaint.status === filter;
  });

  const sortedComplaints = [...filteredComplaints].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      case 'status':
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  if (loading) return <div className="text-center py-8">Loading complaints...</div>;
  if (error) return <div className="text-red-600 text-center py-8">Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-4">
          <select
            className="rounded-md border-gray-300"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
          <select
            className="rounded-md border-gray-300"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">Sort by Date</option>
            <option value="priority">Sort by Priority</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6">
        {sortedComplaints.map((complaint) => (
          <div key={complaint._id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-semibold">{complaint.subject}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusBadgeColor(complaint.status)}`}>
                    {complaint.status}
                  </span>
                </div>
                <p className="text-gray-600 mt-2">{complaint.description}</p>
                <div className="mt-4 text-sm text-gray-500 grid grid-cols-2 gap-2">
                  <p>Complaint ID: {complaint.complaintId}</p>
                  <p>Priority: {complaint.priority}</p>
                  <p>Student: {complaint.student.name}</p>
                  <p>Email: {complaint.student.email}</p>
                  <p>Filed on: {new Date(complaint.createdAt).toLocaleString()}</p>
                  {complaint.adminRemarks && (
                    <p className="col-span-2">Remarks: {complaint.adminRemarks}</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => setSelectedComplaint(complaint)}
                className="ml-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Update
              </button>
            </div>

            {selectedComplaint?._id === complaint._id && (
              <div className="mt-4 p-4 border-t">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Update Status
                    </label>
                    <div className="flex gap-4">
                      <select
                        className="rounded-md border-gray-300"
                        defaultValue={complaint.status}
                        onChange={(e) => {
                          const remarks = prompt('Enter remarks for this status update:');
                          if (remarks !== null) {
                            updateStatus(complaint._id, e.target.value, remarks);
                          }
                        }}
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                      <button
                        onClick={() => setSelectedComplaint(null)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard; 