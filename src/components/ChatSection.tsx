import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Bot } from 'lucide-react';
import { Button } from '../ui';
import { Character } from '../types';

interface ChatSectionProps {
  characters: Character[];
}

const ChatSection: React.FC<ChatSectionProps> = ({ characters }) => {
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);

  return (
    <div className="h-full flex">
      {/* Character List Sidebar */}
      <div className="w-80 bg-neutral-800 border-r border-amber-900/20 flex flex-col">
        <div className="p-6 border-b border-amber-900/20">
          <h2 className="font-['Montserrat'] text-[24px] font-[700] text-white flex items-center space-x-2">
            <MessageCircle className="w-6 h-6" />
            <span>Chat</span>
          </h2>
          <p className="font-['Montserrat'] text-[14px] text-white/60 mt-1">Select a character to start chatting</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {characters.filter(c => c.status === 'active' || c.status === 'idle').map((character) => (
            <motion.div
              key={character.id}
              onClick={() => setSelectedCharacter(character.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-4 rounded-[12px] cursor-pointer transition-all duration-200 ${
                selectedCharacter === character.id
                  ? 'bg-brand-900/20 border border-brand-600/50'
                  : 'bg-neutral-700/30 hover:bg-neutral-700/50 border border-amber-800/30'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={character.avatar}
                    alt={character.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-neutral-800 ${
                    character.status === 'active' ? 'bg-success-500' : 'bg-warning-500'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-['Montserrat'] text-[16px] font-[600] text-white truncate">{character.name}</h3>
                  <p className="font-['Montserrat'] text-[12px] text-white/60 truncate">{character.personality.split(',')[0]}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {characters.filter(c => c.status === 'active' || c.status === 'idle').length === 0 && (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center">
              <Bot className="w-12 h-12 text-white/40 mx-auto mb-4" />
              <p className="font-['Montserrat'] text-[14px] text-white/60">No active characters available</p>
              <p className="font-['Montserrat'] text-[12px] text-white/40 mt-1">Create or activate characters to start chatting</p>
            </div>
          </div>
        )}
      </div>

      {/* Chat Interface */}
      <div className="flex-1 flex flex-col">
        {selectedCharacter ? (
          <div className="h-full flex flex-col">
            {/* Chat Header */}
            <div className="p-6 border-b border-amber-900/20 bg-neutral-800">
              <div className="flex items-center space-x-4">
                <img
                  src={characters.find(c => c.id === selectedCharacter)?.avatar}
                  alt={characters.find(c => c.id === selectedCharacter)?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-['Montserrat'] text-[20px] font-[700] text-white">
                    {characters.find(c => c.id === selectedCharacter)?.name}
                  </h3>
                  <p className="font-['Montserrat'] text-[14px] text-success-400">Online</p>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex justify-start">
                  <div className="max-w-xs lg:max-w-md">
                    <div className="bg-neutral-700 rounded-[12px] p-4">
                      <p className="font-['Montserrat'] text-[14px] text-white">
                        Hello! I'm ready to chat. How can I help you today?
                      </p>
                    </div>
                    <p className="font-['Montserrat'] text-[12px] text-white/60 mt-2">Just now</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="p-6 border-t border-amber-900/20 bg-neutral-800">
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 bg-neutral-700 border border-amber-800/30 rounded-[12px] text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-brand-600 font-['Montserrat'] text-[14px]"
                />
                <Button variant="brand-primary" onClick={() => {}}>
                  Send
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <h3 className="font-['Montserrat'] text-[24px] font-[700] text-white mb-2">Start a Conversation</h3>
              <p className="font-['Montserrat'] text-[14px] text-white/60 max-w-md">
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

export default ChatSection; 