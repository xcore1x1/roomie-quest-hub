import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HostelCard from "@/components/HostelCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { Search, SlidersHorizontal, Loader2 } from "lucide-react";

interface HostelData {
  id: string;
  name: string;
  city: string;
  address: string;
  price: number;
  images: string[] | null;
  gender_type: string;
  facilities: string[] | null;
  verified: boolean;
  description: string | null;
}

const Hostels = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [genderFilter, setGenderFilter] = useState<string>("all");
  const [priceRange, setPriceRange] = useState([3000, 15000]);
  const [facilities, setFacilities] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [hostels, setHostels] = useState<HostelData[]>([]);
  const [loading, setLoading] = useState(true);

  const allFacilities = ["WiFi", "Parking", "Meals", "Security", "Laundry", "Gym"];

  useEffect(() => {
    fetchHostels();
  }, []);

  const fetchHostels = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("hostels")
      .select("*")
      .eq("verified", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching hostels:", error);
    } else {
      setHostels(data || []);
    }
    setLoading(false);
  };

  const filteredHostels = hostels.filter((hostel) => {
    const matchesSearch =
      searchQuery === "" ||
      hostel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hostel.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hostel.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGender = genderFilter === "all" || hostel.gender_type === genderFilter;
    const matchesPrice = hostel.price >= priceRange[0] && hostel.price <= priceRange[1];
    const matchesFacilities =
      facilities.length === 0 ||
      facilities.every((facility) => hostel.facilities?.includes(facility));

    return matchesSearch && matchesGender && matchesPrice && matchesFacilities;
  });

  const toggleFacility = (facility: string) => {
    setFacilities((prev) =>
      prev.includes(facility) ? prev.filter((f) => f !== facility) : [...prev, facility]
    );
  };

  // Transform database hostel to HostelCard format
  const transformHostel = (hostel: HostelData) => ({
    id: hostel.id,
    name: hostel.name,
    city: hostel.city,
    address: hostel.address,
    price: hostel.price,
    image: hostel.images?.[0] || "/placeholder.svg",
    genderType: hostel.gender_type as "Boys" | "Girls" | "Co-ed",
    facilities: hostel.facilities || [],
    verified: hostel.verified,
    description: hostel.description || "",
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Find Your Hostel</h1>
          <p className="text-muted-foreground">Browse through {hostels.length} available hostels</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg border border-border p-6 sticky top-20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setGenderFilter("all");
                    setPriceRange([3000, 15000]);
                    setFacilities([]);
                    setSearchQuery("");
                  }}
                >
                  Clear All
                </Button>
              </div>

              <div className="space-y-6">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="City, area, college..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Gender Type */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Gender Type</label>
                  <Select value={genderFilter} onValueChange={setGenderFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="boys">Boys</SelectItem>
                      <SelectItem value="girls">Girls</SelectItem>
                      <SelectItem value="co-ed">Co-ed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                  </label>
                  <Slider
                    min={3000}
                    max={15000}
                    step={500}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mt-2"
                  />
                </div>

                {/* Facilities */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Facilities</label>
                  <div className="space-y-3">
                    {allFacilities.map((facility) => (
                      <div key={facility} className="flex items-center space-x-2">
                        <Checkbox
                          id={facility}
                          checked={facilities.includes(facility)}
                          onCheckedChange={() => toggleFacility(facility)}
                        />
                        <label
                          htmlFor={facility}
                          className="text-sm cursor-pointer select-none"
                        >
                          {facility}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hostels Grid */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {filteredHostels.length} of {hostels.length} hostels
              </p>
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredHostels.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No hostels found matching your criteria</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setGenderFilter("all");
                    setPriceRange([3000, 15000]);
                    setFacilities([]);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredHostels.map((hostel) => (
                  <HostelCard key={hostel.id} hostel={transformHostel(hostel)} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Hostels;