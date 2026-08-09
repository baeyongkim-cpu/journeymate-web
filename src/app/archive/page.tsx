"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, X, MessageCircle } from "lucide-react";

export default function ArchivePage() {
  const { t, lang } = useLanguage();
  const isEn = lang === 'en';
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null);

  const trips = [
    { 
      titleKo: "송도 센트럴파크 프라이빗 보팅", 
      titleEn: "Songdo Central Park Boat Tour", 
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2000&auto=format&fit=crop" 
    },
    { 
      titleKo: "개항장 130년 근대골목 스냅", 
      titleEn: "Gaehangro 130-Year Heritage Snap", 
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2000&auto=format&fit=crop" 
    },
    { 
      titleKo: "신포국제시장 스트릿 미식 투어", 
      titleEn: "Sinpo Traditional Market Foodie Tour", 
      image: "https://images.unsplash.com/photo-1567521464027-f127ff144326?q=80&w=2000&auto=format&fit=crop" 
    },
    { 
      titleKo: "무의도 해변 일몰 & 노을 명상", 
      titleEn: "Muuido Island Sunset Meditation", 
      image: "https://images.unsplash.com/photo-1548115184-bc6544d06a58?q=80&w=2000&auto=format&fit=crop" 
    },
    { 
      titleKo: "한국 전통 템플스테이 체험", 
      titleEn: "Korean Traditional Templestay", 
      image: "https://images.unsplash.com/photo-1553159925-02b2e24f471d?q=80&w=2000&auto=format&fit=crop" 
    },
    { 
      titleKo: "제주도 해녀 마을 탐방", 
      titleEn: "Jeju Haenyeo Village Tour", 
      image: "https://images.unsplash.com/photo-1546874177-9e664107314e?q=80&w=2000&auto=format&fit=crop" 
    },
    { 
      titleKo: "서울 야경 루프탑 파티", 
      titleEn: "Seoul Night View Rooftop Party", 
      image: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?q=80&w=2000&auto=format&fit=crop" 
    },
    { 
      titleKo: "비무장지대(DMZ) 평화 기행", 
      titleEn: "DMZ Peace Tour", 
      image: "https://images.unsplash.com/photo-1580137189272-c9379f8864fd?q=80&w=2000&auto=format&fit=crop" 
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--color-jm-cream)] text-[var(--color-jm-text)] pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-jm-navy)] mb-4">
            {t("여행 아카이브", "TripArchive")}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {t(
              "모든 미소와 풍경을 4K 시네마틱 영상과 스냅으로 영원히 기록합니다.",
              "Every smile, every laugh, every breathtaking view—immortalized in 4K resolution."
            )}
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trips.map((trip, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="relative overflow-hidden group aspect-[4/5] rounded-2xl cursor-pointer shadow-lg"
              onClick={() => setSelectedTrip(isEn ? trip.titleEn : trip.titleKo)}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${trip.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-85 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-10 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <PlayCircle className="w-12 h-12 text-[var(--color-jm-gold)] mb-3 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                <h3 className="text-lg font-bold text-white leading-tight mb-2">
                  {isEn ? trip.titleEn : trip.titleKo}
                </h3>
                <button className="mt-3 px-4 py-2 bg-[var(--color-jm-gold)] text-white rounded-full text-xs font-bold w-max shadow hover:bg-[var(--color-jm-navy)] transition-colors">
                  {t("영상 보기 & 예약", "Watch & Book")}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* TRIP MODAL */}
      <AnimatePresence>
        {selectedTrip && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedTrip(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full relative"
              onClick={e => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition-opacity"
                onClick={() => setSelectedTrip(null)}
              >
                <X className="w-6 h-6" />
              </button>
              
              <h3 className="text-2xl font-bold tracking-tight text-[var(--color-jm-navy)] mb-2">
                {t("이 여정이 마음에 드시나요?", "Interested in this journey?")}
              </h3>
              <p className="text-gray-800 font-medium mb-8">
                <span className="font-bold text-[var(--color-jm-gold)]">{selectedTrip}</span> {t("경험에 대해 호스트와 직접 대화를 나눠보세요.", "experience is just a message away. Reach out to us!")}
              </p>
              
              <a 
                href={`https://wa.me/821099008210?text=${encodeURIComponent(`Hi! I'm interested in the ${selectedTrip} experience.`)}`}
                target="_blank" rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-4 bg-[var(--color-jm-gold)] text-white rounded-xl font-bold text-lg hover:bg-amber-600 transition-colors mb-3"
              >
                <MessageCircle className="w-5 h-5" />
                {t("WhatsApp으로 문의하기", "Inquire via WhatsApp")}
              </a>
              
              <button 
                disabled
                className="w-full flex items-center justify-center gap-2 py-4 bg-[#FEE500] text-[#191919] rounded-xl font-bold text-lg opacity-60 cursor-not-allowed"
              >
                <MessageCircle className="w-5 h-5" />
                {t("카카오톡 (준비중)", "KakaoTalk (Coming Soon)")}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
