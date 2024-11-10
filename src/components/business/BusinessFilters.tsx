import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { Button } from '../ui/button';

interface BusinessFiltersProps {
  onSearch: (filters: any) => void;
}

export default function BusinessFilters({ onSearch }: BusinessFiltersProps) {
  return (
    <div className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search by name or location..."
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Select defaultValue="">
              <option value="">Category</option>
              <option value="gym">Gym</option>
              <option value="studio">Studio</option>
              <option value="trainer">Trainer</option>
            </Select>

            <Select defaultValue="">
              <option value="">Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
            </Select>

            <Select defaultValue="">
              <option value="">Rating</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
              <option value="2">2+ Stars</option>
            </Select>

            <Button variant="outline" className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              More Filters
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant="outline" className="cursor-pointer hover:bg-purple-50">
            Open Now
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-purple-50">
            Verified Only
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-purple-50">
            Free Trial
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-purple-50">
            Group Classes
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-purple-50">
            Personal Training
          </Badge>
        </div>
      </div>
    </div>
  );
}