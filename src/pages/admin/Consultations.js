import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Eye, 
  Download, 
  Check, 
  X, 
  Clock, 
  AlertCircle,
  FileText,
  Phone,
  Mail
} from 'lucide-react';
import toast from 'react-hot-toast';
import { consultationService } from '../../services/consultationService';

// Simple FileViewer component - Supabase URLs are public
const FileViewer = ({ fileUrl }) => {
  // Check if PDF based on URL
  const isPdf = fileUrl.toLowerCase().includes('.pdf');

  const handleView = () => {
    window.open(fileUrl, '_blank');
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = isPdf ? 'consultation-document.pdf' : 'consultation-document';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-2">
      {isPdf ? (
        <>
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
            <FileText className="text-red-500" size={24} />
            <span className="text-sm text-gray-600">PDF Document</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleView}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary-50 text-primary-600 hover:bg-primary-100 rounded-lg text-sm font-medium"
            >
              <Eye size={16} />
              View
            </button>
            <button
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-secondary-50 text-secondary-600 hover:bg-secondary-100 rounded-lg text-sm font-medium"
            >
              <Download size={16} />
              Download
            </button>
          </div>
        </>
      ) : (
        <>
          <img
            src={fileUrl}
            alt="Attached document"
            className="w-full max-h-48 object-contain rounded-lg border"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <button
            onClick={handleView}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-primary-50 text-primary-600 hover:bg-primary-100 rounded-lg text-sm font-medium"
          >
            <Eye size={16} />
            View Full Image
          </button>
        </>
      )}
    </div>
  );
};

const Consultations = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });

  const statuses = ['All', 'Pending', 'Reviewed', 'In Progress', 'Resolved', 'Closed'];

  useEffect(() => {
    fetchConsultations();
  }, [pagination.page, statusFilter]);

  const fetchConsultations = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.page,
        limit: 10,
      };
      if (statusFilter && statusFilter !== 'All') {
        params.status = statusFilter;
      }
      if (search) {
        params.search = search;
      }
      
      const response = await consultationService.getConsultations(params);
      setConsultations(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Error fetching consultations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchConsultations();
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await consultationService.updateConsultation(id, { status: newStatus });
      toast.success('Status updated successfully');
      fetchConsultations();
      if (selectedConsultation?._id === id) {
        setSelectedConsultation((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this consultation?')) {
      return;
    }

    try {
      await consultationService.deleteConsultation(id);
      toast.success('Consultation deleted');
      fetchConsultations();
      if (selectedConsultation?._id === id) {
        setSelectedConsultation(null);
      }
    } catch (error) {
      toast.error('Failed to delete consultation');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Reviewed':
        return 'bg-blue-100 text-blue-700';
      case 'In Progress':
        return 'bg-purple-100 text-purple-700';
      case 'Resolved':
        return 'bg-green-100 text-green-700';
      case 'Closed':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-heading font-bold text-secondary-500">Consultations</h1>
        <p className="text-gray-500">Manage consultation requests</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <form onSubmit={handleSearch} className="flex gap-2 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email, or phone..."
                className="input-field pl-12"
              />
            </div>
            <button type="submit" className="btn-primary">Search</button>
          </form>

          <div className="flex gap-2 flex-wrap">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => {
                  setStatusFilter(status === 'All' ? '' : status);
                  setPagination((p) => ({ ...p, page: 1 }));
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  (status === 'All' && !statusFilter) || statusFilter === status
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i}>
                      <td colSpan={5} className="px-6 py-4">
                        <div className="animate-pulse h-6 bg-gray-200 rounded"></div>
                      </td>
                    </tr>
                  ))
                ) : consultations.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      No consultations found
                    </td>
                  </tr>
                ) : (
                  consultations.map((consultation) => (
                    <tr
                      key={consultation._id}
                      className={`hover:bg-gray-50 cursor-pointer ${
                        selectedConsultation?._id === consultation._id ? 'bg-primary-50' : ''
                      }`}
                      onClick={() => setSelectedConsultation(consultation)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {consultation.isUrgent && (
                            <AlertCircle className="text-red-500" size={16} />
                          )}
                          <div>
                            <p className="font-medium text-secondary-500">{consultation.name}</p>
                            <p className="text-sm text-gray-500">{consultation.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm">
                        {consultation.serviceType || 'General'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(consultation.status)}`}>
                          {consultation.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-sm">
                        {new Date(consultation.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedConsultation(consultation);
                            }}
                            className="p-2 text-gray-500 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
                          >
                            <Eye size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="px-6 py-4 border-t flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Page {pagination.page} of {pagination.pages}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPagination((p) => ({ ...p, page: p.page - 1 }))}
                  disabled={pagination.page === 1}
                  className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPagination((p) => ({ ...p, page: p.page + 1 }))}
                  disabled={pagination.page === pagination.pages}
                  className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Detail Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          {selectedConsultation ? (
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg text-secondary-500">
                    {selectedConsultation.name}
                  </h3>
                  <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedConsultation.status)}`}>
                    {selectedConsultation.status}
                  </span>
                </div>
                {selectedConsultation.isUrgent && (
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium">
                    Urgent
                  </span>
                )}
              </div>

              <div className="space-y-3 text-sm">
                <a href={`mailto:${selectedConsultation.email}`} className="flex items-center gap-2 text-gray-600 hover:text-primary-500">
                  <Mail size={16} />
                  {selectedConsultation.email}
                </a>
                <a href={`tel:${selectedConsultation.phone}`} className="flex items-center gap-2 text-gray-600 hover:text-primary-500">
                  <Phone size={16} />
                  {selectedConsultation.phone}
                </a>
                <p className="text-gray-500">
                  <strong>Service:</strong> {selectedConsultation.serviceType || 'General'}
                </p>
                <p className="text-gray-500">
                  <strong>Date:</strong> {new Date(selectedConsultation.createdAt).toLocaleString()}
                </p>
              </div>

              {selectedConsultation.message && (
                <div>
                  <h4 className="font-medium text-secondary-500 mb-2">Message</h4>
                  <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-lg">
                    {selectedConsultation.message}
                  </p>
                </div>
              )}

              {selectedConsultation.noticeFileUrl && (
                <div>
                  <h4 className="font-medium text-secondary-500 mb-2">Attached File</h4>
                  <FileViewer fileUrl={selectedConsultation.noticeFileUrl} />
                </div>
              )}

              <div className="pt-4 border-t">
                <h4 className="font-medium text-secondary-500 mb-3">Update Status</h4>
                <div className="grid grid-cols-2 gap-2">
                  {['Pending', 'Reviewed', 'In Progress', 'Resolved'].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(selectedConsultation._id, status)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                        selectedConsultation.status === status
                          ? getStatusColor(status)
                          : 'border hover:bg-gray-50'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleDelete(selectedConsultation._id)}
                className="w-full mt-4 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm"
              >
                Delete Consultation
              </button>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Eye size={48} className="mx-auto mb-4 opacity-30" />
              <p>Select a consultation to view details</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Consultations;
