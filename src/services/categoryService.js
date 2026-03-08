import api from './api';

export const categoryService = {
  // Public - get active categories
  getCategories: async (type = null) => {
    const params = type ? { type } : {};
    const response = await api.get('/categories', { params });
    return response.data;
  },

  // Admin - get all categories including inactive
  getAllCategories: async (type = null) => {
    const params = type ? { type } : {};
    const response = await api.get('/categories/admin/all', { params });
    return response.data;
  },

  // Get single category
  getCategory: async (id) => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },

  // Create category
  createCategory: async (data) => {
    const response = await api.post('/categories', data);
    return response.data;
  },

  // Update category
  updateCategory: async (id, data) => {
    const response = await api.put(`/categories/${id}`, data);
    return response.data;
  },

  // Delete category
  deleteCategory: async (id) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  },

  // Seed default categories
  seedCategories: async () => {
    const response = await api.post('/categories/seed');
    return response.data;
  },
};
