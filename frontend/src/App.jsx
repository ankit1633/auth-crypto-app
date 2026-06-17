import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Coins from "./pages/Coins";
import CoinDetails from "./pages/CoinDetails";
import Weather from "./pages/Weather";
import Profile from "./pages/Profile";

const ProtectedRoute = ({ children }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/sign-in/*" element={<div className="flex justify-center mt-12"><RedirectToSignIn /></div>} />
          <Route path="/sign-up/*" element={<div className="flex justify-center mt-12"><RedirectToSignIn /></div>} />
          
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/coins" element={<ProtectedRoute><Coins /></ProtectedRoute>} />
          <Route path="/coins/:symbol" element={<ProtectedRoute><CoinDetails /></ProtectedRoute>} />
          <Route path="/weather" element={<ProtectedRoute><Weather /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
