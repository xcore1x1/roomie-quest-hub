import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import HostelCard from "@/components/HostelCard";
import ThreeBackground from "@/components/ThreeBackground";
import { Button } from "@/components/ui/button";
import { mockHostels } from "@/data/mockHostels";
import { ArrowRight, Shield, Search, Star } from "lucide-react";

const Index = () => {
  const featuredHostels = mockHostels.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <ThreeBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center space-y-6 mb-10">
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Find Your Perfect Hostel
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Discover safe, affordable, and student-friendly accommodations near your college
            </p>
          </div>

          <SearchBar />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center text-white">
              <Shield className="h-12 w-12 mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Verified Hostels</h3>
              <p className="text-sm text-white/80">All listings are verified for your safety</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center text-white">
              <Search className="h-12 w-12 mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Easy Search</h3>
              <p className="text-sm text-white/80">Find hostels by location or college</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center text-white">
              <Star className="h-12 w-12 mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Best Prices</h3>
              <p className="text-sm text-white/80">Affordable options for every budget</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Hostels Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Featured Hostels</h2>
              <p className="text-muted-foreground mt-2">Handpicked accommodations for students</p>
            </div>
            <Link to="/hostels">
              <Button variant="outline" className="gap-2">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredHostels.map((hostel) => (
              <HostelCard key={hostel.id} hostel={hostel} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-muted">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Own a Hostel?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            List your hostel on Hostella and reach thousands of students looking for accommodation.
          </p>
          <Link to="/add-hostel">
            <Button size="lg" className="gap-2">
              Add Your Hostel
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
