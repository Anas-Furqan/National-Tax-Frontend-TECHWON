import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const locations = [
    {
      name: 'Main Office',
      address: '8, Opp. Custom House, Suite#:1, Mezzanine Floor, Poonawala View, G. K, 15 Bohri Rd, Karachi',
      phone: '021 32202292',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.422386164573!2d66.9933668!3d24.849419500000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb3155791c2dd1b%3A0x7265bea350272910!2sBhundi%20Corporation%20(Clearing%20Agent%20And%20Consultant)!5e0!3m2!1sen!2s!4v1772052601053!5m2!1sen!2s',
    },
    {
      name: 'Branch Office',
      address: 'Noorani market, 11 g new, Sector 11-G North Karachi, Karachi',
      phone: null,
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7233.4570104883005!2d67.0857256!3d24.9753501!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb34728c40c7655%3A0x1b5f5b7e05d219ec!2sRehan%20Tawakal%20Enterprise!5e0!3m2!1sen!2s!4v1772052802125!5m2!1sen!2s',
    },
  ];

  const whatsappContacts = [
    { name: 'Consultant 1', phone: '923452712672' },
    { name: 'Consultant 2', phone: '923452126174' },
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50" ref={ref}>
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
            Contact Us
            <span className="w-8 h-0.5 bg-primary-500" />
          </span>
          <h2 className="section-title mb-6">
            Get in <span className="text-primary-500">Touch</span>
          </h2>
          <p className="section-subtitle">
            Visit our offices or reach out to us directly. We're here to help with all your tax matters.
          </p>
        </motion.div>

        {/* Contact Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-primary-500 rounded-2xl p-8 text-white"
          >
            <h3 className="text-2xl font-heading font-bold mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-primary-100 text-sm mb-1">Email</p>
                  <a href="mailto:nationaltaxlawassociates@gmail.com" className="hover:text-primary-100 transition-colors break-all">
                    nationaltaxlawassociates@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-primary-100 text-sm mb-1">Phone</p>
                  <a href="tel:02132202292" className="hover:text-primary-100 transition-colors">
                    021 32202292
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-primary-100 text-sm mb-1">Working Hours</p>
                  <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                  <p>Sat: 10:00 AM - 2:00 PM</p>
                </div>
              </div>

              {/* WhatsApp Contacts */}
              <div className="pt-4 border-t border-white/20">
                <p className="text-primary-100 text-sm mb-3">WhatsApp Consultants:</p>
                <div className="space-y-2">
                  {whatsappContacts.map((contact, index) => (
                    <a
                      key={index}
                      href={`https://wa.me/${contact.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-lg px-4 py-3 transition-colors"
                    >
                      <MessageCircle size={18} />
                      <span>{contact.name}: 0{contact.phone.slice(2)}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Location Cards */}
          {locations.map((location, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Map */}
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
                    <span className="text-gray-600 text-sm">{location.address}</span>
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
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
