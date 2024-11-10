import { useState } from 'react';
import { Button } from './button';
import { FormField } from './form-field';
import { Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface RepeaterFieldProps {
  label: string;
  fields: any[];
  register: any;
  errors: any;
  name: string;
}

export function RepeaterField({
  label,
  fields,
  register,
  errors,
  name
}: RepeaterFieldProps) {
  const [items, setItems] = useState([{ id: Date.now() }]);

  const addItem = () => {
    setItems([...items, { id: Date.now() }]);
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-white">{label}</label>
      
      <AnimatePresence>
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="relative bg-white/5 p-4 rounded-lg"
          >
            <div className="space-y-4">
              {fields.map(field => (
                <FormField
                  key={field.name}
                  {...field}
                  name={`${name}.${index}.${field.name}`}
                  register={register}
                  error={errors?.[name]?.[index]?.[field.name]?.message}
                />
              ))}
            </div>
            
            {items.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 text-red-400 hover:text-red-300"
                onClick={() => removeItem(item.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addItem}
        className="w-full"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add {label}
      </Button>
    </div>
  );
} 