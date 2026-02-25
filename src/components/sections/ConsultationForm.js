import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Upload, X, FileText, CheckCircle, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { consultationService } from '../../services/consultationService';

const ConsultationForm = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    message: '',
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const serviceTypes = [
    'Income Tax',
    'Sales Tax',
    'Customs',
    'GST',
    'SECP',
    'Trademark',
    'WEBOC',
    'NTN Registration',
    'Other',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(selectedFile.type)) {
        toast.error('Please upload a PDF or image file (JPG, PNG)');
        return;
      }
      // Validate file size (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast.error('File size should be less than 10MB');
        return;
      }
      setFile(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        submitData.append(key, formData[key]);
      });
      if (file) {
        submitData.append('noticeFile', file);
      }

      await consultationService.createConsultation(submitData);
      setSubmitted(true);
      toast.success('Your consultation request has been submitted!');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        serviceType: '',
        message: '',
      });
      setFile(null);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section id="consultation" className="py-20 bg-gray-50" ref={ref}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center bg-white rounded-2xl p-12 shadow-lg"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-green-500" size={40} />
            </div>
            <h3 className="text-2xl font-heading font-bold text-secondary-500 mb-4">
              Thank You!
            </h3>
            <p className="text-gray-600 mb-6">
              Your consultation request has been submitted successfully. 
              Our team will contact you within 24 hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="btn-primary"
            >
              Submit Another Request
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="consultation" className="py-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 text-primary-500 font-semibold text-sm uppercase tracking-wider mb-4">
              <span className="w-8 h-0.5 bg-primary-500" />
              Free Consultation
            </span>
            <h2 className="section-title mb-6">
              Get a <span className="text-primary-500">Free</span> Tax Consultation
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Have you received a tax notice? Our experts are here to help. 
              Upload your notice and we'll provide you with a free assessment 
              and guidance on the next steps.
            </p>

            {/* Features */}
            <div className="space-y-4 mb-8">
              {[
                'Free initial consultation - no obligations',
                'Expert review of your tax documents',
                'Clear guidance on compliance matters',
                'Confidential and secure handling',
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="text-primary-500 flex-shrink-0" size={20} />
                  <span className="text-secondary-500">{feature}</span>
                </div>
              ))}
            </div>

            {/* Contact Info */}
            <div className="bg-secondary-500 rounded-xl p-6 text-white">
              <h4 className="font-heading font-semibold mb-4">Prefer to talk?</h4>
              <p className="text-gray-300 mb-4">
                Call us directly for immediate assistance:
              </p>
              <a
                href="tel:02132202292"
                className="text-2xl font-bold text-primary-400 hover:text-primary-300 transition-colors"
              >
                (021) 32202292
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-heading font-semibold text-secondary-500 mb-6">
                Request Free Consultation
              </h3>

              <div className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="+92 300 1234567"
                      required
                    />
                  </div>
                </div>

                {/* Service Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Required
                  </label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Select a service</option>
                    {serviceTypes.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Tax Notice (PDF/JPG)
                  </label>
                  {!file ? (
                    <label className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-primary-500 transition-colors block">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                      />
                      <Upload className="mx-auto text-gray-400 mb-3" size={32} />
                      <p className="text-gray-500 text-sm">
                        Drag & drop or click to upload
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        PDF, JPG, PNG (max 10MB)
                      </p>
                    </label>
                  ) : (
                    <div className="flex items-center justify-between bg-primary-50 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <FileText className="text-primary-500" size={24} />
                        <div>
                          <p className="text-sm font-medium text-secondary-500 truncate max-w-[200px]">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="p-2 hover:bg-primary-100 rounded-full transition-colors"
                      >
                        <X className="text-gray-500" size={18} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="input-field resize-none"
                    placeholder="Describe your tax issue or query..."
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={18} />
                      Submitting...
                    </>
                  ) : (
                    'Submit Request'
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  By submitting, you agree to our Privacy Policy. Your information 
                  is secure and will never be shared.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationForm;
