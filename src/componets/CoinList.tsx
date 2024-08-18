import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CoinTable.css';

function CoinTable() {
    const [coins, setCoins] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRowClick = (coinId:string) => {
        navigate(`/coins/${coinId}`);
    };

    useEffect(() => {
        //fetchCoins is an async function that fetches the data from the API
        const fetchCoins = async () => {
            try {
                const response = await axios.get(
                    'https://api.coingecko.com/api/v3/coins/markets',
                    {
                        params: {
                            vs_currency: 'INR',
                            order: 'market_cap_desc',
                            per_page: 100,
                            page: 1,
                            sparkline: false,
                        },
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                // console.log(response.data);
                setCoins(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCoins();
    }, []);

    return (
        <div>
            {error ? (
                <p>{error}</p>
            ) : (
                <table>
                    <thead style={
                        {  color: "white" }
                    }>
                        <tr>
                            <th>Coin</th>
                            <th>Price</th>
                            <th>24h Change</th>
                            <th>Market Cap</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coins.map((coin: any) => (
                            <tr key={coin.id} onClick={() => handleRowClick(coin.id)}>
                                <td>
                                    <img 
                                        src={coin.image} 
                                        alt={coin.name} 
                                        style={{ width: "30px", marginRight: "10px" }} 
                                    />
                                    {coin.name} ({coin.symbol.toUpperCase()})
                                </td>
                                <td>₹ {coin.current_price.toLocaleString()}</td>
                                <td style={{ color: coin.price_change_percentage_24h > 0 ? "green" : "red" }}>
                                    {coin.price_change_percentage_24h.toFixed(2)}%
                                </td>
                                <td>₹ {coin.market_cap.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default CoinTable;
