import { useEffect, useState } from "react";
import axios from "axios";
import CoinCard from "../components/CoinCard";
import Loader from "../components/Loader";
import { Input } from "../components/ui/input";
import { API_URL } from "../utils";

export default function Coins() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/coins`);
        setCoins(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoins();
  }, []);

  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Loader />;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cryptocurrency Markets</h1>
          <p className="text-muted-foreground mt-1">Live data from CoinGecko</p>
        </div>
        <div className="w-full md:w-72">
          <Input 
            placeholder="Search coin (e.g., Bitcoin, BTC)..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCoins.map(coin => (
          <CoinCard key={coin.id} coin={coin} />
        ))}
        {filteredCoins.length === 0 && (
          <div className="col-span-full text-center text-muted-foreground py-12">No coins found matching "{search}"</div>
        )}
      </div>
    </div>
  );
}
