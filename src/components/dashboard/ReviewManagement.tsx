import { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Star, Flag, MessageSquare } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { format } from 'date-fns';

interface Review {
  id: string;
  author: string;
  rating: number;
  content: string;
  created_at: string;
  response?: string;
}

export function ReviewManagement() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [respondingTo, setRespondingTo] = useState<string | null>(null);
  const [response, setResponse] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRespond = async (reviewId: string) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .update({ response })
        .eq('id', reviewId);

      if (error) throw error;

      setReviews(reviews.map(review => 
        review.id === reviewId 
          ? { ...review, response } 
          : review
      ));
      setRespondingTo(null);
      setResponse('');
    } catch (error) {
      console.error('Error responding to review:', error);
    }
  };

  const handleReport = async (reviewId: string) => {
    try {
      const { error } = await supabase
        .from('review_reports')
        .insert({ review_id: reviewId });

      if (error) throw error;
    } catch (error) {
      console.error('Error reporting review:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Reviews</h2>

      {reviews.map((review) => (
        <Card key={review.id} className="p-6 bg-white/5 border-white/10">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-white/20'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-white font-medium">{review.author}</span>
                <span className="text-white/40">
                  {format(new Date(review.created_at), 'MMM d, yyyy')}
                </span>
              </div>
              <p className="text-white/70">{review.content}</p>

              {review.response && (
                <div className="mt-4 pl-4 border-l-2 border-white/10">
                  <p className="text-white/70">
                    <span className="font-medium text-white">Response: </span>
                    {review.response}
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              {!review.response && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setRespondingTo(review.id)}
                >
                  <MessageSquare className="w-4 h-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleReport(review.id)}
              >
                <Flag className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
} 