// src/Pages/CoinDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { SingleCoin, HistoricalChart } from '../models/Api';
import './Coins.css';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface HistoricalData {
    prices: [number, number][];
  }
  
  interface Coin {
    name: string;
    description: {
      en: string;
    };
  }


const CoinDetailPage = () => {
    const [coin, setCoin] = useState<Coin | null>(null);
    const [historicalData, setHistoricalData] = useState<HistoricalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState('INR'); // Set default currency or get from user preference

  const { id } = useParams<{ id: string }>(); 
  

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const coinResponse = await axios.get(SingleCoin(id));
        setCoin(coinResponse.data);
        
        const historicalResponse = await axios.get(HistoricalChart(id, 365, currency));
        setHistoricalData(historicalResponse.data);
      } catch (error) {
        console.error('Error fetching coin data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [id, currency]);

  if (loading) return <div>Loading...</div>;

  if (!coin || !historicalData) return <div>Error loading coin data.</div>;

  // Prepare data for the chart
  const data = {
    labels: historicalData.prices.map(([timestamp]) => new Date(timestamp).toLocaleDateString()),
    datasets: [
      {
        label: `Price in ${currency.toUpperCase()}`,
        data: historicalData.prices.map(([_, price]) => price),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="coin-detail-container">
            <h1>{coin.name}</h1>
            <p>{coin.description.en}</p>
            <div className="chart-container">
                <h2>Price Chart</h2>
                <Line data={data} />
            </div>
        </div>
  );
};

export default CoinDetailPage;
