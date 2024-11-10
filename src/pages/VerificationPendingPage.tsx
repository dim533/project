import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Header } from '../components/Header';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Mail, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

export default function VerificationPendingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check auth status periodically
    const interval = setInterval(async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.email_confirmed_at) {
        navigate('/dashboard');
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <>
      <SEO 
        title="Verify Your Email | FitFinder"
        description="Please verify your email address to continue"
      />
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-24">
        <div className="container mx-auto px-4 py-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto"
          >
            <Card className="p-8 bg-white/5 backdrop-blur-sm border-white/10">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-emerald-400" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">
                  Check Your Email
                </h1>
                <p className="text-white/70">
                  We've sent you a verification link. Please check your email to complete your registration.
                </p>
              </div>

              <div className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.location.href = "https://mail.google.com"}
                >
                  Open Gmail
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <p className="text-sm text-white/50 text-center">
                  Didn't receive the email? Check your spam folder or{' '}
                  <button 
                    className="text-emerald-400 hover:underline"
                    onClick={() => {/* Implement resend logic */}}
                  >
                    resend verification email
                  </button>
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>
    </>
  );
} 