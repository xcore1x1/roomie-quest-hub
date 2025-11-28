import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Building2 } from "lucide-react";
import { toast } from "sonner";

const AddHostel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    gender_type: "",
    address: "",
    price: "",
    description: "",
    owner_contact: "",
    owner_name: "",
  });
  
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const facilities = ["WiFi", "Parking", "Meals", "Security", "Laundry", "Gym"];

  const handleFacilityChange = (facility: string, checked: boolean) => {
    if (checked) {
      setSelectedFacilities([...selectedFacilities, facility]);
    } else {
      setSelectedFacilities(selectedFacilities.filter(f => f !== facility));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please login to add a hostel");
      navigate("/login");
      return;
    }

    if (!formData.gender_type) {
      toast.error("Please select a gender type");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("hostels").insert({
      name: formData.name,
      city: formData.city,
      gender_type: formData.gender_type,
      address: formData.address,
      price: parseFloat(formData.price),
      description: formData.description,
      owner_contact: formData.owner_contact,
      owner_name: formData.owner_name,
      owner_id: user.id,
      facilities: selectedFacilities,
      verified: false,
    });

    setLoading(false);

    if (error) {
      console.error("Error adding hostel:", error);
      toast.error("Failed to submit hostel. Please try again.");
    } else {
      toast.success("Hostel submitted for review!", {
        description: "Our team will verify and approve your listing soon.",
      });
      navigate("/hostels");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Add Your Hostel</h1>
            <p className="text-muted-foreground">
              List your hostel and reach thousands of students
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-card rounded-lg border border-border p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Hostel Name *</label>
              <Input 
                placeholder="Enter hostel name" 
                required 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">City *</label>
                <Input 
                  placeholder="Enter city" 
                  required 
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Gender Type *</label>
                <Select 
                  value={formData.gender_type}
                  onValueChange={(value) => setFormData({ ...formData, gender_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Boys">Boys</SelectItem>
                    <SelectItem value="Girls">Girls</SelectItem>
                    <SelectItem value="Co-ed">Co-ed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Full Address *</label>
              <Textarea
                placeholder="Enter complete address with landmarks"
                rows={3}
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Price per Month (₹) *</label>
              <Input 
                type="number" 
                placeholder="Enter price" 
                min="0" 
                required 
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description *</label>
              <Textarea
                placeholder="Describe your hostel, nearby colleges, and other details"
                rows={4}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">Facilities</label>
              <div className="grid grid-cols-2 gap-3">
                {facilities.map((facility) => (
                  <div key={facility} className="flex items-center space-x-2">
                    <Checkbox 
                      id={facility} 
                      checked={selectedFacilities.includes(facility)}
                      onCheckedChange={(checked) => handleFacilityChange(facility, checked as boolean)}
                    />
                    <label htmlFor={facility} className="text-sm cursor-pointer">
                      {facility}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Owner Name *</label>
              <Input 
                placeholder="Enter owner name" 
                required 
                value={formData.owner_name}
                onChange={(e) => setFormData({ ...formData, owner_name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Owner Contact Number *</label>
              <Input 
                type="tel" 
                placeholder="+91 98765 43210" 
                required 
                value={formData.owner_contact}
                onChange={(e) => setFormData({ ...formData, owner_contact: e.target.value })}
              />
            </div>

            <div className="pt-4 border-t border-border">
              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? "Submitting..." : "Submit Hostel for Review"}
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-3">
                Your listing will be reviewed and approved within 24-48 hours
              </p>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AddHostel;
