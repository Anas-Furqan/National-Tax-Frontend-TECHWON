import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const services = [
    'Income Tax',
    'Sales Tax',
    'Customs',
    'WEBOC',
    'GST',
    'SECP',
    'Trademark',
    'NTN Registration',
  ];

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/#about' },
    { name: 'Services', href: '/#services' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/#contact' },
    { name: 'Privacy Policy', href: '/privacy' },
  ];

  return (
    <footer className="bg-secondary-500 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">NTL</span>
              </div>
              <div>
                <h3 className="text-lg font-heading font-bold leading-tight">
                  National Tax Law
                </h3>
                <p className="text-xs text-primary-400 font-medium">Associates</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Pakistan's trusted tax consultancy firm providing comprehensive taxation 
              and legal services since 2010. We help businesses and individuals navigate 
              complex tax regulations with ease.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-500 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-500 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-500 transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-500 transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-6 text-primary-400">
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    to="/#services"
                    className="text-gray-300 hover:text-primary-400 transition-colors flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-6 text-primary-400">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-6 text-primary-400">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-primary-500 mt-1 flex-shrink-0" size={18} />
                <span className="text-gray-300">
                  Office #123, Business Center,<br />
                  Main Boulevard, Lahore, Pakistan
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-primary-500 flex-shrink-0" size={18} />
                <a href="tel:+923001234567" className="text-gray-300 hover:text-primary-400 transition-colors">
                  +92 300 1234567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-primary-500 flex-shrink-0" size={18} />
                <a href="mailto:info@nationaltaxlaw.com" className="text-gray-300 hover:text-primary-400 transition-colors">
                  info@nationaltaxlaw.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="text-primary-500 mt-1 flex-shrink-0" size={18} />
                <span className="text-gray-300">
                  Mon - Fri: 9:00 AM - 6:00 PM<br />
                  Sat: 10:00 AM - 2:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} National Tax Law Associates. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-primary-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-primary-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
