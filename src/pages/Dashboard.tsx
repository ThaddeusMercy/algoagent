import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCharacters } from '../hooks/useCharacters';
import { 
  Bot, 
  Plus, 
  Store, 
  MessageCircle, 
  Gamepad2, 
  ArrowLeftRight, 
  Wallet, 
  Settings, 
  User,
  Home,
  TrendingUp,
  Users,
  LogOut
} from 'lucide-react';
import { Button } from '../ui';

// Import section components
import OverviewSection from '../components/OverviewSection';
import MyAgentSection from '../components/MyAgentsSection';
import CreateAgentSection from '../components/CreateAgentSection';
import MarketplaceSection from '../components/MarketplaceSection';
import ChatSection from '../components/ChatSection';
import GamesSection from '../components/GamesSection';
import TokenSwapSection from '../components/TokenSwapSection';
import WalletSection from '../components/WalletSection';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { characters, loading } = useCharacters();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState('overview');

  const menuItems = [
    { icon: Home, label: 'Overview', view: 'overview' },
    { icon: Bot, label: 'My Agents', view: 'agents' },
    { icon: Plus, label: 'Create Agent', view: 'create' },
    { icon: Store, label: 'Marketplace', view: 'marketplace' },
    { icon: MessageCircle, label: 'Chat', view: 'chat' },
    { icon: Gamepad2, label: 'Games', view: 'games' },
    { icon: ArrowLeftRight, label: 'Token Swap', view: 'swap' },
    { icon: Wallet, label: 'Wallet', view: 'wallet' },
  ];

  const bottomMenuItems = [
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  const stats = [
    {
      icon: Bot,
      label: 'Active Agents',
      value: characters.filter(c => c.status === 'active').length,
      color: 'text-white',
      bg: 'bg-brand-900/20'
    },
    {
      icon: Users,
      label: 'Total Interactions',
      value: characters.reduce((sum, c) => sum + c.gamesPlayed, 0).toLocaleString(),
      color: 'text-success-600',
      bg: 'bg-success-900/20'
    },
    {
      icon: Wallet,
      label: 'Portfolio Value',
      value: `${characters.reduce((sum, c) => sum + c.tokenBalance, 0).toFixed(2)} ALGO`,
      color: 'text-warning-600',
      bg: 'bg-warning-900/20'
    },
    {
      icon: TrendingUp,
      label: 'Platform Tokens',
      value: '1,250 ALGO',
      color: 'text-error-600',
      bg: 'bg-error-900/20'
    }
  ];

  const isActive = (view: string) => {
    return currentView === view;
  };

  const renderMainContent = () => {
    switch (currentView) {
      case 'overview':
        return <OverviewSection characters={characters} stats={stats} setCurrentView={setCurrentView} />;
      case 'agents':
        return <MyAgentsSection characters={characters} setCurrentView={setCurrentView} />;
      case 'create':
        return <CreateAgentSection setCurrentView={setCurrentView} />;
      case 'marketplace':
        return <MarketplaceSection setCurrentView={setCurrentView} />;
      case 'chat':
        return <ChatSection characters={characters} />;
      case 'games':
        return <GamesSection characters={characters} />;
      case 'swap':
        return <TokenSwapSection />;
      case 'wallet':
        return <WalletSection />;
      default:
        return <OverviewSection characters={characters} stats={stats} setCurrentView={setCurrentView} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-900 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="w-16 h-16 bg-brand-600 rounded-xl flex items-center justify-center">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-brand-400 border-t-transparent rounded-xl animate-spin" />
          </div>
          <div className="text-center">
            <h2 className="font-['Montserrat'] text-[24px] font-[700] text-white mb-2">
              Chain Agent
            </h2>
            <p className="font-['Montserrat'] text-[16px] font-[400] text-white/80">
              Loading Dashboard...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-900 flex">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-neutral-800 border-r border-amber-900/20 flex flex-col transition-all duration-300`}>
        {/* Logo Section */}
        <div className="p-6 border-b border-amber-900/20">
          <div 
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => window.location.href = '/'}
          >
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            {!sidebarCollapsed && (
              <span className="font-['Montserrat'] text-[20px] font-[700] text-white">
                Chain Agent
              </span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 flex flex-col justify-between py-6">
          <nav className="space-y-2 px-4">
            {menuItems.map((item) => (
              <button
                key={item.view}
                onClick={() => setCurrentView(item.view)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                  isActive(item.view)
                    ? 'bg-brand-600 text-white'
                    : 'text-white hover:bg-default-300/20'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && (
                  <span className="font-['Montserrat'] text-[14px] font-[500]">
                    {item.label}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Bottom Menu */}
          <div className="space-y-2 px-4 border-t border-amber-900/20 pt-6">
            {bottomMenuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-brand-600 text-white'
                    : 'text-white hover:bg-default-300/20'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && (
                  <span className="font-['Montserrat'] text-[14px] font-[500]">
                    {item.label}
                  </span>
                )}
              </button>
            ))}
            
            <button
              onClick={() => {/* Add logout logic */}}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors text-error-600 hover:bg-error-900/20"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && (
                <span className="font-['Montserrat'] text-[14px] font-[500]">
                  Logout
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-neutral-800 border-b border-amber-900/20 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 hover:bg-default-300/20 rounded-lg transition-colors"
              >
                <div className="w-5 h-5 flex flex-col gap-1">
                  <div className="w-full h-0.5 bg-white rounded"></div>
                  <div className="w-full h-0.5 bg-white rounded"></div>
                  <div className="w-full h-0.5 bg-white rounded"></div>
                </div>
              </button>
              <div>
                <h1 className="font-['Montserrat'] text-[24px] font-[700] text-white">
                  Dashboard Overview
                </h1>
                <p className="font-['Montserrat'] text-[14px] font-[400] text-white/60">
                  Welcome back! Here's what's happening with your agents.
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="brand-primary"
                onClick={() => setCurrentView('create')}
                icon={<Plus className="w-4 h-4" />}
              >
                Create Agent
              </Button>
              <div className="w-10 h-10 bg-brand-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;