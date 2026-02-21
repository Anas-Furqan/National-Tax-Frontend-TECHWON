import api from './api';

export const consultationService = {
  createConsultation: async (formData) => {
    const response = await api.post('/consultations', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  getConsultations: async (params = {}) => {
    const response = await api.get('/consultations', { params });
    return response.data;
  },

  getConsultation: async (id) => {
    const response = await api.get(`/consultations/${id}`);
    return response.data;
  },

  updateConsultation: async (id, data) => {
    const response = await api.put(`/consultations/${id}`, data);
    return response.data;
  },

  deleteConsultation: async (id) => {
    const response = await api.delete(`/consultations/${id}`);
    return response.data;
  },

  getStats: async () => {
    const response = await api.get('/consultations/stats');
    return response.data;
  },
};
