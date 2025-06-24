import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCharacters } from '../hooks/useCharacters';
import { TrendingUp, Users, Gamepad2, Wallet, Bot, Zap, Sparkles, MessageCircle, Crown, Heart, Dice6, ArrowRight, Star } from 'lucide-react';
import { 
  BoldNavbar, 
  BoldNavbarMobile, 
  Button, 
  Accordion, 
  LinkButton, 
  IconButton 
} from "@/ui";


const Dashboard: React.FC = () => {
  const { characters, loading } = useCharacters();

  const stats = [
    {
      icon: Bot,
      label: 'Active Agents',
      value: characters.filter(c => c.status === 'active').length,
      color: 'text-green-500',
      bg: 'bg-green-500/10 border-green-500/20'
    },
    {
      icon: Gamepad2,
      label: 'Total Interactions',
      value: characters.reduce((sum, c) => sum + c.gamesPlayed, 0),
      color: 'text-blue-500',
      bg: 'bg-blue-500/10 border-blue-500/20'
    },
    {
      icon: Wallet,
      label: 'Portfolio Value',
      value: `${characters.reduce((sum, c) => sum + c.tokenBalance, 0).toFixed(2)} ALGO`,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10 border-purple-500/20'
    },
    {
      icon: TrendingUp,
      label: 'Platform Tokens',
      value: '1,250 ALGO',
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10 border-yellow-500/20'
    }
  ];

  const agentCategories = [
    {
      icon: Crown,
      title: 'Social Influencer Agents',
      description: 'AI-powered social media personalities that engage with audiences naturally',
      color: 'from-pink-500 to-rose-500',
      features: ['Social Media Integration', 'Audience Engagement', 'Content Generation', 'Brand Partnerships']
    },
    {
      icon: Heart,
      title: 'AI Companions',
      description: 'Personalized AI agents for meaningful one-on-one interactions',
      color: 'from-purple-500 to-indigo-500',
      features: ['Personalized Conversations', 'Memory Retention', 'Emotional Intelligence', 'Voice Interaction']
    },
    {
      icon: Dice6,
      title: 'Game Master Agents',
      description: 'Automated storytellers that create and run immersive RPG adventures',
      color: 'from-emerald-500 to-teal-500',
      features: ['Dynamic Storytelling', 'Player Adaptation', 'World Building', 'Quest Management']
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 flex items-center justify-center">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-white text-lg">Loading AlgoAgent...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
       <div className="flex w-full flex-col items-center justify-center gap-8 bg-brand-900 px-6 py-32 mobile:px-6 mobile:py-32">
  <span className="w-full max-w-[768px] whitespace-pre-wrap font-['Montserrat'] text-[96px] font-[900] leading-[84px] text-brand-300 text-center -tracking-[0.04em] mobile:font-['Montserrat'] mobile:text-[62px] mobile:font-[900] mobile:leading-[58px] mobile:tracking-normal">
    {"CHAIN AGENT:\nDECENTRALIZED AI AGENT  "}
  </span>
  <span className="max-w-[576px] whitespace-pre-wrap font-['Montserrat'] text-[20px] font-[400] leading-[28px] text-white text-center -tracking-[0.015em]">
    {
      "Create, tokenize, and deploy AI agents on the Algorand blockchain. Build social influencers, AI companions, and game masters with our no-code platform.\n\n"
    }
  </span>
  <div className="flex flex-wrap items-center justify-center gap-6">
    <Button
      size="large"
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
    >
      Create Your First Agent
    </Button>
    <Button
      variant="brand-secondary"
      size="large"
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
    >
      Explore Marketplace
    </Button>
  </div>
</div>


        {/* Stats Grid */}
       <div className="flex w-full flex-col items-center justify-center gap-6 bg-brand-900 px-6 py-32">
  <div className="flex w-full max-w-[1280px] grow shrink-0 basis-0 flex-wrap items-center justify-center gap-12">
    <div className="flex grow shrink-0 basis-0 flex-col items-center justify-center gap-2 self-stretch">
      <div className="flex w-full min-w-[320px] max-w-[576px] grow shrink-0 basis-0 flex-col items-center justify-center gap-2 overflow-hidden">
        <img
          className="w-full grow shrink-0 basis-0 object-cover"
          src="https://res.cloudinary.com/subframe/image/upload/v1723780730/uploads/302/bfoixbupgy9opiv7ljrb.png"
        />
      </div>
    </div>
    <div className="flex min-w-[320px] grow shrink-0 basis-0 flex-col items-start justify-center gap-24 self-stretch py-12">
      <div className="flex max-w-[576px] flex-col items-start justify-center gap-4">
        <span className="w-full max-w-[576px] font-['Montserrat'] text-[50px] font-[700] leading-[56px] text-brand-300 -tracking-[0.025em] mobile:font-['Montserrat'] mobile:text-[44px] mobile:font-[700] mobile:leading-[48px] mobile:tracking-normal">
          How fast can you summon your on-chain AI Agent?
        </span>
        <span className="whitespace-pre-wrap font-['Montserrat'] text-[18px] font-[400] leading-[26px] text-white -tracking-[0.01em]">
          {
            "With Chain Agent, deploying an AI agent is as instant as a prompt. Just describe your idea, and our no-code builder assembles, personalizes, and launches your decentralized agent on-chain.\n\nFrom social personas to RPG game masters, creation takes minutes — not cycles of Jupiter.\n\n"
          }
        </span>
      </div>
      <div className="flex w-full flex-wrap items-start gap-6 rounded-[32px] border border-solid border-neutral-border bg-default-background px-8 py-12 mobile:flex-col mobile:flex-wrap mobile:gap-6">
        <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2">
          <span className="whitespace-pre-wrap font-['Montserrat'] text-[20px] font-[400] leading-[28px] text-default-font -tracking-[0.015em]">
            {"AI Companion\t"}
          </span>
          <span className="whitespace-pre-wrap font-['Montserrat'] text-[20px] font-[600] leading-[28px] text-brand-900 -tracking-[0.015em]">
            {"Game Master Agent\t"}
          </span>
        </div>
        <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2">
          <span className="whitespace-pre-wrap font-['Montserrat'] text-[20px] font-[400] leading-[28px] text-default-font -tracking-[0.015em]">
            {"Expected arrival"}
          </span>
          <span className="whitespace-pre-wrap font-['Montserrat'] text-[20px] font-[600] leading-[28px] text-brand-900 -tracking-[0.015em]">
            {"2min"}
          </span>
        </div>
      </div>
    </div>
  </div>
</div>

        {/* Agent Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white"
        >
         <div className="flex w-full flex-col items-center justify-center gap-12 px-6 py-32">
  <div className="flex w-full max-w-[1024px] flex-col items-center justify-center gap-4">
    <span className="w-full font-['Montserrat'] text-[30px] font-[700] leading-[34px] text-default-font -tracking-[0.025em]">
      Unlock different categories of agents, all in seconds!
    </span>
  </div>
  <div className="flex w-full flex-col items-center justify-center gap-4">
    <div className="flex w-full max-w-[1024px] flex-wrap items-center justify-center gap-4">
      <div className="flex min-h-[448px] min-w-[320px] max-w-[1280px] grow shrink-0 basis-0 flex-col items-start justify-end gap-8 self-stretch rounded-[32px] bg-brand-300 px-8 py-8">
        <div className="flex w-full flex-col items-start justify-end gap-12 px-2 py-2">
          <span className="w-full max-w-[448px] whitespace-pre-wrap font-['Montserrat'] text-[48px] font-[900] leading-[44px] text-brand-900 -tracking-[0.04em] mobile:font-['Montserrat'] mobile:text-[40px] mobile:font-[900] mobile:leading-[40px] mobile:tracking-normal">
            {"Social Influencer Agents\n\n"}
          </span>
          <span className="w-full max-w-[576px] whitespace-pre-wrap font-['Montserrat'] text-[18px] font-[400] leading-[26px] text-default-font -tracking-[0.01em]">
            {
              "AI-powered social media personalities that engage with audiences naturally. Social Media Integration, Audience Engagement, Content Generation and Brand Partnerships\n\n\n\n"
            }
          </span>
        </div>
      </div>
      <div className="flex min-h-[448px] min-w-[240px] max-w-[384px] grow shrink-0 basis-0 flex-col items-start justify-end gap-8 self-stretch rounded-[32px] bg-error-900 px-8 py-8 mobile:h-auto mobile:min-h-[448px] mobile:min-w-[240px] mobile:grow mobile:shrink-0 mobile:basis-0 mobile:self-stretch">
        <div className="flex w-full flex-col items-start justify-end gap-12 px-2 py-2">
          <span className="w-full max-w-[448px] whitespace-pre-wrap font-['Montserrat'] text-[48px] font-[900] leading-[44px] text-error-200 -tracking-[0.04em] mobile:font-['Montserrat'] mobile:text-[40px] mobile:font-[900] mobile:leading-[40px] mobile:tracking-normal">
            {"AI Companions\n\n"}
          </span>
          <span className="w-full max-w-[576px] whitespace-pre-wrap font-['Montserrat'] text-[18px] font-[400] leading-[26px] text-white -tracking-[0.01em]">
            {
              "Personalized AI agents for meaningful one-on-one interactions. \n\n\n\n"
            }
          </span>
        </div>
      </div>
    </div>
    <div className="flex w-full max-w-[1024px] flex-wrap items-center justify-center gap-4">
      <div className="flex min-h-[448px] min-w-[240px] max-w-[384px] grow shrink-0 basis-0 flex-col items-start justify-end gap-8 self-stretch rounded-[32px] bg-neutral-800 px-8 py-8 mobile:h-auto mobile:min-h-[448px] mobile:min-w-[240px] mobile:grow mobile:shrink-0 mobile:basis-0 mobile:self-stretch">
        <div className="flex w-full flex-col items-start justify-end gap-12 px-2 py-2">
          <span className="w-full max-w-[448px] whitespace-pre-wrap font-['Montserrat'] text-[48px] font-[900] leading-[44px] text-warning-200 -tracking-[0.04em] mobile:font-['Montserrat'] mobile:text-[40px] mobile:font-[900] mobile:leading-[40px] mobile:tracking-normal">
            {"Game Master Agents\n\n"}
          </span>
          <span className="w-full max-w-[576px] whitespace-pre-wrap font-['Montserrat'] text-[18px] font-[400] leading-[26px] text-white -tracking-[0.01em]">
            {
              "Automated storytellers that create and run immersive RPG adventures\n\n\n"
            }
          </span>
        </div>
      </div>
      <div className="flex min-h-[448px] min-w-[320px] max-w-[1280px] grow shrink-0 basis-0 flex-col items-start justify-end gap-8 self-stretch rounded-[32px] bg-error-200 px-8 py-8">
        <div className="flex w-full flex-col items-start justify-end gap-12 px-2 py-2">
          <span className="w-full max-w-[448px] whitespace-pre-wrap font-['Montserrat'] text-[48px] font-[900] leading-[44px] text-error-900 -tracking-[0.04em] mobile:font-['Montserrat'] mobile:text-[40px] mobile:font-[900] mobile:leading-[40px] mobile:tracking-normal">
            {"Your Call"}
          </span>
          <span className="w-full max-w-[576px] whitespace-pre-wrap font-['Montserrat'] text-[18px] font-[400] leading-[26px] text-default-font -tracking-[0.01em]">
            {"What AIAgent do you envision? your call!"}
          </span>
        </div>
      </div>
    </div>
  </div>
</div>  
        </motion.div>


        <div className="flex w-full flex-col items-center bg-brand-900 px-6 py-24 mobile:px-6 mobile:py-24">
  <div className="flex w-full max-w-[1280px] flex-col items-start justify-center gap-8 py-24">
    <span className="whitespace-pre-wrap font-['Montserrat'] text-[96px] font-[900] leading-[84px] text-brand-300 -tracking-[0.04em] mobile:font-['Montserrat'] mobile:text-[62px] mobile:font-[900] mobile:leading-[58px] mobile:tracking-normal">
      {"DEPLOY INTELLIGENT AGENTS, FAST"}
    </span>
    <span className="max-w-[768px] whitespace-pre-wrap font-['Montserrat'] text-[20px] font-[400] leading-[28px] text-white -tracking-[0.015em]">
      {
        "Imagine a decentralized galaxy where anyone can summon autonomous agents in seconds.\nNo code. No gatekeepers. Just pure agent autonomy, ready to serve, play, or build beside you.\n\n\n"
      }
    </span>
  </div>
  <div className="flex w-full max-w-[1280px] flex-col items-end gap-8 py-24">
    <div className="flex w-full max-w-[1024px] flex-col items-start justify-center gap-12">
      <div className="flex h-192 w-full flex-none flex-col items-center justify-center gap-2 overflow-hidden">
        <img
          className="w-full grow shrink-0 basis-0 object-cover"
          src="https://res.cloudinary.com/subframe/image/upload/v1723780611/uploads/302/lbaowphtt6gfvgjr10b4.png"
        />
      </div>
      <span className="whitespace-pre-wrap font-['Montserrat'] text-[22px] font-[600] leading-[26px] text-white -tracking-[0.015em]">
        {
          "The Chain Agent vessel is your launchpad for navigating the decentralized agentverse.\nEngineered for sovereign creation, it’s built to minimize complexity while maximizing reach. With just one prompt, you deploy autonomous agents ready to operate, entertain, or assist—across blockchains, platforms, and dimensions.\n\n"
        }
      </span>
      <Button
        variant="brand-secondary"
        size="large"
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
      >
        Create your agent
      </Button>
    </div>
  </div>
</div>


        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className=""
        >
         <div className="flex w-full flex-col items-center justify-center gap-12 bg-default-font px-6 py-32">
  <div className="flex w-full flex-col items-center justify-center gap-6">
    <span className="w-full max-w-[768px] whitespace-pre-wrap font-['Montserrat'] text-[62px] font-[900] leading-[58px] text-white text-center -tracking-[0.04em] mobile:font-['Montserrat'] mobile:text-[48px] mobile:font-[900] mobile:leading-[44px] mobile:tracking-normal">
      {"EASY STEPS FOR YOUR AGENT ACTIVATION"}
    </span>
  </div>
  <div className="flex w-full max-w-[1024px] flex-col items-center justify-center gap-6">
    <div className="flex w-full grow shrink-0 basis-0 flex-wrap items-center rounded-[32px] bg-default-background">
      <div className="flex min-w-[240px] grow shrink-0 basis-0 items-center justify-center self-stretch px-12 py-12">
        <span className="max-w-[384px] grow shrink-0 basis-0 whitespace-pre-wrap font-['Montserrat'] text-[40px] font-[900] leading-[40px] text-default-font text-center -tracking-[0.03em]">
          {"TOKEN ACQUISITION\n"}
        </span>
      </div>
      <div className="flex min-w-[240px] grow shrink-0 basis-0 items-center gap-12 self-stretch px-12 py-12">
        <span className="max-w-[576px] grow shrink-0 basis-0 whitespace-pre-wrap font-['Montserrat'] text-[18px] font-[400] leading-[26px] text-default-font -tracking-[0.01em]">
          {
            "Purchase platform tokens on supported DEX and hold minimum required tokens (1000 ALGO)\n\n"
          }
        </span>
      </div>
    </div>
    <div className="flex w-full grow shrink-0 basis-0 flex-wrap items-center rounded-[32px] bg-default-background">
      <div className="flex min-w-[240px] grow shrink-0 basis-0 items-center justify-center self-stretch px-12 py-12">
        <span className="max-w-[384px] grow shrink-0 basis-0 whitespace-pre-wrap font-['Montserrat'] text-[40px] font-[900] leading-[40px] text-default-font text-center -tracking-[0.03em]">
          {"AGENT CREATION\n"}
        </span>
      </div>
      <div className="flex min-w-[240px] grow shrink-0 basis-0 items-center gap-12 self-stretch px-12 py-12">
        <span className="max-w-[576px] grow shrink-0 basis-0 whitespace-pre-wrap font-['Montserrat'] text-[18px] font-[400] leading-[26px] text-default-font -tracking-[0.01em]">
          {
            "Select agent category, describe desired behavior, and review AI-generated profile\n\n\n"
          }
        </span>
      </div>
    </div>
    <div className="flex w-full grow shrink-0 basis-0 flex-wrap items-center rounded-[32px] bg-default-background">
      <div className="flex min-w-[240px] grow shrink-0 basis-0 items-center justify-center self-stretch px-12 py-12">
        <span className="max-w-[384px] grow shrink-0 basis-0 whitespace-pre-wrap font-['Montserrat'] text-[40px] font-[900] leading-[40px] text-default-font text-center -tracking-[0.03em]">
          {"DEPLOYMENT\n"}
        </span>
      </div>
      <div className="flex min-w-[240px] grow shrink-0 basis-0 items-center gap-12 self-stretch px-12 py-12">
        <span className="max-w-[576px] grow shrink-0 basis-0 whitespace-pre-wrap font-['Montserrat'] text-[18px] font-[400] leading-[26px] text-default-font -tracking-[0.01em]">
          {
            "Pay deployment fee, agent automatically deploys with token generation\n\n\n"
          }
        </span>
      </div>
    </div>
  </div>
</div>
        </motion.div>

        {/* FAQ*/}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className=""
        >
          <div className="flex w-full flex-col items-center justify-center gap-12 bg-default-background px-6 py-32">
  <div className="flex w-full max-w-[1024px] flex-col items-center justify-center gap-8">
    <span className="w-full max-w-[768px] whitespace-pre-wrap font-['Montserrat'] text-[62px] font-[900] leading-[58px] text-brand-900 text-center -tracking-[0.04em] mobile:font-['Montserrat'] mobile:text-[48px] mobile:font-[900] mobile:leading-[44px] mobile:tracking-normal">
      {"LET'S ANSWER YOUR QUESTIONS\n"}
    </span>
  </div>
  <div className="flex w-full max-w-[1024px] flex-col items-center justify-center">
    <Accordion
      trigger={
        <div className="flex w-full items-center gap-2 px-4 py-4">
          <span className="grow shrink-0 basis-0 whitespace-pre-wrap font-['Montserrat'] text-[18px] font-[600] leading-[26px] text-default-font -tracking-[0.01em]">
            {"What exactly is a decentralized AI agent?\n\n"}
          </span>
          <Accordion.Chevron />
        </div>
      }
      defaultOpen={true}
    >
      <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-6 px-4 py-4">
        <span className="w-full whitespace-pre-wrap font-['Montserrat'] text-[16px] font-[500] leading-[24px] text-default-font -tracking-[0.01em]">
          {
            "A decentralized AI agent is an autonomous digital persona deployed on-chain. Once launched, it lives independently on the blockchain, executing behaviors, interacting with users, and even earning via its own token.\n\n\n"
          }
        </span>
      </div>
    </Accordion>
    <Accordion
      trigger={
        <div className="flex w-full items-center gap-2 px-4 py-4">
          <span className="grow shrink-0 basis-0 whitespace-pre-wrap font-['Montserrat'] text-[18px] font-[600] leading-[28px] text-default-font -tracking-[0.01em]">
            {"Do I need to code to create an agent?\n\n"}
          </span>
          <Accordion.Chevron />
        </div>
      }
      defaultOpen={true}
    >
      <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-6 px-4 py-4">
        <span className="w-full whitespace-pre-wrap font-['Montserrat'] text-[16px] font-[500] leading-[24px] text-default-font -tracking-[0.01em]">
          {
            "Not at all. Our no-code neural interface translates plain-text prompts into fully configured agents. Just describe the vibe — we handle the rest.\n\n\n"
          }
        </span>
      </div>
    </Accordion>
    <Accordion
      trigger={
        <div className="flex w-full items-center gap-2 px-4 py-4">
          <span className="grow shrink-0 basis-0 whitespace-pre-wrap font-['Montserrat'] text-[18px] font-[600] leading-[28px] text-default-font -tracking-[0.01em]">
            {"How does tokenization work for my agent?\n\n"}
          </span>
          <Accordion.Chevron />
        </div>
      }
      defaultOpen={true}
    >
      <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-6 px-4 py-4">
        <span className="w-full whitespace-pre-wrap font-['Montserrat'] text-[16px] font-[500] leading-[24px] text-default-font -tracking-[0.01em]">
          {
            "Once deployed, your agent gets its own smart contract and native token. These tokens can be distributed, traded, or used to govern your agent's behavior depending on your setup.\n\n\n"
          }
        </span>
      </div>
    </Accordion>
    <Accordion
      trigger={
        <div className="flex w-full items-center gap-2 px-4 py-4">
          <span className="grow shrink-0 basis-0 whitespace-pre-wrap font-['Montserrat'] text-[18px] font-[600] leading-[28px] text-default-font -tracking-[0.01em]">
            {"Why launch on Algorand?\n\n"}
          </span>
          <Accordion.Chevron />
        </div>
      }
      defaultOpen={true}
    >
      <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-6 px-4 py-4">
        <span className="w-full whitespace-pre-wrap font-['Montserrat'] text-[16px] font-[500] leading-[24px] text-default-font -tracking-[0.01em]">
          {
            "Speed, low fees, and chain-native finality. Your agents won’t just act fast—they’ll exist in a network optimized for high-frequency, low-latency interactions.\n\n\n"
          }
        </span>
      </div>
    </Accordion>
  </div>
</div>
        </motion.div>


        
      </div>
    </div>
  );
};

export default Dashboard;