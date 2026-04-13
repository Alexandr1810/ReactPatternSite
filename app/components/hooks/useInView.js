'use client'

import { useEffect, useRef, useState } from 'react';
export function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const hasTriggered = useRef(false);
  
  const mobileSpeed = 0.6;

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          hasTriggered.current = true;
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: mobileSpeed, ...options }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}
