import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCharacters } from '../hooks/useCharacters';
import ChatInterface from '../components/ChatInterface';
import { MessageCircle, Bot } from 'lucide-react';

const Chat: React.FC = () => {
  const { characters, loading } = useCharacters();
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);

  const activeCharacters = characters.filter(c => c.status === 'active' || c.status === 'idle');
  const currentCharacter = selectedCharacter ? characters.find(c => c.id === selectedCharacter) : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 flex items-center justify-center">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-white text-lg">Loading chat...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 flex">
      {/* Character List Sidebar */}
      <div className="w-80 bg-gray-800/50 backdrop-blur-md border-r border-gray-700/50 flex flex-col">
        <div className="p-6 border-b border-gray-700/50">
          <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
            <MessageCircle className="w-6 h-6" />
            <span>Chat</span>
          </h2>
          <p className="text-gray-400 text-sm mt-1">Select a character to start chatting</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {activeCharacters.map((character) => (
            <motion.div
              key={character.id}
              onClick={() => setSelectedCharacter(character.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                selectedCharacter === character.id
                  ? 'bg-purple-600/20 border border-purple-500/50'
                  : 'bg-gray-700/30 hover:bg-gray-700/50 border border-gray-600/30'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={character.avatar}
                    alt={character.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-800 ${
                    character.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold truncate">{character.name}</h3>
                  <p className="text-gray-400 text-sm truncate">{character.personality.split(',')[0]}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {activeCharacters.length === 0 && (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center">
              <Bot className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No active characters available</p>
              <p className="text-gray-500 text-sm mt-1">Create or activate characters to start chatting</p>
            </div>
          </div>
        )}
      </div>

      {/* Chat Interface */}
      <div className="flex-1 flex flex-col">
        {currentCharacter ? (
          <ChatInterface character={currentCharacter} />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-800/30">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Start a Conversation</h3>
              <p className="text-gray-400 max-w-md">
                Select a character from the sidebar to begin chatting. Experience AI-powered conversations
                with voice capabilities and blockchain integration.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;