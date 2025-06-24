import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bot, Home, MessageCircle, Gamepad2, RefreshCw, Settings, Wallet, Zap, Users, Sparkles } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/create', icon: Sparkles, label: 'Create Agent' },
    { path: '/agents', icon: Bot, label: 'My Agents' },
    { path: '/marketplace', icon: Users, label: 'Marketplace' },
    { path: '/chat', icon: MessageCircle, label: 'Chat' },
    { path: '/games', icon: Gamepad2, label: 'Games' },
    { path: '/swap', icon: RefreshCw, label: 'Token Swap' },
    { path: '/wallet', icon: Wallet, label: 'Wallet' },
  ];

  return (
    <nav className="bg-gray-900/80 backdrop-blur-md border-b border-gray-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  AlgoAgent
                </span>
                <div className="text-xs text-gray-400 -mt-1">AI Launchpad</div>
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-600/25'
                      : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-400 text-sm font-medium">1,250 ALGO</span>
            </div>
            <button className="p-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">AI</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;