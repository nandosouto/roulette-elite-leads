
import React, { useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Testimonials from '../components/Testimonials';
import Notifications from '../components/Notifications';
import Footer from '../components/Footer';
import CookieConsent from '../components/CookieConsent';
import { initializeAnalytics } from '../utils/tracking';

const Index: React.FC = () => {
  useEffect(() => {
    // Initialize analytics tracking
    const cleanup = initializeAnalytics();
    
    // Setup meta tags dynamically to avoid build errors
    if (typeof document !== 'undefined') {
      document.title = "Estratégias de Roleta ao Vivo - Pliim Bet";
      
      // Meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', 'Domine a roleta ao vivo com as estratégias dos especialistas da Pliim Bet. Receba sinais e calls para lucrar todos os dias!');
      
      // Meta keywords
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', 'estratégias de roleta, roleta ao vivo, apostas online, pliim bet, cassino online, sinais roleta');
    }
    
    // Clean up event listeners from analytics
    return cleanup;
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* GTM */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-MQ66SJ9R"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        ></iframe>
      </noscript>

      {/* Header with timer */}
      <Header />
      
      {/* Main content */}
      <main>
        {/* Hero section with CTA */}
        <Hero />
        
        {/* Testimonials carousel */}
        <Testimonials />
      </main>
      
      {/* Dynamic notifications */}
      <Notifications />
      
      {/* Cookie consent banner */}
      <CookieConsent />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
