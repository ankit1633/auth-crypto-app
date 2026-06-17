import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ThermometerSun, MapPin, Clock } from "lucide-react";

export default function WeatherCard({ station, temperature, timestamp }) {
  const formattedTime = timestamp
    ? new Date(timestamp).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
    : "N/A";

  const latitude = station.location?.latitude?.toFixed(4) || "N/A";
  const longitude = station.location?.longitude?.toFixed(4) || "N/A";

  return (
    <Card className="hover:border-primary/50 transition-colors shadow-sm bg-card hover:shadow-md">
      <CardHeader className="flex flex-row items-start justify-between pb-2 space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-base font-semibold leading-tight">{station.name}</CardTitle>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3 text-muted-foreground/75" />
            <span>{latitude}, {longitude}</span>
          </div>
        </div>
        <div className="p-2 bg-primary/10 rounded-full text-primary shrink-0">
          <ThermometerSun className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-3xl font-extrabold tracking-tight text-primary">
          {temperature ? `${temperature.value}°C` : "N/A"}
        </div>
        
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1 border-t">
          <Clock className="w-3 h-3" />
          <span>Last updated: {formattedTime}</span>
        </div>
      </CardContent>
    </Card>
  );
}
