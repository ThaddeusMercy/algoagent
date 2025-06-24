import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, SortDesc, Crown, Heart, Dice6, MessageCircle, Settings, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCharacters } from '../hooks/useCharacters';
import CharacterCard from '../components/CharacterCard';

const Agents: React.FC = () => {
  const { characters, loading } = useCharacters();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'level' | 'winRate' | 'lastActivity'>('name');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'idle' | 'training' | 'offline'>('all');
  const [filterType, setFilterType] = useState<'all' | 'influencer' | 'companion' | 'gamemaster'>('all');

  const getAgentTypeIcon = (type: string) => {
    switch (type) {
      case 'influencer': return Crown;
      case 'companion': return Heart;
      case 'gamemaster': return Dice6;
      default: return Crown;
    }
  };

  const filteredAndSortedCharacters = React.useMemo(() => {
    let filtered = characters.filter(character =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus === 'all' || character.status === filterStatus)
    );

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'level':
          return b.level - a.level;
        case 'winRate':
          return b.winRate - a.winRate;
        case 'lastActivity':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }, [characters, searchTerm, sortBy, filterStatus]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 flex items-center justify-center">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-white text-lg">Loading your agents...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">My AI Agents</h1>
            <p className="text-gray-400 mt-2">Manage and interact with your deployed AI agents</p>
          </div>
          
          <Link to="/create">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
              <span>Create New Agent</span>
            </motion.button>
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Agents', value: characters.length, color: 'text-blue-500' },
            { label: 'Active Agents', value: characters.filter(c => c.status === 'active').length, color: 'text-green-500' },
            { label: 'Total Interactions', value: characters.reduce((sum, c) => sum + c.gamesPlayed, 0), color: 'text-purple-500' },
            { label: 'Avg Performance', value: `${(characters.reduce((sum, c) => sum + c.winRate, 0) / characters.length || 0).toFixed(1)}%`, color: 'text-yellow-500' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700/50 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
                <TrendingUp className={`w-8 h-8 ${stat.color}`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700/50 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search agents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Agent Type Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400 w-5 h-5" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="bg-gray-700/50 border border-gray-600/50 rounded-xl text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Types</option>
                <option value="influencer">Social Influencer</option>
                <option value="companion">AI Companion</option>
                <option value="gamemaster">Game Master</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400 w-5 h-5" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="bg-gray-700/50 border border-gray-600/50 rounded-xl text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="idle">Idle</option>
                <option value="training">Training</option>
                <option value="offline">Offline</option>
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <SortDesc className="text-gray-400 w-5 h-5" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-gray-700/50 border border-gray-600/50 rounded-xl text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
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
            {filteredAndSortedCharacters.map((character, index) => (
              <motion.div
                key={character.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <CharacterCard
                  character={character}
                  onClick={() => console.log('Agent clicked:', character.name)}
                />
                
                {/* Quick Actions Overlay */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                  <Link to="/chat">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-purple-600/80 backdrop-blur-sm rounded-lg text-white hover:bg-purple-600 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </motion.button>
                  </Link>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-gray-600/80 backdrop-blur-sm rounded-lg text-white hover:bg-gray-600 transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredAndSortedCharacters.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-4">
              {searchTerm || filterStatus !== 'all' || filterType !== 'all'
                ? 'No agents match your search criteria'
                : 'No agents created yet'
              }
            </div>
            {!searchTerm && filterStatus === 'all' && filterType === 'all' && (
              <Link to="/create">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 mx-auto"
                >
                  <Plus className="w-5 h-5" />
                  <span>Create Your First Agent</span>
                </motion.button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Agents;