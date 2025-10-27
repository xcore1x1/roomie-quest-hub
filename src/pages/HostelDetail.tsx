import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockHostels } from "@/data/mockHostels";
import {
  MapPin,
  Phone,
  Mail,
  Check,
  Wifi,
  Car,
  Utensils,
  Shield,
  ArrowLeft,
  MessageCircle,
} from "lucide-react";

const facilityIcons: Record<string, React.ReactNode> = {
  WiFi: <Wifi className="h-5 w-5" />,
  Parking: <Car className="h-5 w-5" />,
  Meals: <Utensils className="h-5 w-5" />,
  Security: <Shield className="h-5 w-5" />,
};

const HostelDetail = () => {
  const { id } = useParams();
  const hostel = mockHostels.find((h) => h.id === id);

  if (!hostel) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Hostel not found</h1>
            <Link to="/hostels">
              <Button>Back to Hostels</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleContactOwner = () => {
    // Mock contact - in real app this would open WhatsApp or email
    window.open(
      `https://wa.me/919876543210?text=Hi, I'm interested in ${hostel.name}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <Link to="/hostels">
          <Button variant="ghost" className="gap-2 mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Hostels
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image */}
            <div className="relative h-96 rounded-lg overflow-hidden">
              <img
                src={hostel.image}
                alt={hostel.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge variant="secondary" className="bg-background/90 backdrop-blur">
                  {hostel.genderType}
                </Badge>
                {hostel.verified && (
                  <Badge className="bg-primary/90 backdrop-blur gap-1">
                    <Check className="h-3 w-3" />
                    Verified
                  </Badge>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="bg-card rounded-lg border border-border p-6 space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">{hostel.name}</h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-5 w-5" />
                  <span>{hostel.address}, {hostel.city}</span>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">About</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {hostel.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad 
                  minim veniam, quis nostrud exercitation ullamco laboris.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Facilities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {hostel.facilities.map((facility) => (
                    <div
                      key={facility}
                      className="flex items-center gap-3 p-3 bg-muted rounded-lg"
                    >
                      <div className="text-primary">
                        {facilityIcons[facility] || <Check className="h-5 w-5" />}
                      </div>
                      <span className="font-medium">{facility}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Location</h2>
                <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                  <p className="text-muted-foreground">Map integration coming soon</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg border border-border p-6 space-y-6 sticky top-20">
              <div>
                <p className="text-3xl font-bold text-primary">₹{hostel.price}</p>
                <p className="text-sm text-muted-foreground">per month</p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">Owner Details</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>+91 98765 43210</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>owner@hostella.com</span>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full gap-2"
                onClick={handleContactOwner}
              >
                <MessageCircle className="h-5 w-5" />
                Contact Owner
              </Button>

              <div className="pt-4 border-t border-border space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Verified listing</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Quick response</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Trusted owner</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HostelDetail;
