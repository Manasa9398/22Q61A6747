import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from 'recharts';

function StockChart({ data }) {
    if (!data || data.length === 0) return <p>No data</p>;

    const formatted = data.map(d => ({
        time: new Date(d.lastUpdatedAt).toLocaleTimeString(),
        price: d.price
    }));

    const avg = (formatted.reduce((a, b) => a + b.price, 0) / formatted.length).toFixed(2);

    return (
        <LineChart width={800} height={400} data={formatted}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#8884d8" />
            <ReferenceLine
                y={parseFloat(avg)}
                label={{ value: Avg: ${avg}, position: 'insideTopRight', fill: 'red' }}
            stroke="red"
            strokeDasharray="3 3"
/>    </LineChart>
    );
}

export default StockChart;