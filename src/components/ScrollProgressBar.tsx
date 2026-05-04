import { useEffect, useState } from 'react';

/**
 * Componente que mostra uma barra de progresso de scroll na parte superior da página
 */

export function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-[60]">
      <div
        className="h-full bg-gradient-to-r from-green-500 via-green-600 to-green-700 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
