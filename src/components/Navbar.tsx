import { Link, useNavigate } from "react-router-dom";
import { Building2, User, LogOut, Shield } from "lucide-react";
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
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Hostella
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
            {role === "admin" && (
              <Link to="/admin" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
                <Shield className="h-4 w-4" />
                Admin
              </Link>
            )}
          </div>

          <Button variant="default" size="sm" className="gap-2" onClick={handleAuthClick}>
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
