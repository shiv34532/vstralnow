import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-serif text-blue-300 mb-4">VASTRA</h3>
            <p className="text-blue-200 text-sm">
              Premium Indian ethnic and contemporary wear for the modern family.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-blue-300 transition-all duration-300 transform hover:scale-110">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-blue-300 transition-all duration-300 transform hover:scale-110">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-blue-300 transition-all duration-300 transform hover:scale-110">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-blue-300">Quick Links</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              <li><Link to="/" className="hover:text-blue-300 transition-all duration-300 hover:translate-x-1 inline-block">Home</Link></li>
              <li><Link to="/shop" className="hover:text-blue-300 transition-all duration-300 hover:translate-x-1 inline-block">Shop</Link></li>
              <li><a href="#" className="hover:text-blue-300 transition-all duration-300 hover:translate-x-1 inline-block">About Us</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-all duration-300 hover:translate-x-1 inline-block">Contact</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4 text-blue-300">Customer Service</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              <li><a href="#" className="hover:text-blue-300 transition-all duration-300 hover:translate-x-1 inline-block">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-all duration-300 hover:translate-x-1 inline-block">Return Policy</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-all duration-300 hover:translate-x-1 inline-block">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-all duration-300 hover:translate-x-1 inline-block">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-blue-300">Contact Us</h4>
            <ul className="space-y-3 text-sm text-blue-200">
              <li className="flex items-start hover:text-blue-300 transition-colors duration-300">
                <Mail className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>support@vastra.com</span>
              </li>
              <li className="flex items-start hover:text-blue-300 transition-colors duration-300">
                <Phone className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>+91-XXXX-XXXXXX</span>
              </li>
              <li className="flex items-start hover:text-blue-300 transition-colors duration-300">
                <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>Mumbai, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-700 mt-8 pt-8 text-center text-sm text-blue-200">
          <p>&copy; 2026 Vastra. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
