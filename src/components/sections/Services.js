import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Calculator, 
  FileText, 
  Building2, 
  Globe, 
  Receipt, 
  Briefcase, 
  Stamp,
  CreditCard,
  ArrowRight
} from 'lucide-react';

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const services = [
    {
      icon: Calculator,
      title: 'Income Tax',
      slug: 'income-tax-services',
      description: 'Complete income tax solutions including returns filing, tax planning, and FBR compliance.',
      features: ['Tax Return Filing', 'Tax Planning', 'Audit Support', 'Appeals'],
    },
    {
      icon: Receipt,
      title: 'Sales Tax',
      slug: 'sales-tax-services',
      description: 'Sales tax registration, monthly returns, and compliance management for businesses.',
      features: ['Registration', 'Monthly Returns', 'Refund Claims', 'Compliance'],
    },
    {
      icon: Globe,
      title: 'Customs',
      slug: 'customs-services',
      description: 'Import/export documentation, customs clearance, and duty optimization services.',
      features: ['Import Clearance', 'Export Documentation', 'Duty Optimization', 'Compliance'],
    },
    {
      icon: FileText,
      title: 'WEBOC',
      slug: 'weboc-services',
      description: 'Web-based one customs system registration, documentation, and clearance assistance.',
      features: ['Registration', 'GD Filing', 'Documentation', 'Training'],
    },
    {
      icon: CreditCard,
      title: 'GST',
      slug: 'gst-services',
      description: 'Goods and Services Tax registration, compliance, and return filing services.',
      features: ['Registration', 'Return Filing', 'Input Tax Credit', 'Compliance'],
    },
    {
      icon: Building2,
      title: 'SECP',
      slug: 'secp-services',
      description: 'Company registration, annual compliance, and corporate secretarial services.',
      features: ['Company Registration', 'Annual Returns', 'Compliance', 'LLP Formation'],
    },
    {
      icon: Stamp,
      title: 'Trademark',
      slug: 'trademark-services',
      description: 'Trademark registration, renewal, and intellectual property protection services.',
      features: ['TM Search', 'Registration', 'Renewal', 'Infringement'],
    },
    {
      icon: Briefcase,
      title: 'NTN Registration',
      slug: 'ntn-registration-services',
      description: 'National Tax Number registration for individuals, businesses, and corporations.',
      features: ['Individual NTN', 'Business NTN', 'Company NTN', 'AOP Registration'],
    },
  ];

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
    <section id="services" className="py-20 bg-white hidden lg:block" ref={ref}>
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
            Our Services
            <span className="w-8 h-0.5 bg-primary-500" />
          </span>
          <h2 className="section-title mb-6">
            Comprehensive <span className="text-primary-500">Tax & Legal</span> Solutions
          </h2>
          <p className="section-subtitle">
            From income tax to trademark registration, we offer complete solutions 
            for all your taxation and legal compliance needs.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group bg-white rounded-xl border border-gray-100 p-6 hover:shadow-xl hover:border-primary-200 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary-500 transition-colors">
                <service.icon className="text-primary-500 group-hover:text-white transition-colors" size={28} />
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
                Learn More
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-2xl p-8 md:p-12 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
            Need Help with Your Tax Matters?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Get expert consultation from our certified tax professionals. 
            Upload your tax notice and we'll provide you with a free assessment.
          </p>
          <a href="#consultation" className="btn-primary inline-flex">
            Get Free Consultation
            <ArrowRight className="ml-2" size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
