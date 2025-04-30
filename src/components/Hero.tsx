
import React from 'react';
import { trackLeadEvent } from '../utils/tracking';

const Hero: React.FC = () => {
  const telegramLink = 'https://t.me/ederson27top_bot?start=w38394452';
  
  const handleCTAClick = () => {
    trackLeadEvent(telegramLink);
    window.open(telegramLink, '_blank');
  };

  return (
    <section 
      className="min-h-screen pt-16 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 relative"
      style={{
        backgroundImage: 'url(https://i.ibb.co/h1LvfNjT/banner-ederson.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="bg-overlay absolute inset-0"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto animate-fade-in">
        <h1 className="gold-gradient-text text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-shadow-lg">
          DOMINE A ROLETA AO VIVO COM A ESTRATÉGIA DOS TOPS!
        </h1>
        
        <p className="text-white text-lg md:text-xl mb-12 text-shadow">
          Entre agora no nosso grupo FREE e receba sinais e calls ao vivo para lucrar todos os dias!
        </p>
        
        <button 
          onClick={handleCTAClick}
          className="bg-roulette-green hover:bg-opacity-90 text-white font-bold py-4 px-8 rounded-lg text-lg md:text-xl transition-all duration-300 transform hover:scale-105 animate-pulse-scale gold-border"
        >
          QUERO A ESTRATÉGIA AGORA!
        </button>
        
        <p className="text-white text-sm opacity-75 mt-4">
          Suas informações estão seguras | Vagas Limitadas!
        </p>
      </div>
    </section>
  );
};

export default Hero;
