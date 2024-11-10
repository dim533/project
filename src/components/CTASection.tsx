import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

export function CTASection() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Grow Your Fitness Business?
        </h2>
        <p className="text-white/80 mb-8 max-w-2xl mx-auto">
          Join thousands of fitness businesses that trust FitFinder to connect with new customers and manage their online presence.
        </p>
        <Button
          onClick={() => navigate('/list-your-business')}
          size="lg"
          className="bg-white text-emerald-600 hover:bg-white/90"
        >
          List Your Business
        </Button>
      </div>
    </div>
  );
} 