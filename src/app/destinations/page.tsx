"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useLanguage } from "@/lib/LanguageContext";

import { destinations as fallbackDestinations, Destination } from "@/data/destinations";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function DestinationsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [destinations, setDestinations] = useState<Destination[]>(fallbackDestinations);
  const { t, lang } = useLanguage();

  useEffect(() => {
    const fetchDests = async () => {
      try {
        const snap = await getDocs(collection(db, "journeymate_destinations"));
        if (!snap.empty) {
          const dests = snap.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
              tags: data.tags || [],
              tagsEn: data.tagsEn || [],
              subDestinations: data.subDestinations || []
            } as Destination;
          });
          setDestinations(dests);
        }
      } catch (e) {
        console.error("Failed to fetch destinations from DB, using fallback", e);
      }
    };
    fetchDests();
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900"
          >
            {t("당신이 꿈꾸는", "Scenes of Korea")} <span className="text-blue-600">{t("한국의 장면들", "You Dream Of")}</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            {t("어디서 어떤 분위기로 촬영하고 싶으신가요? 지역을 선택하여 숨겨진 스팟들을 확인해보세요.", "Where and in what mood would you like to shoot? Select a region to check out hidden spots.")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {destinations.map((dest, index) => (
            <motion.div 
              key={dest.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className={`group overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 border-2 ${expandedId === dest.id ? 'border-blue-600' : 'border-transparent hover:shadow-xl'}`}
            >
              {/* Image & Main Info (Clickable) */}
              <div 
                className="relative h-[250px] md:h-[300px] w-full overflow-hidden cursor-pointer"
                onClick={() => toggleExpand(dest.id)}
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500 z-10" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={dest.image} 
                  alt={lang === 'en' ? dest.titleEn : dest.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                
                <div className="absolute top-6 left-6 z-20 flex gap-2">
                  {(lang === 'en' && dest.tagsEn ? dest.tagsEn : dest.tags).map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/90 backdrop-blur-sm text-sm font-semibold text-gray-800 rounded-full shadow-sm">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="absolute bottom-6 left-6 z-20 text-white right-6 flex justify-between items-end">
                   <div>
                      <h3 className="text-3xl font-bold mb-2 flex items-center gap-2 drop-shadow-lg">
                        <MapPin className="w-6 h-6 text-blue-400" /> {lang === 'en' ? dest.titleEn : dest.title}
                      </h3>
                      <p className="text-gray-100 line-clamp-1 drop-shadow-md">
                        {lang === 'en' ? dest.descriptionEn : dest.description}
                      </p>
                   </div>
                   <div className="bg-white/20 p-2 rounded-full backdrop-blur-md">
                      {expandedId === dest.id ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                   </div>
                </div>
              </div>

              {/* Expandable Sub-Destinations Area */}
              <AnimatePresence>
                {expandedId === dest.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-white overflow-hidden"
                  >
                    <div className="p-6 md:p-8 space-y-4 bg-gray-50/50">
                      <h4 className="font-bold text-gray-900 mb-4 border-b pb-2">{t("상세 촬영 스팟 및 코스", "Detailed Photo Spots and Courses")}</h4>
                      
                      {dest.subDestinations.map((sub, i) => (
                        <div key={i} className="flex justify-between items-center p-4 bg-white rounded-xl border border-gray-100 hover:border-blue-200 transition-colors shadow-sm">
                          <div>
                            <div className="font-bold text-lg text-gray-900">{lang === 'en' ? sub.nameEn : sub.name}</div>
                            <div className="text-sm text-gray-500">{lang === 'en' ? sub.descEn : sub.desc}</div>
                          </div>
                          <div className="flex flex-col items-end gap-2 justify-center">
                            <Link href={`/builder?dest=${dest.id}&sub=${i}`} className="inline-flex items-center justify-center font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-full px-4 text-sm w-full border-blue-200 text-blue-700 hover:bg-blue-50">
                                {t("여정 설계하기", "Design Trip")}
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
