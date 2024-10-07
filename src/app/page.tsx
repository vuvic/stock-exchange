'use client';

import React, { useEffect, useState } from 'react';
import { getStockQuote } from '../services/finnhubService';

const StockPage: React.FC = () => {
  const [stockData, setStockData] = useState<any>(null);
  const [symbol, setSymbol] = useState('AAPL');
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const fetchStockData = async () => {
      const data = await getStockQuote(symbol);
      console.log('Fetched stock data:', data);
      setStockData(data);
    };

    fetchStockData();

    const intervalId = setInterval(() => {
      fetchStockData();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  if (!stockData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Stock Quote</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          setMinutes(Number(formData.get('minutes')));
          setSeconds(Number(formData.get('seconds')));
          setSymbol(formData.get('symbol') as string);
        }}
      >
        <input type="text" placeholder="MIN" name="minutes" required />
        <input type="text" placeholder="SEC" name="seconds" required />
        <input type="text" placeholder="SYMBOL" name="symbol" required />
        <button type="submit">Submit</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Open</th>
            <th>High</th>
            <th>Low</th>
            <th>Current</th>
            <th>Previous Close</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{symbol}</td>
            <td>{stockData.o}</td>
            <td>{stockData.h}</td>
            <td>{stockData.l}</td>
            <td>{stockData.c}</td>
            <td>{stockData.pc}</td>
            <td>{new Date().toLocaleTimeString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StockPage;