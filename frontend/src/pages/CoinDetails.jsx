import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import CoinGraph from "../components/CoinGraph";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { ArrowLeft, TrendingDown, TrendingUp, DollarSign, BarChart2, Star, Award } from "lucide-react";
import { cn, API_URL } from "../utils";

export default function CoinDetails() {
  const { symbol: id } = useParams(); // URL parameter is mapped as 'symbol' in App.jsx but it holds the coin ID
  const [coin, setCoin] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const [coinRes, chartRes] = await Promise.all([
          axios.get(`${API_URL}/api/coins/${id}`),
          axios.get(`${API_URL}/api/coins/${id}/chart`)
        ]);
        setCoin(coinRes.data);
        setChartData(chartRes.data);
      } catch (error) {
        console.error("Error fetching coin details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoin();
  }, [id]);

  if (loading) return <Loader />;
  if (!coin) return <div className="text-center py-12">Coin not found</div>;

  const currentPrice = coin.market_data?.current_price?.usd || 0;
  const marketCap = coin.market_data?.market_cap?.usd || 0;
  const change24h = coin.market_data?.price_change_percentage_24h || 0;
  const change24hAbs = coin.market_data?.price_change_24h || 0;
  const high24h = coin.market_data?.high_24h?.usd || 0;
  const low24h = coin.market_data?.low_24h?.usd || 0;
  const volume24h = coin.market_data?.total_volume?.usd || 0;
  const rank = coin.market_cap_rank || "N/A";
  
  const isPositive = change24h >= 0;

  // Clean HTML from description
  const cleanDescription = coin.description?.en 
    ? coin.description.en.replace(/<[^>]*>/g, '') 
    : "No description available for this coin.";

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <Link to="/coins" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Coins
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {coin.image?.large && (
              <img src={coin.image.large} alt={coin.name} className="w-12 h-12 object-contain" />
            )}
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                {coin.name} <span className="text-xl text-muted-foreground uppercase">({coin.symbol})</span>
              </h1>
              <div className="text-3xl font-semibold mt-1">
                ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
              </div>
            </div>
          </div>
          <div className={cn("flex flex-col items-end gap-1 text-right")}>
            <div className={cn("flex items-center gap-1 text-xl font-medium", isPositive ? "text-emerald-500" : "text-destructive")}>
              {isPositive ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />}
              {Math.abs(change24h).toFixed(2)}%
            </div>
            <span className={cn("text-sm font-medium", isPositive ? "text-emerald-500/80" : "text-destructive/80")}>
              {isPositive ? "+" : ""}${change24hAbs.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-muted-foreground" /> Market Capitalization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${marketCap.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-500" /> 24h High
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${high24h.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
              <TrendingDown className="w-4 h-4 text-destructive" /> 24h Low
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${low24h.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
              <Award className="w-4 h-4 text-primary" /> Market Cap Rank
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#{rank}</div>
          </CardContent>
        </Card>
      </div>

      {chartData && (
        <CoinGraph prices={chartData.prices} name={coin.name} />
      )}

      <Card>
        <CardHeader>
          <CardTitle>About {coin.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed text-sm whitespace-pre-line">
            {cleanDescription}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
