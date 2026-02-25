import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Share2, X, MessageCircle } from 'lucide-react';

const SocialMediaWidget = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#', color: 'bg-blue-600 hover:bg-blue-700' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'bg-black hover:bg-gray-800' },
    { name: 'Instagram', icon: Instagram, href: '#', color: 'bg-gradient-to-br from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600' },
    { name: 'YouTube', icon: Youtube, href: '#', color: 'bg-red-600 hover:bg-red-700' },
    { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'bg-blue-700 hover:bg-blue-800' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.03,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: 20, opacity: 0 },
  };

  return (
    <>
      {/* Social Media Widget - RIGHT SIDE */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden sm:block">
        {/* Toggle Button */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-12 h-12 flex items-center justify-center rounded-l-lg shadow-lg transition-colors duration-300 ${
            isExpanded ? 'bg-gray-700' : 'bg-primary-500 hover:bg-primary-600'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isExpanded ? (
            <X className="text-white" size={20} />
          ) : (
            <Share2 className="text-white" size={20} />
          )}
        </motion.button>

        {/* Social Links */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute top-14 right-0 flex flex-col gap-2"
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  className={`w-12 h-12 flex items-center justify-center rounded-l-lg shadow-lg text-white transition-all duration-300 ${social.color}`}
                  title={social.name}
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick WhatsApp Button - BOTTOM LEFT */}
      <div className="fixed bottom-6 left-6 z-50">
        <motion.a
          href="https://wa.me/923452712672"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-colors group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle className="text-white" size={28} />
          {/* Tooltip */}
          <span className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Chat with us on WhatsApp
          </span>
        </motion.a>
        {/* Pulse animation ring */}
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-25 pointer-events-none" />
      </div>
    </>
  );
};

export default SocialMediaWidget;
