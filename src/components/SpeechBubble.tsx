import { cn } from "@/lib/utils";

interface SpeechBubbleProps {
	text: string;
	className?: string;
	position?: "left" | "right"; // who the bubble belongs to
}

export const SpeechBubble = ({ text, className, position = "right" }: SpeechBubbleProps) => {
	return (
		<div
			className={cn(
				"relative bg-white rounded-2xl px-6 py-4 max-w-xs",
				"shadow-md border border-gray-300",
				"animate-gentle-bounce",
				className
			)}
		>
			<p className="text-gray-800 font-medium text-sm leading-relaxed">{text}</p>

			{/* Tail */}
			<div
				className={cn(
					"absolute w-0 h-0",
					"border-x-[10px] border-x-transparent border-t-[12px] border-t-white",
					position === "left" ? "left-6 -bottom-3" : "right-6 -bottom-3"
				)}
			/>
			{/* Tail border for outline */}
			<div
				className={cn(
					"absolute w-0 h-0",
					"border-x-[11px] border-x-transparent border-t-[13px] border-t-white",
					position === "left" ? "left-6 -bottom-3" : "right-6 -bottom-3"
				)}
			/>
		</div>
	);
};
