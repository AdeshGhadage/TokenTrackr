import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Headers from './componets/Header';
import AccountPage from './Pages/AccountPage';
import CoinsPage from './Pages/CoinsPage';
import CoinDetailPage from './Pages/CoinDetailPage';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Headers />
        <Routes>
          <Route path="/" element={<CoinsPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/coins/:id" element={<CoinDetailPage/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
