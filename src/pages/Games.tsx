import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Trophy, Clock, Users, Zap, Play, Star } from 'lucide-react';
import { useCharacters } from '../hooks/useCharacters';

const games = [
  {
    id: '1',
    title: 'Strategy Arena',
    description: 'Test your tactical skills in this turn-based strategy game',
    image: 'https://images.pexels.com/photos/7194915/pexels-photo-7194915.jpeg?auto=compress&cs=tinysrgb&w=600',
    players: '1-4',
    difficulty: 'Hard',
    duration: '15-30 min',
    category: 'Strategy',
    rewards: '50-150 CHAR tokens'
  },
  {
    id: '2',
    title: 'Puzzle Master',
    description: 'Solve increasingly complex puzzles with your AI companion',
    image: 'https://images.pexels.com/photos/1111372/pexels-photo-1111372.jpeg?auto=compress&cs=tinysrgb&w=600',
    players: '1-2',
    difficulty: 'Medium',
    duration: '10-20 min',
    category: 'Puzzle',
    rewards: '25-75 CHAR tokens'
  },
  {
    id: '3',
    title: 'Adventure Quest',
    description: 'Embark on epic adventures in procedurally generated worlds',
    image: 'https://images.pexels.com/photos/7862333/pexels-photo-7862333.jpeg?auto=compress&cs=tinysrgb&w=600',
    players: '1-6',
    difficulty: 'Easy',
    duration: '20-45 min',
    category: 'Adventure',
    rewards: '75-200 CHAR tokens'
  },
  {
    id: '4',
    title: 'Trading Simulator',
    description: 'Practice trading strategies with virtual markets',
    image: 'https://images.pexels.com/photos/7567565/pexels-photo-7567565.jpeg?auto=compress&cs=tinysrgb&w=600',
    players: '1-8',
    difficulty: 'Hard',
    duration: '30-60 min',
    category: 'Simulation',
    rewards: '100-300 CHAR tokens'
  }
];

const Games: React.FC = () => {
  const { characters } = useCharacters();
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);

  const activeCharacters = characters.filter(c => c.status === 'active' || c.status === 'idle');

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-400/10';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'Hard': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const handleStartGame = () => {
    if (selectedGame && selectedCharacters.length > 0) {
      console.log('Starting game:', selectedGame, 'with characters:', selectedCharacters);
      // Implement game start logic
    }
  };

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
            Game Arena
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Challenge your AI characters in various games and earn rewards
          </motion.p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: Trophy, label: 'Games Won', value: '47', color: 'text-yellow-500' },
            { icon: Clock, label: 'Hours Played', value: '127', color: 'text-blue-500' },
            { icon: Users, label: 'Active Players', value: '1,234', color: 'text-green-500' },
            { icon: Zap, label: 'Total Rewards', value: '2,856', color: 'text-purple-500' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700/50 p-6"
            >
              <div className="flex items-center space-x-3">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={`bg-gray-800/50 backdrop-blur-md rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300 ${
                selectedGame === game.id 
                  ? 'border-purple-500/50 shadow-lg shadow-purple-500/25' 
                  : 'border-gray-700/50 hover:border-gray-600/50'
              }`}
              onClick={() => setSelectedGame(game.id)}
            >
              <div className="relative">
                <img src={game.image} alt={game.title} className="w-full h-48 object-cover" />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(game.difficulty)}`}>
                    {game.difficulty}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-xl font-bold text-white">{game.title}</h3>
                  <p className="text-gray-300 text-sm">{game.description}</p>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{game.players} players</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{game.duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-gray-300 text-sm">Rewards: {game.rewards}</span>
                  </div>
                  <span className="px-3 py-1 bg-blue-600/20 border border-blue-500/30 rounded-lg text-sm text-blue-300">
                    {game.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Character Selection */}
        {selectedGame && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700/50 p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Select Characters</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
              {activeCharacters.map((character) => (
                <div
                  key={character.id}
                  onClick={() => {
                    if (selectedCharacters.includes(character.id)) {
                      setSelectedCharacters(prev => prev.filter(id => id !== character.id));
                    } else {
                      setSelectedCharacters(prev => [...prev, character.id]);
                    }
                  }}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                    selectedCharacters.includes(character.id)
                      ? 'bg-purple-600/20 border border-purple-500/50'
                      : 'bg-gray-700/30 hover:bg-gray-700/50 border border-gray-600/30'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={character.avatar}
                      alt={character.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-white font-semibold">{character.name}</h3>
                      <p className="text-gray-400 text-sm">Level {character.level}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <div className="text-gray-400">
                {selectedCharacters.length} character(s) selected
              </div>
              <motion.button
                onClick={handleStartGame}
                disabled={selectedCharacters.length === 0}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  selectedCharacters.length > 0
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Play className="w-5 h-5" />
                <span>Start Game</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Games;