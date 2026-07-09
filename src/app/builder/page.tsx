"use client";
import { useState, useEffect, Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sparkles, CheckCircle2, ChevronRight, Plane, Building, Stethoscope, Camera, Video, MapPin, ChevronDown, ChevronUp, Plus, X, Car, Save } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DayPicker } from "react-day-picker";
import { format, addDays, differenceInDays } from "date-fns";
import "react-day-picker/dist/style.css";
import { destinations } from "@/data/destinations";
import { useAuth } from "@/lib/AuthContext";
import { useLanguage } from "@/lib/LanguageContext";
import { db } from "@/lib/firebase";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";

const css = `
  .rdp { --rdp-color-accent: #2563eb; }
`;

function BuilderContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  
  const { user } = useAuth();
  const [isSavingTrip, setIsSavingTrip] = useState(false);
  
  type SelectedCourse = { destId: string; subIndex: number };
  const [selectedCourses, setSelectedCourses] = useState<SelectedCourse[]>([]);
  
  // Custom courses added by the user
  const [customCourses, setCustomCourses] = useState<{ id: string; name: string; desc: string }[]>([]);
  const [customInputName, setCustomInputName] = useState("");
  const [customInputDesc, setCustomInputDesc] = useState("");
  
  const [mediaType, setMediaType] = useState<"photo" | "video">("photo");
  
  // Advanced Add-on States
  const [pickup, setPickup] = useState({ selected: false, type: 'oneway' });
  const [rental, setRental] = useState({ selected: false, type: 'car_only', days: 1, distanceUnits: 1 });
  const [stay, setStay] = useState({ selected: false, type: 'airbnb', useTotalTripDates: true, customDays: 1 });
  const [medical, setMedical] = useState({ selected: false, field: "" });
  
  const [dateRange, setDateRange] = useState<{from: Date | undefined, to: Date | undefined}>({ from: undefined, to: undefined });
  
  // Calculate total trip days
  const totalTripDays = useMemo(() => {
    if (!dateRange.from || !dateRange.to) return 1;
    const diff = differenceInDays(dateRange.to, dateRange.from) + 1;
    return diff > 0 ? diff : 1;
  }, [dateRange]);

  useEffect(() => {
    if (stay.useTotalTripDates) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStay(prev => ({ ...prev, customDays: totalTripDays }));
    }
  }, [totalTripDays, stay.useTotalTripDates]);

  // For Accordion UI
  const [expandedCity, setExpandedCity] = useState<string | null>("incheon");

  // Initialize from URL params
  useEffect(() => {
    const dest = searchParams.get("dest");
    const sub = searchParams.get("sub");
    if (dest && sub !== null) {
      const subIdx = parseInt(sub, 10);
      if (!isNaN(subIdx)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelectedCourses([{ destId: dest, subIndex: subIdx }]);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setExpandedCity(dest);
      }
    }

    const tripId = searchParams.get("tripId");
    if (tripId && user) {
      const fetchTrip = async () => {
        try {
          const docRef = doc(db, "journeymate_trips", tripId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.userId !== user.uid) return;
            
            if (data.rawCourses) setSelectedCourses(data.rawCourses);
            if (data.customCourses) setCustomCourses(data.customCourses);
            if (data.addons) {
              if (data.addons.pickup) setPickup(data.addons.pickup);
              if (data.addons.rental) setRental(data.addons.rental);
              if (data.addons.stay) setStay(data.addons.stay);
              if (data.addons.medical) setMedical(data.addons.medical);
            }
            if (data.dateRange) {
              setDateRange({
                from: data.dateRange.from ? new Date(data.dateRange.from) : undefined,
                to: data.dateRange.to ? new Date(data.dateRange.to) : undefined
              });
            }
          }
        } catch (error) {
          console.error("Error fetching trip:", error);
        }
      };
      fetchTrip();
    }
  }, [searchParams, user]);

  const disabledDays = [
    addDays(new Date(), 2),
    addDays(new Date(), 3),
    addDays(new Date(), 6),
  ];

  const handleAIGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setSelectedCourses([{ destId: "incheon", subIndex: 3 }]); 
      setExpandedCity("incheon");
      setMediaType("video");
      setPickup({ selected: true, type: 'oneway' });
      setMedical({ selected: true, field: "치과 (스케일링)" });
      setStep(3);
    }, 1500);
  };

  const toggleCourse = (destId: string, subIndex: number) => {
    setSelectedCourses(prev => {
      const exists = prev.find(p => p.destId === destId && p.subIndex === subIndex);
      if (exists) {
        return prev.filter(p => !(p.destId === destId && p.subIndex === subIndex));
      } else {
        return [...prev, { destId, subIndex }];
      }
    });
  };

  const handleAddCustomCourse = () => {
    if (!customInputName.trim()) return;
    const newCourse = {
      id: Date.now().toString(),
      name: customInputName.trim(),
      desc: customInputDesc.trim() || "직접 입력한 희망 장소",
    };
    setCustomCourses([...customCourses, newCourse]);
    setCustomInputName("");
    setCustomInputDesc("");
  };

  const removeCustomCourse = (id: string) => {
    setCustomCourses(prev => prev.filter(c => c.id !== id));
  };

  const basePrice = selectedCourses.reduce((acc, course) => {
    const dest = destinations.find(d => d.id === course.destId);
    if (!dest) return acc;
    return acc + dest.subDestinations[course.subIndex].priceValue;
  }, 0);
  
  const mediaPriceMultiplier = mediaType === "video" ? 1.5 : 1;
  const calculatedBasePrice = basePrice * mediaPriceMultiplier;

  // Addon pricing logic
  const pickupPrice = pickup.selected ? (pickup.type === 'roundtrip' ? 300 : 150) : 0;
  const rentalPrice = rental.selected ? (rental.type === 'car_only' ? 150 * rental.days : 250 * rental.distanceUnits) : 0;
  const stayTierPrices: Record<string, number> = { airbnb: 100, standard: 200, premium: 400 };
  const stayPrice = stay.selected ? (stayTierPrices[stay.type as string] || 100) * stay.customDays : 0;
  const totalAddonPrice = pickupPrice + rentalPrice + stayPrice;
  const totalPrice = calculatedBasePrice + totalAddonPrice;

  const handleSaveTrip = async () => {
    if (!user) return alert("로그인이 필요합니다.");
    setIsSavingTrip(true);
    try {
      const tripData = {
        userId: user.uid,
        selectedCourses: selectedCourses.map(c => destinations.find(d => d.id === c.destId)?.subDestinations[c.subIndex]?.name || ""),
        rawCourses: selectedCourses,
        customCourses,
        addons: { pickup, rental, stay, medical },
        totalPrice,
        dateRange: {
          from: dateRange.from ? dateRange.from.toISOString() : null,
          to: dateRange.to ? dateRange.to.toISOString() : null
        },
        updatedAt: new Date().toISOString()
      };

      const existingTripId = searchParams.get("tripId");
      if (existingTripId) {
        await updateDoc(doc(db, "journeymate_trips", existingTripId), tripData);
        alert("여정이 성공적으로 업데이트되었습니다. 마이페이지에서 확인 가능합니다.");
      } else {
        await addDoc(collection(db, "journeymate_trips"), {
          ...tripData,
          createdAt: new Date().toISOString()
        });
        alert("새로운 여정이 임시 저장되었습니다. 마이페이지에서 확인 가능합니다.");
      }
    } catch (err) {
      console.error(err);
      alert("저장에 실패했습니다.");
    }
    setIsSavingTrip(false);
  };


  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-3">{t("스마트 여행 빌더", "Smart Trip Builder")}</h1>
        <p className="text-gray-500 mb-2">{t("원하는 여행 스타일을 입력하거나 여러 장소를 직접 담아보세요.", "Enter your desired travel style or add multiple places yourself.")}</p>
        <p className="text-sm font-medium text-blue-600 bg-blue-50 py-2 px-4 rounded-full inline-block">
          {t("안내: 모든 상품은 '사진 스냅 촬영'이 포함된 가격이며, 동반자로서 동행할 뿐 전문 가이드 역할을 제공하지 않습니다.", "Notice: All products include the 'photo snap' price, and we accompany you as a companion, not a professional guide.")}
        </p>
      </div>

      {/* AI Prompt */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 p-6 md:p-8 rounded-3xl bg-white shadow-xl shadow-blue-900/5 border border-blue-100"
      >
        <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-blue-900">
          <Sparkles className="text-blue-600 w-6 h-6" /> 
          {t("AI 플래너에게 여행 맡기기", "Let AI Planner Build Your Trip")}
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <input 
            type="text" 
            placeholder={t("예: 내일 인천 섬에서 브이로그 찍고 피부과도 갈래.", "ex: I want to shoot a vlog on an Incheon island tomorrow and go to a dermatologist.")}
            className="flex-1 rounded-2xl bg-gray-50 border-transparent px-6 py-4 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-lg placeholder:text-gray-400"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
          />
          <Button size="lg" className="h-[60px] px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 text-lg" onClick={handleAIGenerate} disabled={!aiPrompt || isGenerating}>
            {isGenerating ? t("일정 구성 중...", "Generating...") : t("매직 빌드 시작", "Start Magic Build")}
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          
          {/* Step 1: Base Trip & Media Type */}
          <section className={`p-8 rounded-3xl transition-all duration-500 ${step >= 1 ? 'bg-white shadow-lg border border-gray-100' : 'bg-white/60 border border-dashed border-gray-200 opacity-70'}`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center gap-3 text-gray-900">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step > 1 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                  {step > 1 ? <CheckCircle2 className="w-5 h-5" /> : "1"}
                </div>
                {t("촬영 형태 및 장소 선택", "Select Shoot Type & Location")}
              </h3>
              {step > 1 && (
                <button onClick={() => setStep(1)} className="text-sm text-gray-500 hover:text-blue-600 underline underline-offset-4">{t("수정", "Edit")}</button>
              )}
            </div>

            <AnimatePresence>
              {step === 1 && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden space-y-6">
                  
                  {/* Media Type Selection */}
                  <div>
                    <h4 className="font-bold text-gray-700 mb-3">{t("촬영 형태 (전체 여정에 일괄 적용)", "Shoot Type (Applied to entire trip)")}</h4>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => setMediaType("photo")}
                        className={`flex-1 p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${mediaType === 'photo' ? 'border-blue-600 bg-blue-50/50 text-blue-800' : 'border-gray-200 text-gray-600 hover:border-blue-300 hover:text-gray-900'}`}
                      >
                        <Camera className="w-6 h-6" />
                        <span className="font-bold text-gray-900">{t("사진 스냅 (Photo)", "Photo Snap")}</span>
                      </button>
                      <button 
                        onClick={() => setMediaType("video")}
                        className={`flex-1 p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${mediaType === 'video' ? 'border-blue-600 bg-blue-50/50 text-blue-800' : 'border-gray-200 text-gray-600 hover:border-blue-300 hover:text-gray-900'}`}
                      >
                        <Video className="w-6 h-6" />
                        <span className="font-bold text-gray-900">{t("시네마틱 영상 (Video)", "Cinematic Video")}</span>
                      </button>
                    </div>
                  </div>

                  {/* Course Selection (Multi-select with Accordion) */}
                  <div>
                    <h4 className="font-bold text-gray-700 mb-3">{t("지역을 선택하고 장소를 담아보세요", "Select a region and add places")}</h4>
                    <div className="space-y-3">
                      {destinations.map(dest => {
                        const isExpanded = expandedCity === dest.id;
                        const selectedCount = selectedCourses.filter(c => c.destId === dest.id).length;
                        
                        return (
                          <div key={dest.id} className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isExpanded ? 'border-blue-300 shadow-md bg-blue-50/30' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
                            {/* Accordion Header */}
                            <button 
                              onClick={() => setExpandedCity(isExpanded ? null : dest.id)}
                              className="w-full px-5 py-4 flex items-center justify-between focus:outline-none"
                            >
                              <div className="flex items-center gap-3">
                                <MapPin className={`w-5 h-5 ${isExpanded ? 'text-blue-600' : 'text-gray-400'}`} /> 
                                <span className="font-bold text-lg text-gray-900">{t(dest.title, dest.titleEn || dest.title)}</span>
                                {selectedCount > 0 && (
                                  <span className="ml-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                                    {selectedCount}{t("개 담김", " added")}
                                  </span>
                                )}
                              </div>
                              {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
                            </button>
                            
                            {/* Accordion Content */}
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div 
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-5 pb-5 grid sm:grid-cols-2 gap-3 pt-2">
                                    {dest.subDestinations.map((sub, idx) => {
                                      const isSelected = selectedCourses.some(c => c.destId === dest.id && c.subIndex === idx);
                                      return (
                                        <div 
                                          key={idx}
                                          onClick={() => toggleCourse(dest.id, idx)}
                                          className={`p-4 rounded-xl cursor-pointer border-2 transition-all duration-200 flex flex-col justify-between ${isSelected ? 'border-blue-600 bg-white shadow-sm' : 'border-gray-100 bg-white hover:border-blue-200'}`}
                                        >
                                          <div>
                                            <div className="font-bold text-gray-900 mb-1">{t(sub.name, sub.nameEn || sub.name)}</div>
                                            <div className="text-xs text-gray-500 line-clamp-2">{t(sub.desc, sub.descEn || sub.desc)}</div>
                                          </div>
                                          <div className="mt-3 flex justify-between items-center">
                                            <div className="font-semibold text-blue-600 text-sm">${sub.priceValue * (mediaType==='video'?1.5:1)}</div>
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                                              {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}

                      {/* Custom Destination Accordion */}
                      <div className={`border rounded-2xl overflow-hidden transition-all duration-300 ${expandedCity === 'custom' ? 'border-indigo-300 shadow-md bg-indigo-50/30' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
                        <button 
                          onClick={() => setExpandedCity(expandedCity === 'custom' ? null : 'custom')}
                          className="w-full px-5 py-4 flex items-center justify-between focus:outline-none"
                        >
                          <div className="flex items-center gap-3">
                            <Sparkles className={`w-5 h-5 ${expandedCity === 'custom' ? 'text-indigo-600' : 'text-gray-400'}`} /> 
                            <span className="font-bold text-lg text-gray-900">{t("희망하는 곳 (직접 입력)", "Desired Location (Custom)")}</span>
                            {customCourses.length > 0 && (
                              <span className="ml-2 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                                {customCourses.length}{t("개 담김", " added")}
                              </span>
                            )}
                          </div>
                          {expandedCity === 'custom' ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
                        </button>

                        <AnimatePresence>
                          {expandedCity === 'custom' && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="px-5 pb-5 pt-2">
                                <div className="p-4 bg-white border border-gray-200 rounded-xl mb-4 shadow-sm">
                                  <div className="mb-3">
                                    <label className="block text-xs font-bold text-gray-500 mb-1">{t("장소명", "Location Name")}</label>
                                    <input 
                                      type="text" 
                                      placeholder={t("예: 홍대 길거리, 제주도 해변 등", "ex: Hongdae Street, Jeju Beach")} 
                                      value={customInputName}
                                      onChange={(e) => setCustomInputName(e.target.value)}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label className="block text-xs font-bold text-gray-500 mb-1">{t("어떤 촬영을 원하시나요? (선택)", "What kind of shoot do you want? (Optional)")}</label>
                                    <input 
                                      type="text" 
                                      placeholder={t("예: 아이돌 커버 댄스 촬영하고 싶어요", "ex: I want to shoot an idol cover dance")} 
                                      value={customInputDesc}
                                      onChange={(e) => setCustomInputDesc(e.target.value)}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
                                    />
                                  </div>
                                  <Button 
                                    className="w-full bg-indigo-600 hover:bg-indigo-700" 
                                    onClick={handleAddCustomCourse}
                                    disabled={!customInputName.trim()}
                                  >
                                    <Plus className="w-4 h-4 mr-2" /> {t("이 장소 장바구니에 담기", "Add this place to cart")}
                                  </Button>
                                </div>

                                {customCourses.length > 0 && (
                                  <div className="space-y-2">
                                    {customCourses.map(course => (
                                      <div key={course.id} className="flex justify-between items-center p-3 bg-indigo-50 border border-indigo-100 rounded-lg">
                                        <div>
                                          <div className="font-bold text-indigo-900">{course.name}</div>
                                          <div className="text-xs text-indigo-700">{course.desc}</div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                          <span className="text-xs font-bold text-gray-500 bg-white px-2 py-1 rounded border border-gray-200">{t("별도 결제", "Paid Separately")}</span>
                                          <button onClick={() => removeCustomCourse(course.id)} className="p-1 hover:bg-indigo-200 rounded-md text-indigo-700 transition-colors">
                                            <X className="w-4 h-4" />
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Button size="lg" className="rounded-full px-8" onClick={() => {
                      setStep(2);
                    }} disabled={selectedCourses.length === 0 && customCourses.length === 0}>{t("다음 단계", "Next Step")} <ChevronRight className="w-4 h-4 ml-1" /></Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Step 2: Date */}
          <section className={`p-8 rounded-3xl transition-all duration-500 ${step >= 2 ? 'bg-white shadow-lg border border-gray-100' : 'bg-white/40 border border-gray-200 opacity-60 pointer-events-none'}`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center gap-3 text-gray-900">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step > 2 ? 'bg-green-100 text-green-700' : step === 2 ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-500'}`}>
                  {step > 2 ? <CheckCircle2 className="w-5 h-5" /> : "2"}
                </div>
                {t("전체 일정 선택", "Select Total Schedule")}
              </h3>
               {step > 2 && (
                <button onClick={() => setStep(2)} className="text-sm text-gray-500 hover:text-blue-600 underline underline-offset-4">{t("수정", "Edit")}</button>
              )}
            </div>
            
            <AnimatePresence>
              {step === 2 && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden space-y-6 flex flex-col items-center sm:items-start">
                  
                  <div className="w-full">
                    <div className="mb-4 text-sm text-blue-600 font-bold bg-blue-50 p-3 rounded-lg inline-block">
                      💡 {t("여행이 진행될 전체 기간을 선택해주세요. 하루라면 같은 날짜를 두 번 클릭하세요.", "Please select the entire trip period. If it's one day, click the same date twice.")}
                    </div>
                    <DayPicker 
                      mode="range"
                      selected={dateRange}
                      onSelect={(range) => setDateRange({ from: range?.from, to: range?.to })}
                      disabled={[{ before: new Date() }, ...disabledDays]}
                      modifiers={{ disabled: disabledDays }}
                      modifiersStyles={{ disabled: { textDecoration: 'line-through', color: '#ccc' } }}
                      className="border rounded-2xl p-4 bg-gray-50 shadow-sm mx-auto sm:mx-0"
                    />
                  </div>

                  <div className="flex w-full justify-end">
                    <Button size="lg" className="rounded-full px-8" onClick={() => setStep(3)} disabled={!dateRange.from}>
                      {t("다음 단계", "Next Step")} <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Step 3: Add-ons */}
          <section className={`p-8 rounded-3xl transition-all duration-500 ${step >= 3 ? 'bg-white shadow-lg border border-gray-100' : 'bg-white/40 border border-gray-200 opacity-60 pointer-events-none'}`}>
            <h3 className="text-xl font-bold flex items-center gap-3 mb-6 text-gray-900">
               <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === 3 ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-500'}`}>
                  3
                </div>
              {t("부가 서비스 추가 (선택)", "Add Extra Services (Optional)")}
            </h3>
            
            <AnimatePresence>
              {step === 3 && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden space-y-4">
                  
                  {/* VIP Pickup */}
                  <div className={`rounded-2xl border-2 transition-all overflow-hidden ${pickup.selected ? 'border-blue-600' : 'border-gray-100'}`}>
                    <label className={`flex items-center justify-between p-5 cursor-pointer ${pickup.selected ? 'bg-blue-50/20' : 'hover:bg-gray-50'}`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${pickup.selected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                          <Plane className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="font-bold text-lg">{t("공항 VIP 픽업 (콜밴)", "Airport VIP Pickup (Call Van)")}</div>
                          <div className="text-sm text-gray-500">{t("외국어 가능 기사님, 호텔까지 다이렉트 이동", "Foreign language speaking driver, direct transfer to hotel")}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <input type="checkbox" checked={pickup.selected} onChange={() => setPickup(p => ({ ...p, selected: !p.selected }))} className="w-6 h-6 rounded-md border-gray-300 text-blue-600 focus:ring-blue-600" />
                      </div>
                    </label>
                    <AnimatePresence>
                      {pickup.selected && (
                        <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                          <div className="p-5 bg-white border-t border-blue-100 space-y-4">
                            <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">{t("이용 방식", "Usage Type")}</label>
                              <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input type="radio" checked={pickup.type === 'oneway'} onChange={() => setPickup(p => ({ ...p, type: 'oneway' }))} className="text-blue-600 focus:ring-blue-600" />
                                  <span className="text-sm">{t("편도 ($150)", "One-way ($150)")}</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input type="radio" checked={pickup.type === 'roundtrip'} onChange={() => setPickup(p => ({ ...p, type: 'roundtrip' }))} className="text-blue-600 focus:ring-blue-600" />
                                  <span className="text-sm">{t("왕복 ($300)", "Round-trip ($300)")}</span>
                                </label>
                              </div>
                            </div>
                            <div className="text-xs text-blue-800 bg-blue-50/50 p-4 rounded-lg">
                              💡 {t("안내: 1~4인 기준 금액입니다. 인원 추가 시 차량 변경으로 인해 추가 비용이 발생할 수 있습니다.", "Notice: Price is for 1~4 people. Additional costs may apply for vehicle change due to extra passengers.")}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Rental Car */}
                  <div className={`rounded-2xl border-2 transition-all overflow-hidden ${rental.selected ? 'border-blue-600' : 'border-gray-100'}`}>
                    <label className={`flex items-center justify-between p-5 cursor-pointer ${rental.selected ? 'bg-blue-50/20' : 'hover:bg-gray-50'}`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${rental.selected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                          <Car className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="font-bold text-lg">{t("프리미엄 렌트카 연계", "Premium Rental Car")}</div>
                          <div className="text-sm text-gray-500">{t("차량 단기 렌트 및 전담 기사 서비스", "Short-term car rental and dedicated driver service")}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <input type="checkbox" checked={rental.selected} onChange={() => setRental(r => ({ ...r, selected: !r.selected }))} className="w-6 h-6 rounded-md border-gray-300 text-blue-600 focus:ring-blue-600" />
                      </div>
                    </label>
                    <AnimatePresence>
                      {rental.selected && (
                        <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                          <div className="p-5 bg-white border-t border-blue-100 space-y-4">
                            <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">{t("이용 방식", "Usage Type")}</label>
                              <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input type="radio" checked={rental.type === 'car_only'} onChange={() => setRental(r => ({ ...r, type: 'car_only' }))} className="text-blue-600 focus:ring-blue-600" />
                                  <span className="text-sm">{t("차량만 렌트 ($150/일)", "Car Only ($150/day)")}</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input type="radio" checked={rental.type === 'with_driver'} onChange={() => setRental(r => ({ ...r, type: 'with_driver' }))} className="text-blue-600 focus:ring-blue-600" />
                                  <span className="text-sm">{t("기사 포함 ($250 / 100km)", "With Driver ($250 / 100km)")}</span>
                                </label>
                              </div>
                            </div>
                            {rental.type === 'car_only' ? (
                              <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">{t("이용 일수 (일)", "Days of Use")}</label>
                                <input type="number" min="1" max="30" value={rental.days} onChange={e => setRental(r => ({ ...r, days: parseInt(e.target.value) || 1 }))} className="w-24 px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-600" />
                              </div>
                            ) : (
                              <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">{t("이용 거리 (100km 단위)", "Distance (per 100km)")}</label>
                                <input type="number" min="1" max="100" value={rental.distanceUnits} onChange={e => setRental(r => ({ ...r, distanceUnits: parseInt(e.target.value) || 1 }))} className="w-24 px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-600" />
                                <div className="text-xs text-gray-500 mt-2">
                                  * {t("1단위 = 100km (기본). 일일 투어 이동거리를 기준으로 선택해 주세요.", "1 unit = 100km (Basic). Please select based on daily tour travel distance.")}
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Accommodation (Stay) */}
                  <div className={`rounded-2xl border-2 transition-all overflow-hidden ${stay.selected ? 'border-blue-600' : 'border-gray-100'}`}>
                    <label className={`flex items-center justify-between p-5 cursor-pointer ${stay.selected ? 'bg-blue-50/20' : 'hover:bg-gray-50'}`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stay.selected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                          <Building className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="font-bold text-lg">{t("로컬 감성 숙소 연계", "Local Vibe Accommodation")}</div>
                          <div className="text-sm text-gray-500">{t("감성 있는 숙소 추천 및 대리 예약", "Vibe accommodation recommendation and booking proxy")}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <input type="checkbox" checked={stay.selected} onChange={() => setStay(s => ({ ...s, selected: !s.selected }))} className="w-6 h-6 rounded-md border-gray-300 text-blue-600 focus:ring-blue-600" />
                      </div>
                    </label>
                    <AnimatePresence>
                      {stay.selected && (
                        <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                          <div className="p-5 bg-white border-t border-blue-100 space-y-4">
                            <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">{t("숙소 등급 선택", "Select Accommodation Tier")}</label>
                              <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input type="radio" checked={stay.type === 'airbnb'} onChange={() => setStay(s => ({ ...s, type: 'airbnb' }))} className="text-blue-600 focus:ring-blue-600" />
                                  <span className="text-sm">{t("에어비앤비급 ($100/박)", "Airbnb Level ($100/night)")}</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input type="radio" checked={stay.type === 'standard'} onChange={() => setStay(s => ({ ...s, type: 'standard' }))} className="text-blue-600 focus:ring-blue-600" />
                                  <span className="text-sm">{t("일반호텔 ($200/박)", "Standard Hotel ($200/night)")}</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input type="radio" checked={stay.type === 'premium'} onChange={() => setStay(s => ({ ...s, type: 'premium' }))} className="text-blue-600 focus:ring-blue-600" />
                                  <span className="text-sm">{t("고급호텔 ($400/박)", "Premium Hotel ($400/night)")}</span>
                                </label>
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">{t("숙박 기준일", "Stay Duration Base")}</label>
                              <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input type="radio" checked={stay.useTotalTripDates} onChange={() => setStay(s => ({ ...s, useTotalTripDates: true }))} className="text-blue-600 focus:ring-blue-600" />
                                  <span className="text-sm">{t(`전체 여행 일정 기준 (${totalTripDays}박)`, `Total Trip Schedule (${totalTripDays} nights)`)}</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input type="radio" checked={!stay.useTotalTripDates} onChange={() => setStay(s => ({ ...s, useTotalTripDates: false }))} className="text-blue-600 focus:ring-blue-600" />
                                  <span className="text-sm">{t("별도 일정 입력", "Enter separate schedule")}</span>
                                </label>
                              </div>
                            </div>
                            {!stay.useTotalTripDates && (
                              <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">{t("숙박 일수 (박)", "Nights of Stay")}</label>
                                <input type="number" min="1" max="30" value={stay.customDays} onChange={e => setStay(s => ({ ...s, customDays: parseInt(e.target.value) || 1 }))} className="w-24 px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-600" />
                              </div>
                            )}
                            <div className="text-xs text-blue-800 bg-blue-50/50 p-4 rounded-lg mt-2">
                              💡 {t("안내: 숙소 요금은 2인 1실 기준입니다. 기본 단가를 적용하여 가산정되며, 실제 숙소 및 인원 추가에 따라 결제 금액이 달라질 수 있습니다.", "Notice: Room rates are based on double occupancy. It is estimated by applying the base unit price, and the final payment amount may vary depending on the actual accommodation and additional persons.")}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Premium Medical */}
                  <div className={`rounded-2xl border-2 transition-all overflow-hidden ${medical.selected ? 'border-blue-600' : 'border-gray-100'}`}>
                    <label className={`flex items-center justify-between p-5 cursor-pointer ${medical.selected ? 'bg-blue-50/20' : 'hover:bg-gray-50'}`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${medical.selected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                          <Stethoscope className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="font-bold text-lg">{t("프리미엄 의료/뷰티 연계", "Premium Medical/Beauty")}</div>
                          <div className="text-sm text-gray-500">{t("검진, 미용, 시술 등 맞춤 병원/클리닉 추천", "Customized hospital/clinic recommendations for checkups, beauty, procedures")}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="font-bold text-blue-600">{t("별도 결제", "Paid Separately")}</div>
                        <input type="checkbox" checked={medical.selected} onChange={() => setMedical(m => ({ ...m, selected: !m.selected }))} className="w-6 h-6 rounded-md border-gray-300 text-blue-600 focus:ring-blue-600" />
                      </div>
                    </label>
                    <AnimatePresence>
                      {medical.selected && (
                        <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                          <div className="p-5 bg-white border-t border-blue-100">
                            <label className="block text-sm font-bold text-gray-700 mb-2">{t("희망하는 의료/뷰티 분야를 적어주세요", "Please write down your desired medical/beauty field")}</label>
                            <input 
                              type="text" 
                              placeholder={t("예: 치과 스케일링, 피부과 리프팅 등", "ex: Dental scaling, Dermatology lifting")}
                              value={medical.field}
                              onChange={e => setMedical(m => ({ ...m, field: e.target.value }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-gray-900 text-white rounded-3xl p-8 shadow-2xl">
            <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
              {t("내 여행 영수증", "My Trip Receipt")}
            </h3>
            
            <div className="space-y-6 mb-8">
              <div>
                <div className="text-gray-400 text-sm mb-2">{t("선택한 장소", "Selected Places")} ({mediaType === 'video' ? t('영상', 'Video') : t('스냅', 'Snap')})</div>
                {selectedCourses.length === 0 && customCourses.length === 0 ? (
                  <div className="text-gray-500 italic text-sm">{t("담긴 장소가 없습니다.", "No places added.")}</div>
                ) : (
                  <div className="space-y-3">
                    {selectedCourses.map((c, i) => {
                      const d = destinations.find(x => x.id === c.destId);
                      const s = d?.subDestinations[c.subIndex];
                      if (!d || !s) return null;
                      return (
                        <div key={`c-${i}`} className="flex justify-between items-start text-sm">
                          <span className="flex-1 pr-2">{d.title.split(' ')[0]} - {s.name}</span>
                          <span className="font-medium text-blue-300">${s.priceValue * mediaPriceMultiplier}</span>
                        </div>
                      )
                    })}
                    {customCourses.map(c => (
                      <div key={c.id} className="flex justify-between items-start text-sm text-indigo-300">
                        <span className="flex-1 pr-2">{t("직접 입력", "Custom")} - {c.name}</span>
                        <span className="font-medium">{t("별도 결제", "Paid Separately")}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Date Display */}
              {(dateRange.from) && (
                <div>
                  <div className="text-gray-400 text-sm mb-1">{t("전체 여행 기간", "Total Trip Period")}</div>
                  <div className="font-medium text-emerald-400">
                    {dateRange.to && dateRange.from.getTime() !== dateRange.to.getTime() 
                      ? `${format(dateRange.from, 'MM/dd')} ~ ${format(dateRange.to, 'MM/dd')} (${totalTripDays}${t("일", " days")})`
                      : `${format(dateRange.from, 'yyyy. MM. dd')} (1${t("일", " day")})`}
                  </div>
                </div>
              )}

              <div className="h-px bg-gray-800 w-full" />
              
              <div>
                <div className="text-gray-400 text-sm mb-2">{t("부가 서비스 (옵션)", "Extra Services (Options)")}</div>
                {!(pickup.selected || rental.selected || stay.selected || medical.selected) ? (
                  <div className="text-gray-500 text-sm italic">{t("선택된 항목 없음", "No selected items")}</div>
                ) : (
                  <div className="space-y-2">
                    {pickup.selected && (
                      <div className="flex justify-between items-center text-sm">
                        <span>{t("공항 픽업", "Airport Pickup")} ({pickup.type === 'oneway' ? t('편도', 'One-way') : t('왕복', 'Round-trip')})</span>
                        <span className="text-blue-300">+${pickupPrice}</span>
                      </div>
                    )}
                    {rental.selected && (
                      <div className="flex justify-between items-center text-sm">
                        <span>{t("렌트카", "Rental Car")} ({rental.type === 'car_only' ? `${t("차량만", "Car Only")} ${rental.days}${t("일", " days")}` : `${t("기사포함", "With Driver")} ${rental.distanceUnits}00km`})</span>
                        <span className="text-blue-300">+${rentalPrice}</span>
                      </div>
                    )}
                    {stay.selected && (
                      <div className="flex justify-between items-center text-sm">
                        <span>{t("숙소", "Accommodation")} ({stay.type === 'airbnb' ? t('에어비앤비급', 'Airbnb Level') : stay.type === 'standard' ? t('일반호텔', 'Standard Hotel') : t('고급호텔', 'Premium Hotel')}, {stay.customDays}{t("박", " nights")})</span>
                        <span className="text-blue-300">+${stayPrice}</span>
                      </div>
                    )}
                    {medical.selected && (
                      <div className="flex justify-between items-center text-sm text-indigo-300">
                        <span>{t("의료/뷰티 연계", "Medical/Beauty")} ({medical.field || t('미입력', 'Not entered')})</span>
                        <span>{t("별도 결제", "Paid Separately")}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="h-px bg-gray-800 w-full" />

              <div className="flex justify-between items-end">
                <span className="text-gray-400">{t("총 결제 예정 금액", "Estimated Total Amount")}</span>
                <span className="font-bold text-3xl text-emerald-400">${totalPrice}</span>
              </div>
              
              <div className="bg-gray-800/50 p-4 rounded-xl text-xs text-gray-400 leading-relaxed">
                {t("보증금(Deposit) 20%는 글로벌 결제로 우선 진행되며, 잔금 및 별도 결제 항목은 현장에서 결제하실 수 있습니다.", "A 20% deposit is processed first globally, and the balance and separately paid items can be paid on-site.")}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button className="w-full h-14 text-lg rounded-xl bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30" disabled={(selectedCourses.length === 0 && customCourses.length === 0) || !dateRange.from}>
                {t("결제창으로 이동", "Proceed to Checkout")}
              </Button>
              {user && (
                <Button 
                  variant="outline" 
                  className="w-full h-12 text-base rounded-xl border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2" 
                  onClick={handleSaveTrip}
                  disabled={isSavingTrip || ((selectedCourses.length === 0 && customCourses.length === 0) || !dateRange.from)}
                >
                  <Save className="w-4 h-4" />
                  {isSavingTrip ? t("내 여정 저장 중...", "Saving trip...") : t("내 여정 임시 저장", "Save Trip Temporarily")}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BuilderPage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <style>{css}</style>
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
        <BuilderContent />
      </Suspense>
    </div>
  );
}
