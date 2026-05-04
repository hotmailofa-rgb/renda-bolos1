import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export interface SalesNotificationData {
  id: string;
  name: string;
  product: string;
  time: string;
  city?: string;
}

interface SalesNotificationProps {
  notification: SalesNotificationData;
  onClose: () => void;
}

export function SalesNotification({ notification, onClose }: SalesNotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 5000); // Mostrar por 5 segundos

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-4 left-4 bg-white rounded-lg shadow-2xl border-l-4 border-green-500 p-4 max-w-sm transition-all duration-300 transform ${
        isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
      }`}
      style={{ zIndex: 9999 }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-sm font-bold text-gray-900">
              {notification.name} comprou agora!
            </p>
          </div>
          <p className="text-xs text-gray-600 mb-2">
            {notification.product}
            {notification.city && ` • ${notification.city}`}
          </p>
          <p className="text-xs text-gray-500">{notification.time}</p>
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
