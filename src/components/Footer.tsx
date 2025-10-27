import { Building2, Mail, Phone, Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-muted border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">Hostella</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Find your perfect hostel near your college. Safe, affordable, and student-friendly accommodations.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/hostels" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Find Hostel
                </Link>
              </li>
              <li>
                <Link to="/add-hostel" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Add Hostel
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">About Us</li>
              <li className="text-sm text-muted-foreground">Contact</li>
              <li className="text-sm text-muted-foreground">FAQs</li>
              <li className="text-sm text-muted-foreground">Privacy Policy</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>shubhamydv61@gmail.com</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+91 96216 40030</span>
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Hostella. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
