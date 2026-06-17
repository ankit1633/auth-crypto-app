import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function CoinGraph({ prices = [], name }) {
  // Return early if no chart data is available
  if (!prices || prices.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{name} Price Trend (7 Days)</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center border border-dashed rounded-lg bg-muted/10 text-muted-foreground">
          No chart data available.
        </CardContent>
      </Card>
    );
  }

  // Convert CoinGecko response: [[timestamp, price], ...]
  // Into: [{ date: "May 21", price: 65000 }]
  const chartData = prices.map(([timestamp, price]) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      price: Number(price),
    };
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{name} Price Trend (7 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
              <XAxis 
                dataKey="date" 
                stroke="#64748b" 
                fontSize={11} 
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis 
                domain={['auto', 'auto']} 
                stroke="#64748b" 
                fontSize={11}
                tickFormatter={(value) => `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
                tickLine={false}
                axisLine={false}
                dx={-10}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px' }}
                itemStyle={{ color: '#0f172a' }}
                labelStyle={{ color: '#64748b', fontWeight: 'bold' }}
                formatter={(value) => [`$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'Price']}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#3b82f6" 
                strokeWidth={2.5}
                dot={{ r: 2, fill: '#3b82f6', stroke: '#3b82f6', strokeWidth: 1 }} 
                activeDot={{ r: 5, fill: '#1d4ed8' }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
