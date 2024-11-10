import { cn } from '../../lib/utils';

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
}

export function Spinner({ className, size = "md", ...props }: SpinnerProps) {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-t-2 border-emerald-500",
        {
          "h-4 w-4 border-2": size === "sm",
          "h-8 w-8 border-2": size === "md",
          "h-12 w-12 border-4": size === "lg",
        },
        className
      )}
      {...props}
    />
  );
} 