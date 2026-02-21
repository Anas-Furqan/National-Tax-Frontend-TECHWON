import api from './api';

export const blogService = {
  getBlogs: async (params = {}) => {
    const response = await api.get('/blogs', { params });
    return response.data;
  },

  getBlog: async (slug) => {
    const response = await api.get(`/blogs/${slug}`);
    return response.data;
  },

  getBlogById: async (id) => {
    const response = await api.get(`/blogs/id/${id}`);
    return response.data;
  },

  createBlog: async (formData) => {
    const response = await api.post('/blogs', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  updateBlog: async (id, formData) => {
    const response = await api.put(`/blogs/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  deleteBlog: async (id) => {
    const response = await api.delete(`/blogs/${id}`);
    return response.data;
  },

  getTags: async () => {
    const response = await api.get('/blogs/tags');
    return response.data;
  },

  getRelatedBlogs: async (slug) => {
    const response = await api.get(`/blogs/${slug}/related`);
    return response.data;
  },
};
