import { useState, useEffect, useCallback } from 'react';

export interface SalesNotificationData {
  id: string;
  name: string;
  product: string;
  time: string;
  city?: string;
}

// Dados de exemplo para simular vendas reais
const SAMPLE_NAMES = [
  'Maria Silva',
  'João Santos',
  'Ana Costa',
  'Carlos Oliveira',
  'Fernanda Martins',
  'Roberto Alves',
  'Patricia Gomes',
  'Lucas Ferreira',
  'Beatriz Rocha',
  'Felipe Mendes',
  'Juliana Ribeiro',
  'Diego Pereira',
  'Camila Souza',
  'Gustavo Barbosa',
  'Isabella Monteiro',
  'Rafael Cardoso',
  'Sophia Lopes',
  'Mateus Correia',
  'Larissa Neves',
  'Thiago Campos',
];

const SAMPLE_CITIES = [
  'São Paulo',
  'Rio de Janeiro',
  'Belo Horizonte',
  'Brasília',
  'Salvador',
  'Fortaleza',
  'Recife',
  'Manaus',
  'Curitiba',
  'Porto Alegre',
  'Goiânia',
  'Belém',
  'Guarulhos',
  'Campinas',
  'Santos',
];

const PRODUCTS = [
  'Método 3 Bolos Simples',
  'Curso Completo de Bolos',
  'Pacote Premium de Receitas',
];

export function useSalesNotifications() {
  const [notifications, setNotifications] = useState<SalesNotificationData[]>([]);

  // Gerar notificação aleatória
  const generateRandomNotification = useCallback((): SalesNotificationData => {
    const randomName = SAMPLE_NAMES[Math.floor(Math.random() * SAMPLE_NAMES.length)];
    const randomCity = SAMPLE_CITIES[Math.floor(Math.random() * SAMPLE_CITIES.length)];
    const randomProduct = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];

    // Gerar hora aleatória nos últimos 5 minutos
    const now = new Date();
    const minutesAgo = Math.floor(Math.random() * 5) + 1;
    const time = new Date(now.getTime() - minutesAgo * 60000);

    const hours = String(time.getHours()).padStart(2, '0');
    const minutes = String(time.getMinutes()).padStart(2, '0');

    return {
      id: `${Date.now()}-${Math.random()}`,
      name: randomName,
      product: randomProduct,
      time: `${hours}:${minutes}`,
      city: randomCity,
    };
  }, []);

  // Adicionar notificação
  const addNotification = useCallback((notification: SalesNotificationData) => {
    setNotifications((prev) => [...prev, notification]);
  }, []);

  // Remover notificação
  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  // Iniciar simulação de vendas
  useEffect(() => {
    // Mostrar primeira notificação após 3 segundos
    const initialTimer = setTimeout(() => {
      addNotification(generateRandomNotification());
    }, 3000);

    // Mostrar notificações a cada 8-15 segundos
    const interval = setInterval(() => {
      addNotification(generateRandomNotification());
    }, Math.random() * 7000 + 8000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [addNotification, generateRandomNotification]);

  return {
    notifications,
    removeNotification,
    addNotification,
  };
}
