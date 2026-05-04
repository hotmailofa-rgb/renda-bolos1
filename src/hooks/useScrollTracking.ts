import { useEffect, useRef } from 'react';

/**
 * Hook para rastrear scroll profundo e enviar eventos ao Facebook Pixel
 * Rastreia quando o usuário chega a diferentes seções da página
 */

export interface ScrollTrackingEvent {
  section: string;
  percentage: number;
  timestamp: number;
}

export function useScrollTracking() {
  const trackedSections = useRef<Set<string>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      // Rastrear seções específicas
      const sections = [
        { name: 'hero', percent: 0 },
        { name: 'video', percent: 10 },
        { name: 'calculator', percent: 20 },
        { name: 'problems', percent: 35 },
        { name: 'solution', percent: 50 },
        { name: 'testimonials', percent: 60 },
        { name: 'faq', percent: 75 },
        { name: 'final_cta', percent: 85 },
        { name: 'footer', percent: 95 },
      ];

      sections.forEach(({ name, percent }) => {
        if (scrollPercent >= percent && !trackedSections.current.has(name)) {
          trackedSections.current.add(name);

          // Enviar evento ao Facebook Pixel
          if (window.fbq) {
            window.fbq('track', 'ViewContent', {
              content_name: `Scroll_${name}`,
              content_type: 'section',
              value: scrollPercent,
              currency: 'BRL',
            });
          }

          // Log no console para debug
          console.log(`📊 Seção visualizada: ${name} (${scrollPercent.toFixed(0)}%)`);
        }
      });

      // Rastrear quando chega ao final (95%+)
      if (scrollPercent >= 95 && !trackedSections.current.has('page_complete')) {
        trackedSections.current.add('page_complete');
        
        if (window.fbq) {
          window.fbq('track', 'CompleteRegistration', {
            content_name: 'Page_Scroll_Complete',
            value: 100,
            currency: 'BRL',
          });
        }

        console.log('✅ Usuário chegou ao final da página!');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}

// Estender window para incluir fbq
declare global {
  interface Window {
    fbq?: (action: string, event: string, data?: Record<string, any>) => void;
  }
}
