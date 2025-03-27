
import React from 'react';
import { Cpu, Wallet, Shield, ArrowRight, Link2 } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import Button from './Button';
import ConnectWallet from './ConnectWallet';

const WalletSection: React.FC = () => {
  return (
    <section id="wallet" className="py-20 md:py-32 bg-gradient-to-br from-white to-inda-light/50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 -left-20 w-64 h-64 bg-inda-purple/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-20 -right-20 w-80 h-80 bg-inda-blue/10 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <ScrollReveal>
            <span className="inline-block px-3 py-1 text-xs font-medium text-inda-blue bg-inda-blue/10 rounded-full mb-4">
              Internet Computer
            </span>
          </ScrollReveal>
          
          <ScrollReveal animation="slideUp" delay={200}>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 tracking-tight">
              Connect to the <span className="text-inda-blue">Internet Computer</span>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal animation="fadeIn" delay={400}>
            <p className="text-lg text-gray-600 mb-8">
              Experience the power of true decentralization with DFINITY's Internet Computer. Connect your wallet to interact with the platform and access exclusive features.
            </p>
          </ScrollReveal>
          
          <ScrollReveal animation="fadeIn" delay={600}>
            <div className="flex justify-center mb-10">
              <ConnectWallet />
            </div>
          </ScrollReveal>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              icon: Wallet,
              title: "Secure Authentication",
              description: "Connect with Internet Identity, Plug or Stoic wallet for secure and seamless authentication"
            },
            {
              icon: Cpu,
              title: "Web3 Integration",
              description: "Directly interact with Internet Computer canisters and smart contracts"
            },
            {
              icon: Shield,
              title: "Self-Custody",
              description: "Maintain complete control of your digital assets with non-custodial wallet solutions"
            }
          ].map((item, index) => (
            <ScrollReveal key={index} delay={300 + index * 150}>
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                <div className="w-12 h-12 mb-4 bg-inda-blue/10 rounded-full flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-inda-blue" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <a href="https://dfinity.org/" target="_blank" rel="noreferrer" className="inline-flex items-center text-inda-blue hover:text-inda-purple transition-colors text-sm font-medium">
                  Learn more
                  <ArrowRight className="ml-1 w-4 h-4" />
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <ScrollReveal animation="fadeIn" delay={800}>
            <div className="inline-flex items-center justify-center gap-3 px-4 py-2 bg-gray-50 rounded-full mb-4">
              <Link2 className="w-4 h-4 text-inda-blue" />
              <span className="text-sm font-medium">Powered by the Internet Computer Protocol</span>
            </div>
          </ScrollReveal>
          
          <ScrollReveal animation="slideUp" delay={900}>
            <p className="text-gray-500 max-w-2xl mx-auto">
              The Internet Computer is a blockchain network that provides a revolutionary platform for smart contracts and decentralized applications, with breakthrough scalability, speed, and efficiency.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default WalletSection;
