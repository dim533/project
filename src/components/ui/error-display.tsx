import { Card } from "./card";
import { Button } from "./button";

interface ErrorDisplayProps {
  title: string;
  message: string;
}

export function ErrorDisplay({ title, message }: ErrorDisplayProps) {
  return (
    <Card className="p-6 bg-red-500/10 border-red-500/20">
      <h2 className="text-xl font-semibold text-red-400 mb-2">{title}</h2>
      <p className="text-white/70 mb-4">{message}</p>
      <Button onClick={() => window.location.reload()}>
        Retry
      </Button>
    </Card>
  );
} 