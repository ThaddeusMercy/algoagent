import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, TrendingUp, Star, Crown, Heart, Dice6, MessageCircle, Zap, Users, Eye } from 'lucide-react';

const featuredAgents = [
  {
    id: '1',
    name: 'Luna the Influencer',
    type: 'influencer',
    creator: 'AlgoCreator',
    avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Fashion and lifestyle influencer with 50K+ engaged followers',
    price: 250,
    marketCap: '125K',
    holders: 1250,
    rating: 4.8,
    interactions: 15680,
    category: 'Social Media',
    tags: ['Fashion', 'Lifestyle', 'Beauty'],
    verified: true
  },
  {
    id: '2',
    name: 'Sage the Companion',
    type: 'companion',
    creator: 'MindfulAI',
    avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Empathetic AI companion specializing in mental wellness and support',
    price: 180,
    marketCap: '89K',
    holders: 890,
    rating: 4.9,
    interactions: 12450,
    category: 'Wellness',
    tags: ['Mental Health', 'Support', 'Meditation'],
    verified: true
  },
  {
    id: '3',
    name: 'Dungeon Master Zyx',
    type: 'gamemaster',
    creator: 'RPGLegends',
    avatar: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Master storyteller creating epic D&D campaigns and adventures',
    price: 320,
    marketCap: '156K',
    holders: 1560,
    rating: 4.7,
    interactions: 9875,
    category: 'Gaming',
    tags: ['D&D', 'Storytelling', 'RPG'],
    verified: true
  },
  {
    id: '4',
    name: 'Crypto Advisor Max',
    type: 'influencer',
    creator: 'CryptoGuru',
    avatar: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Expert crypto analyst providing market insights and trading tips',
    price: 450,
    marketCap: '234K',
    holders: 2340,
    rating: 4.6,
    interactions: 23400,
    category: 'Finance',
    tags: ['Crypto', 'Trading', 'Analysis'],
    verified: true
  },
  {
    id: '5',
    name: 'Melody the Musician',
    type: 'companion',
    creator: 'SoundWave',
    avatar: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'AI musician creating personalized songs and music therapy sessions',
    price: 200,
    marketCap: '98K',
    holders: 980,
    rating: 4.8,
    interactions: 8760,
    category: 'Entertainment',
    tags: ['Music', 'Therapy', 'Creativity'],
    verified: false
  },
  {
    id: '6',
    name: 'Quest Master Aria',
    type: 'gamemaster',
    creator: 'FantasyForge',
    avatar: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Fantasy adventure creator with immersive world-building capabilities',
    price: 280,
    marketCap: '142K',
    holders: 1420,
    rating: 4.9,
    interactions: 11200,
    category: 'Gaming',
    tags: ['Fantasy', 'Adventure', 'World Building'],
    verified: true
  }
];

const Marketplace: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'influencer' | 'companion' | 'gamemaster'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price' | 'rating' | 'new'>('popular');
  const [priceRange, setPriceRange] = useState<'all' | 'low' | 'mid' | 'high'>('all');

  const getAgentTypeIcon = (type: string) => {
    switch (type) {
      case 'influencer': return Crown;
      case 'companion': return Heart;
      case 'gamemaster': return Dice6;
      default: return Crown;
    }
  };

  const getAgentTypeColor = (type: string) => {
    switch (type) {
      case 'influencer': return 'from-pink-500 to-rose-500';
      case 'companion': return 'from-purple-500 to-indigo-500';
      case 'gamemaster': return 'from-emerald-500 to-teal-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const filteredAgents = React.useMemo(() => {
    let filtered = featuredAgents.filter(agent => {
      const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           agent.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesType = filterType === 'all' || agent.type === filterType;
      
      const matchesPrice = priceRange === 'all' || 
                          (priceRange === 'low' && agent.price < 200) ||
                          (priceRange === 'mid' && agent.price >= 200 && agent.price < 350) ||
                          (priceRange === 'high' && agent.price >= 350);
      
      return matchesSearch && matchesType && matchesPrice;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        case 'new':
          return b.id.localeCompare(a.id);
        default: // popular
          return b.interactions - a.interactions;
      }
    });
  }, [searchTerm, filterType, sortBy, priceRange]);

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
            Agent Marketplace
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Discover, invest in, and interact with AI agents created by the community
          </motion.p>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Agents', value: '1,247', icon: Users, color: 'text-blue-500' },
            { label: 'Total Volume', value: '$2.4M', icon: TrendingUp, color: 'text-green-500' },
            { label: 'Active Traders', value: '8,932', icon: Zap, color: 'text-purple-500' },
            { label: 'Avg Rating', value: '4.7★', icon: Star, color: 'text-yellow-500' }
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
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
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
                placeholder="Search agents, creators, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
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

              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value as any)}
                className="bg-gray-700/50 border border-gray-600/50 rounded-xl text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Prices</option>
                <option value="low">Under 200 ALGO</option>
                <option value="mid">200-350 ALGO</option>
                <option value="high">350+ ALGO</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-gray-700/50 border border-gray-600/50 rounded-xl text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="popular">Most Popular</option>
                <option value="price">Price: Low to High</option>
                <option value="rating">Highest Rated</option>
                <option value="new">Newest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredAgents.map((agent, index) => {
              const TypeIcon = getAgentTypeIcon(agent.type);
              return (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-md rounded-2xl border border-gray-700/50 overflow-hidden cursor-pointer group hover:border-purple-500/50 transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src={agent.avatar}
                      alt={agent.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <div className={`w-10 h-10 bg-gradient-to-r ${getAgentTypeColor(agent.type)} rounded-xl flex items-center justify-center`}>
                        <TypeIcon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 flex space-x-2">
                      {agent.verified && (
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <Star className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <h3 className="text-xl font-bold text-white">{agent.name}</h3>
                      <p className="text-gray-300 text-sm">by {agent.creator}</p>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <p className="text-gray-300 text-sm leading-relaxed">{agent.description}</p>

                    <div className="flex flex-wrap gap-1">
                      {agent.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-purple-600/20 border border-purple-500/30 rounded-lg text-xs text-purple-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Market Cap</span>
                        <span className="text-white font-semibold">${agent.marketCap}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Holders</span>
                        <span className="text-white font-semibold">{agent.holders.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Rating</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-white font-semibold">{agent.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Interactions</span>
                        <span className="text-white font-semibold">{agent.interactions.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                      <div>
                        <p className="text-2xl font-bold text-white">{agent.price} ALGO</p>
                        <p className="text-gray-400 text-sm">Current Price</p>
                      </div>
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-gray-300 hover:bg-gray-600/50 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-purple-600/20 border border-purple-500/30 rounded-lg text-purple-400 hover:bg-purple-600/30 transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
                        >
                          Buy
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredAgents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">
              No agents match your search criteria
            </div>
            <p className="text-gray-500 text-sm mt-2">
              Try adjusting your filters or search terms
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;