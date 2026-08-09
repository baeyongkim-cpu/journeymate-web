"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronDown, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { destinations, parentTrack, kidsTrack } from '@/data/destinations';

export default function DestinationsPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'incheon-core' | 'beyond-incheon'>('incheon-core');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredDestinations = destinations.filter(d => d.category === activeTab);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleWhatsApp = (subName: string) => {
    const msg = encodeURIComponent(`Hello! I'm interested in the "${subName}" experience.`);
    window.open(`https://wa.me/821099008210?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[var(--color-jm-cream)] text-[var(--color-jm-text)] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-jm-navy)] mb-4">
            {t('목적지', 'Destinations')}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {t('우리는 일정을 팔지 않습니다. 평생 기억에 남을 순간을 디자인합니다.', 'We don\'t sell itineraries. We craft moments that linger in your heart forever.')}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex border-b border-[var(--color-jm-border)]">
            <button
              onClick={() => setActiveTab('incheon-core')}
              className={`px-8 py-4 text-lg font-medium transition-colors relative ${
                activeTab === 'incheon-core' ? 'text-[var(--color-jm-navy)]' : 'text-gray-500 hover:text-[var(--color-jm-navy)]'
              }`}
            >
              ⚓ {t('인천 코어', 'Incheon Core')}
              {activeTab === 'incheon-core' && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-jm-gold)]"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('beyond-incheon')}
              className={`px-8 py-4 text-lg font-medium transition-colors relative ${
                activeTab === 'beyond-incheon' ? 'text-[var(--color-jm-navy)]' : 'text-gray-500 hover:text-[var(--color-jm-navy)]'
              }`}
            >
              🇰🇷 {t('비욘드 인천', 'Beyond Incheon')}
              {activeTab === 'beyond-incheon' && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-jm-gold)]"
                />
              )}
            </button>
          </div>
        </div>

        {/* Destinations Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 items-start"
        >
          <AnimatePresence mode="popLayout">
            {filteredDestinations.map((dest) => (
              <motion.div
                key={dest.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl overflow-hidden border border-[var(--color-jm-border)] shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-64 sm:h-80 cursor-pointer" onClick={() => toggleExpand(dest.id)}>
                  <img
                    src={dest.image}
                    alt={t(dest.title, dest.titleEn)}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {(t(dest.tags, dest.tagsEn) as string[]).map((tag, idx) => (
                        <span key={idx} className="px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/30">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight text-white mb-2">{t(dest.title, dest.titleEn)}</h3>
                    <p className="text-sm text-white/95 font-medium line-clamp-2">{t(dest.description, dest.descriptionEn)}</p>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedId === dest.id && dest.subDestinations.length > 0 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-[var(--color-jm-cream-dark)]"
                    >
                      <div className="p-6 space-y-6">
                        {dest.subDestinations.map((sub, idx) => (
                          <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-jm-border)] pb-6 last:border-0 last:pb-0">
                            <div>
                              <h4 className="text-lg font-bold text-[var(--color-jm-navy)] mb-1">
                                {t(sub.name, sub.nameEn)}
                              </h4>
                              <p className="text-sm text-gray-800 font-medium mb-2">
                                {t(sub.desc, sub.descEn)}
                              </p>
                              <p className="text-sm font-bold text-[var(--color-jm-gold)]">
                                {sub.price}
                              </p>
                            </div>
                            <button
                              onClick={() => handleWhatsApp(t(sub.name, sub.nameEn))}
                              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[var(--color-jm-navy)] text-white text-sm font-bold rounded-lg hover:bg-opacity-90 transition-colors shrink-0"
                            >
                              <MessageCircle className="w-4 h-4" />
                              {t('호스트와 상담하기', 'Talk to Your Host')}
                            </button>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {dest.subDestinations.length > 0 && (
                  <button
                    onClick={() => toggleExpand(dest.id)}
                    className="w-full py-3 bg-white text-[var(--color-jm-navy)] font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors border-t border-[var(--color-jm-border)]"
                  >
                    {expandedId === dest.id ? t('접기', 'Show Less') : t('경험 보기', 'View Experiences')}
                    <ChevronDown className={`w-4 h-4 transition-transform ${expandedId === dest.id ? 'rotate-180' : ''}`} />
                  </button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Dual-Track Section */}
        <div className="mt-32 pt-16 border-t border-[var(--color-jm-border)]">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-jm-navy)] mb-4">
              {t('듀얼 트랙 가족 여행', 'Dual-Track Family Experiences')}
            </h2>
            <p className="text-gray-800 font-medium max-w-2xl mx-auto">
              {t('부모님에게는 온전한 휴식을, 아이들에게는 즐거운 발견을 선사합니다.', 'Pure serenity for parents, joyful discoveries for children.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Parents Track */}
            <div className="bg-white p-8 rounded-2xl border border-[var(--color-jm-border)] shadow-sm">
              <h3 className="text-2xl font-bold tracking-tight text-[var(--color-jm-navy)] mb-8 flex items-center gap-3">
                <span className="text-2xl">✨</span>
                {t('부모님을 위한 휴식', 'Pure Serenity for Parents')}
              </h3>
              <div className="space-y-6">
                {parentTrack.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="text-3xl shrink-0">{item.icon}</div>
                    <div>
                      <h4 className="font-bold text-[var(--color-jm-navy)] text-lg mb-1">{t(item.titleKo, item.titleEn)}</h4>
                      <p className="text-gray-800 text-sm leading-relaxed font-medium">{t(item.descKo, item.descEn)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Kids Track */}
            <div className="bg-white p-8 rounded-2xl border border-[var(--color-jm-border)] shadow-sm">
              <h3 className="text-2xl font-bold tracking-tight text-[var(--color-jm-navy)] mb-8 flex items-center gap-3">
                <span className="text-2xl">🎈</span>
                {t('아이들을 위한 발견', 'Joyful Discoveries for Children')}
              </h3>
              <div className="space-y-6">
                {kidsTrack.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="text-3xl shrink-0">{item.icon}</div>
                    <div>
                      <h4 className="font-bold text-[var(--color-jm-navy)] text-lg mb-1">{t(item.titleKo, item.titleEn)}</h4>
                      <p className="text-gray-800 text-sm leading-relaxed font-medium">{t(item.descKo, item.descEn)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
