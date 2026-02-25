import api from './api';

// Get all consultants (public)
export const getConsultants = async () => {
  const response = await api.get('/consultants');
  return response.data;
};

// Get single consultant
export const getConsultant = async (id) => {
  const response = await api.get(`/consultants/${id}`);
  return response.data;
};

// Get all consultants for admin (including inactive)
export const getAllConsultantsAdmin = async () => {
  const response = await api.get('/consultants/admin/all');
  return response.data;
};

// Create consultant (admin only)
export const createConsultant = async (formData) => {
  const response = await api.post('/consultants', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Update consultant (admin only)
export const updateConsultant = async (id, formData) => {
  const response = await api.put(`/consultants/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Delete consultant (admin only)
export const deleteConsultant = async (id) => {
  const response = await api.delete(`/consultants/${id}`);
  return response.data;
};
