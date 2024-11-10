import { useState } from 'react';
import { Switch } from '../ui/switch';
import { Select } from '../ui/select';
import { Card } from '../ui/card';

const DAYS = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday',
  'Friday', 'Saturday', 'Sunday'
];

const HOURS = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, '0');
  return [`${hour}:00`, `${hour}:30`];
}).flat();

interface BusinessHours {
  [key: string]: {
    open: string;
    close: string;
    closed: boolean;
  };
}

interface BusinessHoursEditorProps {
  value: BusinessHours;
  onChange: (hours: BusinessHours) => void;
}

export function BusinessHoursEditor({ value, onChange }: BusinessHoursEditorProps) {
  const updateHours = (day: string, field: keyof BusinessHours[string], newValue: any) => {
    onChange({
      ...value,
      [day]: {
        ...value[day],
        [field]: newValue
      }
    });
  };

  return (
    <div className="space-y-4">
      {DAYS.map((day) => (
        <Card key={day} className="p-4 bg-white/5 border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-white w-24">{day}</span>
              <Switch
                checked={!value[day]?.closed}
                onCheckedChange={(checked) => updateHours(day, 'closed', !checked)}
              />
            </div>

            {!value[day]?.closed && (
              <div className="flex items-center gap-2">
                <Select
                  value={value[day]?.open}
                  onValueChange={(newValue) => updateHours(day, 'open', newValue)}
                >
                  {HOURS.map((time) => (
                    <option key={`open-${time}`} value={time}>
                      {time}
                    </option>
                  ))}
                </Select>
                <span className="text-white">to</span>
                <Select
                  value={value[day]?.close}
                  onValueChange={(newValue) => updateHours(day, 'close', newValue)}
                >
                  {HOURS.map((time) => (
                    <option key={`close-${time}`} value={time}>
                      {time}
                    </option>
                  ))}
                </Select>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
} 