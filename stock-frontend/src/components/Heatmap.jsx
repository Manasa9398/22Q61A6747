import { useEffect, useState } from 'react';
import { getStocks, getStockPrices } from '../services/api';
import Heatmap from '../components/Heatmap';

function HeatmapPage() {
  const [stocks, setStocks] = useState({});
  const [dataMatrix, setDataMatrix] = useState([]);
  const [minutes, setMinutes] = useState(30);

  useEffect(() => {
    getStocks().then(setStocks);
  }, []);

  useEffect(() => {
    const fetchAll = async () => {
      const tickers = Object.values(stocks);
      const priceMap = {};

      for (const ticker of tickers) {
        const data = await getStockPrices(ticker, minutes);
        priceMap[ticker] = data.map(d => d.price);
      }

      const matrix = tickers.map((t1, i) =>
        tickers.map((t2, j) => computeCorrelation(priceMap[t1], priceMap[t2]))
      );

      setDataMatrix({ tickers, matrix });
    };

    if (Object.keys(stocks).length) fetchAll();
  }, [stocks, minutes]);

  return (
    <div>
      <h2>Correlation Heatmap</h2>
      <input
        type="number"
        value={minutes}
        onChange={(e) => setMinutes(Number(e.target.value))}
        min="1"
      />
      {dataMatrix.tickers && <Heatmap data={dataMatrix} />}
    </div>
  );
}

function computeCorrelation(x, y) {
  const n = x.length;
  const meanX = x.reduce((a, b) => a + b, 0) / n;
  const meanY = y.reduce((a, b) => a + b, 0) / n;

  const numerator = x.map((xi, i) => (xi - meanX) * (y[i] - meanY)).reduce((a, b) => a + b, 0);
  const denomX = Math.sqrt(x.map(xi => (xi - meanX) ** 2).reduce((a, b) => a + b, 0));
  const denomY = Math.sqrt(y.map(yi => (yi - meanY) ** 2).reduce((a, b) => a + b, 0));

  return (numerator / (denomX * denomY)).toFixed(2);
}

export default HeatmapPage;