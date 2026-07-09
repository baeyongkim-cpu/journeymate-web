"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { db, auth } from "@/lib/firebase";
import { doc, getDoc, setDoc, deleteDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";
import { LogOut, User as UserIcon, Save, Briefcase, Trash2 } from "lucide-react";
import { signOut } from "firebase/auth";
import Link from "next/link";

export default function MyPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { t, lang } = useLanguage();

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
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{t("마이페이지", "My Page")}</h1>
        <button onClick={handleLogout} className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors">
          <LogOut className="w-5 h-5" />
          <span>{t("로그아웃", "Logout")}</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Profile Section */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
              <UserIcon className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{t("개인 정보", "Personal Info")}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("여권 영문명 (선택)", "Passport Name (Optional)")}</label>
              <input type="text" value={profile.passportName} onChange={e => setProfile({...profile, passportName: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("연락처 (선택)", "Phone (Optional)")}</label>
              <input type="tel" value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("국가 (선택)", "Country (Optional)")}</label>
                <input type="text" value={profile.country} onChange={e => setProfile({...profile, country: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("주 언어 (선택)", "Language (Optional)")}</label>
                <input type="text" value={profile.language} onChange={e => setProfile({...profile, language: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("주소 (선택)", "Address (Optional)")}</label>
              <input type="text" value={profile.address} onChange={e => setProfile({...profile, address: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" />
            </div>
            <button type="submit" disabled={saving} className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white rounded-lg p-3 font-bold hover:bg-blue-700 transition-colors disabled:bg-blue-400">
              <Save className="w-5 h-5" />
              {saving ? t("저장 중...", "Saving...") : t("정보 저장", "Save Info")}
            </button>
          </form>
        </div>

        {/* Saved Trips Section */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-full">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{t("내 여정 리스트", "My Trip List")}</h2>
              <p className="text-sm text-gray-500">{t("임시 저장된 여정들", "Saved trips")}</p>
            </div>
          </div>

          <div className="space-y-4">
            {trips.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p className="mb-4">{t("저장된 여정이 없습니다.", "No saved trips yet.")}</p>
                <Link href="/builder" className="text-blue-600 hover:underline">
                  {t("새 여정 만들기", "Create a new trip")}
                </Link>
              </div>
            ) : (
              trips.map(trip => (
                <Link href={`/builder?tripId=${trip.id}`} key={trip.id} className="block p-4 border rounded-xl hover:shadow-md transition-shadow relative group bg-white">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg pr-8">{lang === 'en' && trip.title_en ? trip.title_en : (trip.title || t("나의 한국 여행", "My Korea Trip"))}</h3>
                    <span className="text-sm text-gray-500">
                      {new Date(trip.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <button onClick={(e) => handleDeleteTrip(e, trip.id)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full md:opacity-0 md:group-hover:opacity-100 transition-all z-10" aria-label="Delete Trip">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <p className="text-sm text-gray-600 mb-2">
                    {t("총 예상 금액:", "Estimated Total:")} ${trip.totalPrice}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {trip.selectedCourses?.slice(0, 3).map((c: any) => (
                      <span key={c} className="text-xs px-2 py-1 bg-gray-100 rounded-full">{c}</span>
                    ))}
                    {trip.selectedCourses?.length > 3 && (
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">+{trip.selectedCourses.length - 3}</span>
                    )}
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
