import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Plus,
  Edit,
  Trash2,
  Download,
  Eye,
  EyeOff,
  Loader2,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  Calendar,
  Search,
} from 'lucide-react';
import { newsService } from '../../services/newsService';
import { categoryService } from '../../services/categoryService';

const NewsManager = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    isPublished: true,
    publishDate: new Date().toISOString().split('T')[0],
  });
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfPreview, setPdfPreview] = useState('');

  useEffect(() => {
    fetchCategories();
    fetchNews();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getCategories('News');
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await newsService.getAllNews({ limit: 100 });
      setNews(response.data || []);
    } catch (error) {
      console.error('Error fetching news:', error);
      showMessage('error', 'Failed to load news');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 4000);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      isPublished: true,
      publishDate: new Date().toISOString().split('T')[0],
    });
    setPdfFile(null);
    setPdfPreview('');
    setEditingNews(null);
  };

  const openModal = (newsItem = null) => {
    if (newsItem) {
      setEditingNews(newsItem);
      setFormData({
        title: newsItem.title,
        description: newsItem.description || '',
        category: newsItem.category?._id || newsItem.category || '',
        isPublished: newsItem.isPublished,
        publishDate: newsItem.publishDate 
          ? new Date(newsItem.publishDate).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0],
      });
      setPdfPreview(newsItem.pdfUrl);
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        showMessage('error', 'Only PDF files are allowed');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        showMessage('error', 'File size must be less than 10MB');
        return;
      }
      setPdfFile(file);
      setPdfPreview(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      showMessage('error', 'Title is required');
      return;
    }

    if (!editingNews && !pdfFile) {
      showMessage('error', 'Please upload a PDF file');
      return;
    }

    setSaving(true);
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('category', formData.category);
      data.append('isPublished', formData.isPublished);
      data.append('publishDate', formData.publishDate);
      if (pdfFile) {
        data.append('pdf', pdfFile);
      }

      if (editingNews) {
        await newsService.updateNews(editingNews._id, data);
        showMessage('success', 'News updated successfully');
      } else {
        await newsService.createNews(data);
        showMessage('success', 'News created successfully');
      }

      closeModal();
      fetchNews();
    } catch (error) {
      console.error('Save error:', error);
      showMessage('error', error.response?.data?.message || 'Failed to save news');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await newsService.deleteNews(id);
      showMessage('success', 'News deleted successfully');
      fetchNews();
    } catch (error) {
      showMessage('error', 'Failed to delete news');
    } finally {
      setDeleteConfirm(null);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-PK', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getCategoryStyle = (category) => {
    // Generate consistent color based on category name or slug
    const slug = category?.slug || category || '';
    const colorMap = {
      circular: 'bg-blue-100 text-blue-700',
      notification: 'bg-orange-100 text-orange-700',
      news: 'bg-green-100 text-green-700',
      update: 'bg-purple-100 text-purple-700',
      general: 'bg-gray-100 text-gray-700',
    };
    return colorMap[slug] || 'bg-primary-100 text-primary-700';
  };

  const getCategoryName = (category) => {
    if (typeof category === 'object' && category?.name) {
      return category.name;
    }
    const found = categories.find(c => c._id === category);
    return found?.name || 'Uncategorized';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-primary-500" size={40} />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-secondary-500">News & Circulars</h1>
          <p className="text-gray-600">Manage FBR circulars, notifications, and news</p>
        </div>
        <button onClick={() => openModal()} className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Add News
        </button>
      </div>

      {/* Message Toast */}
      <AnimatePresence>
        {message.text && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              message.type === 'success'
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* News List */}
      {news.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center">
          <FileText className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No News Yet</h3>
          <p className="text-gray-500 mb-4">Start by adding your first news or circular</p>
          <button onClick={() => openModal()} className="btn-primary">
            Add First News
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-4 font-semibold text-secondary-500">Title</th>
                  <th className="text-left px-6 py-4 font-semibold text-secondary-500">Category</th>
                  <th className="text-left px-6 py-4 font-semibold text-secondary-500">Date</th>
                  <th className="text-left px-6 py-4 font-semibold text-secondary-500">Status</th>
                  <th className="text-right px-6 py-4 font-semibold text-secondary-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {news.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                          <FileText className="text-primary-500" size={20} />
                        </div>
                        <div>
                          <p className="font-medium text-secondary-500 line-clamp-1">{item.title}</p>
                          <p className="text-sm text-gray-500 line-clamp-1">{item.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryStyle(item.category)}`}>
                        {getCategoryName(item.category)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Calendar size={14} />
                        {formatDate(item.publishDate || item.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {item.isPublished ? (
                        <span className="flex items-center gap-1 text-green-600 text-sm">
                          <Eye size={14} />
                          Published
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-gray-500 text-sm">
                          <EyeOff size={14} />
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={item.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View PDF"
                        >
                          <Download size={18} />
                        </a>
                        <button
                          onClick={() => openModal(item)}
                          className="p-2 text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(item._id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b flex items-center justify-between">
                <h2 className="text-xl font-bold text-secondary-500">
                  {editingNews ? 'Edit News' : 'Add New News'}
                </h2>
                <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter news title"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    placeholder="Brief description of the news/circular"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Publish Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Publish Date
                  </label>
                  <input
                    type="date"
                    name="publishDate"
                    value={formData.publishDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                {/* PDF Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    PDF File {!editingNews && <span className="text-red-500">*</span>}
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center ${
                      pdfPreview ? 'border-primary-300 bg-primary-50' : 'border-gray-300'
                    }`}
                  >
                    {pdfPreview ? (
                      <div className="flex items-center justify-center gap-3">
                        <FileText className="text-primary-500" size={24} />
                        <span className="text-sm text-gray-700 truncate max-w-[200px]">
                          {pdfFile ? pdfFile.name : 'Current PDF'}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setPdfFile(null);
                            setPdfPreview('');
                          }}
                          className="p-1 hover:bg-red-100 rounded text-red-500"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                        <span className="text-sm text-gray-600">Click to upload PDF</span>
                        <span className="block text-xs text-gray-400 mt-1">Max 10MB</span>
                        <input
                          type="file"
                          accept=".pdf,application/pdf"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Published */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="isPublished"
                    id="isPublished"
                    checked={formData.isPublished}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="isPublished" className="text-sm text-gray-700">
                    Publish immediately
                  </label>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 btn-primary flex items-center justify-center gap-2"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        Saving...
                      </>
                    ) : (
                      <>
                        <CheckCircle size={18} />
                        {editingNews ? 'Update' : 'Create'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl p-6 w-full max-w-sm text-center"
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="text-red-500" size={28} />
              </div>
              <h3 className="text-lg font-semibold text-secondary-500 mb-2">Delete News?</h3>
              <p className="text-gray-600 mb-6">
                This action cannot be undone. The PDF file will also be deleted.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewsManager;
