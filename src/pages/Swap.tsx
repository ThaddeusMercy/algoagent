import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, TrendingUp, Clock, DollarSign } from 'lucide-react';
import TokenSwap from '../components/TokenSwap';

const Swap: React.FC = () => {
  const recentSwaps = [
    { id: '1', from: 'ALGO', to: 'CHAR', amount: '100', timestamp: '2 minutes ago', status: 'completed' },
    { id: '2', from: 'CHAR', to: 'USDC', amount: '500', timestamp: '15 minutes ago', status: 'completed' },
    { id: '3', from: 'USDC', to: 'ALGO', amount: '75', timestamp: '1 hour ago', status: 'completed' },
    { id: '4', from: 'GAME', to: 'CHAR', amount: '200', timestamp: '2 hours ago', status: 'pending' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent"
          >
            Token Swap
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Seamlessly swap tokens on the Algorand blockchain with optimal rates
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Swap Interface */}
          <div className="space-y-6">
            <TokenSwap />
            
            {/* Market Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700/50 p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4">Market Overview</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'ALGO/USD', value: '$0.25', change: '+2.5%', positive: true },
                  { label: 'CHAR/USD', value: '$0.05', change: '+8.2%', positive: true },
                  { label: 'GAME/USD', value: '$0.15', change: '-1.8%', positive: false },
                  { label: 'Volume 24h', value: '$125K', change: '+15.7%', positive: true }
                ].map((stat, index) => (
                  <div key={index} className="bg-gray-700/30 rounded-lg p-3">
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <p className="text-white font-semibold">{stat.value}</p>
                    <p className={`text-sm ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
                      {stat.change}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700/50 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Recent Swaps</h3>
                <RefreshCw className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white transition-colors" />
              </div>

              <div className="space-y-4">
                {recentSwaps.map((swap) => (
                  <div key={swap.id} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-semibold">{swap.from}</span>
                        <RefreshCw className="w-4 h-4 text-gray-400" />
                        <span className="text-white font-semibold">{swap.to}</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-white font-semibold">{swap.amount}</p>
                      <div className="flex items-center space-x-2">
                        <span className={`w-2 h-2 rounded-full ${
                          swap.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                        }`} />
                        <span className="text-gray-400 text-sm">{swap.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Liquidity Pools */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700/50 p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <DollarSign className="w-6 h-6" />
                <span>Top Liquidity Pools</span>
              </h3>
              
              <div className="space-y-3">
                {[
                  { pair: 'ALGO/USDC', tvl: '$2.5M', apr: '12.5%' },
                  { pair: 'CHAR/ALGO', tvl: '$850K', apr: '18.2%' },
                  { pair: 'GAME/USDC', tvl: '$620K', apr: '15.7%' },
                  { pair: 'CHAR/USDC', tvl: '$445K', apr: '22.1%' }
                ].map((pool, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer">
                    <div>
                      <p className="text-white font-semibold">{pool.pair}</p>
                      <p className="text-gray-400 text-sm">TVL: {pool.tvl}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 font-semibold">{pool.apr} APR</p>
                      <p className="text-gray-400 text-sm">Rewards</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Swap;