
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeatureSection from '@/components/FeatureSection';
import Footer from '@/components/Footer';
import { ArrowRight, ChevronRight, Lock, Zap, BarChart3, Award, Users, Globe } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import Button from '@/components/Button';
import FeatureCard from '@/components/FeatureCard';

const Index = () => {
  // Implement custom scrollbar behavior
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const header = document.querySelector("nav");
      
      if (header) {
        if (scrollY > 20) {
          header.classList.add("shadow-sm");
        } else {
          header.classList.remove("shadow-sm");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <FeatureSection />
      
      {/* Token Section */}
      <section id="token" className="py-20 md:py-32 bg-gradient-to-br from-inda-black to-inda-dark text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/3 -right-24 w-64 h-64 bg-inda-blue opacity-30 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-inda-purple opacity-20 rounded-full filter blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <ScrollReveal>
                <span className="inline-block px-3 py-1 text-xs font-medium text-inda-blue bg-inda-blue/20 backdrop-blur-sm rounded-full mb-4">
                  INDA Token
                </span>
              </ScrollReveal>
              
              <ScrollReveal animation="slideUp" delay={200}>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 tracking-tight">
                  The Economy of the <span className="text-inda-blue">Decentralized Social</span>
                </h2>
              </ScrollReveal>
              
              <ScrollReveal animation="fadeIn" delay={300}>
                <p className="text-lg text-white/80 mb-8">
                  INDA is the token that rewards the content creators and its users, making possible a new decentralized social economy on the Internet Computer Protocol.
                </p>
              </ScrollReveal>
              
              <div className="space-y-6 mb-8">
                {[
                  { title: "Reward Mechanism", description: "Content creators earn tokens based on engagement and quality" },
                  { title: "Governance", description: "Token holders participate in protocol decisions and voting" },
                  { title: "Utility", description: "Access premium features and services across the platform" }
                ].map((item, index) => (
                  <ScrollReveal key={item.title} animation="slideUp" delay={400 + index * 100}>
                    <div className="flex items-start">
                      <div className="bg-inda-blue/20 backdrop-blur-sm p-2 rounded-full mr-4">
                        <ChevronRight className="w-5 h-5 text-inda-blue" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white mb-1">{item.title}</h4>
                        <p className="text-white/70">{item.description}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
              
              <ScrollReveal animation="fadeIn" delay={700}>
                <Button variant="primary" size="lg" hasArrow>
                  Explore Tokenomics
                </Button>
              </ScrollReveal>
            </div>
            
            <div className="order-1 lg:order-2">
              <ScrollReveal animation="scaleUp" delay={300}>
                <div className="relative">
                  <div className="aspect-square max-w-md mx-auto relative bg-gradient-to-br from-inda-blue to-inda-purple rounded-full flex items-center justify-center p-1">
                    <div className="w-full h-full rounded-full bg-inda-dark flex items-center justify-center">
                      <span className="text-5xl md:text-7xl font-bold text-white">INDA</span>
                    </div>
                    
                    {/* Animated circles */}
                    <div className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-glass">
                      <div className="flex items-center">
                        <Zap className="w-6 h-6 text-inda-blue mr-2" />
                        <span className="text-white font-medium">Fast Transactions</span>
                      </div>
                    </div>
                    
                    <div className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-glass">
                      <div className="flex items-center">
                        <Lock className="w-6 h-6 text-inda-blue mr-2" />
                        <span className="text-white font-medium">Secure & Trustless</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
      
      {/* Roadmap Section */}
      <section id="roadmap" className="py-20 md:py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <ScrollReveal>
              <span className="inline-block px-3 py-1 text-xs font-medium text-inda-blue bg-inda-blue/10 rounded-full mb-4">
                Development Plan
              </span>
            </ScrollReveal>
            
            <ScrollReveal animation="slideUp" delay={200}>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 tracking-tight">
                Our <span className="text-inda-blue">Roadmap</span> to Decentralized Social
              </h2>
            </ScrollReveal>
            
            <ScrollReveal animation="fadeIn" delay={400}>
              <p className="text-lg text-gray-600">
                Follow our journey as we build and deploy Indasocial on the Internet Computer Protocol ecosystem.
              </p>
            </ScrollReveal>
          </div>
          
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform md:-translate-x-0.5"></div>
            
            {/* Roadmap items */}
            {[
              {
                title: "Q1 2023: Research & Planning",
                description: "Market research, competitive analysis, and project planning. Initial architecture design.",
                status: "Completed"
              },
              {
                title: "Q2 2023: MVP Development",
                description: "Development of core platform features and token smart contract.",
                status: "Completed"
              },
              {
                title: "Q3 2023: Private Beta",
                description: "Limited release to early users and testers. Gathering feedback and making improvements.",
                status: "In Progress"
              },
              {
                title: "Q4 2023: Token Launch",
                description: "INDA token official launch with initial distribution events.",
                status: "Upcoming"
              },
              {
                title: "Q1 2024: Public Platform Launch",
                description: "Full platform release with complete feature set for all users.",
                status: "Upcoming"
              },
            ].map((item, index) => (
              <ScrollReveal 
                key={item.title} 
                animation="slideUp" 
                delay={index * 100}
                className={`relative mb-12 md:mb-24 ${index % 2 === 0 ? 'md:ml-0 md:mr-[50%] md:pr-12' : 'md:ml-[50%] md:pl-12'} pl-16 md:pl-0`}
              >
                <div className={`absolute left-0 md:left-auto ${index % 2 === 0 ? 'md:right-0' : 'md:left-0'} top-0 w-8 h-8 rounded-full border-4 border-white bg-inda-blue z-10 transform translate-x-0.5 md:translate-x-0 ${index % 2 === 0 ? 'md:translate-x-4' : 'md:-translate-x-4'}`}></div>
                
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-3 ${
                    item.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                    item.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {item.status}
                  </span>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      
      {/* Community Section */}
      <section id="community" className="py-20 md:py-32 bg-inda-light relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <ScrollReveal>
              <span className="inline-block px-3 py-1 text-xs font-medium text-inda-blue bg-inda-blue/10 rounded-full mb-4">
                Join Us
              </span>
            </ScrollReveal>
            
            <ScrollReveal animation="slideUp" delay={200}>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 tracking-tight">
                Be Part of Our <span className="text-inda-blue">Community</span>
              </h2>
            </ScrollReveal>
            
            <ScrollReveal animation="fadeIn" delay={400}>
              <p className="text-lg text-gray-600 mb-8">
                Join thousands of early adopters shaping the future of decentralized social on Internet Computer Protocol.
              </p>
            </ScrollReveal>
            
            <ScrollReveal animation="fadeIn" delay={600}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Button size="lg" variant="primary" hasArrow>
                  Join Discord
                </Button>
                <Button size="lg" variant="outline">
                  Follow on Twitter
                </Button>
              </div>
            </ScrollReveal>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                title: "10K+",
                description: "Community Members"
              },
              {
                icon: Award,
                title: "5+",
                description: "Ecosystem Partners"
              },
              {
                icon: BarChart3,
                title: "$2M+",
                description: "Early Funding"
              },
              {
                icon: Globe,
                title: "15+",
                description: "Countries Represented"
              }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <div className="bg-white rounded-xl p-8 text-center border border-gray-100 hover:shadow-md transition-shadow duration-300">
                  <div className="w-12 h-12 mx-auto bg-inda-blue/10 rounded-full flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-inda-blue" />
                  </div>
                  <h3 className="text-3xl font-bold text-inda-black mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
