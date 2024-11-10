import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

export function DashboardHeader() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="bg-slate-900 border-b border-white/10">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-white">Business Dashboard</h1>
        <Button variant="outline" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>
    </header>
  );
} 