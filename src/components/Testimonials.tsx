import React, { useState, useEffect } from 'react';
import { Star, CircleChevronLeft, CircleChevronRight } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  title: string;
  text: string;
  stars: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "João P.",
    title: "Apostador Profissional",
    text: "Lucro R$ 350 por dia usando o método gratuito do 27 top!",
    stars: 5,
    avatar: "https://i.pravatar.cc/150?img=8"
  },
  {
    id: 2,
    name: "Mariana S.",
    title: "Jogadora Casual",
    text: "As lives gratuitas de operação mudaram minha vida financeira!",
    stars: 5,
    avatar: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: 3,
    name: "Carlos F.",
    title: "Entusiasta de Jogos",
    text: "Ganhei R$ 480 no meu primeiro dia nas lives de roleta ao vivo!",
    stars: 5,
    avatar: "https://i.pravatar.cc/150?img=11"
  },
  {
    id: 4,
    name: "Thalita N.",
    title: "Mentora de Apostas",
    text: "Método 100% gratuito e lucro consistente de R$ 200 por dia!",
    stars: 5,
    avatar: "https://i.pravatar.cc/150?img=9"
  },
  {
    id: 5,
    name: "La Lopes",
    title: "Especialista em Jogos Online",
    text: "A melhor estratégia gratuita de roleta que já usei! R$ 500 em um dia!",
    stars: 5,
    avatar: "https://i.pravatar.cc/150?img=3"
  }
];

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  
  // Effect to handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine how many testimonials to display based on screen size
  const getVisibleCount = () => {
    if (windowWidth < 640) return 1;
    if (windowWidth < 1024) return 2;
    return 3;
  };
  
  const visibleCount = getVisibleCount();
  
  // Auto rotation effect
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % (testimonials.length - visibleCount + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isPaused, visibleCount]);

  // Navigate to previous testimonial
  const goToPrevious = () => {
    setActiveIndex((current) => (current === 0 ? 0 : current - 1));
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000);
  };

  // Navigate to next testimonial
  const goToNext = () => {
    setActiveIndex((current) => (current === testimonials.length - visibleCount ? current : current + 1));
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000);
  };
  
  // Create array of stars
  const renderStars = (count: number) => {
    return Array(count).fill(0).map((_, i) => (
      <Star key={i} className="w-4 h-4 text-roulette-gold fill-roulette-gold" />
    ));
  };

  // Visible testimonials
  const visibleTestimonials = testimonials.slice(activeIndex, activeIndex + visibleCount);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-900 bg-opacity-90 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-roulette-gold mb-3">
            QUEM JOGA COM ESTRATÉGIA FALA COM RESULTADO
          </h2>
          <p className="text-white text-base md:text-lg">
            Depoimentos reais de quem já lucra com o 27 top e domina a roleta ao vivo.
          </p>
        </div>
        
        <div className="flex items-center justify-center">
          <button
            onClick={goToPrevious}
            disabled={activeIndex === 0}
            className={`mr-2 p-1 focus:outline-none ${
              activeIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:text-roulette-gold'
            }`}
            aria-label="Previous testimonials"
          >
            <CircleChevronLeft className="w-8 h-8 text-white hover:text-roulette-gold" />
          </button>
          
          <div className="flex overflow-hidden gap-4 w-full">
            {visibleTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="testimonial-card flex-1 flex flex-col rounded-lg p-6 transition-all duration-300 transform hover:scale-105"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full border-2 border-roulette-gold"
                  />
                  <div className="ml-4">
                    <h3 className="text-roulette-gold font-semibold">{testimonial.name}</h3>
                    <p className="text-gray-300 text-sm">{testimonial.title}</p>
                  </div>
                </div>
                
                <p className="text-white mb-4 italic flex-grow">&ldquo;{testimonial.text}&rdquo;</p>
                
                <div className="flex mt-auto">
                  {renderStars(testimonial.stars)}
                </div>
              </div>
            ))}
          </div>
          
          <button
            onClick={goToNext}
            disabled={activeIndex === testimonials.length - visibleCount}
            className={`ml-2 p-1 focus:outline-none ${
              activeIndex === testimonials.length - visibleCount ? 'opacity-30 cursor-not-allowed' : 'hover:text-roulette-gold'
            }`}
            aria-label="Next testimonials"
          >
            <CircleChevronRight className="w-8 h-8 text-white hover:text-roulette-gold" />
          </button>
        </div>
        
        <div className="flex justify-center mt-6">
          {Array(testimonials.length - visibleCount + 1).fill(0).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveIndex(i);
                setIsPaused(true);
                setTimeout(() => setIsPaused(false), 10000);
              }}
              className={`w-2 h-2 rounded-full mx-1 focus:outline-none ${
                i === activeIndex ? 'bg-roulette-gold' : 'bg-gray-500'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
