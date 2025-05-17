
import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';

interface DashboardCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: number;
  color?: 'blue' | 'green' | 'amber' | 'red' | 'purple';
  change?: string; // Added change property
  timeframe?: string; // Added timeframe property
}

const DashboardCard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend,
  color = 'blue',
  change,
  timeframe 
}: DashboardCardProps) => {
  const getBgColor = () => {
    switch (color) {
      case 'green':
        return 'bg-green-50';
      case 'amber':
        return 'bg-amber-50';
      case 'red':
        return 'bg-red-50';
      case 'purple':
        return 'bg-purple-50';
      default:
        return 'bg-blue-50';
    }
  };

  const getTextColor = () => {
    switch (color) {
      case 'green':
        return 'text-green-600';
      case 'amber':
        return 'text-amber-600';
      case 'red':
        return 'text-red-600';
      case 'purple':
        return 'text-purple-600';
      default:
        return 'text-blue-600';
    }
  };

  const getTrendColor = () => {
    if (trend === undefined) return '';
    return trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-gray-600';
  };

  return (
    <Card className={`${getBgColor()} p-6 rounded-lg`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
          <p className={`text-3xl font-bold ${getTextColor()} mt-1`}>
            {value}
          </p>
          {(subtitle || change) && (
            <p className="text-gray-600 text-xs mt-1">
              {subtitle || change}
            </p>
          )}
          {timeframe && (
            <p className="text-gray-500 text-xs mt-1">
              {timeframe}
            </p>
          )}
          {trend !== undefined && (
            <div className={`flex items-center mt-2 ${getTrendColor()}`}>
              {trend > 0 ? (
                <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              ) : trend < 0 ? (
                <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              ) : null}
              <span className="text-xs font-medium">
                {trend > 0 ? '+' : ''}{trend}% vs. mes anterior
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div className={`p-2 rounded-full ${getBgColor()} ${getTextColor()}`}>
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};

export default DashboardCard;
