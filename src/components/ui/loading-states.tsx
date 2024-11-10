import { Spinner } from './spinner';

export function LoadingState() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <Spinner className="w-8 h-8 text-emerald-500" />
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="p-6 bg-white/5 border border-white/10 rounded-lg animate-pulse">
      <div className="h-4 bg-white/10 rounded w-3/4 mb-4" />
      <div className="h-4 bg-white/10 rounded w-1/2" />
    </div>
  );
} 