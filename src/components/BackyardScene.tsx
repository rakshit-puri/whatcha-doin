import { useState, useEffect } from "react";
import { SpeechBubble } from "./SpeechBubble";

const phineasImg = "/lovable-uploads/89f0c9ab-a47a-4576-b978-3aa090c36922.png";
const isabellaImg = "/lovable-uploads/b71a0ccf-548f-426f-881f-185e76a4ee49.png";
const backyardBg = "/lovable-uploads/370129bb-41ab-48b7-acba-9856c3bfb7ae.png";

export const BackyardScene = () => {
  const [phineasText, setPhineasText] = useState("Thinking of you");
  const isabellaText = "Whatcha doin'?";

  // This would connect to your backend API when Supabase is set up
  useEffect(() => {
    // Placeholder for API connection to get updated text
    // When Supabase is connected, this would fetch the latest message
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backyardBg})` }}
      />
      
      {/* Sky overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky/20 via-transparent to-grass/10" />
      
      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="flex items-end justify-center gap-8 md:gap-16 max-w-4xl mx-auto">
          
          {/* Phineas */}
          <div className="flex flex-col items-center animate-float">
            <div className="mb-4 animate-gentle-bounce" style={{ animationDelay: '0.5s' }}>
              <SpeechBubble text={phineasText} position="left" />
            </div>
            <img 
              src={phineasImg} 
              alt="Phineas Flynn"
              className="w-48 h-48 md:w-64 md:h-64 object-contain filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Isabella */}
          <div className="flex flex-col items-center animate-float" style={{ animationDelay: '1s' }}>
            <div className="mb-4 animate-gentle-bounce" style={{ animationDelay: '1.5s' }}>
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

      {/* Footer with API info */}
      <div className="absolute bottom-4 left-4 right-4 z-20">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 mx-auto max-w-md text-center shadow-lg">
          <p className="text-sm text-foreground/70">
            Connect Supabase to enable POST requests from iOS Shortcuts
          </p>
        </div>
      </div>
    </div>
  );
};