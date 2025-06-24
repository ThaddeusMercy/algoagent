import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  TrendingUp,
  Search,
  Filter,
  SortDesc,
  MessageCircle,
  Settings,
  Bot
} from 'lucide-react';
import { Button } from '../ui';
import { Character } from '../types';

interface MyAgentsSectionProps {
  characters: Character[];
  setCurrentView: (view: string) => void;
}

const MyAgentsSection: React.FC<MyAgentsSectionProps> = ({
  characters,
  setCurrentView
}) => {
  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="font-['Montserrat'] text-[48px] font-[900] text-white leading-[48px]">My AI Agents</h1>
          <p className="font-['Montserrat'] text-[18px] font-[400] text-white/60 mt-2">Manage and interact with your deployed AI agents</p>
        </div>
        
        <Button
          variant="brand-primary"
          onClick={() => setCurrentView('create')}
          icon={<Plus className="w-5 h-5" />}
        >
          Create New Agent
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Agents', value: characters.length, color: 'text-brand-600' },
          { label: 'Active Agents', value: characters.filter(c => c.status === 'active').length, color: 'text-success-400' },
          { label: 'Total Interactions', value: characters.reduce((sum, c) => sum + c.gamesPlayed, 0), color: 'text-brand-400' },
          { label: 'Avg Performance', value: `${(characters.reduce((sum, c) => sum + c.winRate, 0) / characters.length || 0).toFixed(1)}%`, color: 'text-warning-400' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-neutral-800 rounded-[20px] border border-amber-900/20 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-['Montserrat'] text-[14px] font-[500] text-white/60">{stat.label}</p>
                <p className={`font-['Montserrat'] text-[28px] font-[700] ${stat.color}`}>{stat.value}</p>
              </div>
              <TrendingUp className={`w-8 h-8 ${stat.color}`} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="bg-neutral-800 rounded-[20px] border border-amber-900/20 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
            <input
              type="text"
              placeholder="Search agents..."
              className="w-full pl-10 pr-4 py-3 bg-neutral-700 border border-amber-800/30 rounded-[12px] text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-brand-600 font-['Montserrat'] text-[14px]"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="text-white/40 w-5 h-5" />
            <select className="bg-neutral-700 border border-amber-800/30 rounded-[12px] text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-600 font-['Montserrat'] text-[14px]">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="idle">Idle</option>
              <option value="training">Training</option>
              <option value="offline">Offline</option>
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center space-x-2">
            <SortDesc className="text-white/40 w-5 h-5" />
            <select className="bg-neutral-700 border border-amber-800/30 rounded-[12px] text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-600 font-['Montserrat'] text-[14px]">
              <option value="name">Sort by Name</option>
              <option value="level">Sort by Level</option>
              <option value="winRate">Sort by Performance</option>
              <option value="lastActivity">Sort by Activity</option>
            </select>
          </div>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {characters.map((character, index) => (
            <motion.div
              key={character.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="relative group bg-neutral-800 rounded-[20px] border border-amber-900/20 overflow-hidden hover:border-brand-600/50 transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={character.avatar}
                    alt={character.name}
                    className="w-16 h-16 rounded-[12px] object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-['Montserrat'] text-[20px] font-[700] text-white">{character.name}</h3>
                    <p className="font-['Montserrat'] text-[14px] font-[400] text-white/60">{character.agentType || 'Agent'}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    character.status === 'active' 
                      ? 'bg-success-900/20 text-success-400' 
                      : 'bg-neutral-900/20 text-neutral-400'
                  }`}>
                    {character.status}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-['Montserrat'] text-[14px] font-[500] text-white/60">Level</span>
                    <span className="font-['Montserrat'] text-[14px] font-[600] text-white">{character.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-['Montserrat'] text-[14px] font-[500] text-white/60">Interactions</span>
                    <span className="font-['Montserrat'] text-[14px] font-[600] text-white">{character.gamesPlayed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-['Montserrat'] text-[14px] font-[500] text-white/60">Win Rate</span>
                    <span className="font-['Montserrat'] text-[14px] font-[600] text-white">{character.winRate}%</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <Button
                    variant="brand-primary"
                    size="small"
                    onClick={() => setCurrentView('chat')}
                    icon={<MessageCircle className="w-4 h-4" />}
                    className="flex-1"
                  >
                    Chat
                  </Button>
                  <Button
                    variant="neutral-secondary"
                    size="small"
                    onClick={() => {}}
                    icon={<Settings className="w-4 h-4" />}
                  >
                    Settings
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {characters.length === 0 && (
        <div className="text-center py-12">
          <Bot className="w-12 h-12 text-white/40 mx-auto mb-4" />
          <div className="font-['Montserrat'] text-[20px] font-[600] text-white/60 mb-4">
            No agents created yet
          </div>
          <Button
            variant="brand-primary"
            onClick={() => setCurrentView('create')}
            icon={<Plus className="w-5 h-5" />}
          >
            Create Your First Agent
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyAgentsSection; 