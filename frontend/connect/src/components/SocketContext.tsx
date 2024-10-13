import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '../store/useAuthStore';
import { SOCKET_ORIGIN } from '../utils/constants';
import { toast } from 'sonner';

const SocketContext = createContext<Socket | null>(null);

export const useSocket = (): Socket | null => {
  const context = useContext(SocketContext);

  if (context === null) {
    throw new Error('useSocket must be used within a SocketProvider');
  }

  return context;
};

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { user } = useAuthStore();  

  useEffect(() => {
    if (user) {
      const newSocket = io(SOCKET_ORIGIN, {
        withCredentials: true,
      });

      newSocket.on('connect', () => {
        console.log('Connected to socket server');
      });

      newSocket.on('connect_error', (err) => {
        console.error('Socket connection error:', err);
        toast.error(`${err.message}`);
      });

      newSocket.on('error', (error) => {
        console.error('Socket error:', error);
        toast.error(`Socket error: ${error.message}`);
      });
      
      newSocket.on('disconnect', () => {
        console.log('Disconnected from socket server');
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [user]);  

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};