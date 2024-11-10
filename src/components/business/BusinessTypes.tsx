import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Dumbbell, Users, PersonStanding } from 'lucide-react';

const businessTypes = [
  {
    id: 'personal-trainer',
    title: 'Personal Trainer',
    icon: PersonStanding,
    benefits: [
      'Manage client schedules',
      'Track client progress',
      'Online payments'
    ]
  },
  {
    id: 'studio',
    title: 'Studio',
    icon: Users,
    benefits: [
      'Class management',
      'Member portal',
      'Instructor scheduling'
    ]
  },
  {
    id: 'gym',
    title: 'Gym',
    icon: Dumbbell,
    benefits: [
      'Membership management',
      'Equipment tracking',
      'Multi-location support'
    ]
  }
];

export function BusinessTypes() {
  const navigate = useNavigate();

  const handleSelectType = (typeId: string) => {
    navigate('/register/business', { 
      state: { businessType: typeId } 
    });
  };

  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {businessTypes.map((type, index) => (
        <motion.div
          key={type.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10 hover:border-emerald-500/50 transition-colors">
            <div className="text-center mb-6">
              <type.icon className="w-12 h-12 mx-auto mb-4 text-emerald-400" />
              <h3 className="text-xl font-bold text-white mb-4">{type.title}</h3>
              <ul className="space-y-3 text-white/70 mb-6">
                {type.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            <Button 
              className="w-full"
              onClick={() => handleSelectType(type.id)}
            >
              Get Started
            </Button>
          </Card>
        </motion.div>
      ))}
    </div>
  );
} 