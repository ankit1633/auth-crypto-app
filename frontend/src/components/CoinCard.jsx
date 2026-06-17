import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "../utils";

export default function CoinCard({ coin }) {
  const isPositive = parseFloat(coin.price_change_percentage_24h) >= 0;

  return (
    <Link to={`/coins/${coin.id}`}>
      <Card className="hover:border-primary transition-colors cursor-pointer group">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center gap-2">
            {coin.image && (
              <img src={coin.image} alt={coin.name} className="w-6 h-6 object-contain" />
            )}
            <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">
              {coin.name} <span className="text-xs text-muted-foreground uppercase">({coin.symbol})</span>
            </CardTitle>
          </div>
          <div className={cn("flex items-center gap-1 text-sm font-medium", isPositive ? "text-emerald-500" : "text-destructive")}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {coin.price_change_percentage_24h ? `${Math.abs(parseFloat(coin.price_change_percentage_24h)).toFixed(2)}%` : "0.00%"}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold">
            ${coin.current_price ? coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 }) : "0.00"}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Mkt Cap: ${coin.market_cap ? coin.market_cap.toLocaleString() : "0"}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
