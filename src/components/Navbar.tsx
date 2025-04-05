
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import ConnectWallet from './ConnectWallet';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const links = [
    { name: 'Features', href: '#features' },
    { name: 'Token', href: '#token' },
    { name: 'Roadmap', href: '#roadmap' },
    { name: 'Community', href: '#community' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-white bg-opacity-80 backdrop-blur-md shadow-sm' : 'bg-transparent'
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Logo variant={isScrolled ? 'default' : 'white'} />
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-1">
            {links.map(link => (
              <a 
                key={link.name} 
                href={link.href}
                className={cn(
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  isScrolled 
                    ? 'text-gray-700 hover:text-inda-blue' 
                    : 'text-white/80 hover:text-white'
                )}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="https://github.com/leonshion"
              target="_blank" 
              rel="noopener noreferrer"
              className={cn(
                'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isScrolled 
                  ? 'text-gray-700 hover:text-inda-blue' 
                  : 'text-white/80 hover:text-white'
              )}
            >
              GitHub
            </a>
          </div>
          
          <div className="hidden md:flex items-center">
            <ConnectWallet />
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              className={cn(
                'inline-flex items-center justify-center p-2 rounded-md transition-colors',
                isScrolled 
                  ? 'text-gray-700 hover:text-inda-blue hover:bg-gray-100' 
                  : 'text-white hover:text-white hover:bg-white/10'
              )}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Menú móvil */}
      <div 
        className={cn(
          'fixed inset-0 top-16 z-40 bg-white transform transition-transform duration-300 ease-in-out md:hidden',
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {links.map(link => (
            <a
              key={link.name}
              href={link.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-inda-blue hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="https://github.com/leonshion"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-inda-blue hover:bg-gray-50"
          >
            GitHub
          </a>
          <div className="pt-4 px-3">
            <ConnectWallet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
