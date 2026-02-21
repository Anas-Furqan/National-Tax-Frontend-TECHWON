import api from './api';

export const newsletterService = {
  subscribe: async (email) => {
    const response = await api.post('/newsletter/subscribe', { email });
    return response.data;
  },

  unsubscribe: async (email) => {
    const response = await api.post('/newsletter/unsubscribe', { email });
    return response.data;
  },

  getSubscribers: async (params = {}) => {
    const response = await api.get('/newsletter/subscribers', { params });
    return response.data;
  },

  deleteSubscriber: async (id) => {
    const response = await api.delete(`/newsletter/${id}`);
    return response.data;
  },
};
