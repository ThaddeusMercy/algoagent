import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Heart, Dice6, ArrowRight, ArrowLeft, Upload, Mic, Volume2, Sparkles, Zap, CheckCircle } from 'lucide-react';

const agentTypes = [
  {
    id: 'influencer',
    icon: Crown,
    title: 'Social Influencer Agent',
    description: 'AI-powered social media personality that engages with audiences',
    color: 'from-pink-500 to-rose-500',
    features: ['Social Media Integration', 'Audience Engagement', 'Content Generation', 'Brand Partnerships'],
    minTokens: 1000
  },
  {
    id: 'companion',
    icon: Heart,
    title: 'AI Companion',
    description: 'Personalized AI agent for meaningful one-on-one interactions',
    color: 'from-purple-500 to-indigo-500',
    features: ['Personalized Conversations', 'Memory Retention', 'Emotional Intelligence', 'Voice Interaction'],
    minTokens: 1000
  },
  {
    id: 'gamemaster',
    icon: Dice6,
    title: 'Game Master Agent',
    description: 'Automated storyteller that creates and runs immersive RPG adventures',
    color: 'from-emerald-500 to-teal-500',
    features: ['Dynamic Storytelling', 'Player Adaptation', 'World Building', 'Quest Management'],
    minTokens: 1000
  }
];

const CreateAgent: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedType, setSelectedType] = useState<string>('');
  const [agentData, setAgentData] = useState({
    name: '',
    description: '',
    personality: '',
    avatar: '',
    voiceEnabled: false,
    voiceType: 'female',
    generateToken: true,
    tokenName: '',
    tokenSymbol: ''
  });
  const [isCreating, setIsCreating] = useState(false);
  const [creationComplete, setCreationComplete] = useState(false);

  const selectedAgentType = agentTypes.find(type => type.id === selectedType);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreateAgent = async () => {
    setIsCreating(true);
    // Simulate agent creation process
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsCreating(false);
    setCreationComplete(true);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Choose Agent Type</h2>
              <p className="text-gray-400">Select the type of AI agent you want to create</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {agentTypes.map((type) => (
                <motion.div
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                    selectedType === type.id
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                  }`}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${type.color} rounded-2xl flex items-center justify-center mb-4`}>
                    <type.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{type.title}</h3>
                  <p className="text-gray-400 mb-4">{type.description}</p>
                  <div className="space-y-2">
                    {type.features.slice(0, 2).map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <span className="text-purple-400 font-semibold">Min: {type.minTokens} ALGO</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Agent Configuration</h2>
              <p className="text-gray-400">Describe your agent's personality and behavior</p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              <div>
                <label className="block text-white font-semibold mb-2">Agent Name</label>
                <input
                  type="text"
                  value={agentData.name}
                  onChange={(e) => setAgentData({...agentData, name: e.target.value})}
                  placeholder="Enter your agent's name"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Description</label>
                <textarea
                  value={agentData.description}
                  onChange={(e) => setAgentData({...agentData, description: e.target.value})}
                  placeholder="Describe what you want your agent to do and how it should behave..."
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Personality Traits</label>
                <input
                  type="text"
                  value={agentData.personality}
                  onChange={(e) => setAgentData({...agentData, personality: e.target.value})}
                  placeholder="e.g., Friendly, Professional, Humorous, Creative"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Agent Avatar</label>
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gray-700/50 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-600">
                    {agentData.avatar ? (
                      <img src={agentData.avatar} alt="Avatar" className="w-full h-full object-cover rounded-xl" />
                    ) : (
                      <Upload className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-gray-300 hover:bg-gray-600/50 transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>Upload Image</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Voice & Token Settings</h2>
              <p className="text-gray-400">Configure voice capabilities and tokenization</p>
            </div>

            <div className="max-w-2xl mx-auto space-y-8">
              {/* Voice Settings */}
              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                  <Mic className="w-6 h-6" />
                  <span>Voice Configuration</span>
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white">Enable Voice Interaction</span>
                    <button
                      onClick={() => setAgentData({...agentData, voiceEnabled: !agentData.voiceEnabled})}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        agentData.voiceEnabled ? 'bg-purple-600' : 'bg-gray-600'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        agentData.voiceEnabled ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>

                  {agentData.voiceEnabled && (
                    <div>
                      <label className="block text-white font-semibold mb-2">Voice Type</label>
                      <select
                        value={agentData.voiceType}
                        onChange={(e) => setAgentData({...agentData, voiceType: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="female">Female Voice</option>
                        <option value="male">Male Voice</option>
                        <option value="neutral">Neutral Voice</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {/* Token Settings */}
              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                  <Zap className="w-6 h-6" />
                  <span>Token Generation</span>
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white">Generate Agent Token</span>
                    <button
                      onClick={() => setAgentData({...agentData, generateToken: !agentData.generateToken})}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        agentData.generateToken ? 'bg-purple-600' : 'bg-gray-600'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        agentData.generateToken ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>

                  {agentData.generateToken && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white font-semibold mb-2">Token Name</label>
                        <input
                          type="text"
                          value={agentData.tokenName}
                          onChange={(e) => setAgentData({...agentData, tokenName: e.target.value})}
                          placeholder="Agent Token"
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-semibold mb-2">Token Symbol</label>
                        <input
                          type="text"
                          value={agentData.tokenSymbol}
                          onChange={(e) => setAgentData({...agentData, tokenSymbol: e.target.value.toUpperCase()})}
                          placeholder="AGT"
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Review & Deploy</h2>
              <p className="text-gray-400">Review your agent configuration before deployment</p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 space-y-6">
                <div className="flex items-center space-x-4">
                  {selectedAgentType && (
                    <div className={`w-16 h-16 bg-gradient-to-r ${selectedAgentType.color} rounded-2xl flex items-center justify-center`}>
                      <selectedAgentType.icon className="w-8 h-8 text-white" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-2xl font-bold text-white">{agentData.name || 'Unnamed Agent'}</h3>
                    <p className="text-gray-400">{selectedAgentType?.title}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-semibold mb-2">Description</h4>
                    <p className="text-gray-400 text-sm">{agentData.description || 'No description provided'}</p>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Personality</h4>
                    <p className="text-gray-400 text-sm">{agentData.personality || 'No personality defined'}</p>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Voice Enabled</h4>
                    <p className="text-gray-400 text-sm">{agentData.voiceEnabled ? `Yes (${agentData.voiceType})` : 'No'}</p>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Token Generation</h4>
                    <p className="text-gray-400 text-sm">
                      {agentData.generateToken ? `${agentData.tokenName} (${agentData.tokenSymbol})` : 'No token'}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-white font-semibold">Deployment Cost</span>
                    <span className="text-2xl font-bold text-purple-400">1,000 ALGO</span>
                  </div>
                  <div className="text-sm text-gray-400 space-y-1">
                    <p>• Agent creation and deployment</p>
                    <p>• Smart contract initialization</p>
                    {agentData.generateToken && <p>• Token generation and liquidity pool</p>}
                    {agentData.voiceEnabled && <p>• Voice synthesis setup</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (creationComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white">Agent Created Successfully!</h1>
          <p className="text-xl text-gray-300">Your AI agent is now live on the Algorand blockchain</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
              View Agent
            </button>
            <button className="px-8 py-3 bg-gray-800/50 border border-gray-600/50 text-white rounded-xl font-semibold hover:bg-gray-700/50 transition-all duration-200">
              Create Another
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-white">Create AI Agent</h1>
            <span className="text-gray-400">Step {currentStep} of 4</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
              currentStep === 1
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gray-800/50 border border-gray-600/50 text-white hover:bg-gray-700/50'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          {currentStep === 4 ? (
            <motion.button
              onClick={handleCreateAgent}
              disabled={isCreating || !selectedType || !agentData.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-2 px-8 py-3 rounded-xl font-semibold transition-all duration-200 ${
                isCreating || !selectedType || !agentData.name
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
              }`}
            >
              {isCreating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating Agent...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Deploy Agent</span>
                </>
              )}
            </motion.button>
          ) : (
            <button
              onClick={handleNext}
              disabled={currentStep === 1 && !selectedType}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                (currentStep === 1 && !selectedType)
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
              }`}
            >
              <span>Next</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateAgent;