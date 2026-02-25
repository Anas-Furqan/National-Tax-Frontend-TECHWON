import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Award, 
  Users, 
  Target, 
  CheckCircle,
  MessageCircle,
  Linkedin,
  Briefcase
} from 'lucide-react';
import api from '../services/api';
import Breadcrumb from '../components/common/Breadcrumb';
import { ConsultantSkeleton } from '../components/common/Skeleton';

const About = () => {
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Default consultant data (used when API doesn't return data)
  const defaultConsultants = [
    {
      _id: '1',
      name: 'Consultant 1',
      title: 'Senior Tax Consultant',
      phone: '03452712672',
      whatsapp: '923452712672',
      email: 'nationaltaxlawassociates@gmail.com',
      image: '/logo.jpeg',
      specializations: ['Income Tax', 'Sales Tax', 'FBR Compliance'],
      experience: '15+ Years',
    },
    {
      _id: '2',
      name: 'Consultant 2',
      title: 'Legal & Customs Expert',
      phone: '03452126174',
      whatsapp: '923452126174',
      email: 'nationaltaxlawassociates@gmail.com',
      image: '/logo.jpeg',
      specializations: ['Customs', 'WEBOC', 'SECP', 'Trademark'],
      experience: '12+ Years',
    },
  ];

  useEffect(() => {
    const fetchConsultants = async () => {
      try {
        const response = await api.get('/consultants');
        if (response.data.data && response.data.data.length > 0) {
          setConsultants(response.data.data);
        } else {
          setConsultants(defaultConsultants);
        }
      } catch (error) {
        console.log('Using default consultant data');
        setConsultants(defaultConsultants);
      } finally {
        setLoading(false);
      }
    };
    fetchConsultants();
  }, []);

  const features = [
    'FBR Certified Tax Consultants',
    'Over 5000+ Satisfied Clients',
    'Complete Tax Solutions Under One Roof',
    'Quick & Efficient Service Delivery',
    '15+ Years of Industry Experience',
    '24/7 Customer Support',
  ];

  const locations = [
    {
      name: 'Main Office',
      address: '8, Opp. Custom House, Suite#:1, Mezzanine Floor, Poonawala View, G. K, 15 Bohri Rd, Karachi',
      phone: '021 32202292',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.0!2d67.0!3d24.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDUxJzAwLjAiTiA2N8KwMDAnMDAuMCJF!5e0!3m2!1sen!2s!4v1234567890',
    },
    {
      name: 'Branch Office',
      address: 'Noorani market, 11 g new, Sector 11-G North Karachi, Karachi',
      phone: null,
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.0!2d67.05!3d24.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDU3JzAwLjAiTiA2N8KwMDMnMDAuMCJF!5e0!3m2!1sen!2s!4v1234567890',
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen">
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
              About Us
              <span className="w-8 h-0.5 bg-white/50" />
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Pakistan's Most Trusted Tax Consultancy Firm
            </h1>
            <p className="text-lg text-white/80">
              National Tax Law Associates is a leading tax consultancy firm providing 
              comprehensive taxation and legal services to businesses and individuals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4">
        <Breadcrumb items={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about', isCurrentPage: true },
        ]} />
      </div>

      {/* About Content Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative">
                <div className="bg-primary-500 rounded-2xl overflow-hidden">
                  <div className="aspect-[4/3] bg-gradient-to-br from-primary-400 to-primary-600 overflow-hidden relative">
                    <img 
                      src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=450&fit=crop&q=80" 
                      alt="Professional Tax Consulting Team" 
                      className="w-full h-full object-cover mix-blend-overlay opacity-60"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <h3 className="text-3xl font-heading font-bold text-white mb-2">15+</h3>
                        <p className="text-white/80">Years of Excellence</p>
                      </div>
                    </div>
                  </div>
                </div>

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center">
                      <Users className="text-primary-500" size={24} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-secondary-500">5000+</div>
                      <div className="text-gray-500 text-sm">Happy Clients</div>
                    </div>
                  </div>
                </motion.div>

                {/* Soft glow accent */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-primary-300/40 to-primary-500/20 rounded-2xl blur-sm" />
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary-100/50 rounded-2xl" />
              </div>
            </motion.div>

            {/* Content Side */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants} className="mb-4">
                <span className="inline-flex items-center gap-2 text-primary-500 font-semibold text-sm uppercase tracking-wider">
                  <span className="w-8 h-0.5 bg-primary-500" />
                  Why Choose Us
                </span>
              </motion.div>

              <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-heading font-bold text-secondary-500 mb-6">
                Expert Tax Solutions You Can Trust
              </motion.h2>

              <motion.p variants={itemVariants} className="text-gray-600 mb-6 leading-relaxed">
                Our team of certified professionals ensures compliance while maximizing your tax benefits. 
                With over 15 years of experience, we have successfully handled thousands of cases ranging 
                from simple tax returns to complex litigation matters.
              </motion.p>

              <motion.div variants={itemVariants} className="grid sm:grid-cols-2 gap-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="text-primary-500 flex-shrink-0" size={20} />
                    <span className="text-secondary-500">{feature}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-white rounded-xl p-6 border-l-4 border-primary-500 shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="text-primary-500" size={24} />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-secondary-500 mb-2">Our Mission</h4>
                    <p className="text-gray-600 text-sm">
                      To provide efficient, transparent, and reliable tax solutions that empower 
                      our clients to achieve their financial goals while ensuring full compliance 
                      with Pakistani tax laws.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Consultants Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-flex items-center gap-2 text-primary-500 font-semibold text-sm uppercase tracking-wider mb-4">
              <span className="w-8 h-0.5 bg-primary-500" />
              Our Team
              <span className="w-8 h-0.5 bg-primary-500" />
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary-500 mb-6">
              Meet Our Expert Consultants
            </h2>
            <p className="text-gray-600">
              Our experienced team is dedicated to providing you with the best tax solutions tailored to your needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {loading ? (
              <>
                <ConsultantSkeleton />
                <ConsultantSkeleton />
              </>
            ) : (
              consultants.map((consultant, index) => (
                <motion.div
                  key={consultant._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow"
                >
                  <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-8 text-center">
                    <div className="w-32 h-32 mx-auto bg-white rounded-full overflow-hidden shadow-lg mb-4">
                      <img 
                        src={consultant.image || '/logo.jpeg'} 
                        alt={consultant.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-white mb-1">{consultant.name}</h3>
                    <p className="text-primary-100">{consultant.title}</p>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Briefcase className="text-primary-500" size={18} />
                      <span className="text-gray-600">{consultant.experience} Experience</span>
                    </div>

                    {consultant.specializations && (
                      <div className="mb-6">
                        <p className="text-sm text-gray-500 mb-2">Specializations:</p>
                        <div className="flex flex-wrap gap-2">
                          {consultant.specializations.map((spec, idx) => (
                            <span 
                              key={idx} 
                              className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-sm"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-3">
                      <a 
                        href={`https://wa.me/${consultant.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-gray-600 hover:text-green-600 transition-colors"
                      >
                        <MessageCircle size={18} />
                        <span>WhatsApp: 0{consultant.phone}</span>
                      </a>
                      <a 
                        href={`mailto:${consultant.email}`}
                        className="flex items-center gap-3 text-gray-600 hover:text-primary-600 transition-colors"
                      >
                        <Mail size={18} />
                        <span className="truncate">{consultant.email}</span>
                      </a>
                    </div>

                    <div className="mt-6 pt-4 border-t flex gap-3">
                      <a
                        href={`https://wa.me/${consultant.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 btn-primary text-center text-sm py-2"
                      >
                        <MessageCircle size={16} className="inline mr-2" />
                        Contact Now
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-flex items-center gap-2 text-primary-500 font-semibold text-sm uppercase tracking-wider mb-4">
              <span className="w-8 h-0.5 bg-primary-500" />
              Our Locations
              <span className="w-8 h-0.5 bg-primary-500" />
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary-500 mb-6">
              Visit Our Offices
            </h2>
            <p className="text-gray-600">
              We have two convenient locations to serve you better.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {locations.map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                {/* Map Placeholder */}
                <div className="h-48 bg-gray-200 relative">
                  <iframe
                    src={location.mapEmbed}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map for ${location.name}`}
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold text-secondary-500 mb-4">
                    {location.name}
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="text-primary-500 mt-1 flex-shrink-0" size={18} />
                      <span className="text-gray-600">{location.address}</span>
                    </div>
                    
                    {location.phone && (
                      <a 
                        href={`tel:${location.phone.replace(/\s/g, '')}`}
                        className="flex items-center gap-3 text-gray-600 hover:text-primary-600 transition-colors"
                      >
                        <Phone className="text-primary-500" size={18} />
                        <span>{location.phone}</span>
                      </a>
                    )}
                    
                    <a 
                      href="mailto:nationaltaxlawassociates@gmail.com"
                      className="flex items-center gap-3 text-gray-600 hover:text-primary-600 transition-colors"
                    >
                      <Mail className="text-primary-500" size={18} />
                      <span>nationaltaxlawassociates@gmail.com</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
