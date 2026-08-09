"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, PlayCircle, MessageCircle } from "lucide-react";
import { hosts } from "@/data/hosts";
import Link from "next/link";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function Home() {
  const { t, lang } = useLanguage();
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null);

  const videoPlaylist = [
    { 
      src: "/Incheon always with you.mp4", 
      labelKo: "인천관광공사 시네마틱 4K (Incheon Always With You)", 
      labelEn: "Incheon Official Visual (Incheon Always With You)" 
    },
    { 
      src: "/incheon-official.mp4", 
      labelKo: "인천관광공사 시네마틱 4K Part 1", 
      labelEn: "Incheon Official Visual Part 1" 
    },
    { 
      src: "/incheon-official-2.mp4", 
      labelKo: "인천관광공사 시네마틱 4K Part 2", 
      labelEn: "Incheon Official Visual Part 2" 
    }
  ];
  const [currentVideoIdx, setCurrentVideoIdx] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnded = () => {
    setCurrentVideoIdx((prev) => (prev + 1) % videoPlaylist.length);
  };

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = isMuted;
      videoRef.current.muted = isMuted;
      videoRef.current.play().catch(() => {});
    }
  }, [currentVideoIdx, isMuted]);

  const isEn = lang === 'en';

  const philosophies = [
    {
      id: "01",
      titleKo: "당신만을 위한 시네마",
      titleEn: "A Movie Written for You",
      subtitleKo: "획일적인 코스 탈피",
      subtitleEn: "No Cookie-Cutter Itineraries",
      descKo: "누구나 똑같이 지나치는 흔한 패키지 관광지가 아닙니다. 낯선 서해의 바람과 따스한 햇살 속에서 당신의 마음이 멈춰 서는 곳마다, 세상에 단 하나뿐인 온기 있는 기억과 영화 같은 이야기를 정성스레 써 내려갑니다.",
      descEn: "We reject cookie-cutter group tour itineraries. Wherever your heart pauses amidst gentle ocean breezes and warm sunlight, we co-author a one-of-a-kind travel story filled with genuine warmth and cinematic moments."
    },
    {
      id: "02",
      titleKo: "1:1 전담 호스트",
      titleEn: "One Dedicated Companion",
      subtitleKo: "입국부터 출국까지 밀착 케어",
      subtitleEn: "Unbroken Personal Care",
      descKo: "상담 창구의 차가운 직원도, 스케줄마다 매번 바뀌는 가이드도 없습니다. 인천공항 입국장의 환한 미소부터 출국장 따뜻한 손잡음까지, 오직 당신만을 든든하게 케어하는 단 한 명의 전담 호스트가 친근한 친구처럼 처음부터 끝까지 동행합니다.",
      descEn: "No cold agency desks or rotating guides. From a bright welcome at arrivals to a warm embrace at departure, your dedicated host walks beside you from start to finish like a lifelong local friend."
    },
    {
      id: "03",
      titleKo: "가족을 맞이하는 정성",
      titleEn: "Welcomed Like Family",
      subtitleKo: "말없이 통하는 세심함",
      subtitleEn: "Quiet Hospitality & Care",
      descKo: "스쳐가는 단순 고객이 아닌, 먼 해외에서 나를 찾아온 오랜 지인을 대하는 마음으로 섬깁니다. 말하지 않아도 소소한 취향과 작은 불편함까지 먼저 헤아려, 여행의 매 순간에 깊은 온기와 정성을 다해 케어합니다.",
      descEn: "Treating you not as a tourist, but as a beloved family member visiting from abroad. We quietly anticipate your unspoken needs and preferences, infusing every step of your journey with warm hospitality."
    },
    {
      id: "04",
      titleKo: "새로운 인천의 재발견",
      titleEn: "Discover Hidden Incheon",
      subtitleKo: "공항 너머의 진짜 한국",
      subtitleEn: "Beyond the Airport Gateway",
      descKo: "공항 관문을 한 걸음 넘어서면 비로소 모습을 드러내는 송도의 찬란한 스카이라인, 개항장의 130년 고즈넉한 근대 골목, 서해 섬의 비밀스러운 붉은 노을까지. 남들이 미처 몰랐던 한국의 진짜 정취와 미지의 매력을 선사합니다.",
      descEn: "Step beyond the airport gate into Songdo's futuristic skyline, Gaehangro's quiet 130-year open port heritage alleys, and secret West Sea island sunsets. Discover the hidden soul of Korea."
    },
    {
      id: "05",
      titleKo: "10인 이하 소수 정예",
      titleEn: "Intimate Sanctuary for Under 10",
      subtitleKo: "오직 우리만의 여유",
      subtitleEn: "Private & Peaceful",
      descKo: "시끄러운 깃발 투어와 빽빽한 버스 일정은 배격합니다. 사랑하는 가족, 연인과 함께 오직 10명 이하 소수 정예 그룹으로 호스트의 온기를 100% 느끼며, 우리만의 깊은 유대와 여유로운 사적인 휴식을 누립니다.",
      descEn: "No crowded tour buses or rushed schedules. Exclusively designed for intimate groups of under 10 guests, allowing your family to build meaningful bonds with your host in a peaceful sanctuary."
    },
    {
      id: "06",
      titleKo: "평생 남을 따뜻한 인연",
      titleEn: "A Friendship for a Lifetime",
      subtitleKo: "공항에서의 감동적인 이별",
      subtitleEn: "A Heartfelt Farewell",
      descKo: "단순한 가이드와의 작별이 아닙니다. 출국장에서 서로를 안아주며 '꼭 다시 만나자'고 나지막이 약속할 만큼, 여행이 끝난 후에도 당신의 삶 속에 깊은 온기로 남는 평생의 소중한 친구가 되어 드립니다.",
      descEn: "Not a routine goodbye, but a promise to meet again. As we share tears and hugs at the departure gate, you leave Korea with a lifelong friend cherished in your heart forever."
    }
  ];

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
    }
  ];

  return (
    <main className="min-h-screen bg-[var(--color-jm-cream)] text-[var(--color-jm-text)] font-sans">
      {/* HERO SECTION - Official Incheon Tourism Video Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Layer Fallback (Songdo Central Park) */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center brightness-105"
          style={{ backgroundImage: 'url("/images/incheon/songdo.jpg")' }}
        />
        {/* Official Downloaded Incheon 4K Travel MP4 Video Playlist */}
        <video
          key={videoPlaylist[currentVideoIdx].src}
          ref={videoRef}
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnded}
          className="absolute inset-0 z-0 w-full h-full object-cover scale-105 brightness-105"
        >
          <source src={videoPlaylist[currentVideoIdx].src} type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/75 via-black/45 to-black/20 backdrop-contrast-105 pointer-events-none" />

        {/* Floating Sound Toggle Button */}
        <button
          onClick={toggleSound}
          className="absolute top-28 right-6 md:right-12 z-20 flex items-center gap-2.5 px-4 py-2.5 bg-black/60 hover:bg-black/80 backdrop-blur-md rounded-full border border-white/40 text-white text-xs font-bold shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group"
        >
          <span className="text-sm group-hover:scale-110 transition-transform">
            {isMuted ? "🔇" : "🔊"}
          </span>
          <span className="font-semibold tracking-wide">
            {isMuted ? t("배경음악 켜기", "Sound On") : t("음소거", "Mute Sound")}
          </span>
          {isMuted && (
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          )}
        </button>
        
        <motion.div 
          className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center gap-8"
          initial="hidden" animate="visible" variants={staggerContainer}
        >
          <motion.h1 
            variants={fadeIn}
            style={{ color: '#ffffff', textShadow: '0 4px 20px rgba(0,0,0,0.6)' }}
            className="text-4xl md:text-6xl text-white leading-snug font-bold tracking-tight font-sans"
          >
            {isEn ? (
              <>
                Capture your trip like a movie,<br className="hidden sm:inline" />
                cherish your host like a lifelong friend.
              </>
            ) : (
              <>
                당신의 여행을 영화처럼 간직하고,<br />
                호스트를 평생의 친구로 기억하세요.
              </>
            )}
          </motion.h1>
          <motion.p 
            variants={fadeIn}
            style={{ color: '#ffffff', textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}
            className="text-lg md:text-2xl text-white font-medium max-w-3xl font-sans leading-relaxed"
          >
            {t(
              "평생 마음에 남을 아름다운 순간을 드리겠습니다.",
              "We gift you moments that linger in your heart forever."
            )}
          </motion.p>
          <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link 
              href="/builder"
              className="px-8 py-4 bg-[var(--color-jm-gold)] text-white rounded-full hover:bg-[var(--color-jm-navy)] transition-all duration-300 font-bold text-lg shadow-xl flex items-center justify-center gap-2"
            >
              {t("여정 시작하기", "Start Your Journey")}
            </Link>
            <Link 
              href="/destinations"
              className="px-8 py-4 bg-white/25 backdrop-blur-md text-white border border-white/70 rounded-full hover:bg-white hover:text-[var(--color-jm-navy)] transition-all duration-300 font-bold text-lg shadow-md flex items-center justify-center"
            >
              {t("여행지 둘러보기", "Explore Destinations")}
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* PHILOSOPHY SECTION */}
      <section id="philosophy" className="pt-28 pb-24 bg-[var(--color-jm-cream)] px-4 scroll-mt-0">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-jm-navy)] mb-4">
              {t("진심", "Sincerity")}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              {t("상품을 사는 것이 아닌 추억과 사람이 남는 여행. JourneyMate의 6가지 약속입니다.", "We don't sell itineraries. Here are 6 promises of JourneyMate to connect moments and people.")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {philosophies.map((phil) => (
              <motion.div 
                key={phil.id}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                variants={fadeIn}
                className="bg-white border border-[var(--color-jm-border)] rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-[var(--color-jm-gold)] tracking-tight">
                      {phil.id}
                    </span>
                    <span className="text-xs font-bold px-3 py-1 bg-[var(--color-jm-cream)] text-[var(--color-jm-navy)] rounded-full border border-[var(--color-jm-border)]">
                      {t(phil.subtitleKo, phil.subtitleEn)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--color-jm-navy)] mb-3 tracking-tight">
                    {isEn ? phil.titleEn : phil.titleKo}
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-medium text-sm md:text-base">
                    {isEn ? phil.descEn : phil.descKo}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOSTS SECTION */}
      <section id="hosts" className="pt-28 pb-24 bg-[var(--color-jm-cream)] px-4 scroll-mt-0">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-jm-navy)] mb-4">
              {t("전담 호스트", "Hosts")}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              {t(
                "문의부터 출국까지, 한 명의 전담 호스트가 당신의 여정을 온전히 책임집니다.",
                "From inquiry to airport departure, one dedicated host takes personal responsibility for your journey."
              )}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {hosts.map((host, idx) => (
              <motion.div 
                key={host.id}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { delay: idx * 0.1 } } }}
                className="bg-[var(--color-jm-cream-dark)] border border-[var(--color-jm-border)] rounded-2xl p-8 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="w-24 h-24 rounded-full bg-white border-2 border-[var(--color-jm-gold)] flex items-center justify-center text-3xl font-bold text-[var(--color-jm-navy)] mb-6 shadow-md group-hover:scale-105 transition-transform duration-300">
                  {host.initial}
                </div>
                <h3 className="text-2xl font-bold text-[var(--color-jm-navy)] mb-2 tracking-tight">
                  {isEn ? host.nameEn : host.nameKo}
                </h3>
                <div className="flex gap-2 mb-6">
                  {host.languages.map(lang => (
                    <span key={lang} className="text-xs font-bold px-3 py-1 bg-[var(--color-jm-navy)] text-white rounded-full">
                      {lang}
                    </span>
                  ))}
                </div>
                <div className="w-full text-left space-y-4 pt-6 border-t border-[var(--color-jm-border)]">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[var(--color-jm-gold)] font-bold block mb-1">
                      {t("나만의 시크릿 스팟", "My Secret Spot")}
                    </span>
                    <span className="text-sm font-semibold text-gray-800">
                      {isEn ? host.secretSpotEn : host.secretSpotKo}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[var(--color-jm-gold)] font-bold block mb-1">
                      {t("가이딩 철학", "Guiding Philosophy")}
                    </span>
                    <span className="text-sm font-semibold text-gray-800">
                      {isEn ? host.philosophyEn : host.philosophyKo}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRIP ARCHIVE SECTION */}
      <section id="triparchive" className="pt-28 pb-24 bg-[var(--color-jm-cream-dark)] px-4 scroll-mt-0">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-jm-navy)] mb-4">
              {t("여행 아카이브", "TripArchive")}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              {t(
                "모든 미소와 풍경을 4K 시네마틱 영상과 스냅으로 영원히 기록합니다.",
                "Every smile, every laugh, every breathtaking view—immortalized in 4K resolution."
              )}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trips.map((trip, idx) => (
              <motion.div 
                key={idx}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { delay: idx * 0.1 } } }}
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
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeIn}
            className="mt-12 text-center"
          >
            <Link 
              href="/archive"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-[var(--color-jm-gold)] text-[var(--color-jm-navy)] hover:bg-[var(--color-jm-gold)] hover:text-white rounded-full font-bold transition-colors"
            >
              {t("후기 더보기", "View All Archives")}
            </Link>
          </motion.div>
        </div>
      </section>


      {/* CONTACT SECTION */}
      <section id="contact" className="pt-28 pb-24 bg-[var(--color-jm-navy)] text-white px-4 text-center scroll-mt-0">
        <div className="max-w-3xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              {t("호스트 상담 신청", "Contact Host")}
            </h2>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10">
              {t(
                "호스트에게 메시지를 보내고 당신만의 특별한 여정을 시작해보세요.",
                "Just send a message to your host and let your journey unfold."
              )}
            </p>
            <a 
              href="https://wa.me/821099008210?text=Hello!%20I'm%20ready%20to%20start%20my%20journey."
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-9 py-4 bg-[var(--color-jm-gold)] text-white rounded-full hover:bg-amber-600 transition-all duration-300 font-bold text-lg shadow-2xl hover:-translate-y-1"
            >
              <MessageCircle className="w-6 h-6" />
              {t("WhatsApp으로 1:1 상담하기", "Contact via WhatsApp")}
            </a>
          </motion.div>
        </div>
      </section>

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
              
              <div className="flex flex-col gap-3">
                <a 
                  href={`https://wa.me/821099008210?text=Hi!%20I'm%20interested%20in%20the%20${encodeURIComponent(selectedTrip)}%20experience.`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-4 bg-[#25D366] text-white rounded-xl font-bold text-base hover:bg-emerald-600 transition-colors shadow"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp 1:1 상담
                </a>
                <button 
                  disabled
                  className="w-full flex items-center justify-center gap-2 py-4 bg-gray-200 text-gray-400 cursor-not-allowed rounded-xl font-medium"
                >
                  <MessageCircle className="w-5 h-5" />
                  KakaoTalk (Coming Soon)
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
