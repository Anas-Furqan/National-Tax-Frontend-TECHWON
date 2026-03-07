import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, ArrowRight, User } from 'lucide-react';
import { blogService } from '../../services/blogService';

const BlogPreview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await blogService.getBlogs({ limit: 3 });
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Placeholder blogs for when API is not available
  const placeholderBlogs = [
    {
      _id: '1',
      title: 'Understanding Income Tax Returns in Pakistan',
      excerpt: 'A comprehensive guide to filing your income tax returns with the FBR...',
      slug: 'understanding-income-tax-returns',
      category: 'Income Tax',
      publishedAt: new Date().toISOString(),
      author: { name: 'Admin' },
    },
    {
      _id: '2',
      title: 'Complete Guide to Sales Tax Registration',
      excerpt: 'Everything you need to know about sales tax registration for businesses...',
      slug: 'sales-tax-registration-guide',
      category: 'Sales Tax',
      publishedAt: new Date().toISOString(),
      author: { name: 'Admin' },
    },
    {
      _id: '3',
      title: 'SECP Company Registration: Step by Step',
      excerpt: 'Learn how to register your company with SECP in Pakistan...',
      slug: 'secp-company-registration',
      category: 'SECP',
      publishedAt: new Date().toISOString(),
      author: { name: 'Admin' },
    },
  ];

  const displayBlogs = blogs.length > 0 ? blogs : placeholderBlogs;

  return (
    <section className="py-20 bg-white hidden lg:block" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 text-primary-500 font-semibold text-sm uppercase tracking-wider mb-4">
            <span className="w-8 h-0.5 bg-primary-500" />
            Our Blog
            <span className="w-8 h-0.5 bg-primary-500" />
          </span>
          <h2 className="section-title mb-6">
            Latest <span className="text-primary-500">Tax Insights</span> & News
          </h2>
          <p className="section-subtitle">
            Stay informed with our expert articles on taxation, compliance, 
            and business regulations in Pakistan.
          </p>
        </motion.div>

        {/* Blog Grid */}
        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-xl h-48 mb-4"></div>
                <div className="bg-gray-200 h-4 rounded w-1/4 mb-3"></div>
                <div className="bg-gray-200 h-6 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid md:grid-cols-3 gap-8"
          >
            {displayBlogs.map((blog) => (
              <motion.article
                key={blog._id}
                variants={itemVariants}
                className="group"
              >
                <Link to={`/blog/${blog.slug}`}>
                  {/* Thumbnail */}
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

                  {/* Meta */}
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

                  {/* Title */}
                  <h3 className="text-xl font-heading font-semibold text-secondary-500 mb-3 group-hover:text-primary-500 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {blog.excerpt}
                  </p>

                  {/* Read More */}
                  <span className="inline-flex items-center gap-2 text-primary-500 font-semibold text-sm group-hover:gap-3 transition-all">
                    Read More
                    <ArrowRight size={16} />
                  </span>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link to="/blog" className="btn-outline">
            View All Articles
            <ArrowRight className="ml-2" size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogPreview;
