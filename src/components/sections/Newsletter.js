import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Send, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { newsletterService } from '../../services/newsletterService';

const Newsletter = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    setLoading(true);

    try {
      await newsletterService.subscribe(email);
      toast.success('Thank you for subscribing to our newsletter!');
      setEmail('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-primary-500" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Stay Updated with Tax News
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and get the latest updates on tax laws, 
            filing deadlines, and expert tips delivered to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:border-white transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-secondary-500 text-white font-semibold rounded-xl hover:bg-secondary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Subscribe
                  <Send size={18} />
                </>
              )}
            </button>
          </form>

          <p className="text-white/60 text-sm mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
