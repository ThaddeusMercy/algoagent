import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import CreateAgent from './pages/CreateAgent';
import Agents from './pages/Agents';
import Marketplace from './pages/Marketplace';
import Chat from './pages/Chat';
import Games from './pages/Games';
import Swap from './pages/Swap';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<CreateAgent />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/games" element={<Games />} />
          <Route path="/swap" element={<Swap />} />
          <Route path="/wallet" element={<div className="p-6 text-white">Wallet page coming soon...</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;