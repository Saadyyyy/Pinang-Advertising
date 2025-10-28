import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  title, 
  subtitle 
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md border border-gray-200 ${className}`}>
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-gray-200">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          )}
          {subtitle && (
            <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
          )}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon?: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon
}) => {
  const changeColor = {
    increase: 'text-green-600',
    decrease: 'text-red-600',
    neutral: 'text-gray-600'
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${changeColor[changeType]}`}>
              {change}
            </p>
          )}
        </div>
        {icon && (
          <div className="flex-shrink-0 ml-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              {icon}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};