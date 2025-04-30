
import React, { useState, useEffect } from 'react';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consentGiven = localStorage.getItem('cookie_consent') === 'true';
    setHasConsent(consentGiven);
    
    if (!consentGiven) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie_consent', 'true');
    setHasConsent(true);
    setIsVisible(false);
    
    // Enable tracking scripts after consent
    if (window.fbq) window.fbq('consent', 'grant');
    if (window.gtag) window.gtag('consent', 'update', { 
      analytics_storage: 'granted', 
      ad_storage: 'granted' 
    });
  };

  if (hasConsent || !isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-95 border-t border-roulette-gold p-4 z-50 animate-fade-in">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="text-white mb-4 md:mb-0">
          <p className="text-sm">
            Este site utiliza cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa{' '}
            <a href="#" className="text-roulette-gold underline">Política de Privacidade</a>.
          </p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={acceptCookies}
            className="bg-roulette-green hover:bg-opacity-80 text-white px-6 py-2 rounded-lg text-sm"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
