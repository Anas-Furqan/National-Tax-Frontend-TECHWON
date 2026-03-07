import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail, MessageCircle } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'News', href: '/news' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const whatsappContacts = [
    { name: '+923452712672', phone: '923452712672' },
    { name: '+923452126174', phone: '923452126174' },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary-500 text-white py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+922132202292" className="flex items-center gap-2 hover:text-primary-100 transition-colors">
              <Phone size={14} />
              <span>021 32202292</span>
            </a>
            <a href="mailto:nationaltaxlawassociates@gmail.com" className="flex items-center gap-2 hover:text-primary-100 transition-colors">
              <Mail size={14} />
              <span>nationaltaxlawassociates@gmail.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-primary-100">WhatsApp:</span>
            {whatsappContacts.map((contact, index) => (
              <a
                key={index}
                href={`https://wa.me/${contact.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-colors"
              >
                <MessageCircle size={14} />
                <span>{contact.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white shadow-lg py-2'
            : 'bg-white/95 backdrop-blur-sm py-4'
        }`}
      >
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img 
                src="/logo.jpeg" 
                alt="National Tax Law Associates" 
                className="w-12 h-12 rounded-lg object-contain"
              />
              <div className="hidden sm:block">
                <h1 className="text-lg font-heading font-bold text-secondary-500 leading-tight">
                  National Tax Law
                </h1>
                <p className="text-xs text-primary-500 font-medium">Associates</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-secondary-500 hover:text-primary-500 font-medium transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {/* WhatsApp Buttons */}
              <div className="flex items-center gap-2">
                {whatsappContacts.map((contact, index) => (
                  <a
                    key={index}
                    href={`https://wa.me/${contact.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-sm"
                    title={contact.name}
                  >
                    <MessageCircle size={16} />
                    <span className="hidden xl:inline">{contact.name}</span>
                  </a>
                ))}
              </div>
              <a
                href="#consultation"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary"
              >
                Free Consultation
              </a>
            </div>

            {/* Mobile Quick Contact Icons */}
            <div className="lg:hidden flex items-center gap-2">
              <a
                href="https://wa.me/923452712672"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors"
                title="WhatsApp Consultant 1"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="tel:03452126174"
                className="p-2 bg-primary-500 hover:bg-primary-600 text-white rounded-full transition-colors"
                title="Call Consultant 2"
              >
                <Phone size={18} />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-secondary-500 hover:text-primary-500 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t"
            >
              <div className="container mx-auto px-4 py-4 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="block text-secondary-500 hover:text-primary-500 font-medium py-2 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
                {/* Mobile WhatsApp Contacts */}
                <div className="border-t pt-4 space-y-2">
                  <p className="text-sm text-gray-500 font-medium">WhatsApp Consultants:</p>
                  {whatsappContacts.map((contact, index) => (
                    <a
                      key={index}
                      href={`https://wa.me/${contact.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-green-600 hover:text-green-700 py-2 transition-colors"
                    >
                      <MessageCircle size={18} />
                      <span>{contact.name}: 0{contact.phone.slice(2)}</span>
                    </a>
                  ))}
                </div>
                <a
                  href="#consultation"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-primary w-full text-center"
                >
                  Free Consultation
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
