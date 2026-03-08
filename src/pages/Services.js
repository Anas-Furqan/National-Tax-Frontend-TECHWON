import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  FileText, 
  Building2, 
  Globe, 
  Receipt, 
  Briefcase, 
  Stamp,
  CreditCard,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import Breadcrumb from '../components/common/Breadcrumb';
import { ServiceSkeleton, GridSkeleton } from '../components/common/Skeleton';
import { blogService } from '../services/blogService';

const Services = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [blogsLoading, setBlogsLoading] = useState(false);

  const services = [
    {
      icon: Calculator,
      title: 'Income Tax',
      category: 'income-tax',
      description: 'Complete income tax solutions including returns filing, tax planning, and FBR compliance.',
      features: ['Tax Return Filing', 'Tax Planning', 'Audit Support', 'Appeals'],
    },
    {
      icon: Receipt,
      title: 'Sales Tax',
      category: 'sales-tax',
      description: 'Sales tax registration, monthly returns, and compliance management for businesses.',
      features: ['Registration', 'Monthly Returns', 'Refund Claims', 'Compliance'],
    },
    {
      icon: Globe,
      title: 'Customs',
      category: 'customs',
      description: 'Import/export documentation, customs clearance, and duty optimization services.',
      features: ['Import Clearance', 'Export Documentation', 'Duty Optimization', 'Compliance'],
    },
    {
      icon: FileText,
      title: 'WEBOC',
      category: 'weboc',
      description: 'Web-based one customs system registration, documentation, and clearance assistance.',
      features: ['Registration', 'GD Filing', 'Documentation', 'Training'],
    },
    {
      icon: CreditCard,
      title: 'GST',
      category: 'gst',
      description: 'Goods and Services Tax registration, compliance, and return filing services.',
      features: ['Registration', 'Return Filing', 'Input Tax Credit', 'Compliance'],
    },
    {
      icon: Building2,
      title: 'SECP',
      category: 'secp',
      description: 'Company registration, annual compliance, and corporate secretarial services.',
      features: ['Company Registration', 'Annual Returns', 'Compliance', 'LLP Formation'],
    },
    {
      icon: Stamp,
      title: 'Trademark',
      category: 'trademark',
      description: 'Trademark registration, renewal, and intellectual property protection services.',
      features: ['TM Search', 'Registration', 'Renewal', 'Infringement'],
    },
    {
      icon: Briefcase,
      title: 'NTN Registration',
      category: 'ntn-registration',
      description: 'National Tax Number registration for individuals, businesses, and corporations.',
      features: ['Individual NTN', 'Business NTN', 'Company NTN', 'AOP Registration'],
    },
  ];

  const fetchBlogsByCategory = async (category) => {
    setBlogsLoading(true);
    try {
      const response = await blogService.getBlogs({ category, limit: 6 });
      setRelatedBlogs(response.data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setRelatedBlogs([]);
    } finally {
      setBlogsLoading(false);
    }
  };

  const handleServiceClick = (service) => {
    setSelectedService(service);
    fetchBlogsByCategory(service.category);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary-500 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 text-white/80 font-semibold text-sm uppercase tracking-wider mb-4">
              <span className="w-8 h-0.5 bg-white/50" />
              Our Services
              <span className="w-8 h-0.5 bg-white/50" />
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Comprehensive Tax & Legal Solutions
            </h1>
            <p className="text-lg text-white/80">
              From income tax to trademark registration, we offer complete solutions 
              for all your taxation and legal compliance needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4">
        <Breadcrumb items={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services', isCurrentPage: true },
        ]} />
      </div>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                onClick={() => handleServiceClick(service)}
                className={`group bg-white rounded-xl border-2 p-6 cursor-pointer transition-all duration-300 hover:shadow-xl ${
                  selectedService?.category === service.category
                    ? 'border-primary-500 shadow-lg'
                    : 'border-gray-100 hover:border-primary-200'
                }`}
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-colors ${
                  selectedService?.category === service.category
                    ? 'bg-primary-500'
                    : 'bg-primary-100 group-hover:bg-primary-500'
                }`}>
                  <service.icon className={`transition-colors ${
                    selectedService?.category === service.category
                      ? 'text-white'
                      : 'text-primary-500 group-hover:text-white'
                  }`} size={28} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-heading font-semibold text-secondary-500 mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-5">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Link */}
                <Link
                  to={`/blog?category=${encodeURIComponent(service.title)}`}
                  className="inline-flex items-center gap-2 text-primary-500 font-semibold text-sm group-hover:gap-3 transition-all"
                >
                  View Related Articles
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Related Blogs Section */}
      {selectedService && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-secondary-500 mb-2">
                Articles about {selectedService.title}
              </h2>
              <p className="text-gray-600">
                Browse our latest resources and guides on {selectedService.title.toLowerCase()} services.
              </p>
            </motion.div>

            {blogsLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="animate-pulse">
                      <div className="h-48 bg-gray-200" />
                      <div className="p-6 space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-1/4" />
                        <div className="h-6 bg-gray-200 rounded w-3/4" />
                        <div className="h-4 bg-gray-200 rounded w-full" />
                        <div className="h-4 bg-gray-200 rounded w-5/6" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : relatedBlogs.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {relatedBlogs.map((blog) => (
                  <Link
                    key={blog._id}
                    to={`/blog/${blog.slug}`}
                    className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="h-48 bg-gray-100 overflow-hidden">
                      {blog.thumbnailImage ? (
                        <img
                          src={blog.thumbnailImage}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary-100">
                          <BookOpen className="text-primary-500" size={40} />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <span className="inline-block bg-primary-100 text-primary-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                        {blog.category?.name || selectedService.title}
                      </span>
                      <h3 className="text-lg font-semibold text-secondary-500 mb-2 group-hover:text-primary-500 transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {blog.excerpt}
                      </p>
                      <div className="mt-4 flex items-center gap-2 text-primary-500 font-medium text-sm">
                        Read More
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </Link>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-xl">
                <BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  No articles found
                </h3>
                <p className="text-gray-500 mb-4">
                  We don't have any articles about {selectedService.title.toLowerCase()} yet.
                </p>
                <Link to="/blog" className="btn-primary inline-flex">
                  Browse All Articles
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-2xl p-8 md:p-12 text-center"
          >
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
              Need Help with Your Tax Matters?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Get expert consultation from our certified tax professionals. 
              We're here to help you navigate complex tax regulations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-primary">
                Get Free Consultation
                <ArrowRight className="ml-2" size={18} />
              </Link>
              <a 
                href="https://wa.me/923452712672" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors inline-flex items-center"
              >
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
