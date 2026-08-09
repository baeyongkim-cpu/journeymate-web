"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { MessageCircle } from "lucide-react";

export function FloatingChat() {
  const { t } = useLanguage();
  const whatsappUrl = "https://wa.me/821099008210?text=Hello!%20I%27m%20interested%20in%20JourneyMate%20private%20tour.";

  return (
    <div className="fixed bottom-8 right-8 z-50 group">
      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-jm-gold text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 relative"
      >
        <span className="absolute inline-flex h-full w-full rounded-full bg-jm-gold opacity-30 animate-ping"></span>
        <MessageCircle size={28} className="relative z-10" />
      </a>
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-jm-navy text-jm-cream text-sm px-4 py-2 rounded-md shadow-lg whitespace-nowrap flex flex-col items-end">
          <span className="font-medium">{t("채팅으로 문의하기", "Chat with us")}</span>
          <span className="text-[10px] text-jm-gold mt-1">WhatsApp</span>
        </div>
        {/* Tooltip arrow */}
        <div className="w-3 h-3 bg-jm-navy transform rotate-45 absolute -bottom-1.5 right-5"></div>
      </div>
    </div>
  );
}
