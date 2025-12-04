import { Link, useNavigate } from "react-router-dom";
import { Building2, User, LogOut, Shield, Home, Search, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Navbar = () => {
  const { user, role, signOut } = useAuth();
  const navigate = useNavigate();

  const handleAuthClick = async () => {
    if (user) {
      await signOut();
      toast.success("Logged out successfully");
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-card/95 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2.5 group">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-105">
              <Building2 className="h-5 w-5 text-primary transition-transform duration-300 group-hover:rotate-6" />
            </div>
            <span className="text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
              Hostella
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className="group px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-all duration-300 flex items-center gap-1.5">
              <Home className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              Home
            </Link>
            <Link to="/hostels" className="group px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-all duration-300 flex items-center gap-1.5">
              <Search className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              Find Hostel
            </Link>
            <Link to="/add-hostel" className="group px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-all duration-300 flex items-center gap-1.5">
              <PlusCircle className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              Add Hostel
            </Link>
            {role === "admin" && (
              <Link to="/admin" className="group px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-all duration-300 flex items-center gap-1.5">
                <Shield className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                Admin
              </Link>
            )}
          </div>

          <Button variant="default" size="sm" className="gap-2 rounded-lg shadow-sm" onClick={handleAuthClick}>
            {user ? (
              <>
                <LogOut className="h-4 w-4" />
                Logout
              </>
            ) : (
              <>
                <User className="h-4 w-4" />
                Login
              </>
            )}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
