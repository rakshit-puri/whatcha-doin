import { useState, useEffect } from "react";
import { SpeechBubble } from "./SpeechBubble";
import { createClient } from "@supabase/supabase-js";
import phineasImg from "@/assets/phineas.png";
import isabellaImg from "@/assets/isabella.png";
import backyardBg from "@/assets/Background.png";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL!;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const BackyardScene = () => {
	const [phineasText, setPhineasText] = useState("Thinking of you");
	const isabellaText = "Whatcha doin'?";

	// Helper: fetch current message
	const fetchMessage = async () => {
		const { data, error } = await supabase
			.from("messages")
			.select("text")
			.eq("id", "00000000-0000-0000-0000-000000000001")
			.single();

		if (error) {
			console.error("Error fetching message:", error);
		} else if (data) {
			setPhineasText(data.text);
		}
	};

	useEffect(() => {
		let channel: ReturnType<typeof supabase.channel>;

		const init = async () => {
			await fetchMessage();

			// Subscribe to realtime updates
			channel = supabase
				.channel("messages-updates")
				.on(
					"postgres_changes",
					{
						event: "UPDATE",
						schema: "public",
						table: "messages",
						filter: "id=eq.00000000-0000-0000-0000-000000000001",
					},
					(payload) => {
						setPhineasText(payload.new.text ?? phineasText);
					}
				)
				.subscribe();
		};

		init();

		// Listen for tab becoming active again
		const handleVisibility = () => {
			if (document.visibilityState === "visible") {
				fetchMessage();
			}
		};
		window.addEventListener("focus", fetchMessage);
		document.addEventListener("visibilitychange", handleVisibility);

		// Cleanup on unmount
		return () => {
			if (channel) supabase.removeChannel(channel);
			window.removeEventListener("focus", fetchMessage);
			document.removeEventListener("visibilitychange", handleVisibility);
		};
	}, []);

	return (
		<div className="min-h-screen relative overflow-hidden">
			{/* Background */}
			<div
				className="absolute inset-0 bg-cover bg-center bg-no-repeat"
				style={{ backgroundImage: `url(${backyardBg})` }}
			/>

			{/* Sky overlay */}
			<div className="absolute inset-0 bg-gradient-to-b from-sky/20 via-transparent to-grass/10" />

			{/* Main content */}
			<div className="relative z-10 flex items-center justify-center min-h-screen p-4">
				<div className="flex items-end justify-center gap-8 md:gap-16 max-w-4xl mx-auto">
					{/* Phineas */}
					<div className="flex flex-col items-center animate-float">
						<div className="mb-4 animate-gentle-bounce" style={{ animationDelay: "0.5s" }}>
							<SpeechBubble text={phineasText} position="left" />
						</div>
						<img
							src={phineasImg}
							alt="Phineas Flynn"
							className="w-48 h-48 md:w-64 md:h-64 object-contain filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:scale-105 transition-transform duration-300"
						/>
					</div>

					{/* Isabella */}
					<div className="flex flex-col items-center animate-float" style={{ animationDelay: "1s" }}>
						<div className="mb-4 animate-gentle-bounce" style={{ animationDelay: "1.5s" }}>
							<SpeechBubble text={isabellaText} position="right" />
						</div>
						<img
							src={isabellaImg}
							alt="Isabella Garcia-Shapiro"
							className="w-48 h-48 md:w-64 md:h-64 object-contain filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:scale-105 transition-transform duration-300"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
