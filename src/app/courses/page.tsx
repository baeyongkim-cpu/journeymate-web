"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { courses } from "@/data/courses";
import { Clock, Moon, MapPin, DollarSign, Calendar, MessageCircle, Star } from "lucide-react";

export default function CoursesPage() {
  const { t, lang } = useLanguage();
  const isEn = lang === 'en';
  
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);

  return (
    <div className="min-h-screen bg-[var(--color-jm-cream)] text-[var(--color-jm-text)] flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 bg-[var(--color-jm-navy)] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1517154421773-0529f29ea451?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              {t("JourneyMate 추천 여정", "Recommended Journeys")}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed break-keep whitespace-pre-line">
              {t(
                "여행의 일정을 정하기 어려우신가요?\nJourneyMate가 심혈을 기울여 기획한 테마 코스를 만나보세요.",
                "Finding it hard to plan your itinerary?\nDiscover theme courses meticulously curated by JourneyMate."
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Slider Section */}
      <section className="py-12 px-4 sm:px-6 w-full max-w-[100vw] overflow-hidden bg-white/50">
        <div className="max-w-7xl mx-auto mb-6">
          <h2 className="text-2xl font-bold text-[var(--color-jm-navy)] text-center">
            {t("원하시는 테마를 선택해 보세요", "Choose Your Theme")}
          </h2>
        </div>
        
        {/* Horizontal Scroll Container */}
        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 pb-4 px-4 max-w-5xl mx-auto justify-start md:justify-center">
          {courses.map((course, index) => {
            const isSelected = selectedCourse.id === course.id;
            
            return (
              <div 
                key={course.id}
                onClick={() => setSelectedCourse(course)}
                role="button"
                tabIndex={0}
                className={`snap-center shrink-0 w-[65vw] sm:w-[220px] md:w-[260px] group relative block rounded-2xl overflow-hidden transition-all duration-300 text-left cursor-pointer ${isSelected ? 'ring-4 ring-[var(--color-jm-gold)] shadow-xl transform scale-105' : 'shadow-md hover:shadow-lg opacity-80 hover:opacity-100'}`}
              >
                {/* Image Container - smaller aspect ratio */}
                <div className="aspect-[4/3] relative w-full overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${course.image})` }}
                  />
                  {/* Lighter Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent transition-opacity duration-500" />
                  
                  {/* Badge */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-full shadow-sm flex items-center gap-1 z-10">
                    <Star className="w-3 h-3 text-[var(--color-jm-gold)] fill-[var(--color-jm-gold)]" />
                    <span className="text-[10px] font-bold text-[var(--color-jm-navy)] tracking-wider">
                      OPTION 0{index + 1}
                    </span>
                  </div>

                  {/* Text Content - White text, lighter filter */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10 flex flex-col justify-end">
                    <div className="text-lg md:text-xl font-bold text-white mb-1 leading-tight drop-shadow-md whitespace-pre-line break-keep">
                      {isEn ? course.titleEn : course.titleKo}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Selected Course Details Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCourse.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Title & Subtitle for the selected course */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-jm-navy)] mb-4 font-serif whitespace-pre-line break-keep">
                {isEn ? selectedCourse.titleEn : selectedCourse.titleKo}
              </h2>
              <p className="text-lg md:text-xl text-[var(--color-jm-gold)] font-light max-w-2xl mx-auto break-keep">
                {isEn ? selectedCourse.subtitleEn : selectedCourse.subtitleKo}
              </p>
            </div>

            {/* Meaning & Experiences */}
            <div className="mb-16">
              <h3 className="text-xl font-bold text-[var(--color-jm-navy)] mb-6 flex items-center gap-3 justify-center">
                <span className="w-6 h-[1px] bg-[var(--color-jm-gold)]"></span>
                {t("여행이 주는 의미", "Meaning of the Journey")}
                <span className="w-6 h-[1px] bg-[var(--color-jm-gold)]"></span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(isEn ? selectedCourse.meaningEn : selectedCourse.meaningKo).map((item, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--color-jm-border)] flex flex-col gap-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-[var(--color-jm-cream)] flex items-center justify-center text-[var(--color-jm-gold)] font-serif text-lg font-bold">
                      0{idx + 1}
                    </div>
                    <h4 className="font-bold text-[var(--color-jm-navy)] text-lg leading-tight break-keep">{item.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed break-keep">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Details Grid */}
            <div className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-3xl shadow-sm border border-[var(--color-jm-border)]">
                <div className="flex flex-col gap-2">
                  <span className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <Clock className="w-4 h-4 text-[var(--color-jm-gold)]" /> {t("기간", "Duration")}
                  </span>
                  <span className="font-medium text-base text-[var(--color-jm-navy)]">
                    {isEn ? selectedCourse.details.duration.en : selectedCourse.details.duration.ko}
                  </span>
                </div>
                
                <div className="flex flex-col gap-2">
                  <span className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <Moon className="w-4 h-4 text-[var(--color-jm-gold)]" /> {t("숙박", "Accommodation")}
                  </span>
                  <span className="font-medium text-base text-[var(--color-jm-navy)]">
                    {isEn ? selectedCourse.details.accommodation.en : selectedCourse.details.accommodation.ko}
                  </span>
                </div>
                
                <div className="flex flex-col gap-2">
                  <span className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <Calendar className="w-4 h-4 text-[var(--color-jm-gold)]" /> {t("추천 시기", "Best Timing")}
                  </span>
                  <span className="font-medium text-base text-[var(--color-jm-navy)]">
                    {isEn ? selectedCourse.details.timing.en : selectedCourse.details.timing.ko}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <DollarSign className="w-4 h-4 text-[var(--color-jm-gold)]" /> {t("예상 가격", "Est. Price")}
                  </span>
                  <span className="font-medium text-base text-[var(--color-jm-navy)]">
                    {isEn ? selectedCourse.details.price.en : selectedCourse.details.price.ko}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <a 
                href={`https://wa.me/821099008210?text=${encodeURIComponent(`Hello! I'm interested in booking [${selectedCourse.titleEn}].`)}`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-[var(--color-jm-navy)] text-white rounded-full font-bold text-lg hover:bg-[var(--color-jm-gold)] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-300"
              >
                <MessageCircle className="w-5 h-5" />
                {t("이 여정으로 호스트와 상담하기", "Inquire about this Journey")}
              </a>
            </div>

          </motion.div>
        </AnimatePresence>
      </section>

      {/* Global Style to hide scrollbar for the slider */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
