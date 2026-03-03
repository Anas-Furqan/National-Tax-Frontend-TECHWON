import api from './api';

export const newsService = {
  // Public
  getNews: async (params = {}) => {
    const response = await api.get('/news', { params });
    return response.data;
  },

  getSingleNews: async (id) => {
    const response = await api.get(`/news/${id}`);
    return response.data;
  },

  // Admin
  getAllNews: async (params = {}) => {
    const response = await api.get('/news/admin/all', { params });
    return response.data;
  },

  createNews: async (formData) => {
    const response = await api.post('/news', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  updateNews: async (id, formData) => {
    const response = await api.put(`/news/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  deleteNews: async (id) => {
    const response = await api.delete(`/news/${id}`);
    return response.data;
  },
};
