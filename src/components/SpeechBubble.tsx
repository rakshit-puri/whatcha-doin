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
      
      {/* Speech bubble triangle tail */}
      <div className={cn(
        "absolute w-0 h-0 border-l-[12px] border-r-[12px] border-t-[16px]",
        "border-l-transparent border-r-transparent border-t-white",
        position === "left" ? "top-8 -right-3" : "top-8 -left-3"
      )} />
      <div className={cn(
        "absolute w-0 h-0 border-l-[13px] border-r-[13px] border-t-[17px]",
        "border-l-transparent border-r-transparent border-t-border",
        position === "left" ? "top-[30px] -right-[13px]" : "top-[30px] -left-[13px]"
      )} />
    </div>
  );
};