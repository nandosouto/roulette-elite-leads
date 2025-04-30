
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black py-6 text-center text-white text-sm">
      <div className="container mx-auto px-4">
        <p>Copyright {currentYear} - Todos os Direitos Reservados | Feito com ❤️ por Pliim Bet</p>
        
        <div className="mt-4 text-xs text-gray-500">
          <a href="#" className="hover:text-roulette-gold mx-2 inline-block">Termos de Uso</a>
          <a href="#" className="hover:text-roulette-gold mx-2 inline-block">Política de Privacidade</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
