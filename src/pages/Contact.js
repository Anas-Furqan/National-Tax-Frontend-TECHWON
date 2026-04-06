import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Send, 
  CheckCircle,
  Loader2,
  Mail,
  MessageSquare
} from 'lucide-react';
import Breadcrumb from '../components/common/Breadcrumb';
import { consultationService } from '../services/consultationService';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredContact: 'email',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const locations = [
    {
      name: 'Head Office - Custom House Area',
      address: '8, Opp. Custom House, Suite#:1, Mezzanine Floor, Poonawala View, G. K, 15 Bohri Rd, Karachi',
      phone: '+92 345 271 2672',
      email: 'nationaltaxassociates@gmail.com',
      hours: 'Mon-Sat: 9:00 AM - 6:00 PM',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.422386164573!2d66.9933668!3d24.849419500000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb3155791c2dd1b%3A0x7265bea350272910!2sBhundi%20Corporation%20(Clearing%20Agent%20And%20Consultant)!5e0!3m2!1sen!2s!4v1772052601053!5m2!1sen!2s',
      isPrimary: true,
      directions: 'https://www.google.com/maps/dir//8,+Bhundi+Corporation+(Clearing+Agent+And+Consultant),+Opp.+Custom+House,+Suite%23:1,+Mezzanine+Floor,+Poonawala+View,+G.+K,+15+Bohri+Rd,+Ghulam+Hussain+Kasim+Quarters,+Karachi,+Pakistan/@24.8494378,66.9749127,15z/data=!4m16!1m7!3m6!1s0x3eb3155791c2dd1b:0x7265bea350272910!2sBhundi+Corporation+(Clearing+Agent+And+Consultant)!8m2!3d24.8494195!4d66.9933668!16s%2Fg%2F11h44p4pcq!4m7!1m0!1m5!1m1!1s0x3eb3155791c2dd1b:0x7265bea350272910!2m2!1d66.9933668!2d24.8494195?entry=ttu&g_ep=EgoyMDI2MDIyMi4wIKXMDSoASAFQAw%3D%3D',
    },
    {
      name: 'Branch Office - North Karachi',
      address: 'Noorani Market, 11 G New, Sector 11-G, North Karachi, Karachi',
      phone: '+92 345 212 6174',
      email: 'nationaltaxassociates@gmail.com',
      hours: 'Mon-Sat: 9:00 AM - 6:00 PM',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7233.4570104883005!2d67.0857256!3d24.9753501!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb34728c40c7655%3A0x1b5f5b7e05d219ec!2sRehan%20Tawakal%20Enterprise!5e0!3m2!1sen!2s!4v1772052802125!5m2!1sen!2s',
      isPrimary: false,
      directions: 'https://www.google.com/maps/dir//Rehan+Tawakal+Enterprise,+Noorani+market,+11+g+new,+Sector+11-G+Sector+11+G+North+Karachi,+Karachi,+75850,+Pakistan/@24.9753501,67.0857256,16z/data=!4m16!1m7!3m6!1s0x3eb34728c40c7655:0x1b5f5b7e05d219ec!2sRehan+Tawakal+Enterprise!8m2!3d24.9750883!4d67.0859233!16s%2Fg%2F11y67q520y!4m7!1m0!1m5!1m1!1s0x3eb34728c40c7655:0x1b5f5b7e05d219ec!2m2!1d67.0859233!2d24.9750883!17m2!4m1!1e3!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDIyMi4wIKXMDSoASAFQAw%3D%3D',
    },
  ];

  const subjects = [
    'Income Tax Inquiry',
    'Sales Tax Services',
    'Company Registration',
    'Trademark Registration',
    'Customs & WEBOC',
    'NTN Registration',
    'General Inquiry',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Use consultation service to save the lead
      await consultationService.submitConsultation({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.subject,
        message: formData.message,
      });
      
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        preferredContact: 'email',
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
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
              Contact Us
              <span className="w-8 h-0.5 bg-white/50" />
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Get in Touch with Our Experts
            </h1>
            <p className="text-lg text-white/80">
              Have questions about tax compliance or legal matters? 
              Our team of certified professionals is ready to help you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4">
        <Breadcrumb items={[
          { label: 'Home', href: '/' },
          { label: 'Contact', href: '/contact', isCurrentPage: true },
        ]} />
      </div>

      {/* Quick Contact Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Phone */}
            <motion.a
              href="tel:+923452712672"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow group cursor-pointer"
            >
              <div className="w-14 h-14 bg-primary-100 group-hover:bg-primary-500 rounded-xl flex items-center justify-center mb-4 transition-colors">
                <Phone className="text-primary-500 group-hover:text-white transition-colors" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-secondary-500 mb-2">Call Us</h3>
              <p className="text-primary-500 font-medium">+92 345 271 2672</p>
              <p className="text-gray-500 text-sm">Mon-Sat, 9AM - 6PM</p>
            </motion.a>

            {/* Email */}
            <motion.a
              href="mailto:nationaltaxassociates@gmail.com"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow group cursor-pointer"
            >
              <div className="w-14 h-14 bg-primary-100 group-hover:bg-primary-500 rounded-xl flex items-center justify-center mb-4 transition-colors">
                <Mail className="text-primary-500 group-hover:text-white transition-colors" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-secondary-500 mb-2">Email Us</h3>
              <p className="text-primary-500 font-medium text-sm break-all">nationaltaxassociates@gmail.com</p>
              <p className="text-gray-500 text-sm">We reply within 24 hours</p>
            </motion.a>

            {/* WhatsApp */}
            <motion.a
              href="https://wa.me/923452712672"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow group cursor-pointer"
            >
              <div className="w-14 h-14 bg-green-100 group-hover:bg-green-500 rounded-xl flex items-center justify-center mb-4 transition-colors">
                <MessageSquare className="text-green-500 group-hover:text-white transition-colors" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-secondary-500 mb-2">WhatsApp</h3>
              <p className="text-green-500 font-medium">Quick Response</p>
              <p className="text-gray-500 text-sm">Chat with us anytime</p>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Contact Form & Locations */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-heading font-bold text-secondary-500 mb-2">
                Send Us a Message
              </h2>
              <p className="text-gray-600 mb-6">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
                  <h3 className="text-2xl font-semibold text-secondary-500 mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for contacting us. Our team will review your inquiry and 
                    get back to you shortly.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="btn-primary"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name & Email */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                        placeholder="Your Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  {/* Phone & Subject */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                        placeholder="+92 XXX XXXX XXX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                      >
                        <option value="">Select a subject</option>
                        {subjects.map((subj, idx) => (
                          <option key={idx} value={subj}>
                            {subj}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Preferred Contact */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Contact Method
                    </label>
                    <div className="flex gap-4">
                      {['email', 'phone', 'whatsapp'].map((method) => (
                        <label
                          key={method}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition ${
                            formData.preferredContact === method
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-gray-200 hover:border-primary-200'
                          }`}
                        >
                          <input
                            type="radio"
                            name="preferredContact"
                            value={method}
                            checked={formData.preferredContact === method}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <span className="capitalize text-sm font-medium">
                            {method}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition resize-none"
                      placeholder="Tell us about your requirements..."
                    />
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Office Locations */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-heading font-bold text-secondary-500 mb-6">
                Our Office Locations
              </h2>

              {locations.map((location, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  {/* Map */}
                  <div className="h-48 bg-gray-200 relative">
                    <iframe
                      title={location.name}
                      src={location.mapEmbed}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-secondary-500">
                        {location.name}
                      </h3>
                      {location.isPrimary && (
                        <span className="bg-primary-100 text-primary-600 text-xs font-semibold px-2 py-1 rounded">
                          Head Office
                        </span>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPin className="text-primary-500 flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-600 text-sm">{location.address}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="text-primary-500 flex-shrink-0" size={18} />
                        <a href={`tel:${location.phone.replace(/\s/g, '')}`} className="text-gray-600 text-sm hover:text-primary-500 transition">
                          {location.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="text-primary-500 flex-shrink-0" size={18} />
                        <span className="text-gray-600 text-sm">{location.hours}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <a
                        href={location.directions}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center px-4 py-2 bg-primary-100 text-primary-600 font-medium rounded-lg hover:bg-primary-500 hover:text-white transition text-sm"
                      >
                        Get Directions
                      </a>
                      <a
                        href={`tel:${location.phone.replace(/\s/g, '')}`}
                        className="flex-1 text-center px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition text-sm"
                      >
                        Call Now
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
