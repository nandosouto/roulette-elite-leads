
import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';

interface Notification {
  id: number;
  name: string;
}

const notifications: Notification[] = [
  { id: 1, name: 'João Silva' },
  { id: 2, name: 'Ana L.' },
  { id: 3, name: 'Carlos M.' },
  { id: 4, name: 'Patricia B.' },
  { id: 5, name: 'Rafael D.' },
  { id: 6, name: 'Mariana T.' },
  { id: 7, name: 'Luciana P.' },
  { id: 8, name: 'Marcelo G.' }
];

const Notifications: React.FC = () => {
  const [activeNotification, setActiveNotification] = useState<Notification | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showNotification = () => {
      // Get random notification
      const randomIndex = Math.floor(Math.random() * notifications.length);
      setActiveNotification(notifications[randomIndex]);
      setIsVisible(true);
      
      // Hide after 5 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    };
    
    // First notification after 5 seconds
    const initialTimeout = setTimeout(showNotification, 5000);
    
    // Then show periodically
    const interval = setInterval(() => {
      showNotification();
    }, 15000); // Show every 15 seconds
    
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  if (!activeNotification) return null;

  return (
    <div 
      className={`fixed bottom-4 left-4 z-50 bg-black bg-opacity-80 border border-roulette-gold rounded-lg p-4 shadow-lg max-w-xs transition-all duration-500 transform ${
        isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
      }`}
    >
      <div className="flex items-center">
        <Bell className="text-roulette-green mr-3 w-5 h-5" />
        <div>
          <p className="text-white text-sm">
            <span className="text-roulette-gold font-semibold">{activeNotification.name}</span> acabou de entrar no grupo!
          </p>
          <p className="text-xs text-gray-400 mt-1">Agora mesmo</p>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
