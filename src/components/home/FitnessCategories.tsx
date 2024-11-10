import { useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  IoFitnessOutline, 
  IoBodyOutline,
  IoMusicalNotesOutline,
  IoTimerOutline,
  IoPeopleOutline,
  IoBarbell
} from 'react-icons/io5';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    id: 'yoga',
    name: 'Yoga',
    icon: IoFitnessOutline,
    description: 'Find peace and strength',
    color: 'bg-[#2F4858]',
    textColor: 'text-[#F3E37C]'
  },
  {
    id: 'pilates',
    name: 'Pilates',
    icon: IoBodyOutline,
    description: 'Core strength & flexibility',
    color: 'bg-[#FFE4E1]',
    textColor: 'text-[#FF4B4B]'
  },
  {
    id: 'barre',
    name: 'Barre',
    icon: IoPeopleOutline,
    description: 'Ballet-inspired fitness',
    color: 'bg-[#D4B72C]',
    textColor: 'text-slate-800'
  },
  {
    id: 'dance',
    name: 'Dance',
    icon: IoMusicalNotesOutline,
    description: 'Move to the rhythm',
    color: 'bg-[#B4DFD3]',
    textColor: 'text-slate-700'
  },
  {
    id: 'circuit-training',
    name: 'Circuit Training',
    icon: IoTimerOutline,
    description: 'High-intensity workouts',
    color: 'bg-[#FF4B4B]',
    textColor: 'text-white'
  },
  {
    id: 'gym',
    name: 'Gym',
    icon: IoBarbell,
    description: 'Traditional strength training',
    color: 'bg-emerald-500',
    textColor: 'text-white'
  }
];

// Remove scrollbar-hide and use CSS to hide scrollbar
const scrollbarHideStyles = `
  /* Hide scrollbar for Chrome, Safari and Opera */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  .no-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
`;

export default function FitnessCategories() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 relative">
      {/* Add the styles to the DOM */}
      <style>{scrollbarHideStyles}</style>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Top fitness categories
          </h2>
          <p className="text-lg text-white/60">
            Find the perfect workout style for you
          </p>
        </div>

        {/* Categories Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 hidden md:block">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 
                       transition-colors duration-200"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
          </div>
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 hidden md:block">
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 
                       transition-colors duration-200"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Scrollable Container - replaced scrollbar-hide with no-scrollbar */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-8 snap-x snap-mandatory no-scrollbar pb-4"
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex-none first:ml-4 last:mr-4 md:first:ml-0 md:last:mr-0"
              >
                <motion.button
                  onClick={() => navigate(`/search?category=${category.id}`)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center group"
                >
                  <div className={`w-32 h-32 rounded-full ${category.color} 
                    flex items-center justify-center relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 
                                  transition-colors duration-300" />
                    <category.icon className={`w-12 h-12 ${category.textColor}
                                transition-transform duration-300 group-hover:scale-110`} />
                  </div>
                  <span className={`mt-4 text-base font-medium text-white
                                group-hover:text-emerald-400 transition-colors duration-300`}>
                    {category.name}
                  </span>
                </motion.button>
              </motion.div>
            ))}
          </div>

          {/* Scroll Indicators */}
          <div className="absolute left-0 top-0 bottom-4 w-12 bg-gradient-to-r from-slate-950 
                         to-transparent pointer-events-none md:hidden" />
          <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-slate-950 
                         to-transparent pointer-events-none md:hidden" />
        </div>
      </div>
    </section>
  );
}