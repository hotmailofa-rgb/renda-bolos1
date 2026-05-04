import { useActiveUsers } from '@/hooks/useActiveUsers';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface ActiveUsersStatusProps {
  initialCount?: number;
}

export function ActiveUsersStatus({ initialCount = 147 }: ActiveUsersStatusProps) {
  const { activeUsers, isIncreasing } = useActiveUsers(initialCount);

  return (
    <div className="sticky top-0 z-50 bg-gray-900 text-white py-3 px-4 text-center font-bold text-sm md:text-base shadow-lg">
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        
        <span className="flex items-center gap-1">
          {activeUsers.toLocaleString('pt-BR')} PESSOAS ASSISTINDO AGORA
        </span>

        {isIncreasing ? (
          <TrendingUp className="w-4 h-4 text-green-400 animate-bounce" />
        ) : (
          <TrendingDown className="w-4 h-4 text-orange-400" />
        )}
      </div>
    </div>
  );
}
