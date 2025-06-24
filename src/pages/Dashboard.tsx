import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  LogOut,
  ArrowRight,
  ArrowLeft,
  Upload,
  Mic,
  Volume2,
  Sparkles,
  CheckCircle,
  Menu,
  Search,
  Filter,
  SortDesc,
  Star,
  Eye,
  Trophy,
  Clock,
  Play,
  ChevronDown,
  ArrowUpDown,
  RefreshCw,
  DollarSign
} from 'lucide-react';
import { Button, IconButton, Switch } from '../ui';

const agentTypes = [
  {
    id: 'influencer',
    icon: Crown,
    title: 'Social Influencer Agent',
    description: 'AI-powered social media personality that engages with audiences',
    color: 'bg-brand-300',
    features: ['Social Media Integration', 'Audience Engagement', 'Content Generation', 'Brand Partnerships'],
    minTokens: 1000
  },
  {
    id: 'companion',
    icon: Heart,
    title: 'AI Companion',
    description: 'Personalized AI agent for meaningful one-on-one interactions',
    color: 'bg-error-900',
    features: ['Personalized Conversations', 'Memory Retention', 'Emotional Intelligence', 'Voice Interaction'],
    minTokens: 1000
  },
  {
    id: 'gamemaster',
    icon: Dice6,
    title: 'Game Master Agent',
    description: 'Automated storyteller that creates and runs immersive RPG adventures',
    color: 'bg-neutral-800',
    features: ['Dynamic Storytelling', 'Player Adaptation', 'World Building', 'Quest Management'],
    minTokens: 1000
  }
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { characters, loading } = useCharacters();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState('overview');
  
  // Create Agent state
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
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);

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

  const recentAgents = characters.slice(0, 3);
  const selectedAgentType = agentTypes.find(type => type.id === selectedType);

  const isActive = (view: string) => {
    return currentView === view;
  };

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

  const resetCreateAgent = () => {
    setCreationComplete(false);
    setCurrentStep(1);
    setSelectedType('');
    setAgentData({
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
  };

  const renderCreateAgentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="flex w-full flex-col items-center justify-center gap-12 px-6 py-12">
            <div className="flex w-full max-w-[1024px] flex-col items-center justify-center gap-8">
              <span className="w-full font-['Montserrat'] text-[48px] font-[900] leading-[48px] text-white text-center -tracking-[0.04em]">
                Choose Your Agent Type
              </span>
              <span className="max-w-[576px] font-['Montserrat'] text-[18px] font-[400] leading-[24px] text-white/80 text-center">
                Select the type of AI agent you want to create and deploy on the Algorand blockchain
              </span>
            </div>

            <div className="flex w-full max-w-[1280px] flex-wrap items-center justify-center gap-6">
              {agentTypes.map((type) => (
                <motion.div
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex min-h-[320px] min-w-[280px] max-w-[320px] grow shrink-0 basis-0 flex-col items-start justify-between gap-6 self-stretch rounded-[24px] px-6 py-6 cursor-pointer transition-all duration-200 ${
                    type.color
                  } ${selectedType === type.id ? 'ring-4 ring-white/50' : ''}`}
                >
                  <div className="flex w-full flex-col items-start justify-start gap-4">
                    <div className={`flex w-12 h-12 items-center justify-center rounded-xl ${
                      type.id === 'influencer' ? 'bg-brand-900/20' : 'bg-white/20'
                    }`}>
                      <type.icon className={`w-6 h-6 ${
                        type.id === 'influencer' ? 'text-brand-900' : 'text-white'
                      }`} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className={`font-['Montserrat'] text-[20px] font-[700] leading-[24px] ${
                        type.id === 'influencer' ? 'text-brand-900' : 'text-white'
                      }`}>
                        {type.title}
                      </span>
                      <span className={`font-['Montserrat'] text-[14px] font-[400] leading-[20px] ${
                        type.id === 'influencer' ? 'text-brand-900/80' : 'text-white/80'
                      }`}>
                        {type.description}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex w-full flex-col gap-3">
                    {type.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className={`w-4 h-4 ${
                          type.id === 'influencer' ? 'text-brand-900/60' : 'text-white/60'
                        }`} />
                        <span className={`font-['Montserrat'] text-[12px] font-[500] ${
                          type.id === 'influencer' ? 'text-brand-900/80' : 'text-white/80'
                        }`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                    <div className={`flex items-center justify-between pt-3 border-t ${
                      type.id === 'influencer' ? 'border-brand-900/20' : 'border-white/20'
                    }`}>
                      <span className={`font-['Montserrat'] text-[14px] font-[600] ${
                        type.id === 'influencer' ? 'text-brand-900' : 'text-white'
                      }`}>
                        Min: {type.minTokens} ALGO
                      </span>
                      {selectedType === type.id && (
                        <CheckCircle className={`w-5 h-5 ${
                          type.id === 'influencer' ? 'text-brand-900' : 'text-white'
                        }`} />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="flex w-full flex-col items-center justify-center gap-8 px-6 py-12">
            <div className="flex w-full max-w-[768px] flex-col items-center justify-center gap-6">
              <span className="w-full font-['Montserrat'] text-[48px] font-[900] leading-[48px] text-white text-center">
                Configure Your Agent
              </span>
              <span className="max-w-[576px] font-['Montserrat'] text-[18px] font-[400] leading-[24px] text-white/80 text-center">
                Define your agent's personality, behavior, and core characteristics
              </span>
            </div>

            <div className="flex w-full max-w-[768px] flex-col gap-6">
              <div className="flex w-full flex-col gap-3">
                <span className="font-['Montserrat'] text-[16px] font-[600] text-white">
                  Agent Name
                </span>
                <input
                  type="text"
                  value={agentData.name}
                  onChange={(e) => setAgentData({...agentData, name: e.target.value})}
                  placeholder="Enter your agent's name"
                  className="w-full px-4 py-3 font-['Montserrat'] text-[14px] bg-neutral-700 border border-amber-800/30 rounded-[12px] text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-brand-600"
                />
              </div>

              <div className="flex w-full flex-col gap-3">
                <span className="font-['Montserrat'] text-[16px] font-[600] text-white">
                  Description
                </span>
                <textarea
                  value={agentData.description}
                  onChange={(e) => setAgentData({...agentData, description: e.target.value})}
                  placeholder="Describe what you want your agent to do and how it should behave..."
                  rows={4}
                  className="w-full px-4 py-3 font-['Montserrat'] text-[14px] bg-neutral-700 border border-amber-800/30 rounded-[12px] text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-brand-600 resize-none"
                />
              </div>

              <div className="flex w-full flex-col gap-3">
                <span className="font-['Montserrat'] text-[16px] font-[600] text-white">
                  Personality Traits
                </span>
                <input
                  type="text"
                  value={agentData.personality}
                  onChange={(e) => setAgentData({...agentData, personality: e.target.value})}
                  placeholder="e.g., Friendly, Professional, Humorous, Creative"
                  className="w-full px-4 py-3 font-['Montserrat'] text-[14px] bg-neutral-700 border border-amber-800/30 rounded-[12px] text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-brand-600"
                />
              </div>

              <div className="flex w-full flex-col gap-3">
                <span className="font-['Montserrat'] text-[16px] font-[600] text-white">
                  Agent Avatar
                </span>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-neutral-700 rounded-[12px] flex items-center justify-center border border-amber-800/30">
                    {agentData.avatar ? (
                      <img src={agentData.avatar} alt="Avatar" className="w-full h-full object-cover rounded-[12px]" />
                    ) : (
                      <Upload className="w-6 h-6 text-white/40" />
                    )}
                  </div>
                  <Button
                    variant="neutral-secondary"
                    onClick={() => {}}
                    icon={<Upload className="w-4 h-4" />}
                  >
                    Upload Image
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="flex w-full flex-col items-center justify-center gap-8 px-6 py-12">
            <div className="flex w-full max-w-[768px] flex-col items-center justify-center gap-6">
              <span className="w-full font-['Montserrat'] text-[48px] font-[900] leading-[48px] text-white text-center">
                Voice & Token Settings
              </span>
              <span className="max-w-[576px] font-['Montserrat'] text-[18px] font-[400] leading-[24px] text-white/80 text-center">
                Configure voice capabilities and tokenization for your agent
              </span>
            </div>

            <div className="flex w-full max-w-[768px] flex-col gap-6">
              {/* Voice Settings */}
              <div className="flex w-full flex-col gap-6 rounded-[20px] border border-amber-800/30 bg-neutral-700/50 px-6 py-6">
                <div className="flex items-center gap-3">
                  <div className="flex w-10 h-10 items-center justify-center rounded-lg bg-neutral-600">
                    <Mic className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-['Montserrat'] text-[20px] font-[700] text-white">
                    Voice Configuration
                  </span>
                </div>
                
                <div className="flex w-full flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="font-['Montserrat'] text-[16px] font-[500] text-white">
                      Enable Voice Interaction
                    </span>
                    <Switch
                      checked={agentData.voiceEnabled}
                      onCheckedChange={(checked) => setAgentData({...agentData, voiceEnabled: checked})}
                    />
                  </div>

                  {agentData.voiceEnabled && (
                    <div className="flex w-full flex-col gap-3">
                      <span className="font-['Montserrat'] text-[14px] font-[600] text-white">
                        Voice Type
                      </span>
                      <select
                        value={agentData.voiceType}
                        onChange={(e) => setAgentData({...agentData, voiceType: e.target.value})}
                        className="w-full px-4 py-3 font-['Montserrat'] text-[14px] bg-neutral-600 border border-neutral-500 rounded-[12px] text-white focus:outline-none focus:ring-2 focus:ring-brand-600"
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
              <div className="flex w-full flex-col gap-6 rounded-[20px] border border-amber-800/30 bg-neutral-700/50 px-6 py-6">
                <div className="flex items-center gap-3">
                  <div className="flex w-10 h-10 items-center justify-center rounded-lg bg-neutral-600">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-['Montserrat'] text-[20px] font-[700] text-white">
                    Token Generation
                  </span>
                </div>
                
                <div className="flex w-full flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="font-['Montserrat'] text-[16px] font-[500] text-white">
                      Generate Agent Token
                    </span>
                    <Switch
                      checked={agentData.generateToken}
                      onCheckedChange={(checked) => setAgentData({...agentData, generateToken: checked})}
                    />
                  </div>

                  {agentData.generateToken && (
                    <div className="flex w-full flex-wrap gap-4">
                      <div className="flex min-w-[200px] grow shrink-0 basis-0 flex-col gap-3">
                        <span className="font-['Montserrat'] text-[14px] font-[600] text-white">
                          Token Name
                        </span>
                        <input
                          type="text"
                          value={agentData.tokenName}
                          onChange={(e) => setAgentData({...agentData, tokenName: e.target.value})}
                          placeholder="Agent Token"
                          className="w-full px-4 py-3 font-['Montserrat'] text-[14px] bg-neutral-600 border border-neutral-500 rounded-[12px] text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-brand-600"
                        />
                      </div>
                      <div className="flex min-w-[200px] grow shrink-0 basis-0 flex-col gap-3">
                        <span className="font-['Montserrat'] text-[14px] font-[600] text-white">
                          Token Symbol
                        </span>
                        <input
                          type="text"
                          value={agentData.tokenSymbol}
                          onChange={(e) => setAgentData({...agentData, tokenSymbol: e.target.value.toUpperCase()})}
                          placeholder="AGT"
                          className="w-full px-4 py-3 font-['Montserrat'] text-[14px] bg-neutral-600 border border-neutral-500 rounded-[12px] text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-brand-600"
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
          <div className="flex w-full flex-col items-center justify-center gap-8 px-6 py-12">
            <div className="flex w-full max-w-[768px] flex-col items-center justify-center gap-6">
              <span className="w-full font-['Montserrat'] text-[48px] font-[900] leading-[48px] text-white text-center">
                Review & Deploy
              </span>
              <span className="max-w-[576px] font-['Montserrat'] text-[18px] font-[400] leading-[24px] text-white/80 text-center">
                Review your agent configuration before deploying to the blockchain
              </span>
            </div>

            <div className="flex w-full max-w-[768px] flex-col gap-6">
              <div className="flex w-full flex-col gap-6 rounded-[20px] border border-amber-800/30 bg-neutral-700 px-6 py-6">
                <div className="flex items-center gap-4">
                  {selectedAgentType && (
                    <div className={`w-16 h-16 ${selectedAgentType.color} rounded-[16px] flex items-center justify-center`}>
                      <selectedAgentType.icon className="w-8 h-8 text-white" />
                    </div>
                  )}
                  <div className="flex flex-col gap-1">
                    <span className="font-['Montserrat'] text-[24px] font-[700] text-white">
                      {agentData.name || 'Unnamed Agent'}
                    </span>
                    <span className="font-['Montserrat'] text-[16px] font-[500] text-white/60">
                      {selectedAgentType?.title}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <span className="font-['Montserrat'] text-[16px] font-[600] text-white">
                      Description
                    </span>
                    <span className="font-['Montserrat'] text-[14px] font-[400] text-white/80 leading-[20px]">
                      {agentData.description || 'No description provided'}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="font-['Montserrat'] text-[16px] font-[600] text-white">
                      Personality
                    </span>
                    <span className="font-['Montserrat'] text-[14px] font-[400] text-white/80 leading-[20px]">
                      {agentData.personality || 'No personality defined'}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="font-['Montserrat'] text-[16px] font-[600] text-white">
                      Voice Enabled
                    </span>
                    <span className="font-['Montserrat'] text-[14px] font-[400] text-white/80 leading-[20px]">
                      {agentData.voiceEnabled ? `Yes (${agentData.voiceType})` : 'No'}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="font-['Montserrat'] text-[16px] font-[600] text-white">
                      Token Generation
                    </span>
                    <span className="font-['Montserrat'] text-[14px] font-[400] text-white/80 leading-[20px]">
                      {agentData.generateToken ? `${agentData.tokenName} (${agentData.tokenSymbol})` : 'No token'}
                    </span>
                  </div>
                </div>

                <div className="border-t border-neutral-600 pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-['Montserrat'] text-[20px] font-[700] text-white">
                      Deployment Cost
                    </span>
                    <span className="font-['Montserrat'] text-[28px] font-[900] text-white">
                      1,000 ALGO
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success-400" />
                      <span className="font-['Montserrat'] text-[14px] font-[500] text-white/80">
                        Agent creation and deployment
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success-400" />
                      <span className="font-['Montserrat'] text-[14px] font-[500] text-white/80">
                        Smart contract initialization
                      </span>
                    </div>
                    {agentData.generateToken && (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-success-400" />
                        <span className="font-['Montserrat'] text-[14px] font-[500] text-white/80">
                          Token generation and liquidity pool
                        </span>
                      </div>
                    )}
                    {agentData.voiceEnabled && (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-success-400" />
                        <span className="font-['Montserrat'] text-[14px] font-[500] text-white/80">
                          Voice synthesis setup
                        </span>
                      </div>
                    )}
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

  const renderCreateAgentView = () => {
    if (creationComplete) {
      return (
        <div className="flex w-full min-h-full flex-col items-center justify-center gap-8 px-6 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="w-24 h-24 bg-success-600 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <div className="flex flex-col items-center gap-3">
              <span className="font-['Montserrat'] text-[48px] font-[900] leading-[48px] text-white text-center">
                Agent Created Successfully!
              </span>
              <span className="font-['Montserrat'] text-[20px] font-[500] text-white/80 text-center">
                Your AI agent is now live on the Algorand blockchain
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="large"
                onClick={() => setCurrentView('agents')}
              >
                View Agent
              </Button>
              <Button
                variant="brand-secondary"
                size="large"
                onClick={resetCreateAgent}
              >
                Create Another
              </Button>
            </div>
          </motion.div>
        </div>
      );
    }

    return (
      <div className="flex flex-col h-full">
        {/* Progress Section */}
        <div className="flex w-full flex-col items-center justify-center gap-6  px-6 py-8">
          <div className="flex w-full max-w-[1024px] items-center justify-between">
            <span className="font-['Montserrat'] text-[32px] font-[900] leading-[32px] text-white">
              Create AI Agent
            </span>
            <span className="font-['Montserrat'] text-[16px] font-[500] text-white/60">
              Step {currentStep} of 4
            </span>
          </div>
          <div className="w-full max-w-[1024px] bg-neutral-600 rounded-full h-2">
            <div 
              className="bg-brand-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="flex-1 bg-brand-900">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {renderCreateAgentStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex w-full items-center justify-center  px-6 py-6 ">
          <div className="flex w-full max-w-[1024px] items-center justify-between">
            <Button
              variant="neutral-secondary"
              size="large"
              onClick={handleBack}
              disabled={currentStep === 1}
              icon={<ArrowLeft className="w-5 h-5" />}
            >
              Back
            </Button>

            {currentStep === 4 ? (
              <Button
                size="large"
                onClick={handleCreateAgent}
                disabled={isCreating || !selectedType || !agentData.name}
                icon={isCreating ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Sparkles className="w-5 h-5" />
                )}
              >
                {isCreating ? 'Creating Agent...' : 'Deploy Agent'}
              </Button>
            ) : (
              <Button
                size="large"
                onClick={handleNext}
                disabled={currentStep === 1 && !selectedType}
                iconRight={<ArrowRight className="w-5 h-5" />}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    );
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
          {currentView === 'overview' && (
            <div className="p-6 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-neutral-800 rounded-[20px] border border-amber-900/20 p-6"
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
              <div className="bg-neutral-800 rounded-[20px] border border-amber-900/20 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-['Montserrat'] text-[20px] font-[700] text-white">
                    Your Agents
                  </h2>
                  <Button
                    variant="neutral-tertiary"
                    onClick={() => setCurrentView('agents')}
                  >
                    View All
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {recentAgents.length > 0 ? (
                    recentAgents.map((agent) => (
                      <div key={agent.id} className="flex items-center gap-4 p-4 border border-amber-900/20 rounded-[12px] hover:bg-default-300/10 transition-colors">
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
                        onClick={() => setCurrentView('create')}
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
              <div className="bg-neutral-800 rounded-[20px] border border-amber-900/20 p-6">
                <h2 className="font-['Montserrat'] text-[20px] font-[700] text-white mb-6">
                  Quick Actions
                </h2>
                <div className="space-y-3">
                  <Button
                    variant="brand-primary"
                    size="large"
                    onClick={() => setCurrentView('create')}
                    icon={<Plus className="w-5 h-5" />}
                    className="w-full justify-start"
                  >
                    Create New Agent
                  </Button>
                  <Button
                    variant="neutral-secondary"
                    size="large"
                    onClick={() => setCurrentView('marketplace')}
                    icon={<Store className="w-5 h-5" />}
                    className="w-full justify-start"
                  >
                    Browse Marketplace
                  </Button>
                  <Button
                    variant="neutral-secondary"
                    size="large"
                    onClick={() => setCurrentView('chat')}
                    icon={<MessageCircle className="w-5 h-5" />}
                    className="w-full justify-start"
                  >
                    Start Chat
                  </Button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-neutral-800 rounded-[20px] border border-amber-900/20 p-6">
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
            </div>
          )}
          
          {currentView === 'create' && renderCreateAgentView()}
          
          {currentView === 'agents' && (
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
          )}
          
          {currentView === 'marketplace' && (
            <div className="p-6 space-y-8">
              {/* Header */}
              <div className="text-center space-y-4">
                <h1 className="font-['Montserrat'] text-[48px] font-[900] text-white leading-[48px]">
                  Agent Marketplace
                </h1>
                <p className="font-['Montserrat'] text-[18px] font-[400] text-white/60 max-w-2xl mx-auto">
                  Discover, invest in, and interact with AI agents created by the community
                </p>
              </div>

              {/* Market Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: 'Total Agents', value: '1,247', icon: Users, color: 'text-brand-600' },
                  { label: 'Total Volume', value: '$2.4M', icon: TrendingUp, color: 'text-success-400' },
                  { label: 'Active Traders', value: '8,932', icon: Zap, color: 'text-brand-400' },
                  { label: 'Avg Rating', value: '4.7★', icon: Star, color: 'text-warning-400' }
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
                      <stat.icon className={`w-8 h-8 ${stat.color}`} />
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
                      placeholder="Search agents, creators, or tags..."
                      className="w-full pl-10 pr-4 py-3 bg-neutral-700 border border-amber-800/30 rounded-[12px] text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-brand-600 font-['Montserrat'] text-[14px]"
                    />
                  </div>

                  {/* Filters */}
                  <div className="flex flex-wrap gap-4">
                    <select className="bg-neutral-700 border border-amber-800/30 rounded-[12px] text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-600 font-['Montserrat'] text-[14px]">
                      <option value="all">All Types</option>
                      <option value="influencer">Social Influencer</option>
                      <option value="companion">AI Companion</option>
                      <option value="gamemaster">Game Master</option>
                    </select>

                    <select className="bg-neutral-700 border border-amber-800/30 rounded-[12px] text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-600 font-['Montserrat'] text-[14px]">
                      <option value="all">All Prices</option>
                      <option value="low">Under 200 ALGO</option>
                      <option value="mid">200-350 ALGO</option>
                      <option value="high">350+ ALGO</option>
                    </select>

                    <select className="bg-neutral-700 border border-amber-800/30 rounded-[12px] text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-600 font-['Montserrat'] text-[14px]">
                      <option value="popular">Most Popular</option>
                      <option value="price">Price: Low to High</option>
                      <option value="rating">Highest Rated</option>
                      <option value="new">Newest</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Featured Agents Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
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
                    tags: ['D&D', 'Storytelling', 'RPG'],
                    verified: true
                  }
                ].map((agent, index) => (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-neutral-800 rounded-[20px] border border-amber-900/20 overflow-hidden hover:border-brand-600/50 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="relative">
                      <img
                        src={agent.avatar}
                        alt={agent.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          agent.type === 'influencer' ? 'bg-brand-600' : 
                          agent.type === 'companion' ? 'bg-error-600' : 'bg-success-600'
                        }`}>
                          {agent.type === 'influencer' && <Crown className="w-5 h-5 text-white" />}
                          {agent.type === 'companion' && <Heart className="w-5 h-5 text-white" />}
                          {agent.type === 'gamemaster' && <Dice6 className="w-5 h-5 text-white" />}
                        </div>
                      </div>
                      {agent.verified && (
                        <div className="absolute top-4 right-4 w-8 h-8 bg-brand-600 rounded-full flex items-center justify-center">
                          <Star className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <h3 className="font-['Montserrat'] text-[20px] font-[700] text-white">{agent.name}</h3>
                        <p className="font-['Montserrat'] text-[14px] text-white/80">by {agent.creator}</p>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <p className="font-['Montserrat'] text-[14px] text-white/80 leading-relaxed">{agent.description}</p>

                      <div className="flex flex-wrap gap-1">
                        {agent.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-brand-900/20 border border-brand-600/30 rounded-lg text-xs text-brand-400 font-['Montserrat']"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="font-['Montserrat'] text-[12px] text-white/60">Market Cap</span>
                          <span className="font-['Montserrat'] text-[12px] font-[600] text-white">${agent.marketCap}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-['Montserrat'] text-[12px] text-white/60">Holders</span>
                          <span className="font-['Montserrat'] text-[12px] font-[600] text-white">{agent.holders.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-['Montserrat'] text-[12px] text-white/60">Rating</span>
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-warning-400 fill-current" />
                            <span className="font-['Montserrat'] text-[12px] font-[600] text-white">{agent.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-['Montserrat'] text-[12px] text-white/60">Interactions</span>
                          <span className="font-['Montserrat'] text-[12px] font-[600] text-white">{agent.interactions.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-amber-900/20">
                        <div>
                          <p className="font-['Montserrat'] text-[20px] font-[700] text-white">{agent.price} ALGO</p>
                          <p className="font-['Montserrat'] text-[12px] text-white/60">Current Price</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="neutral-secondary"
                            size="small"
                            onClick={() => {}}
                            icon={<Eye className="w-4 h-4" />}
                          />
                          <Button
                            variant="neutral-secondary"
                            size="small"
                            onClick={() => setCurrentView('chat')}
                            icon={<MessageCircle className="w-4 h-4" />}
                          />
                          <Button
                            variant="brand-primary"
                            size="small"
                            onClick={() => {}}
                          >
                            Buy
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
          
          {currentView === 'chat' && (
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
                          : 'bg-neutral-700/30 hover:bg-neutral-700/50 border border-amber-800/30/30'
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
          )}
          
          {currentView === 'games' && (
            <div className="p-6 space-y-8">
              {/* Header */}
              <div className="text-center space-y-4">
                <h1 className="font-['Montserrat'] text-[48px] font-[900] text-white leading-[48px]">
                  Game Arena
                </h1>
                <p className="font-['Montserrat'] text-[18px] font-[400] text-white/60 max-w-2xl mx-auto">
                  Challenge your AI characters in various games and earn rewards
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { icon: Trophy, label: 'Games Won', value: '47', color: 'text-warning-400' },
                  { icon: Clock, label: 'Hours Played', value: '127', color: 'text-brand-400' },
                  { icon: Users, label: 'Active Players', value: '1,234', color: 'text-success-400' },
                  { icon: Zap, label: 'Total Rewards', value: '2,856', color: 'text-brand-600' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-neutral-800 rounded-[20px] border border-amber-900/20 p-6"
                  >
                    <div className="flex items-center space-x-3">
                      <stat.icon className={`w-8 h-8 ${stat.color}`} />
                      <div>
                        <p className="font-['Montserrat'] text-[28px] font-[700] text-white">{stat.value}</p>
                        <p className="font-['Montserrat'] text-[14px] font-[500] text-white/60">{stat.label}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Games Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
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
                ].map((game, index) => (
                  <motion.div
                    key={game.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-neutral-800 rounded-[20px] border border-amber-900/20 overflow-hidden hover:border-brand-600/50 transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative">
                      <img src={game.image} alt={game.title} className="w-full h-48 object-cover" />
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          game.difficulty === 'Easy' ? 'bg-success-900/20 text-success-400' :
                          game.difficulty === 'Medium' ? 'bg-warning-900/20 text-warning-400' :
                          'bg-error-900/20 text-error-400'
                        }`}>
                          {game.difficulty}
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <h3 className="font-['Montserrat'] text-[20px] font-[700] text-white">{game.title}</h3>
                        <p className="font-['Montserrat'] text-[14px] text-white/80">{game.description}</p>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-white/60" />
                          <span className="font-['Montserrat'] text-[12px] text-white/80">{game.players} players</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-white/60" />
                          <span className="font-['Montserrat'] text-[12px] text-white/80">{game.duration}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-warning-400" />
                          <span className="font-['Montserrat'] text-[12px] text-white/80">Rewards: {game.rewards}</span>
                        </div>
                        <span className="px-3 py-1 bg-brand-900/20 border border-brand-600/30 rounded-lg text-xs text-brand-400 font-['Montserrat']">
                          {game.category}
                        </span>
                      </div>

                      <Button
                        variant="brand-primary"
                        onClick={() => {}}
                        icon={<Play className="w-4 h-4" />}
                        className="w-full"
                      >
                        Start Game
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Character Selection Section */}
              {characters.length > 0 && (
                <div className="bg-neutral-800 rounded-[20px] border border-amber-900/20 p-6">
                  <h2 className="font-['Montserrat'] text-[24px] font-[700] text-white mb-6">Select Characters for Games</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {characters.filter(c => c.status === 'active' || c.status === 'idle').map((character) => (
                      <div
                        key={character.id}
                        className="p-4 rounded-[12px] border border-amber-800/30/30 hover:border-brand-600/50 transition-all duration-200 cursor-pointer bg-neutral-700/30"
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={character.avatar}
                            alt={character.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="font-['Montserrat'] text-[16px] font-[600] text-white">{character.name}</h3>
                            <p className="font-['Montserrat'] text-[12px] text-white/60">Level {character.level}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {currentView === 'swap' && (
            <div className="p-6 space-y-8">
              {/* Header */}
              <div className="text-center space-y-4">
                <h1 className="font-['Montserrat'] text-[48px] font-[900] text-white leading-[48px]">
                  Token Swap
                </h1>
                <p className="font-['Montserrat'] text-[18px] font-[400] text-white/60 max-w-2xl mx-auto">
                  Seamlessly swap tokens on the Algorand blockchain with optimal rates
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Swap Interface */}
                <div className="space-y-6">
                  <div className="bg-neutral-800 rounded-[20px] border border-amber-900/20 p-6">
                    <h3 className="font-['Montserrat'] text-[24px] font-[700] text-white mb-6">Swap Tokens</h3>
                    
                    {/* From Token */}
                    <div className="space-y-4">
                      <div className="bg-neutral-700 rounded-[12px] p-4">
                        <label className="font-['Montserrat'] text-[12px] font-[500] text-white/60 mb-2 block">From</label>
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            placeholder="0.0"
                            className="bg-transparent text-white text-[24px] font-[700] placeholder-white/40 outline-none flex-1"
                          />
                          <div className="flex items-center space-x-2 ml-4">
                            <div className="w-6 h-6 bg-brand-600 rounded-full"></div>
                            <span className="font-['Montserrat'] text-[16px] font-[600] text-white">ALGO</span>
                            <button className="text-white/60 hover:text-white transition-colors">
                              <ChevronDown className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <p className="font-['Montserrat'] text-[12px] text-white/60 mt-2">Balance: 1,234.56 ALGO</p>
                      </div>

                      {/* Swap Button */}
                      <div className="flex justify-center">
                        <button className="w-10 h-10 bg-neutral-700 hover:bg-neutral-600 rounded-full flex items-center justify-center transition-colors">
                          <ArrowUpDown className="w-5 h-5 text-white" />
                        </button>
                      </div>

                      {/* To Token */}
                      <div className="bg-neutral-700 rounded-[12px] p-4">
                        <label className="font-['Montserrat'] text-[12px] font-[500] text-white/60 mb-2 block">To</label>
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            placeholder="0.0"
                            className="bg-transparent text-white text-[24px] font-[700] placeholder-white/40 outline-none flex-1"
                          />
                          <div className="flex items-center space-x-2 ml-4">
                            <div className="w-6 h-6 bg-error-600 rounded-full"></div>
                            <span className="font-['Montserrat'] text-[16px] font-[600] text-white">CHAR</span>
                            <button className="text-white/60 hover:text-white transition-colors">
                              <ChevronDown className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <p className="font-['Montserrat'] text-[12px] text-white/60 mt-2">Balance: 5,432.10 CHAR</p>
                      </div>

                      <Button variant="brand-primary" className="w-full" onClick={() => {}}>
                        Swap Tokens
                      </Button>
                    </div>
                  </div>
                  
                  {/* Market Stats */}
                  <div className="bg-neutral-800 rounded-[20px] border border-amber-900/20 p-6">
                    <h3 className="font-['Montserrat'] text-[20px] font-[700] text-white mb-4">Market Overview</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: 'ALGO/USD', value: '$0.25', change: '+2.5%', positive: true },
                        { label: 'CHAR/USD', value: '$0.05', change: '+8.2%', positive: true },
                        { label: 'GAME/USD', value: '$0.15', change: '-1.8%', positive: false },
                        { label: 'Volume 24h', value: '$125K', change: '+15.7%', positive: true }
                      ].map((stat, index) => (
                        <div key={index} className="bg-neutral-700/30 rounded-[12px] p-3">
                          <p className="font-['Montserrat'] text-[12px] text-white/60">{stat.label}</p>
                          <p className="font-['Montserrat'] text-[16px] font-[600] text-white">{stat.value}</p>
                          <p className={`font-['Montserrat'] text-[12px] ${stat.positive ? 'text-success-400' : 'text-error-400'}`}>
                            {stat.change}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="space-y-6">
                  <div className="bg-neutral-800 rounded-[20px] border border-amber-900/20 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-['Montserrat'] text-[20px] font-[700] text-white">Recent Swaps</h3>
                      <RefreshCw className="w-5 h-5 text-white/60 cursor-pointer hover:text-white transition-colors" />
                    </div>

                    <div className="space-y-4">
                      {[
                        { id: '1', from: 'ALGO', to: 'CHAR', amount: '100', timestamp: '2 minutes ago', status: 'completed' },
                        { id: '2', from: 'CHAR', to: 'USDC', amount: '500', timestamp: '15 minutes ago', status: 'completed' },
                        { id: '3', from: 'USDC', to: 'ALGO', amount: '75', timestamp: '1 hour ago', status: 'completed' },
                        { id: '4', from: 'GAME', to: 'CHAR', amount: '200', timestamp: '2 hours ago', status: 'pending' }
                      ].map((swap) => (
                        <div key={swap.id} className="flex items-center justify-between p-4 bg-neutral-700/30 rounded-[12px]">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2">
                              <span className="font-['Montserrat'] text-[14px] font-[600] text-white">{swap.from}</span>
                              <ArrowRight className="w-4 h-4 text-white/60" />
                              <span className="font-['Montserrat'] text-[14px] font-[600] text-white">{swap.to}</span>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <p className="font-['Montserrat'] text-[14px] font-[600] text-white">{swap.amount}</p>
                            <div className="flex items-center space-x-2">
                              <span className={`w-2 h-2 rounded-full ${
                                swap.status === 'completed' ? 'bg-success-500' : 'bg-warning-500'
                              }`} />
                              <span className="font-['Montserrat'] text-[12px] text-white/60">{swap.timestamp}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Liquidity Pools */}
                  <div className="bg-neutral-800 rounded-[20px] border border-amber-900/20 p-6">
                    <h3 className="font-['Montserrat'] text-[20px] font-[700] text-white mb-4 flex items-center space-x-2">
                      <DollarSign className="w-6 h-6" />
                      <span>Top Liquidity Pools</span>
                    </h3>
                    
                    <div className="space-y-3">
                      {[
                        { pair: 'ALGO/USDC', tvl: '$2.5M', apr: '12.5%' },
                        { pair: 'CHAR/ALGO', tvl: '$850K', apr: '18.2%' },
                        { pair: 'GAME/USDC', tvl: '$620K', apr: '15.7%' },
                        { pair: 'CHAR/USDC', tvl: '$445K', apr: '22.1%' }
                      ].map((pool, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-neutral-700/30 rounded-[12px] hover:bg-neutral-700/50 transition-colors cursor-pointer">
                          <div>
                            <p className="font-['Montserrat'] text-[16px] font-[600] text-white">{pool.pair}</p>
                            <p className="font-['Montserrat'] text-[12px] text-white/60">TVL: {pool.tvl}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-['Montserrat'] text-[16px] font-[600] text-success-400">{pool.apr} APR</p>
                            <p className="font-['Montserrat'] text-[12px] text-white/60">Rewards</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {currentView === 'wallet' && (
            <div className="p-6">
              <div className="text-center text-white">
                <h2 className="font-['Montserrat'] text-[32px] font-[700] mb-4">Wallet</h2>
                <p className="text-white/60">Wallet management coming soon...</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;