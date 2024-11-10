import { BusinessHours } from '../../types/business';
import { formatBusinessHours, getBusinessStatus } from '../../lib/utils';
import { Badge } from '../ui/badge';

interface BusinessHoursProps {
  hours: BusinessHours[];
}

export function BusinessHoursDisplay({ hours }: BusinessHoursProps) {
  const { isOpen, status, nextOpen } = getBusinessStatus(hours);
  
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Badge variant={isOpen ? "success" : "secondary"}>
          {status}
        </Badge>
        {nextOpen && (
          <span className="text-sm text-white/60">{nextOpen}</span>
        )}
      </div>
      <div className="space-y-1">
        {hours.map((hour, index) => (
          <div 
            key={index}
            className="flex justify-between text-sm text-white/70"
          >
            <span>{hour.day}</span>
            <span>{hour.closed ? 'Closed' : `${hour.open} - ${hour.close}`}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 