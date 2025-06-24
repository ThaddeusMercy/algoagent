import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
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
  Zap,
  Crown,
  Heart,
  Dice6,
  LogOut
} from 'lucide-react';
import { Button, IconButton } from '../ui';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { characters, loading } = useCharacters();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Overview', path: '/dashboard' },
    { icon: Bot, label: 'My Agents', path: '/agents' },
    { icon: Plus, label: 'Create Agent', path: '/create' },
    { icon: Store, label: 'Marketplace', path: '/marketplace' },
    { icon: MessageCircle, label: 'Chat', path: '/chat' },
    { icon: Gamepad2, label: 'Games', path: '/games' },
    { icon: ArrowLeftRight, label: 'Token Swap', path: '/swap' },
    { icon: Wallet, label: 'Wallet', path: '/wallet' },
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

  const recentAgents = characters.slice(0, 3);

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard' || location.pathname === '/';
    }
    return location.pathname === path;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-900">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin" />
          <span className="font-['Montserrat'] text-[18px] font-[500] text-white">Loading Dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-900 flex">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-neutral-800 border-r border-default-300 flex flex-col transition-all duration-300`}>
        {/* Logo Section */}
        <div className="p-6 border-b border-default-300">
          <div className="flex items-center gap-3">
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
          </nav>

          {/* Bottom Menu */}
          <div className="space-y-2 px-4 border-t border-default-300 pt-6">
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
        <header className="bg-neutral-800 border-b border-default-300 px-6 py-4">
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
                onClick={() => navigate('/create')}
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
        <main className="flex-1 p-6 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-neutral-800 rounded-[20px] border border-default-300 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <div>
                  <p className="font-['Montserrat'] text-[14px] font-[500] text-white/60 mb-1">
                    {stat.label}
                  </p>
                  <p className="font-['Montserrat'] text-[28px] font-[700] text-white">
                    {stat.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Agents */}
            <div className="lg:col-span-2">
              <div className="bg-neutral-800 rounded-[20px] border border-default-300 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-['Montserrat'] text-[20px] font-[700] text-white">
                    Your Agents
                  </h2>
                  <Button
                    variant="neutral-tertiary"
                    onClick={() => navigate('/agents')}
                  >
                    View All
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {recentAgents.length > 0 ? (
                    recentAgents.map((agent) => (
                      <div key={agent.id} className="flex items-center gap-4 p-4 border border-default-300 rounded-[12px] hover:bg-default-300/10 transition-colors">
                        <div className="w-12 h-12 bg-brand-900/20 rounded-xl flex items-center justify-center">
                          {agent.agentType === 'influencer' && <Crown className="w-6 h-6 text-brand-600" />}
                          {agent.agentType === 'companion' && <Heart className="w-6 h-6 text-error-600" />}
                          {agent.agentType === 'gamemaster' && <Dice6 className="w-6 h-6 text-success-600" />}
                          {!agent.agentType && <Bot className="w-6 h-6 text-brand-600" />}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-['Montserrat'] text-[16px] font-[600] text-white">
                            {agent.name}
                          </h3>
                          <p className="font-['Montserrat'] text-[14px] font-[400] text-white/60">
                            {agent.agentType || 'Agent'} • {agent.gamesPlayed} interactions
                          </p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          agent.status === 'active' 
                            ? 'bg-success-900/20 text-success-400' 
                            : 'bg-neutral-900/20 text-neutral-400'
                        }`}>
                          {agent.status}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <Bot className="w-12 h-12 text-white/40 mx-auto mb-4" />
                      <h3 className="font-['Montserrat'] text-[18px] font-[600] text-white mb-2">
                        No agents yet
                      </h3>
                      <p className="font-['Montserrat'] text-[14px] text-white/60 mb-4">
                        Create your first AI agent to get started
                      </p>
                      <Button
                        variant="brand-primary"
                        onClick={() => navigate('/create')}
                        icon={<Plus className="w-4 h-4" />}
                      >
                        Create Agent
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <div className="bg-neutral-800 rounded-[20px] border border-default-300 p-6">
                <h2 className="font-['Montserrat'] text-[20px] font-[700] text-white mb-6">
                  Quick Actions
                </h2>
                <div className="space-y-3">
                  <Button
                    variant="brand-primary"
                    size="large"
                    onClick={() => navigate('/create')}
                    icon={<Plus className="w-5 h-5" />}
                    className="w-full justify-start"
                  >
                    Create New Agent
                  </Button>
                  <Button
                    variant="neutral-secondary"
                    size="large"
                    onClick={() => navigate('/marketplace')}
                    icon={<Store className="w-5 h-5" />}
                    className="w-full justify-start"
                  >
                    Browse Marketplace
                  </Button>
                  <Button
                    variant="neutral-secondary"
                    size="large"
                    onClick={() => navigate('/chat')}
                    icon={<MessageCircle className="w-5 h-5" />}
                    className="w-full justify-start"
                  >
                    Start Chat
                  </Button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-neutral-800 rounded-[20px] border border-default-300 p-6">
                <h2 className="font-['Montserrat'] text-[20px] font-[700] text-white mb-6">
                  Recent Activity
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-success-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-['Montserrat'] text-[14px] font-[500] text-white">
                        Agent deployed
                      </p>
                      <p className="font-['Montserrat'] text-[12px] text-white/60">
                        2 hours ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-brand-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-['Montserrat'] text-[14px] font-[500] text-white">
                        New interaction received
                      </p>
                      <p className="font-['Montserrat'] text-[12px] text-white/60">
                        5 hours ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-warning-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-['Montserrat'] text-[14px] font-[500] text-white">
                        Token swap completed
                      </p>
                      <p className="font-['Montserrat'] text-[12px] text-white/60">
                        1 day ago
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;