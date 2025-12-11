
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./Admin/Login";
import AdminLayout from "./Admin/Layout";
import Dashboard from "./Admin/Dashboard";
import Members from "./Admin/Members";
import Expiring from "./Admin/Expiring";
import { AdminProvider, useAdmin } from "./Admin/context/AdminContext";

import { Helmet } from "react-helmet-async";

function AppRoutes() {
  const { admin } = useAdmin();
  
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin/login" element={admin ? <Navigate to="/admin/dashboard" replace /> : <Login />} />

      {/* Admin Routes */}
      {admin ? (
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="members" element={<Members />} />
          <Route path="expiring" element={<Expiring />} />
        </Route>
      ) : (
        <Route path="/admin/*" element={<Navigate to="/admin/login" replace />} />
      )}
    </Routes>
  );
}

function App() {
  return (
    <div className="font-vazirmatn text-white">
      <Helmet titleTemplate="%s | JayRam Fitness" defaultTitle="JayRam Fitness" />
      <AdminProvider>
        <AppRoutes />
      </AdminProvider>
    </div>
  );
}

export default App;
