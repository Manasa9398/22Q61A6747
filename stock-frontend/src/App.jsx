import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

const StockChart = ({ data }) => {
  if (!data || data.length === 0) return <p>No data to display.</p>;

  // Calculate average price
  const avg = (
    data.reduce((acc, point) => acc + point.price, 0) / data.length
  ).toFixed(2);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" />
        <YAxis domain={['auto', 'auto']} />
        <Tooltip />
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
        <ReferenceLine
          y={parseFloat(avg)}
          label={{ value: Avg: ${avg}, position: 'insideTopRight', fill: 'red' }}
          stroke="red"
          strokeDasharray="3 3"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StockChart;