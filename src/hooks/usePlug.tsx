
import { useState, useEffect, useCallback } from 'react';
import { toast } from "@/components/ui/use-toast";

interface PlugWindow extends Window {
  ic?: {
    plug?: {
      isConnected: () => Promise<boolean>;
      requestConnect: (options?: { whitelist?: string[]; host?: string }) => Promise<boolean>;
      disconnect: () => Promise<void>;
      getPrincipal: () => Promise<string>;
      createAgent: (options?: { whitelist?: string[]; host?: string }) => Promise<any>;
      requestBalance: () => Promise<{ amount: number; symbol: string }[]>;
    };
  };
}

declare const window: PlugWindow;

export const usePlug = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [principal, setPrincipal] = useState<string | null>(null);
  const [plugAvailable, setPlugAvailable] = useState(false);

  // Verificar si la extensión Plug está disponible
  useEffect(() => {
    const checkPlugAvailability = () => {
      const available = !!window.ic?.plug;
      setPlugAvailable(available);
      
      if (!available) {
        console.warn("Plug wallet extension not detected");
      }
    };

    checkPlugAvailability();
    
    // Comprobar el estado de la conexión al inicio
    if (window.ic?.plug) {
      window.ic.plug.isConnected().then(connected => {
        setIsConnected(connected);
        if (connected) {
          fetchPrincipal();
        }
      });
    }
  }, []);

  // Obtener el principal del usuario
  const fetchPrincipal = useCallback(async () => {
    if (!window.ic?.plug) return;
    
    try {
      const principal = await window.ic.plug.getPrincipal();
      setPrincipal(principal.toString());
    } catch (error) {
      console.error("Error fetching principal:", error);
      setPrincipal(null);
    }
  }, []);

  // Conectar a Plug
  const connect = useCallback(async () => {
    if (!window.ic?.plug) {
      toast({
        title: "Plug wallet not installed",
        description: "Please install the Plug wallet extension to connect",
        variant: "destructive"
      });
      return false;
    }

    setIsConnecting(true);

    try {
      // Intentar conectar con Plug
      const connected = await window.ic.plug.requestConnect({
        whitelist: [], // Agrega aquí los canister IDs con los que tu app interactúa
        host: "https://mainnet.dfinity.network" // O usa la red de desarrollo si es necesario
      });

      setIsConnected(connected);
      
      if (connected) {
        // Obtener el principal una vez conectado
        await fetchPrincipal();
        toast({
          title: "Wallet connected",
          description: "Your Internet Computer wallet has been connected successfully",
        });
      }
      
      return connected;
    } catch (error) {
      console.error("Error connecting to Plug wallet:", error);
      toast({
        title: "Connection failed",
        description: "Failed to connect to your wallet. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsConnecting(false);
    }
  }, [fetchPrincipal]);

  // Desconectar de Plug
  const disconnect = useCallback(async () => {
    if (!window.ic?.plug) return;

    try {
      await window.ic.plug.disconnect();
      setIsConnected(false);
      setPrincipal(null);
      toast({
        title: "Wallet disconnected",
        description: "Your wallet has been disconnected successfully",
      });
    } catch (error) {
      console.error("Error disconnecting from Plug wallet:", error);
      toast({
        title: "Disconnection failed",
        description: "Failed to disconnect your wallet. Please try again.",
        variant: "destructive"
      });
    }
  }, []);

  return {
    isConnected,
    isConnecting,
    principal,
    plugAvailable,
    connect,
    disconnect
  };
};

export default usePlug;
