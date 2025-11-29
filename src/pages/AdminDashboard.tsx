import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Shield, Building2, CheckCircle, Clock, XCircle } from "lucide-react";
import { toast } from "sonner";

interface Hostel {
  id: string;
  name: string;
  city: string;
  address: string;
  price: number;
  gender_type: string;
  owner_name: string | null;
  owner_contact: string | null;
  verified: boolean;
  created_at: string;
  images: string[] | null;
  facilities: string[] | null;
}

const AdminDashboard = () => {
  const { user, role, loading } = useAuth();
  const navigate = useNavigate();
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [stats, setStats] = useState({ total: 0, verified: 0, pending: 0 });
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && (!user || role !== "admin")) {
      navigate("/admin-login");
    }
  }, [user, role, loading, navigate]);

  useEffect(() => {
    if (user && role === "admin") {
      fetchHostels();
    }
  }, [user, role]);

  const fetchHostels = async () => {
    setLoadingData(true);
    const { data, error } = await supabase
      .from("hostels")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch hostels");
      console.error(error);
    } else {
      setHostels(data || []);
      const total = data?.length || 0;
      const verified = data?.filter((h) => h.verified).length || 0;
      setStats({ total, verified, pending: total - verified });
    }
    setLoadingData(false);
  };

  const handleApprove = async (hostelId: string) => {
    const { error } = await supabase
      .from("hostels")
      .update({ verified: true })
      .eq("id", hostelId);

    if (error) {
      toast.error("Failed to approve hostel");
      console.error(error);
    } else {
      toast.success("Hostel approved successfully");
      fetchHostels();
    }
  };

  const handleReject = async (hostelId: string) => {
    const { error } = await supabase
      .from("hostels")
      .delete()
      .eq("id", hostelId);

    if (error) {
      toast.error("Failed to reject hostel");
      console.error(error);
    } else {
      toast.success("Hostel rejected and removed");
      fetchHostels();
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const pendingHostels = hostels.filter((h) => !h.verified);
  const approvedHostels = hostels.filter((h) => h.verified);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-subtle">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          </div>
          <p className="text-muted-foreground">Manage hostels and approvals</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Hostels</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verified Hostels</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.verified}</div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Approvals Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              Pending Approvals
            </CardTitle>
            <CardDescription>Review and approve new hostel listings</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingData ? (
              <p>Loading...</p>
            ) : pendingHostels.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No pending hostels to approve</p>
            ) : (
              <div className="space-y-6">
                {pendingHostels.map((hostel) => (
                  <div key={hostel.id} className="border border-border rounded-lg p-4">
                    <div className="flex flex-col lg:flex-row gap-4">
                      {/* Images */}
                      <div className="flex gap-2 flex-wrap lg:w-1/3">
                        {hostel.images && hostel.images.length > 0 ? (
                          hostel.images.slice(0, 3).map((img, idx) => (
                            <img
                              key={idx}
                              src={img}
                              alt={`${hostel.name} - ${idx + 1}`}
                              className="w-24 h-24 object-cover rounded-md border"
                            />
                          ))
                        ) : (
                          <div className="w-24 h-24 bg-muted rounded-md flex items-center justify-center text-muted-foreground text-xs">
                            No images
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 space-y-2">
                        <h3 className="font-semibold text-lg">{hostel.name}</h3>
                        <p className="text-sm text-muted-foreground">{hostel.address}, {hostel.city}</p>
                        <div className="flex flex-wrap gap-2 text-sm">
                          <Badge variant="outline">{hostel.gender_type}</Badge>
                          <Badge variant="secondary">₹{hostel.price}/month</Badge>
                        </div>
                        {hostel.facilities && hostel.facilities.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {hostel.facilities.map((f) => (
                              <span key={f} className="text-xs bg-muted px-2 py-1 rounded">{f}</span>
                            ))}
                          </div>
                        )}
                        <p className="text-sm">
                          <span className="text-muted-foreground">Owner:</span> {hostel.owner_name || "N/A"} | {hostel.owner_contact || "N/A"}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex lg:flex-col gap-2 lg:justify-center">
                        <Button
                          size="sm"
                          onClick={() => handleApprove(hostel.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleReject(hostel.id)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Approved Hostels Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Approved Hostels
            </CardTitle>
            <CardDescription>All verified hostel listings</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingData ? (
              <p>Loading...</p>
            ) : approvedHostels.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No approved hostels yet</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>City</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {approvedHostels.map((hostel) => (
                      <TableRow key={hostel.id}>
                        <TableCell>
                          {hostel.images && hostel.images[0] ? (
                            <img
                              src={hostel.images[0]}
                              alt={hostel.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
                              N/A
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="font-medium">{hostel.name}</TableCell>
                        <TableCell>{hostel.city}</TableCell>
                        <TableCell>₹{hostel.price}/month</TableCell>
                        <TableCell>{hostel.owner_name || "N/A"}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">Verified</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;