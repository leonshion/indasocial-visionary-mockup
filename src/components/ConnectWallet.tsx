
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, ChevronDown, CheckCircle, XCircle, Copy, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { AuthClient } from '@dfinity/auth-client';
import { Principal } from '@dfinity/principal';

interface ConnectWalletProps {
  className?: string;
}

// Days to milliseconds (for token expiration)
const days = (n: number) => n * 24 * 60 * 60 * 1000;

const ConnectWallet: React.FC<ConnectWalletProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [principalId, setPrincipalId] = useState('');
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  // Initialize the auth client
  useEffect(() => {
    const initAuth = async () => {
      try {
        const client = await AuthClient.create();
        setAuthClient(client);
        
        // Check if the user is already authenticated
        const isAuthenticated = await client.isAuthenticated();
        
        if (isAuthenticated) {
          const identity = client.getIdentity();
          const principal = identity.getPrincipal();
          
          setIsConnected(true);
          setPrincipalId(principal.toString());
        }
        
        setIsInitializing(false);
      } catch (error) {
        console.error('Error initializing auth client:', error);
        toast({
          title: "Authentication Error",
          description: "Could not initialize ICP authentication. Please try again later.",
        });
        setIsInitializing(false);
      }
    };

    initAuth();
  }, []);

  const handleInternetIdentityLogin = async () => {
    if (!authClient) return;
    
    toast({
      title: "Connecting to Internet Identity...",
      description: "Please complete the authentication in the popup window",
    });
    
    try {
      // The window will redirect to the Internet Identity service
      await authClient.login({
        identityProvider: 'https://identity.ic0.app',
        onSuccess: () => {
          const identity = authClient.getIdentity();
          const principal = identity.getPrincipal();
          
          setIsConnected(true);
          setPrincipalId(principal.toString());
          setIsOpen(false);
          
          toast({
            title: "Successfully connected!",
            description: "Your Internet Computer wallet is now connected",
            variant: "default",
          });
        },
        // Convert the days() result from number to BigInt
        maxTimeToLive: BigInt(days(7)), // Session will expire after 7 days
      });
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Connection Failed",
        description: "There was an error connecting to Internet Identity",
      });
    }
  };

  const handlePlugWalletConnect = () => {
    toast({
      title: "Connecting to Plug Wallet...",
      description: "Plug integration is not fully implemented yet",
    });
    
    // In a real implementation, you would use the Plug API
    // This is a placeholder for future implementation
    // Plug has its own JavaScript API that is different from AuthClient
  };

  const handleStoicWalletConnect = () => {
    toast({
      title: "Connecting to Stoic Wallet...",
      description: "Stoic integration is not fully implemented yet",
    });
    
    // In a real implementation, you would use the Stoic wallet API
    // This is a placeholder for future implementation
  };

  const handleDisconnect = async () => {
    if (authClient) {
      await authClient.logout();
      setIsConnected(false);
      setPrincipalId('');
      toast({
        title: "Wallet disconnected",
        description: "Your wallet has been disconnected from this app",
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(principalId);
    toast({
      title: "Copied to clipboard",
      description: "Principal ID has been copied to your clipboard",
    });
  };

  if (isInitializing) {
    return (
      <Button 
        variant="outline" 
        className={cn("opacity-70", className)}
        disabled
      >
        <Wallet className="mr-2 h-4 w-4" />
        Initializing...
      </Button>
    );
  }

  return (
    <div className={cn("relative", className)}>
      {!isConnected ? (
        <>
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="group relative bg-gradient-to-r from-inda-blue to-inda-purple hover:from-inda-purple hover:to-inda-blue text-white"
          >
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet
            <ChevronDown className={cn(
              "ml-2 h-4 w-4 transition-transform duration-200",
              isOpen ? "rotate-180" : ""
            )} />
          </Button>
          
          {isOpen && (
            <div className="absolute right-0 mt-2 w-72 rounded-lg bg-white shadow-lg border border-gray-200 z-50 py-2 animate-in slide-in-from-top-5 fade-in-20">
              <div className="px-4 py-2 border-b border-gray-100">
                <h3 className="font-medium text-gray-900">Connect Wallet</h3>
                <p className="text-xs text-gray-500 mt-1">Select your preferred Internet Computer wallet</p>
              </div>
              
              <div className="p-2">
                <button
                  onClick={handleInternetIdentityLogin}
                  className="w-full px-4 py-3 flex items-center rounded-md hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center text-white mr-3">
                    II
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium text-gray-900">Internet Identity</h4>
                    <p className="text-xs text-gray-500">Connect with Internet Identity</p>
                  </div>
                </button>
                
                <button
                  onClick={handlePlugWalletConnect}
                  className="w-full px-4 py-3 flex items-center rounded-md hover:bg-gray-50 transition-colors mt-2"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white mr-3">
                    P
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium text-gray-900">Plug Wallet</h4>
                    <p className="text-xs text-gray-500">Connect with Plug</p>
                  </div>
                </button>
                
                <button
                  onClick={handleStoicWalletConnect}
                  className="w-full px-4 py-3 flex items-center rounded-md hover:bg-gray-50 transition-colors mt-2"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white mr-3">
                    S
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium text-gray-900">Stoic Wallet</h4>
                    <p className="text-xs text-gray-500">Connect with Stoic</p>
                  </div>
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <Button
            onClick={() => setIsOpen(!isOpen)}
            variant="outline"
            className="border-inda-blue text-inda-blue hover:bg-inda-blue/10"
          >
            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
            Connected
            <ChevronDown className={cn(
              "ml-2 h-4 w-4 transition-transform duration-200",
              isOpen ? "rotate-180" : ""
            )} />
          </Button>
          
          {isOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-lg bg-white shadow-lg border border-gray-200 z-50 py-2 animate-in slide-in-from-top-5 fade-in-20">
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <h3 className="font-medium text-gray-900">Connected to ICP</h3>
                </div>
                <p className="text-xs text-gray-500 mt-1">Your Internet Computer wallet is connected</p>
              </div>
              
              <div className="p-4">
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs text-gray-500">Principal ID</p>
                    <button 
                      onClick={copyToClipboard}
                      className="text-inda-blue hover:text-inda-blue/80 text-xs flex items-center"
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </button>
                  </div>
                  <p className="text-xs font-mono text-gray-700 break-all">{principalId}</p>
                </div>
                
                <div className="mt-4">
                  <a 
                    href={`https://dashboard.internetcomputer.org/account/${principalId}`} 
                    target="_blank"
                    rel="noreferrer"
                    className="text-inda-blue hover:text-inda-blue/80 text-sm flex items-center mb-2"
                  >
                    <ExternalLink className="h-3 w-3 mr-2" />
                    View on IC Dashboard
                  </a>
                  <button
                    onClick={handleDisconnect}
                    className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-red-200 text-sm font-medium rounded-md text-red-600 bg-white hover:bg-red-50 transition-colors"
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Disconnect Wallet
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ConnectWallet;
