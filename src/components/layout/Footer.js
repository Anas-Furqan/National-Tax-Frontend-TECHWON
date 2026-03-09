import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Linkedin, Instagram, Youtube, MessageCircle } from 'lucide-react';

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
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const locations = [
    {
      name: 'Main Office',
      address: '8, Opp. Custom House, Suite#:1, Mezzanine Floor, Poonawala View, G. K, 15 Bohri Rd, Karachi',
      phone: '021 32202292',
    },
    {
      name: 'Branch Office',
      address: 'Noorani market, 11 g new, Sector 11-G North Karachi, Karachi',
      phone: null,
    },
  ];

  const whatsappContacts = [
    { name: 'Consultant 1', phone: '923452712672' },
    { name: 'Consultant 2', phone: '923452126174' },
  ];

  return (
    <footer className="bg-secondary-500 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img 
                src="/logo.jpeg" 
                alt="National Tax Law Associates" 
                className="w-12 h-12 rounded-lg object-contain bg-white p-1"
              />
              <div>
                <h3 className="text-lg font-heading font-bold leading-tight">
                  National Tax Law
                </h3>
                <p className="text-xs text-primary-400 font-medium">Associates</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Pakistan's trusted tax consultancy firm providing comprehensive taxation 
              and legal services. We help businesses and individuals navigate 
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
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-500 transition-colors">
                <Youtube size={18} />
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
            {/* WhatsApp Contacts */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <p className="text-sm text-gray-400 mb-3">WhatsApp Consultants:</p>
              {whatsappContacts.map((contact, index) => (
                <a
                  key={index}
                  href={`https://wa.me/${contact.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-green-400 hover:text-green-300 mb-2 transition-colors"
                >
                  <MessageCircle size={16} />
                  <span>{contact.name}: 0{contact.phone.slice(2)}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info - Two Locations */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-6 text-primary-400">
              Our Locations
            </h4>
            <div className="space-y-6">
              {locations.map((location, index) => (
                <div key={index} className="space-y-2">
                  <h5 className="text-white font-medium">{location.name}</h5>
                  <div className="flex items-start gap-3">
                    <MapPin className="text-primary-500 mt-1 flex-shrink-0" size={16} />
                    <span className="text-gray-300 text-sm">{location.address}</span>
                  </div>
                  {location.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="text-primary-500 flex-shrink-0" size={16} />
                      <a href={`tel:${location.phone.replace(/\s/g, '')}`} className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                        {location.phone}
                      </a>
                    </div>
                  )}
                </div>
              ))}
              <div className="flex items-center gap-3 pt-2">
                <Mail className="text-primary-500 flex-shrink-0" size={16} />
                <a href="mailto:nationaltaxlawassociates@gmail.com" className="text-gray-300 hover:text-primary-400 transition-colors text-sm break-all">
                  nationaltaxlawassociates@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="text-primary-500 mt-1 flex-shrink-0" size={16} />
                <span className="text-gray-300 text-sm">
                  Mon - Fri: 9:00 AM - 6:00 PM<br />
                  Sat: 10:00 AM - 2:00 PM
                </span>
              </div>
            </div>
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
