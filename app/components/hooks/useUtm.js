'use client'
// utils/useUtm.js
import { useEffect, useState } from 'react';
import { setCookie, getCookie } from '../../utils/cookies';

export function useUtm() {
  const [utm, setUtm] = useState({
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_content: '',
    utm_term: ''
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    const result = {};

    keys.forEach(key => {
      if (params.has(key)) {
        const value = params.get(key);
        setCookie(key, value, 7); // 7 дней
        result[key] = value;
      } else {
        result[key] = getCookie(key) || '';
      }
    });

    setUtm(result);
  }, []);

  return utm;
}
