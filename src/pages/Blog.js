import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, Search, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { blogService } from '../services/blogService';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const categories = [
    'All',
    'Income Tax',
    'Sales Tax',
    'Customs',
    'GST',
    'SECP',
    'Trademark',
    'WEBOC',
    'General',
  ];

  useEffect(() => {
    fetchBlogs();
  }, [pagination.page, category]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.page,
        limit: 9,
      };
      if (category && category !== 'All') {
        params.category = category;
      }
      if (search) {
        params.search = search;
      }
      
      const response = await blogService.getBlogs(params);
      setBlogs(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBlogs();
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat === 'All' ? '' : cat);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-secondary-500 py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading font-bold text-white mb-4"
          >
            Our <span className="text-primary-500">Blog</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            Stay updated with the latest tax news, insights, and expert advice 
            from our team of certified professionals.
          </motion.p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
                />
              </div>
              <button type="submit" className="btn-primary">
                Search
              </button>
            </form>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    (cat === 'All' && !category) || category === cat
                      ? 'bg-primary-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-primary-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 rounded-xl h-48 mb-4"></div>
                  <div className="bg-gray-200 h-4 rounded w-1/4 mb-3"></div>
                  <div className="bg-gray-200 h-6 rounded mb-2"></div>
                  <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No articles found.</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog, index) => (
                  <motion.article
                    key={blog._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <Link to={`/blog/${blog.slug}`}>
                      <div className="relative overflow-hidden rounded-xl mb-5">
                        <div className="aspect-[16/10] bg-gradient-to-br from-secondary-400 to-secondary-600 flex items-center justify-center">
                          {blog.thumbnailImage ? (
                            <img
                              src={blog.thumbnailImage}
                              alt={blog.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <span className="text-white/30 text-6xl font-heading font-bold">NTL</span>
                          )}
                        </div>
                        <div className="absolute top-4 left-4">
                          <span className="bg-primary-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                            {blog.category || 'General'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <User size={14} />
                          {blog.author?.name || 'Admin'}
                        </span>
                      </div>

                      <h3 className="text-xl font-heading font-semibold text-secondary-500 mb-3 group-hover:text-primary-500 transition-colors line-clamp-2">
                        {blog.title}
                      </h3>

                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                        {blog.excerpt}
                      </p>

                      <span className="inline-flex items-center gap-2 text-primary-500 font-semibold text-sm group-hover:gap-3 transition-all">
                        Read More
                        <ArrowRight size={16} />
                      </span>
                    </Link>
                  </motion.article>
                ))}
              </div>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-12">
                  <button
                    onClick={() => setPagination((prev) => ({ ...prev, page: prev.page - 1 }))}
                    disabled={pagination.page === 1}
                    className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary-500 transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span className="text-gray-600">
                    Page {pagination.page} of {pagination.pages}
                  </span>
                  <button
                    onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))}
                    disabled={pagination.page === pagination.pages}
                    className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary-500 transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Blog;
