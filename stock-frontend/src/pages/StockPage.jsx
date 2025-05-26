import { useEffect, useState } from 'react';
import { getStocks, getStockPrices } from '../services/api';
import StockChart from '../components/StockChart';

function StockPage() {
  const [stocks, setStocks] = useState({});
  const [selected, setSelected] = useState('');
  const [minutes, setMinutes] = useState(30);
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    getStocks().then(setStocks);
  }, []);

  useEffect(() => {
    if (selected) {
      getStockPrices(selected, minutes).then(setPrices);
    }
  }, [selected, minutes]);

  return (
    <div>
      <h2>Stock Price Viewer</h2>
      <select onChange={(e) => setSelected(e.target.value)}>
        <option value="">Select Stock</option>
        {Object.entries(stocks).map(([name, ticker]) => (
          <option key={ticker} value={ticker}>{name}</option>
        ))}
      </select>
      <input
        type="number"
        value={minutes}
        onChange={(e) => setMinutes(Number(e.target.value))}
        min="1"
        placeholder="Minutes"
      />
      {selected && <StockChart data={prices} />}
    </div>
  );
}

export default StockPage;