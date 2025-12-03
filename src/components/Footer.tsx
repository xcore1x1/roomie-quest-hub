import { Building2, Mail, Phone, Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-secondary mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/20">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <span className="text-lg font-bold text-white">Hostella</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Find your perfect hostel near your college. Safe, affordable, and student-friendly accommodations.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-white/60 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/hostels" className="text-sm text-white/60 hover:text-primary transition-colors">
                  Find Hostel
                </Link>
              </li>
              <li>
                <Link to="/add-hostel" className="text-sm text-white/60 hover:text-primary transition-colors">
                  Add Hostel
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-2">
              <li className="text-sm text-white/60">About Us</li>
              <li className="text-sm text-white/60">Contact</li>
              <li className="text-sm text-white/60">FAQs</li>
              <li className="text-sm text-white/60">Privacy Policy</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-white/60">
                <Mail className="h-4 w-4 text-primary/70" />
                <span>shubhamydv61@gmail.com</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/60">
                <Phone className="h-4 w-4 text-primary/70" />
                <span>+91 96216 40030</span>
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              <Facebook className="h-5 w-5 text-white/40 hover:text-primary cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-white/40 hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-white/40 hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-sm text-white/50">
            © 2024 Hostella. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
