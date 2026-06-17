import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
import { LayoutDashboard, Coins, CloudMoon, User } from "lucide-react";

export default function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <nav className="border-b bg-background sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tight text-primary flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Coins className="w-5 h-5 text-primary-foreground" />
          </div>
          CryptoDash
        </Link>
        
        {isSignedIn && (
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors">
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </Link>
            <Link to="/coins" className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors">
              <Coins className="w-4 h-4" /> Coins
            </Link>
            <Link to="/weather" className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors">
              <CloudMoon className="w-4 h-4" /> Weather
            </Link>
            <Link to="/profile" className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors">
              <User className="w-4 h-4" /> Profile
            </Link>
          </div>
        )}

        <div className="flex items-center gap-4">
          {!isSignedIn ? (
            <Link to="/sign-in" className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
              Sign In
            </Link>
          ) : (
            <UserButton afterSignOutUrl="/sign-in" />
          )}
        </div>
      </div>
    </nav>
  );
}
