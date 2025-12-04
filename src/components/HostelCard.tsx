import { Link } from "react-router-dom";
import { MapPin, Users, Wifi, Car, Utensils, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Hostel {
  id: string;
  name: string;
  city: string;
  address: string;
  price: number;
  image: string;
  genderType: "Boys" | "Girls" | "Co-ed";
  facilities: string[];
  verified: boolean;
  description: string;
}

interface HostelCardProps {
  hostel: Hostel;
}

const facilityIcons: Record<string, React.ReactNode> = {
  WiFi: <Wifi className="h-4 w-4" />,
  Parking: <Car className="h-4 w-4" />,
  Meals: <Utensils className="h-4 w-4" />,
};

const HostelCard = ({ hostel }: HostelCardProps) => {
  return (
    <div className="group bg-card rounded-xl overflow-hidden border border-border card-hover">
      <div className="relative h-52 overflow-hidden">
        <img
          src={hostel.image}
          alt={hostel.name}
          className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant="secondary" className="bg-card/95 backdrop-blur-sm text-foreground font-medium shadow-sm transition-transform duration-300 group-hover:scale-105">
            {hostel.genderType}
          </Badge>
          {hostel.verified && (
            <Badge className="bg-primary/95 backdrop-blur-sm gap-1 shadow-sm transition-transform duration-300 group-hover:scale-105">
              <Check className="h-3 w-3" />
              Verified
            </Badge>
          )}
        </div>
      </div>

      <div className="p-5 space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
            {hostel.name}
          </h3>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
            <MapPin className="h-4 w-4 text-primary/70 transition-transform duration-300 group-hover:scale-110" />
            <span>{hostel.address}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {hostel.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {hostel.facilities.slice(0, 3).map((facility, index) => (
            <div
              key={facility}
              className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/70 px-2.5 py-1.5 rounded-lg transition-all duration-300 hover:bg-primary/10 hover:text-primary"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {facilityIcons[facility]}
              <span>{facility}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <p className="text-2xl font-bold text-primary transition-transform duration-300 group-hover:scale-105 origin-left">₹{hostel.price}</p>
            <p className="text-xs text-muted-foreground">per month</p>
          </div>
          <Link to={`/hostel/${hostel.id}`}>
            <Button className="rounded-lg shadow-sm btn-press transition-all duration-300 hover:shadow-md hover:scale-105">View Details</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HostelCard;
