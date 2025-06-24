import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Heart, Dice6, ArrowRight, ArrowLeft, Upload, Mic, Volume2, Sparkles, Zap, CheckCircle } from 'lucide-react';
import { Button, Switch } from '../ui';
import { useNavigate } from 'react-router-dom';

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

const CreateAgent: React.FC = () => {
  const navigate = useNavigate();
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
          <div className="flex w-full flex-col items-center justify-center gap-12 bg-brand-900 px-6 py-32">
            <div className="flex w-full max-w-[1024px] flex-col items-center justify-center gap-8">
              <span className="w-full font-['Montserrat'] text-[62px] font-[900] leading-[58px] text-brand-300 text-center -tracking-[0.04em] mobile:font-['Montserrat'] mobile:text-[48px] mobile:font-[900] mobile:leading-[44px] mobile:tracking-normal">
                Choose Your Agent Type
              </span>
              <span className="max-w-[576px] font-['Montserrat'] text-[20px] font-[400] leading-[28px] text-white text-center -tracking-[0.015em]">
                Select the type of AI agent you want to create and deploy on the Algorand blockchain
              </span>
            </div>

            <div className="flex w-full max-w-[1280px] flex-wrap items-center justify-center gap-8">
              {agentTypes.map((type) => (
                <motion.div
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex min-h-[400px] min-w-[320px] max-w-[384px] grow shrink-0 basis-0 flex-col items-start justify-between gap-8 self-stretch rounded-[32px] px-8 py-8 cursor-pointer transition-all duration-200 ${
                    type.color
                  } ${selectedType === type.id ? 'ring-4 ring-white/50' : ''}`}
                >
                  <div className="flex w-full flex-col items-start justify-start gap-6">
                    <div className={`flex w-16 h-16 items-center justify-center rounded-2xl ${
                      type.id === 'influencer' ? 'bg-brand-900/20' : 'bg-white/20'
                    }`}>
                      <type.icon className={`w-8 h-8 ${
                        type.id === 'influencer' ? 'text-brand-900' : 'text-white'
                      }`} />
                    </div>
                    <div className="flex flex-col gap-3">
                      <span className={`font-['Montserrat'] text-[28px] font-[700] leading-[32px] -tracking-[0.025em] ${
                        type.id === 'influencer' ? 'text-brand-900' : 'text-white'
                      }`}>
                        {type.title}
                      </span>
                      <span className={`font-['Montserrat'] text-[16px] font-[400] leading-[24px] -tracking-[0.01em] ${
                        type.id === 'influencer' ? 'text-brand-900/80' : 'text-white/80'
                      }`}>
                        {type.description}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex w-full flex-col gap-4">
                    {type.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle className={`w-5 h-5 ${
                          type.id === 'influencer' ? 'text-brand-900/60' : 'text-white/60'
                        }`} />
                        <span className={`font-['Montserrat'] text-[14px] font-[500] ${
                          type.id === 'influencer' ? 'text-brand-900/80' : 'text-white/80'
                        }`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                    <div className={`flex items-center justify-between pt-4 border-t ${
                      type.id === 'influencer' ? 'border-brand-900/20' : 'border-white/20'
                    }`}>
                      <span className={`font-['Montserrat'] text-[16px] font-[600] ${
                        type.id === 'influencer' ? 'text-brand-900' : 'text-white'
                      }`}>
                        Min: {type.minTokens} ALGO
                      </span>
                      {selectedType === type.id && (
                        <CheckCircle className={`w-6 h-6 ${
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
          <div className="flex w-full flex-col items-center justify-center gap-12 bg-default-background px-6 py-32">
            <div className="flex w-full max-w-[1024px] flex-col items-center justify-center gap-8">
              <span className="w-full font-['Montserrat'] text-[62px] font-[900] leading-[58px] text-brand-900 text-center -tracking-[0.04em] mobile:font-['Montserrat'] mobile:text-[48px] mobile:font-[900] mobile:leading-[44px] mobile:tracking-normal">
                Configure Your Agent
              </span>
              <span className="max-w-[576px] font-['Montserrat'] text-[20px] font-[400] leading-[28px] text-default-font text-center -tracking-[0.015em]">
                Define your agent's personality, behavior, and core characteristics
              </span>
            </div>

            <div className="flex w-full max-w-[768px] flex-col gap-8">
              <div className="flex w-full flex-col gap-4">
                <span className="font-['Montserrat'] text-[20px] font-[600] text-brand-900 -tracking-[0.015em]">
                  Agent Name
                </span>
                <input
                  type="text"
                  value={agentData.name}
                  onChange={(e) => setAgentData({...agentData, name: e.target.value})}
                  placeholder="Enter your agent's name"
                  className="w-full px-6 py-4 font-['Montserrat'] text-[16px] bg-white border-2 border-neutral-border rounded-[16px] text-default-font placeholder-default-font/60 focus:outline-none focus:ring-2 focus:ring-brand-900 focus:border-brand-900"
                />
              </div>

              <div className="flex w-full flex-col gap-4">
                <span className="font-['Montserrat'] text-[20px] font-[600] text-brand-900 -tracking-[0.015em]">
                  Description
                </span>
                <textarea
                  value={agentData.description}
                  onChange={(e) => setAgentData({...agentData, description: e.target.value})}
                  placeholder="Describe what you want your agent to do and how it should behave..."
                  rows={5}
                  className="w-full px-6 py-4 font-['Montserrat'] text-[16px] bg-white border-2 border-neutral-border rounded-[16px] text-default-font placeholder-default-font/60 focus:outline-none focus:ring-2 focus:ring-brand-900 focus:border-brand-900 resize-none"
                />
              </div>

              <div className="flex w-full flex-col gap-4">
                <span className="font-['Montserrat'] text-[20px] font-[600] text-brand-900 -tracking-[0.015em]">
                  Personality Traits
                </span>
                <input
                  type="text"
                  value={agentData.personality}
                  onChange={(e) => setAgentData({...agentData, personality: e.target.value})}
                  placeholder="e.g., Friendly, Professional, Humorous, Creative"
                  className="w-full px-6 py-4 font-['Montserrat'] text-[16px] bg-white border-2 border-neutral-border rounded-[16px] text-default-font placeholder-default-font/60 focus:outline-none focus:ring-2 focus:ring-brand-900 focus:border-brand-900"
                />
              </div>

              <div className="flex w-full flex-col gap-4">
                <span className="font-['Montserrat'] text-[20px] font-[600] text-brand-900 -tracking-[0.015em]">
                  Agent Avatar
                </span>
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 bg-neutral-100 rounded-[16px] flex items-center justify-center border-2 border-dashed border-neutral-border">
                    {agentData.avatar ? (
                      <img src={agentData.avatar} alt="Avatar" className="w-full h-full object-cover rounded-[16px]" />
                    ) : (
                      <Upload className="w-8 h-8 text-default-font/40" />
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
          <div className="flex w-full flex-col items-center justify-center gap-12 bg-brand-900 px-6 py-32">
            <div className="flex w-full max-w-[1024px] flex-col items-center justify-center gap-8">
              <span className="w-full font-['Montserrat'] text-[62px] font-[900] leading-[58px] text-brand-300 text-center -tracking-[0.04em] mobile:font-['Montserrat'] mobile:text-[48px] mobile:font-[900] mobile:leading-[44px] mobile:tracking-normal">
                Voice & Token Settings
              </span>
              <span className="max-w-[576px] font-['Montserrat'] text-[20px] font-[400] leading-[28px] text-white text-center -tracking-[0.015em]">
                Configure voice capabilities and tokenization for your agent
              </span>
            </div>

            <div className="flex w-full max-w-[768px] flex-col gap-8">
              {/* Voice Settings */}
              <div className="flex w-full flex-col gap-8 rounded-[32px] border border-white/20 bg-white/5 px-8 py-8">
                <div className="flex items-center gap-4">
                  <div className="flex w-12 h-12 items-center justify-center rounded-xl bg-white/10">
                    <Mic className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-['Montserrat'] text-[24px] font-[700] text-white -tracking-[0.02em]">
                    Voice Configuration
                  </span>
                </div>
                
                <div className="flex w-full flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <span className="font-['Montserrat'] text-[18px] font-[500] text-white">
                      Enable Voice Interaction
                    </span>
                    <Switch
                      checked={agentData.voiceEnabled}
                      onCheckedChange={(checked) => setAgentData({...agentData, voiceEnabled: checked})}
                    />
                  </div>

                  {agentData.voiceEnabled && (
                    <div className="flex w-full flex-col gap-4">
                      <span className="font-['Montserrat'] text-[16px] font-[600] text-white">
                        Voice Type
                      </span>
                      <select
                        value={agentData.voiceType}
                        onChange={(e) => setAgentData({...agentData, voiceType: e.target.value})}
                        className="w-full px-6 py-4 font-['Montserrat'] text-[16px] bg-white/10 border border-white/20 rounded-[16px] text-white focus:outline-none focus:ring-2 focus:ring-brand-300"
                      >
                        <option value="female" className="text-black">Female Voice</option>
                        <option value="male" className="text-black">Male Voice</option>
                        <option value="neutral" className="text-black">Neutral Voice</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {/* Token Settings */}
              <div className="flex w-full flex-col gap-8 rounded-[32px] border border-white/20 bg-white/5 px-8 py-8">
                <div className="flex items-center gap-4">
                  <div className="flex w-12 h-12 items-center justify-center rounded-xl bg-white/10">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-['Montserrat'] text-[24px] font-[700] text-white -tracking-[0.02em]">
                    Token Generation
                  </span>
                </div>
                
                <div className="flex w-full flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <span className="font-['Montserrat'] text-[18px] font-[500] text-white">
                      Generate Agent Token
                    </span>
                    <Switch
                      checked={agentData.generateToken}
                      onCheckedChange={(checked) => setAgentData({...agentData, generateToken: checked})}
                    />
                  </div>

                  {agentData.generateToken && (
                    <div className="flex w-full flex-wrap gap-6">
                      <div className="flex min-w-[240px] grow shrink-0 basis-0 flex-col gap-4">
                        <span className="font-['Montserrat'] text-[16px] font-[600] text-white">
                          Token Name
                        </span>
                        <input
                          type="text"
                          value={agentData.tokenName}
                          onChange={(e) => setAgentData({...agentData, tokenName: e.target.value})}
                          placeholder="Agent Token"
                          className="w-full px-6 py-4 font-['Montserrat'] text-[16px] bg-white/10 border border-white/20 rounded-[16px] text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-brand-300"
                        />
                      </div>
                      <div className="flex min-w-[240px] grow shrink-0 basis-0 flex-col gap-4">
                        <span className="font-['Montserrat'] text-[16px] font-[600] text-white">
                          Token Symbol
                        </span>
                        <input
                          type="text"
                          value={agentData.tokenSymbol}
                          onChange={(e) => setAgentData({...agentData, tokenSymbol: e.target.value.toUpperCase()})}
                          placeholder="AGT"
                          className="w-full px-6 py-4 font-['Montserrat'] text-[16px] bg-white/10 border border-white/20 rounded-[16px] text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-brand-300"
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
          <div className="flex w-full flex-col items-center justify-center gap-12 bg-default-background px-6 py-32">
            <div className="flex w-full max-w-[1024px] flex-col items-center justify-center gap-8">
              <span className="w-full font-['Montserrat'] text-[62px] font-[900] leading-[58px] text-brand-900 text-center -tracking-[0.04em] mobile:font-['Montserrat'] mobile:text-[48px] mobile:font-[900] mobile:leading-[44px] mobile:tracking-normal">
                Review & Deploy
              </span>
              <span className="max-w-[576px] font-['Montserrat'] text-[20px] font-[400] leading-[28px] text-default-font text-center -tracking-[0.015em]">
                Review your agent configuration before deploying to the blockchain
              </span>
            </div>

            <div className="flex w-full max-w-[768px] flex-col gap-8">
              <div className="flex w-full flex-col gap-8 rounded-[32px] border border-neutral-border bg-white px-8 py-8">
                <div className="flex items-center gap-6">
                  {selectedAgentType && (
                    <div className={`w-20 h-20 ${selectedAgentType.color} rounded-[20px] flex items-center justify-center`}>
                      <selectedAgentType.icon className="w-10 h-10 text-white" />
                    </div>
                  )}
                  <div className="flex flex-col gap-2">
                    <span className="font-['Montserrat'] text-[32px] font-[700] text-brand-900 -tracking-[0.025em]">
                      {agentData.name || 'Unnamed Agent'}
                    </span>
                    <span className="font-['Montserrat'] text-[18px] font-[500] text-default-font/60">
                      {selectedAgentType?.title}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-3">
                    <span className="font-['Montserrat'] text-[18px] font-[600] text-brand-900">
                      Description
                    </span>
                    <span className="font-['Montserrat'] text-[16px] font-[400] text-default-font leading-[24px]">
                      {agentData.description || 'No description provided'}
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <span className="font-['Montserrat'] text-[18px] font-[600] text-brand-900">
                      Personality
                    </span>
                    <span className="font-['Montserrat'] text-[16px] font-[400] text-default-font leading-[24px]">
                      {agentData.personality || 'No personality defined'}
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <span className="font-['Montserrat'] text-[18px] font-[600] text-brand-900">
                      Voice Enabled
                    </span>
                    <span className="font-['Montserrat'] text-[16px] font-[400] text-default-font leading-[24px]">
                      {agentData.voiceEnabled ? `Yes (${agentData.voiceType})` : 'No'}
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <span className="font-['Montserrat'] text-[18px] font-[600] text-brand-900">
                      Token Generation
                    </span>
                    <span className="font-['Montserrat'] text-[16px] font-[400] text-default-font leading-[24px]">
                      {agentData.generateToken ? `${agentData.tokenName} (${agentData.tokenSymbol})` : 'No token'}
                    </span>
                  </div>
                </div>

                <div className="border-t border-neutral-border pt-8">
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-['Montserrat'] text-[24px] font-[700] text-brand-900">
                      Deployment Cost
                    </span>
                    <span className="font-['Montserrat'] text-[36px] font-[900] text-brand-900">
                      1,000 ALGO
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-success-600" />
                      <span className="font-['Montserrat'] text-[16px] font-[500] text-default-font">
                        Agent creation and deployment
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-success-600" />
                      <span className="font-['Montserrat'] text-[16px] font-[500] text-default-font">
                        Smart contract initialization
                      </span>
                    </div>
                    {agentData.generateToken && (
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-success-600" />
                        <span className="font-['Montserrat'] text-[16px] font-[500] text-default-font">
                          Token generation and liquidity pool
                        </span>
                      </div>
                    )}
                    {agentData.voiceEnabled && (
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-success-600" />
                        <span className="font-['Montserrat'] text-[16px] font-[500] text-default-font">
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

  if (creationComplete) {
    return (
      <div className="flex w-full min-h-screen flex-col items-center justify-center gap-12 bg-brand-900 px-6 py-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-8"
        >
          <div className="w-32 h-32 bg-success-600 rounded-full flex items-center justify-center">
            <CheckCircle className="w-16 h-16 text-white" />
          </div>
          <div className="flex flex-col items-center gap-4">
            <span className="font-['Montserrat'] text-[64px] font-[900] leading-[64px] text-brand-300 text-center -tracking-[0.04em] mobile:text-[48px] mobile:leading-[48px]">
              Agent Created Successfully!
            </span>
            <span className="font-['Montserrat'] text-[24px] font-[500] text-white text-center">
              Your AI agent is now live on the Algorand blockchain
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="large"
              onClick={() => navigate('/agents')}
            >
              View Agent
            </Button>
            <Button
              variant="brand-secondary"
              size="large"
              onClick={() => {
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
              }}
            >
              Create Another
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Progress Section */}
      <div className="flex w-full flex-col items-center justify-center gap-8 bg-default-font px-6 py-16">
        <div className="flex w-full max-w-[1024px] items-center justify-between">
          <span className="font-['Montserrat'] text-[48px] font-[900] leading-[48px] text-white -tracking-[0.04em] mobile:text-[36px] mobile:leading-[36px]">
            Create AI Agent
          </span>
          <span className="font-['Montserrat'] text-[20px] font-[500] text-white/60">
            Step {currentStep} of 4
          </span>
        </div>
        <div className="w-full max-w-[1024px] bg-white/20 rounded-full h-3">
          <div 
            className="bg-brand-300 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {renderStepContent()}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex w-full items-center justify-center bg-white px-6 py-16">
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

export default CreateAgent;