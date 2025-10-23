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
import { mockHostels } from "@/data/mockHostels";
import { Search, SlidersHorizontal } from "lucide-react";

const Hostels = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [genderFilter, setGenderFilter] = useState<string>("all");
  const [priceRange, setPriceRange] = useState([5000, 10000]);
  const [facilities, setFacilities] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const allFacilities = ["WiFi", "Parking", "Meals", "Security", "Laundry", "Gym"];

  const filteredHostels = mockHostels.filter((hostel) => {
    const matchesSearch =
      searchQuery === "" ||
      hostel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hostel.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hostel.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGender = genderFilter === "all" || hostel.genderType === genderFilter;
    const matchesPrice = hostel.price >= priceRange[0] && hostel.price <= priceRange[1];
    const matchesFacilities =
      facilities.length === 0 ||
      facilities.every((facility) => hostel.facilities.includes(facility));

    return matchesSearch && matchesGender && matchesPrice && matchesFacilities;
  });

  const toggleFacility = (facility: string) => {
    setFacilities((prev) =>
      prev.includes(facility) ? prev.filter((f) => f !== facility) : [...prev, facility]
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Find Your Hostel</h1>
          <p className="text-muted-foreground">Browse through {mockHostels.length} available hostels</p>
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
                    setPriceRange([5000, 10000]);
                    setFacilities([]);
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
                      <SelectItem value="Boys">Boys</SelectItem>
                      <SelectItem value="Girls">Girls</SelectItem>
                      <SelectItem value="Co-ed">Co-ed</SelectItem>
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
                Showing {filteredHostels.length} of {mockHostels.length} hostels
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

            {filteredHostels.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No hostels found matching your criteria</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setGenderFilter("all");
                    setPriceRange([5000, 10000]);
                    setFacilities([]);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredHostels.map((hostel) => (
                  <HostelCard key={hostel.id} hostel={hostel} />
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
