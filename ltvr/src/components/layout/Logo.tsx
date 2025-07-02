import { cn } from "../ui/utils";

interface LogoProps {
  className?: string;
  size?: "small" | "medium" | "large";
  onClick?: () => void;
}

export function Logo({ className, size = "medium", onClick }: LogoProps) {
  const sizeClasses = {
    small: "h-6",
    medium: "h-8",
    large: "h-12",
  };

  return (
    <div onClick={onClick} className={cn("flex items-center cursor-pointer", className)}>
      <div className={cn("flex items-end", sizeClasses[size])}>
        <span 
          className="font-bold tracking-tight leading-none"
          style={{ color: "#c1f17e" }} // Lime green from design
        >
          VENTURES
        </span>
        <span 
          className="font-bold tracking-tight leading-none ml-1"
          style={{ color: "#ffffff" }} // White
        >
          ROOM
        </span>
      </div>
    </div>
  );
}