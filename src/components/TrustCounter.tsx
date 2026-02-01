'use client';

import { useEffect, useState, useRef } from 'react';

interface TrustCounterProps {
  targetNumber?: number;
  suffix?: string;
  duration?: number;
}

export default function TrustCounter({
  targetNumber = 500,
  suffix = '+ Happy Customers',
  duration = 2000
}: TrustCounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || prefersReducedMotion) {
      if (prefersReducedMotion) {
        setCount(targetNumber);
      }
      return;
    }

    let startTime: number;
    const startCount = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function (ease-out)
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const currentCount = Math.floor(startCount + (targetNumber - startCount) * easedProgress);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, targetNumber, duration, prefersReducedMotion]);

  return (
    <div
      ref={counterRef}
      className="text-center py-8 px-4 bg-gradient-to-r from-primary-cream/80 to-primary-gold/10 backdrop-blur-sm rounded-lg border border-primary-gold/20 shadow-sm"
    >
      <div className="inline-flex items-center justify-center">
        <span className="text-4xl md:text-6xl font-bold text-primary-gold mr-2">
          {count.toLocaleString()}
        </span>
        <span className="text-lg md:text-xl text-primary-brown font-medium">
          {suffix}
        </span>
      </div>
      <div className="mt-2">
        <span className="text-sm md:text-base text-gray-600 font-medium">
          Trusted by
        </span>
      </div>
    </div>
  );
}