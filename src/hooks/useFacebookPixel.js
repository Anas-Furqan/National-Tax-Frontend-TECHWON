import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const PIXEL_ID = '1263949525898080';

const loadFacebookPixel = (pixelId) => {
  if (window.fbq) {
    return;
  }

  window.fbq = function () {
    window.fbq.callMethod
      ? window.fbq.callMethod.apply(window.fbq, arguments)
      : window.fbq.queue.push(arguments);
  };

  if (!window._fbq) {
    window._fbq = window.fbq;
  }

  window.fbq.push = window.fbq;
  window.fbq.loaded = true;
  window.fbq.version = '2.0';
  window.fbq.queue = [];

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  const firstScript = document.getElementsByTagName('script')[0];
  if (firstScript?.parentNode) {
    firstScript.parentNode.insertBefore(script, firstScript);
  }

  window.fbq('init', pixelId);
  window.fbq('track', 'PageView');
};

const useFacebookPixel = () => {
  const location = useLocation();
  const initializedRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    loadFacebookPixel(PIXEL_ID);
    initializedRef.current = true;
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !initializedRef.current) {
      return;
    }

    if (typeof window.fbq === 'function') {
      window.fbq('track', 'PageView');
    }
  }, [location]);
};

export default useFacebookPixel;
