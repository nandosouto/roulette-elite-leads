
import React from 'react';
import { useCountdown } from '../utils/countdownTimer';
import { Bell } from 'lucide-react';

const Header: React.FC = () => {
  const { formattedMinutes, formattedSeconds } = useCountdown({
    initialMinutes: 9,
    initialSeconds: 59
  });

  return (
    <header className="fixed top-0 left-0 w-full z-50 animate-fade-in">
      <div className="red-gradient-bg py-2 flex items-center justify-center">
        <Bell className="w-5 h-5 mr-2 text-white" />
        <p className="text-white font-bold text-center text-sm sm:text-base">
          O ACESSO AO GRUPO TERMINA EM: 
          <span className="ml-2 px-2 py-1 bg-black rounded-md font-mono">
            {formattedMinutes}:{formattedSeconds}
          </span>
        </p>
      </div>
    </header>
  );
};

export default Header;
