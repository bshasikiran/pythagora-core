import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import complaintService from '../services/complaintService';

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await complaintService.getComplaints();
      setComplaints(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) return <div>Loading complaints...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Complaints</h2>
        <Link
          to="/complaints/new"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          New Complaint
        </Link>
      </div>

      {complaints.length === 0 ? (
        <p>No complaints found. Create your first complaint!</p>
      ) : (
        <div className="space-y-4">
          {complaints.map((complaint) => (
            <div
              key={complaint._id}
              className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{complaint.subject}</h3>
                  <p className="text-gray-600 mt-1">{complaint.description}</p>
                </div>
                <span className={`px-2 py-1 rounded text-sm ${
                  complaint.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  complaint.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {complaint.status}
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                <p>Complaint ID: {complaint.complaintId}</p>
                <p>Filed on: {new Date(complaint.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComplaintList; 