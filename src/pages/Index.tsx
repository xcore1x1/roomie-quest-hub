import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import HostelCard from "@/components/HostelCard";
import ThreeBackground from "@/components/ThreeBackground";
import { Button } from "@/components/ui/button";
import { mockHostels } from "@/data/mockHostels";
import { ArrowRight, Shield, Search, Star, DollarSign, Home, Users, MapPin, Utensils } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem, ScaleIn } from "@/components/animations/ScrollReveal";
import featurePic from "@/assets/feature-pic.jpg";
import studentBg from "@/assets/student-bg.jpg";

const Index = () => {
  const featuredHostels = mockHostels.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ThreeBackground />
      <Navbar />

      {/* Hero Section */}
      <section 
        className="relative py-24 px-4 overflow-hidden"
        style={{
          backgroundImage: `url(${studentBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/90 via-secondary/80 to-background"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center space-y-6 mb-12">
            <motion.span 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium tracking-wide"
            >
              Trusted by 10,000+ Students
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold text-white leading-tight"
            >
              Find Your Perfect <span className="text-primary">Hostel</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed"
            >
              Discover safe, affordable, and student-friendly accommodations near your college
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <SearchBar />
          </motion.div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto" staggerDelay={0.15}>
            <StaggerItem>
              <motion.div 
                className="bg-card/95 backdrop-blur-md rounded-xl p-6 text-center border border-border shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                  <Shield className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">Verified Hostels</h3>
                <p className="text-sm text-muted-foreground">All listings are verified for your safety</p>
              </motion.div>
            </StaggerItem>
            <StaggerItem>
              <motion.div 
                className="bg-card/95 backdrop-blur-md rounded-xl p-6 text-center border border-border shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                  <Search className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">Easy Search</h3>
                <p className="text-sm text-muted-foreground">Find hostels by location or college</p>
              </motion.div>
            </StaggerItem>
            <StaggerItem>
              <motion.div 
                className="bg-card/95 backdrop-blur-md rounded-xl p-6 text-center border border-border shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                  <Star className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">Best Prices</h3>
                <p className="text-sm text-muted-foreground">Affordable options for every budget</p>
              </motion.div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Featured Hostels Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <ScrollReveal>
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
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
            {featuredHostels.map((hostel) => (
              <StaggerItem key={hostel.id}>
                <HostelCard hostel={hostel} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Special Filters Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="text-center mb-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium tracking-wide mb-4">
                Smart Filters
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
                We created special Filters for <span className="text-primary">YOU</span>
              </h2>
              <p className="text-lg text-muted-foreground">Made for your kind of trip</p>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto mt-12">
            {/* Image Column */}
            <ScaleIn className="flex justify-center lg:justify-start">
              <img 
                src={featurePic} 
                alt="Hostel accommodation" 
                className="rounded-2xl shadow-xl w-full h-full object-cover border border-border"
              />
            </ScaleIn>
            
            {/* Features Column */}
            <div className="space-y-8">
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.1}>
                <StaggerItem>
                  <motion.div 
                    className="flex flex-col items-start gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-primary/10 rounded-xl p-3 flex-shrink-0">
                      <DollarSign className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-1">Budget/Price</h3>
                      <p className="text-sm text-muted-foreground">Find hostels that fit your budget perfectly</p>
                    </div>
                  </motion.div>
                </StaggerItem>
                
                <StaggerItem>
                  <motion.div 
                    className="flex flex-col items-start gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-primary/10 rounded-xl p-3 flex-shrink-0">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-1">Gender</h3>
                      <p className="text-sm text-muted-foreground">Filter by boys, girls, or co-ed hostels</p>
                    </div>
                  </motion.div>
                </StaggerItem>
                
                <StaggerItem>
                  <motion.div 
                    className="flex flex-col items-start gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-primary/10 rounded-xl p-3 flex-shrink-0">
                      <Home className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-1">Room Type</h3>
                      <p className="text-sm text-muted-foreground">Choose from single, double, or shared rooms</p>
                    </div>
                  </motion.div>
                </StaggerItem>
                
                <StaggerItem>
                  <motion.div 
                    className="flex flex-col items-start gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-primary/10 rounded-xl p-3 flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-1">Location/Distance</h3>
                      <p className="text-sm text-muted-foreground">Find hostels near your college or preferred area</p>
                    </div>
                  </motion.div>
                </StaggerItem>
                
                <StaggerItem className="md:col-span-2 md:w-1/2">
                  <motion.div 
                    className="flex flex-col items-start gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-primary/10 rounded-xl p-3 flex-shrink-0">
                      <Utensils className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-1">Meal Availability</h3>
                      <p className="text-sm text-muted-foreground">Check for breakfast, lunch, and dinner options</p>
                    </div>
                  </motion.div>
                </StaggerItem>
              </StaggerContainer>
              
              <ScrollReveal delay={0.3}>
                <div className="pt-4 flex justify-center">
                  <Link to="/hostels">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                      <Button size="lg" className="gap-2 px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all bg-accent hover:bg-accent/90 text-accent-foreground">
                        <Search className="h-5 w-5" />
                        Try the Filters: Search for Hostels
                      </Button>
                    </motion.div>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-secondary">
        <div className="container mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-white mb-4">
              Own a Hostel?
            </h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              List your hostel on Hostella and reach thousands of students looking for accommodation.
            </p>
            <Link to="/add-hostel">
              <motion.div 
                className="inline-block"
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.98 }}
              >
                <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-lg">
                  Add Your Hostel
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
