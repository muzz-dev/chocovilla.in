'use client';

import { useState, useEffect, useRef } from 'react';

interface StatItemProps {
  label: string;
  value: number;
  suffix?: string;
}

export default function StatItem({ label, value, suffix = '' }: StatItemProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

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

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || prefersReducedMotion) {
      if (prefersReducedMotion) {
        setCount(value);
      }
      return;
    }

    let startTime: number;
    const startCount = 0;
    const duration = 1800; // 1.8 seconds

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function (ease-out)
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const currentCount = Math.floor(startCount + (value - startCount) * easedProgress);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, value, prefersReducedMotion]);

  return (
    <div
      ref={itemRef}
      className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-lg border border-primary-gold/20 shadow-sm"
    >
      <div className="text-4xl md:text-5xl font-bold text-primary-gold mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm md:text-base text-primary-brown font-medium uppercase tracking-wide">
        {label}
      </div>
    </div>
  );
}