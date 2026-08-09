"use client";

import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DayPicker, DateRange } from 'react-day-picker';
import { format, parse, isValid } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';
import { Calendar as CalendarIcon, Users, MessageSquare, Heart, ArrowRight, Check, Save, Edit } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { useAuth } from '@/lib/AuthContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import 'react-day-picker/dist/style.css';

export interface SubExperience {
  id: string;
  categoryId: string;
  labelKo: string;
  labelEn: string;
  locationKo: string;
  locationEn: string;
}

const categoryList = [
  { id: 'culture', labelKo: '문화 & 역사', labelEn: 'Culture & History', icon: '🏛️' },
  { id: 'food', labelKo: '미식 & 시장', labelEn: 'Food & Traditional Markets', icon: '🍢' },
  { id: 'nature', labelKo: '자연 & 섬 힐링', labelEn: 'Nature & Private Islands', icon: '🏝️' },
  { id: 'city', labelKo: '시티 & 스카이라인', labelEn: 'City & Future Skyline', icon: '🏙️' },
  { id: 'photo', labelKo: '스냅 & 4K 시네마틱 촬영', labelEn: 'Snap Photo & 4K Cinema', icon: '📸' }
];

const subExperiences: SubExperience[] = [
  // 문화 & 역사 (개항장거점)
  { id: 'heritage-walk', categoryId: 'culture', labelKo: '130년 헤리티지 근대 건축 워크', labelEn: '130-Year Heritage Walk', locationKo: '개항장', locationEn: 'Gaehangro' },
  { id: 'chinatown', categoryId: 'culture', labelKo: '한국 최초 차이나타운 스토리 투어', labelEn: 'Chinatown History & Food Walk', locationKo: '차이나타운', locationEn: 'Chinatown' },
  { id: 'fairytale', categoryId: 'culture', labelKo: '송월동 동화마을 스냅 산책', labelEn: 'Fairy Tale Village Snap Walk', locationKo: '동화마을', locationEn: 'Fairy Tale Village' },

  // 미식 & 시장 (신포시장거점)
  { id: 'sinpo-food', categoryId: 'food', labelKo: '신포국제시장 스트릿 푸드 탐방', labelEn: 'Sinpo Traditional Market Foodie Tour', locationKo: '신포시장', locationEn: 'Sinpo Market' },
  { id: 'k-dessert', categoryId: 'food', labelKo: 'K-디저트(앙금플라워/떡) 만들기 클래스', labelEn: 'K-Dessert Making Class', locationKo: '신포시장', locationEn: 'Sinpo Market' },
  { id: 'home-cooking', categoryId: 'food', labelKo: '신선한 로컬 재료로 즐기는 한식 쿠킹', labelEn: 'Local Korean Home Cooking Class', locationKo: '신포시장', locationEn: 'Sinpo Market' },

  // 자연 & 섬 힐링 (무의도/신시모도거점)
  { id: 'beach-bbq', categoryId: 'nature', labelKo: '프라이빗 섬 프라이빗 해변 바비큐', labelEn: 'Private Beach Barbecue', locationKo: '무의도/신시모도', locationEn: 'Private Island' },
  { id: 'coastal-trek', categoryId: 'nature', labelKo: '해안길 데크 트레킹 & 파도 소리 명상', labelEn: 'Coastal Trail Trekking & Wave Meditation', locationKo: '무의도', locationEn: 'Muuido Island' },
  { id: 'sunset-meditation', categoryId: 'nature', labelKo: '서해 일몰 불멍 & 파이어핏 대화', labelEn: 'Sunset View & Island Fire Pit Conversation', locationKo: '신시모도', locationEn: 'Sinsimodo Island' },

  // 시티 & 스카이라인 (송도거점)
  { id: 'park-boat', categoryId: 'city', labelKo: '송도 센트럴파크 호수 프라이빗 보팅', labelEn: 'Central Park Private Boating', locationKo: '송도국제도시', locationEn: 'Songdo City' },
  { id: 'gtower-view', categoryId: 'city', labelKo: 'G타워 파노라마 스카이라인 전망대', labelEn: 'G-Tower Observatory Panoramic View', locationKo: '송도국제도시', locationEn: 'Songdo City' },
  { id: 'canal-walk', categoryId: 'city', labelKo: '송도 수로 커낼워크 리조트풍 산책', labelEn: 'European Canal Walk Promenade', locationKo: '송도국제도시', locationEn: 'Songdo City' },

  // 스냅 & 4K 시네마틱 촬영
  { id: 'snap-photo', categoryId: 'photo', labelKo: '전담 호스트의 1:1 고화질 화보 스냅 촬영', labelEn: '1:1 Personal High-Res Snap Shoot', locationKo: '전 코스', locationEn: 'All Locations' },
  { id: 'video-4k', categoryId: 'photo', labelKo: '평생 소장용 4K 시네마틱 여행 브이로그 영상', labelEn: '4K Cinematic Travel Video Archive', locationKo: '전 코스', locationEn: 'All Locations' }
];

export interface AddOnService {
  id: string;
  labelKo: string;
  labelEn: string;
  descKo: string;
  descEn: string;
  icon: string;
}

const addOnServicesList: AddOnService[] = [
  { id: 'airport-pickup', labelKo: '공항 VIP 픽업 & 샌딩', labelEn: 'Airport VIP Pickup & Drop-off', descKo: '인천공항 입국 마중부터 출국 배웅까지 전용 차량 1:1 케어', descEn: 'Dedicated vehicle care from airport greeting to departure farewell', icon: '✈️' },
  { id: 'luxury-van', labelKo: '전용 럭셔리 밴 & 전담 기사', labelEn: 'Dedicated Luxury Van & Chauffeur', descKo: '여행 전체 일정 고급 전용 차량 및 전문 기사 동행', descEn: 'High-end private luxury van and chauffeur', icon: '🚐' },
  { id: 'stay-proxy', labelKo: '5성급 숙소 / 섬 리조트 예약 대행', labelEn: '5-Star Luxury Stay & Resort Booking', descKo: '송도 5성급 호텔 및 무의도/신시모도 프라이빗 럭셔리 리조트', descEn: 'Songdo 5-star hotel & private island luxury resort reservation', icon: '🏨' },
  { id: 'k-beauty', labelKo: 'K-뷰티 & 메디컬 웰니스 클리닉', labelEn: 'K-Beauty & Medical Wellness Referral', descKo: 'VIP 전용 피부과, 스파, 한방 케어 및 웰니스 클리닉 연계', descEn: 'VIP dermatology, spa, oriental medicine & wellness clinic connection', icon: '💆' },
  { id: 'transit-guide', labelKo: '대중교통 안내 & 동행 케어', labelEn: 'Public Transit Escort & Guidance', descKo: '지하철, 버스 등 한국 대중교통 이용 안내 및 1:1 현장 동행 이동 서비스', descEn: 'Subway & bus navigation guidance and 1:1 escort service', icon: '🚌' }
];

function BuilderContent() {
  const { t, lang } = useLanguage();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tripId = searchParams.get('tripId');
  const [editingTripId, setEditingTripId] = useState<string | null>(null);

  const [step, setStep] = useState(1);
  const isEn = lang === 'en';
  const [savingTrip, setSavingTrip] = useState(false);

  // Step 1: Details
  const [date, setDate] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState<number>(2);
  const [prefLang, setPrefLang] = useState<'english' | 'korean' | 'japanese'>('english');
  
  // Step 2: Selected Category & Sub-experiences & Add-ons
  const [selectedCategory, setSelectedCategory] = useState<string>('culture');
  const [selectedSubExps, setSelectedSubExps] = useState<string[]>([
    'heritage-walk', 'sinpo-food', 'park-boat'
  ]);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([
    'airport-pickup', 'luxury-van'
  ]);

  // Step 3: Notes
  const [notes, setNotes] = useState('');

  // Load existing trip if tripId param exists
  useEffect(() => {
    if (!tripId || authLoading) return;
    if (!user) return;
    const loadTrip = async () => {
      try {
        const docRef = doc(db, "journeymate_trips", tripId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setEditingTripId(tripId);
          if (data.guests) setGuests(data.guests);
          if (data.language) setPrefLang(data.language);
          if (data.selectedSubExps) setSelectedSubExps(data.selectedSubExps);
          if (data.selectedAddOns) setSelectedAddOns(data.selectedAddOns);
          if (data.notes) setNotes(data.notes);

          // 1순위: ISO 날짜 필드 복원 (최신 저장 형식)
          if (data.dateFrom && data.dateTo) {
            const from = new Date(data.dateFrom);
            const to = new Date(data.dateTo);
            if (isValid(from) && isValid(to)) {
              setDate({ from, to });
            }
          // 2순위: dates 문자열 파싱 (기존 저장 형식 폴백)
          } else if (data.dates && data.dates !== 'Not specified') {
            const parts = data.dates.split(' - ');
            if (parts.length === 2) {
              const from = parse(parts[0].trim(), 'MMM d, yyyy', new Date());
              const to = parse(parts[1].trim(), 'MMM d, yyyy', new Date());
              if (isValid(from) && isValid(to)) {
                setDate({ from, to });
              }
            }
          }
        }
      } catch (e) {
        console.error("Failed to load existing trip", e);
      }
    };
    loadTrip();
  }, [tripId, user, authLoading]);

  const toggleSubExp = (id: string) => {
    if (!id) return;
    setSelectedSubExps(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleAddOn = (id: string) => {
    if (!id) return;
    setSelectedAddOns(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSaveOnly = async () => {
    if (!user) {
      alert(t("로그인 후 마이페이지에 여정을 저장할 수 있습니다. 로그인 페이지로 이동합니다.", "Please log in to save your trip to My Page. Redirecting to login..."));
      router.push("/login");
      return;
    }

    const datesStr = date?.from && date?.to 
      ? `${format(date.from, 'MMM d, yyyy')} - ${format(date.to, 'MMM d, yyyy')}`
      : 'Not specified';

    setSavingTrip(true);
    try {
      const payload = {
        userId: user.uid,
        userEmail: user.email,
        dates: datesStr,
        dateFrom: date?.from ? date.from.toISOString() : null,
        dateTo: date?.to ? date.to.toISOString() : null,
        guests,
        language: prefLang,
        selectedSubExps,
        selectedSubExpsLabels: selectedSubExps.map(id => subExperiences.find(s => s.id === id)?.labelKo).filter(Boolean),
        selectedSubExpsLabelsEn: selectedSubExps.map(id => subExperiences.find(s => s.id === id)?.labelEn).filter(Boolean),
        selectedAddOns,
        selectedAddOnsLabels: selectedAddOns.map(id => addOnServicesList.find(a => a.id === id)?.labelKo).filter(Boolean),
        selectedAddOnsLabelsEn: selectedAddOns.map(id => addOnServicesList.find(a => a.id === id)?.labelEn).filter(Boolean),
        notes,
        status: "저장됨",
        updatedAt: new Date().toISOString()
      };

      if (editingTripId) {
        await updateDoc(doc(db, "journeymate_trips", editingTripId), payload);
        alert(t("여정이 성공적으로 수정되었습니다!", "Your journey has been updated!"));
      } else {
        await addDoc(collection(db, "journeymate_trips"), {
          ...payload,
          createdAt: new Date().toISOString()
        });
        alert(t("여정이 마이페이지에 안전하게 저장되었습니다!", "Your journey has been saved to My Page!"));
      }
      router.push("/mypage");
    } catch (e) {
      console.error("Failed to save trip to Firestore", e);
      alert(t("저장에 실패했습니다.", "Failed to save trip."));
    } finally {
      setSavingTrip(false);
    }
  };

  const handleSaveAndChat = async () => {
    const datesStr = date?.from && date?.to 
      ? `${format(date.from, 'MMM d, yyyy')} - ${format(date.to, 'MMM d, yyyy')}`
      : 'Not specified';
      
    const selectedItemsStr = selectedSubExps
      .map(id => {
        const item = subExperiences.find(s => s.id === id);
        return item ? `• ${isEn ? item.labelEn : item.labelKo} (${isEn ? item.locationEn : item.locationKo})` : null;
      })
      .filter(Boolean)
      .join('\n');

    const selectedAddOnsStr = selectedAddOns
      .map(id => {
        const item = addOnServicesList.find(a => a.id === id);
        return item ? `• ${isEn ? item.labelEn : item.labelKo}` : null;
      })
      .filter(Boolean)
      .join('\n');

    if (user) {
      setSavingTrip(true);
      try {
        const payload = {
          userId: user.uid,
          userEmail: user.email,
          dates: datesStr,
          dateFrom: date?.from ? date.from.toISOString() : null,
          dateTo: date?.to ? date.to.toISOString() : null,
          guests,
          language: prefLang,
          selectedSubExps,
          selectedSubExpsLabels: selectedSubExps.map(id => subExperiences.find(s => s.id === id)?.labelKo).filter(Boolean),
          selectedSubExpsLabelsEn: selectedSubExps.map(id => subExperiences.find(s => s.id === id)?.labelEn).filter(Boolean),
          selectedAddOns,
          selectedAddOnsLabels: selectedAddOns.map(id => addOnServicesList.find(a => a.id === id)?.labelKo).filter(Boolean),
          selectedAddOnsLabelsEn: selectedAddOns.map(id => addOnServicesList.find(a => a.id === id)?.labelEn).filter(Boolean),
          notes,
          status: "상담 신청 완료",
          updatedAt: new Date().toISOString()
        };

        if (editingTripId) {
          await updateDoc(doc(db, "journeymate_trips", editingTripId), payload);
        } else {
          await addDoc(collection(db, "journeymate_trips"), {
            ...payload,
            createdAt: new Date().toISOString()
          });
        }
      } catch (e) {
        console.error("Failed to save trip to Firestore", e);
      } finally {
        setSavingTrip(false);
      }
    }

    const msg = `Hello! I'd like to plan my JourneyMate experience.

📅 Dates: ${datesStr}
👥 Guests: ${guests}
🌍 Language: ${prefLang === 'english' ? 'English' : prefLang === 'korean' ? 'Korean' : 'Japanese (日本語)'}

❤️ Selected Experiences:
${selectedItemsStr || 'None selected'}

✨ Selected VIP Add-On Services:
${selectedAddOnsStr || 'None selected'}

📝 Special Requests:
${notes || 'None'}

Looking forward to hearing from you!`;

    window.open(`https://wa.me/821099008210?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[var(--color-jm-cream)] text-[var(--color-jm-text)] pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-jm-navy)] mb-4">
            {editingTripId 
              ? t('✏️ 기존 여정 수정하기', 'Edit Your Journey')
              : t('나만의 여정 만들기', 'Create Your Journey')}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {t('꿈꾸던 여행을 말씀해주세요. 세부 체험을 자유롭게 조합해보세요.', 'Tell us about your dream trip. Custom-combine experiences to craft your journey.')}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex justify-center items-center mb-12">
          {[1, 2, 3].map((s, i) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-colors ${
                step >= s ? 'bg-[var(--color-jm-navy)] text-white' : 'bg-white border border-[var(--color-jm-border)] text-gray-400'
              }`}>
                {step > s ? <Check className="w-5 h-5" /> : s}
              </div>
              {i < 2 && (
                <div className={`w-16 h-0.5 mx-2 transition-colors ${
                  step > s ? 'bg-[var(--color-jm-navy)]' : 'bg-[var(--color-jm-border)]'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl border border-[var(--color-jm-border)] p-8 md:p-12 shadow-sm min-h-[500px] flex flex-col">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1"
              >
                <h2 className="text-2xl font-bold tracking-tight text-[var(--color-jm-navy)] mb-8 flex items-center gap-2">
                  <CalendarIcon className="w-6 h-6 text-[var(--color-jm-gold)]" />
                  {t('1. 여행 기본 정보', '1. Travel Details')}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      {t('날짜 선택', 'Select Dates')}
                    </label>
                    <div className="border border-[var(--color-jm-border)] rounded-xl p-4 flex justify-center bg-[var(--color-jm-cream-dark)]">
                      <DayPicker
                        mode="range"
                        selected={date}
                        onSelect={setDate}
                        className="font-sans"
                        classNames={{
                          day_selected: "bg-[var(--color-jm-navy)] text-white hover:bg-[var(--color-jm-navy)]",
                          day_today: "font-bold text-[var(--color-jm-gold)]",
                        }}
                      />
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        {t('인원 수', 'Number of Guests')}
                      </label>
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => setGuests(Math.max(1, guests - 1))}
                          className="w-10 h-10 rounded-full border border-[var(--color-jm-border)] flex items-center justify-center hover:bg-gray-50 transition-colors font-bold"
                        >
                          -
                        </button>
                        <span className="text-xl font-bold w-8 text-center">{guests}</span>
                        <button 
                          onClick={() => setGuests(guests + 1)}
                          className="w-10 h-10 rounded-full border border-[var(--color-jm-border)] flex items-center justify-center hover:bg-gray-50 transition-colors font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-gray-400" />
                        {t('선호 언어', 'Preferred Language')}
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        <button
                          type="button"
                          onClick={() => setPrefLang('english')}
                          className={`py-3 px-3 rounded-xl border transition-all font-medium text-center text-sm sm:text-base ${
                            prefLang === 'english' 
                              ? 'border-[var(--color-jm-navy)] bg-[var(--color-jm-navy)] text-white shadow-md' 
                              : 'border-[var(--color-jm-border)] text-gray-600 hover:border-gray-300'
                          }`}
                        >
                          English
                        </button>
                        <button
                          type="button"
                          onClick={() => setPrefLang('korean')}
                          className={`py-3 px-3 rounded-xl border transition-all font-medium text-center text-sm sm:text-base ${
                            prefLang === 'korean' 
                              ? 'border-[var(--color-jm-navy)] bg-[var(--color-jm-navy)] text-white shadow-md' 
                              : 'border-[var(--color-jm-border)] text-gray-600 hover:border-gray-300'
                          }`}
                        >
                          한국어
                        </button>
                        <button
                          type="button"
                          onClick={() => setPrefLang('japanese')}
                          className={`py-3 px-3 rounded-xl border transition-all font-medium text-center text-sm sm:text-base ${
                            prefLang === 'japanese' 
                              ? 'border-[var(--color-jm-navy)] bg-[var(--color-jm-navy)] text-white shadow-md' 
                              : 'border-[var(--color-jm-border)] text-gray-600 hover:border-gray-300'
                          }`}
                        >
                          日本語
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 space-y-10"
              >
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-[var(--color-jm-navy)] mb-2 flex items-center gap-2">
                    <Heart className="w-6 h-6 text-[var(--color-jm-gold)]" />
                    {t('2. 경험 카테고리 & 세부 투어 선택', '2. Select Experience Category & Tour Items')}
                  </h2>
                  <p className="text-sm text-gray-600 mb-6">
                    {t('원하는 경험을 누르면 관련 세부 투어 항목이 아래에 나타납니다.', 'Click an experience category to view and select its detailed tour items below.')}
                  </p>

                  {/* 1. Category Buttons Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
                    {categoryList.map(cat => {
                      const isActive = selectedCategory === cat.id;
                      const selCountInCat = subExperiences.filter(s => s.categoryId === cat.id && selectedSubExps.includes(s.id)).length;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-2 relative ${
                            isActive 
                              ? 'border-[var(--color-jm-gold)] bg-[var(--color-jm-navy)] text-white shadow-md ring-2 ring-[var(--color-jm-gold)]' 
                              : 'border-[var(--color-jm-border)] bg-[var(--color-jm-cream-dark)] text-[var(--color-jm-navy)] hover:bg-gray-200'
                          }`}
                        >
                          {selCountInCat > 0 && (
                            <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[var(--color-jm-gold)] text-white text-xs font-bold flex items-center justify-center shadow">
                              {selCountInCat}
                            </span>
                          )}
                          <span className="text-2xl">{cat.icon}</span>
                          <span className="text-xs font-bold leading-tight">
                            {t(cat.labelKo, cat.labelEn)}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* 2. Detailed Tour Items for Selected Category */}
                  {(() => {
                    const currentCat = categoryList.find(c => c.id === selectedCategory) || categoryList[0];
                    return (
                      <div className="bg-[var(--color-jm-cream-dark)] p-6 rounded-2xl border border-[var(--color-jm-border)] transition-all">
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--color-jm-border)]">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{currentCat.icon}</span>
                            <h3 className="text-base font-bold text-[var(--color-jm-navy)]">
                              {t(
                                `${currentCat.labelKo} 세부 투어 코스`,
                                `${currentCat.labelEn} Detailed Tour Items`
                              )}
                            </h3>
                          </div>
                          <span className="text-xs text-gray-500 font-medium">
                            {t('여러 개 선택 가능', 'Multiple selections allowed')}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {subExperiences
                            .filter(sub => sub.categoryId === currentCat.id)
                            .map(sub => {
                              const isChecked = selectedSubExps.includes(sub.id);
                              return (
                                <div
                                  key={sub.id}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    toggleSubExp(sub.id);
                                  }}
                                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-3 select-none ${
                                    isChecked 
                                      ? 'border-[var(--color-jm-gold)] bg-white shadow-md ring-1 ring-[var(--color-jm-gold)]' 
                                      : 'border-[var(--color-jm-border)] bg-white/80 hover:bg-white hover:border-gray-300'
                                  }`}
                                >
                                  <div className="space-y-1">
                                    <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded bg-[var(--color-jm-navy)] text-white">
                                      📍 {t(sub.locationKo, sub.locationEn)}
                                    </span>
                                    <h4 className="font-bold text-sm text-[var(--color-jm-navy)] leading-snug">
                                      {t(sub.labelKo, sub.labelEn)}
                                    </h4>
                                  </div>
                                  <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-1 transition-all pointer-events-none ${
                                    isChecked 
                                      ? 'bg-[var(--color-jm-gold)] border-[var(--color-jm-gold)] shadow-sm' 
                                      : 'border-gray-300 bg-white'
                                  }`}>
                                    {isChecked && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* 3. VIP Add-On Services Section */}
                <div className="pt-6 border-t border-[var(--color-jm-border)]">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold tracking-tight text-[var(--color-jm-navy)] mb-1 flex items-center gap-2">
                      <span className="text-xl">✨</span>
                      {t('프리미엄 부가 서비스 (VIP Add-On Services)', 'VIP Premium Add-On Services')}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {t('여행의 편의와 품격을 높여줄 VIP 전용 서비스입니다.', 'Enhance your trip convenience with our VIP services.')}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {addOnServicesList.map(addOn => {
                      const isChecked = selectedAddOns.includes(addOn.id);
                      return (
                        <div
                          key={addOn.id}
                          onClick={(e) => {
                            e.preventDefault();
                            toggleAddOn(addOn.id);
                          }}
                          className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-3 select-none ${
                            isChecked 
                              ? 'border-[var(--color-jm-gold)] bg-[var(--color-jm-cream-dark)] shadow-sm ring-1 ring-[var(--color-jm-gold)]' 
                              : 'border-[var(--color-jm-border)] bg-white hover:border-gray-300'
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{addOn.icon}</span>
                              <h4 className="font-bold text-sm text-[var(--color-jm-navy)]">
                                {t(addOn.labelKo, addOn.labelEn)}
                              </h4>
                            </div>
                            <p className="text-[11px] text-gray-600 leading-relaxed pl-7">
                              {t(addOn.descKo, addOn.descEn)}
                            </p>
                          </div>
                          <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-1 transition-all pointer-events-none ${
                            isChecked 
                              ? 'bg-[var(--color-jm-gold)] border-[var(--color-jm-gold)] shadow-sm' 
                              : 'border-gray-300 bg-white'
                          }`}>
                            {isChecked && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Selected Summary Badge Row */}
                <div className="pt-6 border-t border-[var(--color-jm-border)]">
                  <div className="text-xs font-bold text-gray-500 mb-3">
                    {t(
                      `선택 현황: 세부 경험 ${selectedSubExps.length}개 + 부가 서비스 ${selectedAddOns.length}개`,
                      `Current Selection: ${selectedSubExps.length} Experiences + ${selectedAddOns.length} Add-On Services`
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedSubExps.map(id => {
                      const item = subExperiences.find(s => s.id === id);
                      if (!item) return null;
                      return (
                        <span key={id} className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--color-jm-navy)] text-white text-xs font-semibold rounded-full">
                          <span>{t(item.labelKo, item.labelEn)}</span>
                          <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleSubExp(id); }} className="hover:text-[var(--color-jm-gold)] font-bold px-1">×</button>
                        </span>
                      );
                    })}
                    {selectedAddOns.map(id => {
                      const item = addOnServicesList.find(a => a.id === id);
                      if (!item) return null;
                      return (
                        <span key={id} className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--color-jm-gold)] text-white text-xs font-semibold rounded-full">
                          <span>✨ {t(item.labelKo, item.labelEn)}</span>
                          <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleAddOn(id); }} className="hover:text-[var(--color-jm-navy)] font-bold px-1">×</button>
                        </span>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1"
              >
                <h2 className="text-2xl font-serif text-[var(--color-jm-navy)] mb-8 flex items-center gap-2">
                  <MessageSquare className="w-6 h-6 text-[var(--color-jm-gold)]" />
                  {t('추가 요청사항', 'Special Requests')}
                </h2>
                
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    {t('특별히 원하시는 사항이 있다면 자유롭게 적어주세요.', 'Please share any special requests, dietary requirements, or specific places you\'d like to visit.')}
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={6}
                    className="w-full p-4 rounded-xl border border-[var(--color-jm-border)] bg-[var(--color-jm-cream-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-jm-gold)] transition-shadow resize-none"
                    placeholder={t('예: 알러지가 있는 음식이 있습니다, 휠체어 이용이 필요합니다 등', 'e.g., Dietary restrictions, accessibility needs, etc.')}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="mt-12 pt-8 border-t border-[var(--color-jm-border)] flex justify-between items-center">
            <button
              onClick={handlePrev}
              disabled={step === 1}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                step === 1 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {t('이전', 'Back')}
            </button>

            {step < 3 ? (
              <button
                onClick={handleNext}
                className="px-8 py-3 bg-[var(--color-jm-navy)] text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors flex items-center gap-2"
              >
                {t('다음', 'Next Step')}
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={handleSaveOnly}
                  disabled={savingTrip}
                  className="w-full sm:w-auto px-6 py-3 border-2 border-[var(--color-jm-navy)] text-[var(--color-jm-navy)] bg-white rounded-xl font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                >
                  <Save className="w-4 h-4 text-[var(--color-jm-navy)]" />
                  {t('여정만 저장하기', 'Save Journey Only')}
                </button>
                <button
                  type="button"
                  onClick={handleSaveAndChat}
                  disabled={savingTrip}
                  className="w-full sm:w-auto px-6 py-3 bg-[var(--color-jm-gold)] text-white rounded-xl font-bold hover:bg-amber-700 transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
                >
                  <MessageSquare className="w-4 h-4 text-white" />
                  {t('저장 & 호스트 상담 시작하기', 'Save & Start Host Chat')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CustomJourneyBuilder() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center text-gray-500 font-bold">Loading Builder...</div>}>
      <BuilderContent />
    </Suspense>
  );
}
