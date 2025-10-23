import { Link } from "react-router-dom";
import { Home, Building2, PlusCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              HostelHub
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/hostels" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Find Hostel
            </Link>
            <Link to="/add-hostel" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Add Hostel
            </Link>
          </div>

          <Button variant="default" size="sm" className="gap-2">
            <User className="h-4 w-4" />
            Login
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
