import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import WeatherCard from "../components/WeatherCard";
import { API_URL } from "../utils";

export default function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/weather`);
        setWeatherData(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  if (loading) return <Loader />;

  const stations = weatherData?.metadata?.stations || [];
  const items = weatherData?.items?.[0] || {};
  const readings = items.readings || [];
  const timestamp = items.timestamp;
  const apiStatus = weatherData?.api_info?.status || "unknown";

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Singapore Weather</h1>
          <p className="text-muted-foreground mt-1">Real-time air temperature across stations</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-card text-xs font-medium">
            <span className="text-muted-foreground">API Status:</span>
            <span className="flex items-center gap-1.5 font-bold">
              <span className={`w-2 h-2 rounded-full ${apiStatus === "healthy" ? "bg-emerald-500 animate-pulse" : "bg-destructive"}`} />
              <span className="capitalize">{apiStatus}</span>
            </span>
          </div>
          {timestamp && (
            <div className="px-3 py-1.5 rounded-full border bg-card text-xs font-medium text-muted-foreground">
              Reading Time: {new Date(timestamp).toLocaleString()}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {stations.map(station => {
          const reading = readings.find(r => r.station_id === station.id);
          return (
            <WeatherCard 
              key={station.id} 
              station={station} 
              temperature={reading} 
              timestamp={timestamp}
            />
          );
        })}
      </div>
      {stations.length === 0 && (
        <div className="text-center text-muted-foreground py-12">No weather stations available.</div>
      )}
    </div>
  );
}
