import { cn } from "@/lib/utils";

interface SpeechBubbleProps {
  text: string;
  className?: string;
  position?: "left" | "right";
}

export const SpeechBubble = ({ text, className, position = "right" }: SpeechBubbleProps) => {
  return (
    <div className={cn(
      "relative bg-gradient-to-br from-white to-yellow-50 rounded-2xl px-6 py-4 max-w-xs",
      "shadow-[0_4px_20px_-2px_hsl(25_85%_15%_/_0.1)] border border-border",
      "animate-gentle-bounce",
      className
    )}>
      <p className="text-foreground font-medium text-sm leading-relaxed">{text}</p>
      
      {/* Speech bubble tail */}
      <div className={cn(
        "absolute w-6 h-6 bg-white rotate-45 border-l border-b border-border",
        position === "left" ? "top-8 -right-2" : "top-8 -left-2"
      )} />
    </div>
  );
};