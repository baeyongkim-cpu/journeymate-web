"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { db, auth } from "@/lib/firebase";
import { doc, getDoc, setDoc, deleteDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";
import { LogOut, User as UserIcon, Save, Briefcase, Trash2, ChevronRight, MessageSquare, Edit } from "lucide-react";
import { signOut } from "firebase/auth";
import Link from "next/link";

export default function MyPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { t, lang } = useLanguage();

  const [activeTab, setActiveTab] = useState<'trips' | 'profile'>('trips');
  const [profile, setProfile] = useState({
    passportName: "",
    phone: "",
    country: "",
    language: "",
    address: ""
  });
  const [saving, setSaving] = useState(false);
  const [trips, setTrips] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        const docRef = doc(db, "journeymate_users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(p => ({ ...p, ...docSnap.data() }));
        }
      };
      const fetchTrips = async () => {
        const q = query(collection(db, "journeymate_trips"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const fetchedTrips: any[] = [];
        querySnapshot.forEach((doc) => {
          fetchedTrips.push({ id: doc.id, ...doc.data() });
        });
        setTrips(fetchedTrips);
      };

      fetchProfile();
      fetchTrips();
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    try {
      await setDoc(doc(db, "journeymate_users", user.uid), profile, { merge: true });
      alert(t("저장되었습니다.", "Saved successfully."));
    } catch (err) {
      console.error("Error saving profile", err);
      alert(t("저장에 실패했습니다.", "Failed to save."));
    }
    setSaving(false);
  };

  const handleDeleteTrip = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm(t("정말로 이 여정을 삭제하시겠습니까?", "Are you sure you want to delete this trip?"))) {
      try {
        await deleteDoc(doc(db, "journeymate_trips", id));
        setTrips(trips.filter(t => t.id !== id));
      } catch (err) {
        console.error(err);
        alert(t("삭제에 실패했습니다.", "Failed to delete."));
      }
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  if (loading || !user) return <div className="p-8 text-center">{t("로딩 중...", "Loading...")}</div>;

  return (
    <div className="min-h-screen bg-gray-50/50 pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl border shadow-sm">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{t("마이페이지", "My Page")}</h1>
            <p className="text-sm text-gray-500 mt-1">{user.email}</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-red-600 px-4 py-2 rounded-xl border hover:bg-red-50 transition-colors">
            <LogOut className="w-4 h-4" />
            <span>{t("로그아웃", "Logout")}</span>
          </button>
        </div>

        {/* Tabbed Layout: Left Sidebar + Right Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
          {/* Left Bookmark Sidebar Navigation */}
          <div className="md:col-span-1 bg-white rounded-2xl border shadow-sm p-3 space-y-1">
            <button
              onClick={() => setActiveTab('trips')}
              className={`w-full flex items-center justify-between p-3.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'trips'
                  ? 'bg-[var(--color-jm-navy)] text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Briefcase className="w-4 h-4" />
                <span>{t("내 여정 리스트", "My Trips")}</span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-extrabold ${activeTab === 'trips' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-700'}`}>
                {trips.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center justify-between p-3.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'profile'
                  ? 'bg-[var(--color-jm-navy)] text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <UserIcon className="w-4 h-4" />
                <span>{t("개인 프로필", "Profile")}</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>
          </div>

          {/* Right Main Content Area */}
          <div className="md:col-span-3">
            {activeTab === 'trips' && (
              <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8">
                <div className="flex items-center justify-between mb-6 pb-4 border-b">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-full">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{t("내 여정 리스트", "My Trip List")}</h2>
                      <p className="text-sm text-gray-500">{t("저장되거나 상담 신청한 내 전용 여행 코스입니다.", "Your saved custom travel itineraries.")}</p>
                    </div>
                  </div>
                  <Link href="/builder" className="px-4 py-2 bg-[var(--color-jm-gold)] text-white text-xs font-bold rounded-xl hover:bg-amber-700 transition-colors shadow-sm">
                    + {t("새 여정 만들기", "Create Trip")}
                  </Link>
                </div>

                <div className="space-y-4">
                  {trips.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <p className="mb-4 text-base font-medium">{t("저장된 여정이 없습니다.", "No saved trips yet.")}</p>
                      <Link href="/builder" className="inline-block px-6 py-2.5 bg-[var(--color-jm-navy)] text-white rounded-xl font-bold text-sm hover:bg-opacity-90 transition-colors">
                        {t("나만의 여행 만들러 가기", "Create My Custom Trip")}
                      </Link>
                    </div>
                  ) : (
                    trips.map(trip => (
                      <div key={trip.id} className="p-5 border rounded-2xl relative bg-white hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <span className={`inline-block px-2.5 py-0.5 text-xs font-bold rounded-full mb-2 ${
                              trip.status === "저장됨" ? "bg-blue-100 text-blue-800" : "bg-emerald-100 text-emerald-800"
                            }`}>
                              {trip.status === "저장됨" ? "💾 저장됨" : "🟢 상담 신청 완료"}
                            </span>
                            <h3 className="font-bold text-lg text-gray-900">
                              {trip.dates ? `📅 ${trip.dates}` : t("나의 인천 프라이빗 여정", "My Incheon Private Journey")}
                            </h3>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">
                              {new Date(trip.createdAt).toLocaleDateString()}
                            </span>
                            <button 
                              onClick={(e) => handleDeleteTrip(e, trip.id)} 
                              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all" 
                              title="Delete Trip"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm text-gray-600 mb-4">
                          <p>👥 <span className="font-bold text-gray-800">{t("인원 수", "Guests")}:</span> {trip.guests || 2}{lang === 'en' ? ' persons' : '명'} ({trip.language || 'English'})</p>
                          
                          {(trip.selectedSubExpsLabels?.length > 0 || trip.selectedSubExpsLabelsEn?.length > 0) && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              <span className="text-xs font-bold text-gray-500 mr-1">📍 {t("선택 체험", "Experiences")}:</span>
                              {(lang === 'en' && trip.selectedSubExpsLabelsEn?.length > 0
                                ? trip.selectedSubExpsLabelsEn
                                : trip.selectedSubExpsLabels || []
                              ).map((lbl: string, idx: number) => (
                                <span key={idx} className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 font-medium rounded-md">
                                  {lbl}
                                </span>
                              ))}
                            </div>
                          )}

                          {(trip.selectedAddOnsLabels?.length > 0 || trip.selectedAddOnsLabelsEn?.length > 0) && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              <span className="text-xs font-bold text-gray-500 mr-1">✨ {t("VIP 서비스", "VIP Add-Ons")}:</span>
                              {(lang === 'en' && trip.selectedAddOnsLabelsEn?.length > 0
                                ? trip.selectedAddOnsLabelsEn
                                : trip.selectedAddOnsLabels || []
                              ).map((lbl: string, idx: number) => (
                                <span key={idx} className="text-xs px-2 py-0.5 bg-amber-50 text-amber-800 font-medium rounded-md border border-amber-200/60">
                                  {lbl}
                                </span>
                              ))}
                            </div>
                          )}

                          {trip.notes && (
                            <p className="text-xs text-gray-500 bg-gray-50 p-2.5 rounded-lg border mt-2">
                              📝 <span className="font-bold">{t("요청사항", "Notes")}:</span> {trip.notes}
                            </p>
                          )}
                        </div>

                        <div className="pt-3 border-t flex flex-wrap items-center justify-end gap-2">
                          <Link
                            href={`/builder?tripId=${trip.id}`}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 border-2 border-[var(--color-jm-navy)] text-[var(--color-jm-navy)] bg-white text-xs font-bold rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            {t("여정 수정", "Edit Journey")}
                          </Link>
                          <a
                            href={`https://wa.me/821099008210?text=${encodeURIComponent(`Hi Host! Following up on my saved journey (${trip.dates || 'My Trip'}).`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-jm-gold)] text-white text-xs font-bold rounded-lg hover:bg-amber-700 transition-colors shadow-sm"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            {t("호스트와 왓츠앱 상담하기", "WhatsApp Host Chat")}
                          </a>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
                    <UserIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{t("개인 프로필", "Personal Profile")}</h2>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>

                <form onSubmit={handleSave} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t("여권 영문명 (선택)", "Passport Name (Optional)")}</label>
                    <input type="text" value={profile.passportName} onChange={e => setProfile({...profile, passportName: e.target.value})} className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t("연락처 (선택)", "Phone (Optional)")}</label>
                    <input type="tel" value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})} className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t("국가 (선택)", "Country (Optional)")}</label>
                      <input type="text" value={profile.country} onChange={e => setProfile({...profile, country: e.target.value})} className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t("주 언어 (선택)", "Language (Optional)")}</label>
                      <input type="text" value={profile.language} onChange={e => setProfile({...profile, language: e.target.value})} className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t("주소 (선택)", "Address (Optional)")}</label>
                    <input type="text" value={profile.address} onChange={e => setProfile({...profile, address: e.target.value})} className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" />
                  </div>
                  <div className="pt-4">
                    <button type="submit" disabled={saving} className="w-full md:w-auto px-8 flex items-center justify-center gap-2 bg-blue-600 text-white rounded-xl p-3 font-bold hover:bg-blue-700 transition-colors disabled:bg-blue-400">
                      <Save className="w-5 h-5" />
                      {saving ? t("저장 중...", "Saving...") : t("정보 저장", "Save Info")}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
