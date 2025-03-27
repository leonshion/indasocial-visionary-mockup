
import React from 'react';
import { Coins, ShieldCheck, BarChart, Users, Share2, Zap } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import FeatureCard from './FeatureCard';
import Button from './Button';

const FeatureSection: React.FC = () => {
  const features = [
    {
      icon: Coins,
      title: "INDA Token",
      description: "The native token that powers the entire ecosystem and enables decentralized monetization for creators.",
    },
    {
      icon: Users,
      title: "Community Governance",
      description: "Token holders participate in platform governance, voting on key decisions and protocol upgrades.",
    },
    {
      icon: ShieldCheck,
      title: "Secure & Decentralized",
      description: "Built on Internet Computer Protocol for maximum security, censorship resistance, and true ownership.",
    },
    {
      icon: BarChart,
      title: "Transparent Economics",
      description: "Clear token distribution model with allocated percentages for ecosystem growth and sustainability.",
    },
    {
      icon: Share2,
      title: "Interoperability",
      description: "Seamlessly connect with other ICP applications and services through native integrations.",
    },
    {
      icon: Zap,
      title: "Instant Rewards",
      description: "Creators and users earn tokens in real-time for valuable contributions to the network.",
    },
  ];

  return (
    <section id="features" className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-inda-blue/5 rounded-bl-full"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-inda-purple/5 rounded-tr-full"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <ScrollReveal>
            <span className="inline-block px-3 py-1 text-xs font-medium text-inda-blue bg-inda-blue/10 rounded-full mb-4">
              Core Features
            </span>
          </ScrollReveal>
          
          <ScrollReveal animation="slideUp" delay={200}>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 tracking-tight">
              Building the Future of Social with <span className="text-inda-blue">ICP</span>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal animation="fadeIn" delay={400}>
            <p className="text-lg text-gray-600">
              Indasocial combines decentralized technology with user-friendly experience to create a new standard for social platforms powered by Internet Computer.
            </p>
          </ScrollReveal>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 100}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <ScrollReveal animation="fadeIn" delay={800}>
            <Button variant="primary" size="lg" hasArrow>
              Explore All Features
            </Button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
