import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Download,
  Calendar,
  Search,
  Loader2,
  ChevronRight,
  Eye,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { newsService } from '../services/newsService';
import { categoryService } from '../services/categoryService';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchNews();
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getCategories('News');
      setCategories(response.data || []);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchNews = async () => {
    setLoading(true);
    try {
      const params = { limit: 50 };
      if (selectedCategory) {
        params.category = selectedCategory;
      }
      const response = await newsService.getNews(params);
      setNews(response.data || []);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-PK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCategoryStyle = (category) => {
    const slug = category?.slug || '';
    const styles = {
      circular: 'bg-blue-100 text-blue-700',
      notification: 'bg-orange-100 text-orange-700',
      news: 'bg-green-100 text-green-700',
      update: 'bg-purple-100 text-purple-700',
      general: 'bg-gray-100 text-gray-700',
    };
    return styles[slug] || 'bg-primary-100 text-primary-700';
  };

  const getCategoryLabel = (category) => {
    if (typeof category === 'object' && category?.name) {
      return category.name;
    }
    const found = categories.find((c) => c._id === category);
    return found?.name || 'Uncategorized';
  };

  // Convert Cloudinary URL to force download
  const getDownloadUrl = (url) => {
    if (!url) return '';
    // For Cloudinary raw URLs, add fl_attachment flag
    if (url.includes('cloudinary.com')) {
      return url.replace('/upload/', '/upload/fl_attachment/');
    }
    return url;
  };

  // Handle PDF download
  const handleDownload = async (url, title) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Download error:', error);
      // Fallback: open in new tab
      window.open(url, '_blank');
    }
  };

  const filteredNews = news.filter((item) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(query) ||
      (item.description && item.description.toLowerCase().includes(query))
    );
  });

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-primary-500">
              Home
            </Link>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-secondary-500 font-medium">News & Circulars</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FileText className="mx-auto mb-4" size={48} />
            <h1 className="text-3xl md:text-4xl font-bold mb-4">News & Circulars</h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Stay updated with the latest FBR circulars, tax notifications, and legal updates from
              the Federal Board of Revenue
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  !selectedCategory
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All News
              </button>
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => setSelectedCategory(cat._id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === cat._id
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search news..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-64 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-12 bg-gray-50 min-h-[400px]">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="animate-spin text-primary-500" size={40} />
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="text-center py-20">
              <FileText className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No News Found</h3>
              <p className="text-gray-500">
                {searchQuery
                  ? 'Try adjusting your search terms'
                  : 'No news available in this category yet'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden group"
                >
                  {/* Card Header with Icon */}
                  <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-6">
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                        <FileText className="text-white" size={24} />
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium bg-white/90 ${
                          getCategoryStyle(item.category).replace('bg-', 'text-').split(' ')[1]
                        }`}
                      >
                        {getCategoryLabel(item.category)}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <h3 className="font-semibold text-secondary-500 mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors">
                      {item.title}
                    </h3>

                    {item.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                    )}

                    <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
                      <Calendar size={14} />
                      {formatDate(item.publishDate || item.createdAt)}
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`https://docs.google.com/viewer?url=${encodeURIComponent(item.pdfUrl)}&embedded=true`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-primary-50 text-primary-600 hover:bg-primary-100 rounded-lg font-medium text-sm transition-colors"
                      >
                        <Eye size={16} />
                        View
                      </a>
                      <button
                        onClick={() => handleDownload(item.pdfUrl, item.title)}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-secondary-50 text-secondary-600 hover:bg-secondary-100 rounded-lg font-medium text-sm transition-colors"
                      >
                        <Download size={16} />
                        Download
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Help Understanding These Updates?</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Our expert tax consultants can help you understand how these circulars and notifications
            affect your business.
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 bg-primary-500 hover:bg-primary-600 rounded-lg font-semibold transition-colors"
          >
            Book a Consultation
          </Link>
        </div>
      </section>
    </>
  );
};

export default News;
