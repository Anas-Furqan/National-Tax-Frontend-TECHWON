import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, Eye, ArrowLeft, Clock, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { blogService } from '../services/blogService';
import Breadcrumb from '../components/common/Breadcrumb';
import { BlogDetailSkeleton } from '../components/common/Skeleton';

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const response = await blogService.getBlog(slug);
        setBlog(response.data);
        
        // Fetch related blogs
        const relatedResponse = await blogService.getRelatedBlogs(slug);
        setRelatedBlogs(relatedResponse.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  const shareUrl = window.location.href;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <BlogDetailSkeleton />
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-600 mb-4">Article not found</h1>
          <Link to="/blog" className="btn-primary">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-secondary-500 py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: blog.title.substring(0, 50) + (blog.title.length > 50 ? '...' : ''), href: `/blog/${blog.slug}`, isCurrentPage: true },
            ]} 
            className="bg-transparent"
          />
          
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 mt-4"
          >
            <ArrowLeft size={18} />
            Back to Blog
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <span className="inline-block bg-primary-500 text-white text-sm font-semibold px-4 py-1 rounded-full mb-4">
              {blog.category?.name || 'General'}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6 leading-tight">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-gray-400">
              <span className="flex items-center gap-2">
                <User size={18} />
                {blog.author?.name || 'Admin'}
              </span>
              <span className="flex items-center gap-2">
                <Calendar size={18} />
                {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-2">
                <Eye size={18} />
                {blog.views} views
              </span>
              <span className="flex items-center gap-2">
                <Clock size={18} />
                {Math.ceil(blog.content?.split(' ').length / 200)} min read
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              {/* Featured Image */}
              {blog.thumbnailImage && (
                <div className="rounded-xl overflow-hidden mb-8">
                  <img
                    src={blog.thumbnailImage}
                    alt={blog.title}
                    className="w-full h-auto"
                  />
                </div>
              )}

              {/* Content */}
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div
                  className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-secondary-500 prose-a:text-primary-500"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className="mt-8 pt-8 border-t">
                    <h4 className="font-semibold text-secondary-500 mb-3">Tags:</h4>
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Share */}
                <div className="mt-8 pt-8 border-t">
                  <h4 className="font-semibold text-secondary-500 mb-3 flex items-center gap-2">
                    <Share2 size={18} />
                    Share this article:
                  </h4>
                  <div className="flex gap-3">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
                    >
                      <Facebook size={18} />
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${blog.title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600 transition-colors"
                    >
                      <Twitter size={18} />
                    </a>
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${blog.title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition-colors"
                    >
                      <Linkedin size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>

            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-8"
            >
              {/* Related Posts */}
              {relatedBlogs.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-heading font-semibold text-secondary-500 mb-4">
                    Related Articles
                  </h3>
                  <div className="space-y-4">
                    {relatedBlogs.map((related) => (
                      <Link
                        key={related._id}
                        to={`/blog/${related.slug}`}
                        className="flex gap-4 group"
                      >
                        <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                          {related.thumbnailImage ? (
                            <img
                              src={related.thumbnailImage}
                              alt={related.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-secondary-400 to-secondary-600 flex items-center justify-center">
                              <span className="text-white/50 text-xs font-bold">NTL</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-secondary-500 group-hover:text-primary-500 transition-colors line-clamp-2 text-sm">
                            {related.title}
                          </h4>
                          <span className="text-xs text-gray-500">
                            {new Date(related.publishedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl p-6 text-white">
                <h3 className="text-lg font-heading font-semibold mb-3">
                  Need Tax Help?
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  Get expert consultation from our certified tax professionals.
                </p>
                <Link to="/#consultation" className="btn-primary w-full text-center">
                  Get Free Consultation
                </Link>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetail;
