import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Header, Footer, Home, Menu, Special, About, Contact, Cart, Login, Register, Order, MyOrders } from "./Components/Pages/index";
import OtpVerification from "./Components/Pages/OtpVerification";
import ProtectedRoute from "./Components/ProtectedRoute";
import { Navbar, Dashboard, Orders, Products, Reviews, Settings, Users, Carts, Sales, Editproducts, Addproducts, Admin } from "./Components/Admin/index";

import { AuthProvider, AuthContext } from "./Components/Contexts/AuthContext";
import { useContext } from "react";

function AppContent() {
  const { user, isLogin } = useContext(AuthContext);

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<><Header /><Home /><Footer /></>} />
        <Route path="/menu" element={<><Header /><Menu /><Footer /></>} />
        <Route path="/special" element={<><Header /><Special /><Footer /></>} />
        <Route path="/about" element={<><Header /><About /><Footer /></>} />
        <Route path="/contact" element={<><Header /><Contact /><Footer /></>} />
        <Route path="/cart" element={<><Header /><Cart /><Footer /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<OtpVerification />} />

        <Route path="/checkout" element={
          <ProtectedRoute allowedRoles={["user", "admin"]}>
            <Header /><Order /><Footer />
          </ProtectedRoute>
        } />

        {/* User Protected Routes */}
        <Route path="/my-orders" element={
          <ProtectedRoute allowedRoles={["user", "admin"]}>
            <Header /><MyOrders /><Footer />
          </ProtectedRoute>
        } />

        {/* Admin Protected Routes */}
        <Route path="/admin/*" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <div className="flex h-screen">
              <div className="w-1/5 bg-gray-100 shadow-lg">
                <Navbar />
              </div>
              <div className="w-4/5 p-6 overflow-y-auto">
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="users" element={<Users />} />
                  <Route path="products" element={<Products />} />
                  <Route path="carts" element={<Carts />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="sales" element={<Sales />} />
                  <Route path="reviews" element={<Reviews />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="editproduct/:id" element={<Editproducts />} />
                  <Route path="addproduct" element={<Addproducts />} />
                  <Route path="/" element={<Admin />} />
                </Routes>
              </div>
            </div>
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
