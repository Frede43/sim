
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const statsList = [
  { label: "Agriculteurs", value: 1250, suffix: "+", color: "from-agri to-agri-dark" },
  { label: "Coopératives", value: 85, suffix: "+", color: "from-earth to-earth-dark" },
  { label: "Produits", value: 320, suffix: "+", color: "from-water to-water-dark" },
  { label: "Transactions", value: 12500, suffix: "+", color: "from-agri-dark to-earth-dark" },
];

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('stats-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section id="stats-section" className="py-16 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-agri-light rounded-full filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-water-light rounded-full filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 reveal">
            Notre Impact en Chiffres
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto reveal">
            AgriMarket connecte les acteurs du marché agricole burundais pour un écosystème plus efficace.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsList.map((stat, index) => (
            <Card key={index} className="glass-card overflow-hidden border-none">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className={`text-5xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {isVisible ? (
                      <Counter end={stat.value} duration={2} />
                    ) : (
                      <span>0</span>
                    )}
                    {stat.suffix}
                  </div>
                  <div className="text-lg font-medium">{stat.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Counter animation component
const Counter = ({ end, duration }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime = null;
    const startValue = 0;
    const step = timestamp => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * (end - startValue) + startValue));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);
  
  return <span>{count}</span>;
};

export default Stats;
