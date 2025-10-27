import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/hostels?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-card/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-border/50 hover:shadow-primary/10 transition-shadow">
        <div className="flex-1 relative group">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
          <Input
            type="text"
            placeholder="Search by city, area, or college name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-14 border-0 focus-visible:ring-2 focus-visible:ring-primary bg-background/50 rounded-xl text-base placeholder:text-muted-foreground/70"
          />
        </div>
        <Button type="submit" size="lg" className="gap-2 px-10 h-14 rounded-xl text-base font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105">
          <Search className="h-5 w-5" />
          Search Hostels
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
