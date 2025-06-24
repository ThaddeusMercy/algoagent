import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, SortDesc } from 'lucide-react';
import { useCharacters } from '../hooks/useCharacters';
import CharacterCard from '../components/CharacterCard';

const Characters: React.FC = () => {
  const { characters, loading } = useCharacters();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'level' | 'winRate' | 'lastActivity'>('name');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'idle' | 'training' | 'offline'>('all');

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
          <span className="text-white text-lg">Loading characters...</span>
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
            <h1 className="text-3xl md:text-4xl font-bold text-white">Your Characters</h1>
            <p className="text-gray-400 mt-2">Manage and interact with your AI characters</p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
            <span>Create Character</span>
          </motion.button>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700/50 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search characters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
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
                <option value="winRate">Sort by Win Rate</option>
                <option value="lastActivity">Sort by Activity</option>
              </select>
            </div>

            {/* Filter */}
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
          </div>
        </div>

        {/* Characters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredAndSortedCharacters.map((character, index) => (
              <motion.div
                key={character.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <CharacterCard
                  character={character}
                  onClick={() => console.log('Character clicked:', character.name)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredAndSortedCharacters.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">
              {searchTerm || filterStatus !== 'all' 
                ? 'No characters match your search criteria'
                : 'No characters created yet'
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Characters;