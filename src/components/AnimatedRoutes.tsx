import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "@/components/animations/PageTransition";
import Index from "@/pages/Index";
import Hostels from "@/pages/Hostels";
import HostelDetail from "@/pages/HostelDetail";
import AddHostel from "@/pages/AddHostel";
import Login from "@/pages/Login";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import ResetPassword from "@/pages/ResetPassword";
import NotFound from "@/pages/NotFound";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Index />
            </PageTransition>
          }
        />
        <Route
          path="/hostels"
          element={
            <PageTransition>
              <Hostels />
            </PageTransition>
          }
        />
        <Route
          path="/hostel/:id"
          element={
            <PageTransition>
              <HostelDetail />
            </PageTransition>
          }
        />
        <Route
          path="/add-hostel"
          element={
            <PageTransition>
              <AddHostel />
            </PageTransition>
          }
        />
        <Route
          path="/login"
          element={
            <PageTransition>
              <Login />
            </PageTransition>
          }
        />
        <Route
          path="/admin-login"
          element={
            <PageTransition>
              <AdminLogin />
            </PageTransition>
          }
        />
        <Route
          path="/admin"
          element={
            <PageTransition>
              <AdminDashboard />
            </PageTransition>
          }
        />
        <Route
          path="/reset-password"
          element={
            <PageTransition>
              <ResetPassword />
            </PageTransition>
          }
        />
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
