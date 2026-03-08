import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  X, 
  Check, 
  Tag,
  FileText,
  Newspaper,
  Loader2,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import { categoryService } from '../../services/categoryService';

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [activeTab, setActiveTab] = useState('Blog');
  const [formData, setFormData] = useState({
    name: '',
    type: 'Blog',
    description: '',
    isActive: true,
  });
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getAllCategories();
      setCategories(response.data);
    } catch (error) {
      toast.error('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Category name is required');
      return;
    }

    setSubmitting(true);
    try {
      if (editingCategory) {
        await categoryService.updateCategory(editingCategory._id, formData);
        toast.success('Category updated successfully');
      } else {
        await categoryService.createCategory(formData);
        toast.success('Category created successfully');
      }
      fetchCategories();
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await categoryService.deleteCategory(id);
      toast.success('Category deleted successfully');
      fetchCategories();
      setDeleteConfirm(null);
    } catch (error) {
      toast.error('Failed to delete category');
    }
  };

  const handleSeedCategories = async () => {
    try {
      const response = await categoryService.seedCategories();
      toast.success(response.message);
      fetchCategories();
    } catch (error) {
      toast.error('Failed to seed categories');
    }
  };

  const openEditModal = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      type: category.type,
      description: category.description || '',
      isActive: category.isActive,
    });
    setShowModal(true);
  };

  const openCreateModal = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      type: activeTab,
      description: '',
      isActive: true,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData({
      name: '',
      type: 'Blog',
      description: '',
      isActive: true,
    });
  };

  const filteredCategories = categories.filter(cat => cat.type === activeTab);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-primary-500" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-secondary-500">
            Manage Categories
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Add, edit, or delete categories for Blogs and News
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSeedCategories}
            className="px-4 py-2 border border-primary-500 text-primary-500 rounded-lg hover:bg-primary-50 transition-colors text-sm font-medium"
          >
            Seed Defaults
          </button>
          <button
            onClick={openCreateModal}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={18} />
            Add Category
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {['Blog', 'News'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === tab
                ? 'border-primary-500 text-primary-500'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab === 'Blog' ? <FileText size={18} /> : <Newspaper size={18} />}
            {tab} Categories
            <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs">
              {categories.filter(c => c.type === tab).length}
            </span>
          </button>
        ))}
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredCategories.map((category) => (
            <motion.div
              key={category._id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`bg-white rounded-xl border p-4 ${
                category.isActive ? 'border-gray-200' : 'border-red-200 bg-red-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    category.isActive ? 'bg-primary-50' : 'bg-red-100'
                  }`}>
                    <Tag className={category.isActive ? 'text-primary-500' : 'text-red-500'} size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-secondary-500">{category.name}</h3>
                    <p className="text-xs text-gray-400">/{category.slug}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(category)}
                    className="p-2 text-gray-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(category._id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              {category.description && (
                <p className="text-sm text-gray-500 mt-3 line-clamp-2">
                  {category.description}
                </p>
              )}
              <div className="flex items-center gap-2 mt-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  category.isActive 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {category.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              {/* Delete Confirmation */}
              {deleteConfirm === category._id && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 p-3 bg-red-50 rounded-lg border border-red-200"
                >
                  <div className="flex items-center gap-2 text-red-600 text-sm mb-2">
                    <AlertCircle size={16} />
                    Delete this category?
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDelete(category._id)}
                      className="flex-1 px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="flex-1 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Tag className="mx-auto mb-4 text-gray-300" size={48} />
          <p>No {activeTab.toLowerCase()} categories found</p>
          <button
            onClick={openCreateModal}
            className="mt-4 text-primary-500 hover:underline text-sm"
          >
            Create your first category
          </button>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-md p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-heading font-bold text-secondary-500">
                  {editingCategory ? 'Edit Category' : 'Add Category'}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-field"
                    placeholder="Enter category name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="input-field"
                    disabled={editingCategory}
                  >
                    <option value="Blog">Blog</option>
                    <option value="News">News</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="input-field"
                    rows={3}
                    placeholder="Optional description"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 text-primary-500 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="isActive" className="text-sm text-gray-700">
                    Active (visible in dropdowns)
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 btn-primary flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      <Check size={18} />
                    )}
                    {editingCategory ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryManager;
