import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
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
  Loader2,
} from "lucide-react";

interface HostelData {
  id: string;
  name: string;
  address: string;
  city: string;
  price: number;
  images: string[] | null;
  gender_type: string;
  facilities: string[] | null;
  verified: boolean | null;
  description: string | null;
  owner_name: string | null;
  owner_contact: string | null;
}

const facilityIcons: Record<string, React.ReactNode> = {
  WiFi: <Wifi className="h-5 w-5" />,
  Parking: <Car className="h-5 w-5" />,
  Meals: <Utensils className="h-5 w-5" />,
  Security: <Shield className="h-5 w-5" />,
};

const HostelDetail = () => {
  const { id } = useParams();
  const [hostel, setHostel] = useState<HostelData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHostel = async () => {
      if (!id) return;
      
      const { data, error } = await supabase
        .from("hostels")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching hostel:", error);
      } else {
        setHostel(data);
      }
      setLoading(false);
    };

    fetchHostel();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

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
    const phone = hostel.owner_contact?.replace(/\D/g, "") || "919876543210";
    window.open(
      `https://wa.me/${phone}?text=Hi, I'm interested in ${hostel.name}`,
      "_blank"
    );
  };

  const mainImage = hostel.images?.[0] || "/placeholder.svg";

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
                src={mainImage}
                alt={hostel.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge variant="secondary" className="bg-background/90 backdrop-blur">
                  {hostel.gender_type}
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
                  {hostel.description || "No description available for this hostel."}
                </p>
              </div>

              {hostel.facilities && hostel.facilities.length > 0 && (
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
              )}

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
                  <p className="text-sm font-medium">{hostel.owner_name || "Owner"}</p>
                  {hostel.owner_contact && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{hostel.owner_contact}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>Contact via WhatsApp</span>
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
                {hostel.verified && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Verified listing</span>
                  </div>
                )}
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
