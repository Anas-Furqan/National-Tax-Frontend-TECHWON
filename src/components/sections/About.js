import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { CheckCircle, Award, Users, Target } from 'lucide-react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    'FBR Certified Tax Consultants',
    'Over 5000+ Satisfied Clients',
    'Complete Tax Solutions Under One Roof',
    'Quick & Efficient Service Delivery',
    '15+ Years of Industry Experience',
    '24/7 Customer Support',
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
    <section id="about" className="py-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image Container */}
              <div className="bg-secondary-500 rounded-2xl overflow-hidden">
                <div className="aspect-[4/3] bg-gradient-to-br from-secondary-400 to-secondary-600 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto bg-primary-500 rounded-full flex items-center justify-center mb-6">
                      <Award className="text-white" size={40} />
                    </div>
                    <h3 className="text-3xl font-heading font-bold text-white mb-2">15+</h3>
                    <p className="text-gray-300">Years of Excellence</p>
                  </div>
                </div>
              </div>

              {/* Floating Stats Card */}
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

              {/* Gold accent */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-4 border-primary-500 rounded-2xl" />
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants} className="mb-4">
              <span className="inline-flex items-center gap-2 text-primary-500 font-semibold text-sm uppercase tracking-wider">
                <span className="w-8 h-0.5 bg-primary-500" />
                About Us
              </span>
            </motion.div>

            <motion.h2 variants={itemVariants} className="section-title mb-6">
              Pakistan's Most Trusted{' '}
              <span className="text-primary-500">Tax Consultancy</span> Firm
            </motion.h2>

            <motion.p variants={itemVariants} className="text-gray-600 mb-6 leading-relaxed">
              National Tax Law Associates is a leading tax consultancy firm in Pakistan, 
              providing comprehensive taxation and legal services to businesses and individuals. 
              Our team of certified professionals ensures compliance while maximizing your tax benefits.
            </motion.p>

            <motion.p variants={itemVariants} className="text-gray-600 mb-8 leading-relaxed">
              With over 15 years of experience, we have successfully handled thousands of cases 
              ranging from simple tax returns to complex litigation matters. Our commitment to 
              excellence and client satisfaction has made us the preferred choice for tax solutions.
            </motion.p>

            {/* Features Grid */}
            <motion.div variants={itemVariants} className="grid sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="text-primary-500 flex-shrink-0" size={20} />
                  <span className="text-secondary-500">{feature}</span>
                </div>
              ))}
            </motion.div>

            {/* Mission */}
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
  );
};

export default About;
