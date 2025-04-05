
import React from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, CheckCheck, ExternalLink } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import usePlug from '@/hooks/usePlug';

const ConnectWallet: React.FC = () => {
  const { isConnected, isConnecting, principal, plugAvailable, connect, disconnect } = usePlug();

  const handleClick = async () => {
    if (isConnected) {
      await disconnect();
      return;
    }
    
    if (!plugAvailable) {
      toast({
        title: "Plug wallet required",
        description: (
          <div className="flex flex-col gap-2">
            <p>Please install the Plug wallet extension for Chrome to continue.</p>
            <a 
              href="https://chrome.google.com/webstore/detail/plug/cfbfdhimifdmdehjmkdobpcjfefblkjm" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-500 hover:underline"
            >
              Install Plug Wallet <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        ),
      });
      return;
    }

    await connect();
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isConnecting}
      className={`inline-flex items-center justify-center gap-2 px-8 py-2.5 text-sm font-medium rounded-md transition-colors ${
        isConnected 
          ? 'bg-green-500 text-white hover:bg-green-600' 
          : 'bg-inda-blue text-white hover:bg-inda-blue/90'
      }`}
    >
      {isConnecting ? (
        <>
          <div className="animate-spin h-4 w-4 border-2 border-white/40 border-t-white rounded-full" />
          Connecting...
        </>
      ) : isConnected ? (
        <>
          <CheckCheck className="w-5 h-5" />
          {principal ? `${principal.substring(0, 5)}...${principal.substring(principal.length - 5)}` : 'Wallet Connected'}
        </>
      ) : (
        <>
          <Wallet className="w-5 h-5" />
          Connect Wallet
        </>
      )}
    </Button>
  );
};

export default ConnectWallet;
