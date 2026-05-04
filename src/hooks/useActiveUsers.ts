import { useState, useEffect } from 'react';

/**
 * Hook para simular e gerenciar contador de pessoas ativas no site
 * Simula flutuações realistas de usuários
 */

export function useActiveUsers(initialCount: number = 147) {
  const [activeUsers, setActiveUsers] = useState(initialCount);
  const [isIncreasing, setIsIncreasing] = useState(true);

  useEffect(() => {
    // Atualizar contador a cada 3-8 segundos
    const updateInterval = setInterval(() => {
      setActiveUsers((prev) => {
        // Gerar mudança aleatória (-3 a +5 pessoas)
        const change = Math.floor(Math.random() * 9) - 3;
        let newCount = prev + change;

        // Manter dentro de um intervalo realista (100-300 pessoas)
        if (newCount < 100) newCount = 100;
        if (newCount > 300) newCount = 300;

        // Determinar se está aumentando ou diminuindo
        if (newCount > prev) {
          setIsIncreasing(true);
        } else if (newCount < prev) {
          setIsIncreasing(false);
        }

        return newCount;
      });
    }, Math.random() * 5000 + 3000); // 3-8 segundos

    return () => clearInterval(updateInterval);
  }, []);

  return { activeUsers, isIncreasing };
}
