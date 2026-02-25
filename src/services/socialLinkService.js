import api from './api';

export const socialLinkService = {
  // Public
  getSocialLinks: async () => {
    const response = await api.get('/social-links');
    return response.data;
  },

  // Admin
  getAllSocialLinks: async () => {
    const response = await api.get('/social-links/admin/all');
    return response.data;
  },

  upsertSocialLink: async (data) => {
    const response = await api.post('/social-links', data);
    return response.data;
  },

  updateSocialLink: async (id, data) => {
    const response = await api.put(`/social-links/${id}`, data);
    return response.data;
  },

  deleteSocialLink: async (id) => {
    const response = await api.delete(`/social-links/${id}`);
    return response.data;
  },

  seedSocialLinks: async () => {
    const response = await api.post('/social-links/seed');
    return response.data;
  },
};
