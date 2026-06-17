import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Coins, CloudMoon, User } from "lucide-react";

export default function Dashboard() {
  const { user } = useUser();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.firstName || 'User'}!</h1>
        <p className="text-muted-foreground mt-2">Here is an overview of your dashboard.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link to="/coins">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Crypto Markets</CardTitle>
              <Coins className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Top 50</div>
              <p className="text-xs text-muted-foreground mt-1">Live from Binance</p>
            </CardContent>
          </Card>
        </Link>
        <Link to="/weather">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weather</CardTitle>
              <CloudMoon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Singapore</div>
              <p className="text-xs text-muted-foreground mt-1">Real-time updates</p>
            </CardContent>
          </Card>
        </Link>
        <Link to="/profile">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Your Profile</CardTitle>
              <User className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Manage Account</div>
              <p className="text-xs text-muted-foreground mt-1">Update details & avatar</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
