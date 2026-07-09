"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Destination, SubDestination } from "@/data/destinations";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

export default function AdminEditPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { isAdmin, loading } = useAuth();
  const router = useRouter();
  const [dest, setDest] = useState<Destination | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.push("/");
    }
  }, [loading, isAdmin, router]);

  useEffect(() => {
    if (isAdmin && resolvedParams.id !== "new") {
      const fetchDest = async () => {
        const docRef = doc(db, "journeymate_destinations", resolvedParams.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDest({ id: docSnap.id, ...docSnap.data() } as Destination);
        } else {
          // If not found, create an empty shell
          setDest({
            id: resolvedParams.id,
            title: "", titleEn: "", description: "", descriptionEn: "",
            image: "", tags: [], tagsEn: [], subDestinations: []
          });
        }
      };
      fetchDest();
    } else if (isAdmin && resolvedParams.id === "new") {
      setDest({
        id: `dest_${Date.now()}`,
        title: "", titleEn: "", description: "", descriptionEn: "",
        image: "", tags: [], tagsEn: [], subDestinations: []
      });
    }
  }, [isAdmin, resolvedParams.id]);

  if (loading || !dest) return <div className="p-12 text-center">Loading...</div>;
  if (!isAdmin) return null;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await setDoc(doc(db, "journeymate_destinations", dest.id), dest);
      alert("성공적으로 저장되었습니다.");
      router.push("/admin");
    } catch (e) {
      console.error(e);
      alert("저장 실패");
    } finally {
      setIsSaving(false);
    }
  };

  const updateSubDest = (index: number, field: keyof SubDestination, value: any) => {
    const updated = [...dest.subDestinations];
    updated[index] = { ...updated[index], [field]: value };
    setDest({ ...dest, subDestinations: updated });
  };

  const addSubDest = () => {
    setDest({ ...dest, subDestinations: [...dest.subDestinations, { name: "", nameEn: "", desc: "", descEn: "", priceValue: 0 }] });
  };

  const removeSubDest = (index: number) => {
    const updated = dest.subDestinations.filter((_, i) => i !== index);
    setDest({ ...dest, subDestinations: updated });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <Link href="/admin" className="flex items-center gap-2 text-gray-500 hover:text-gray-800">
          <ArrowLeft className="w-5 h-5" /> 뒤로가기
        </Link>
        <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">
          <Save className="w-5 h-5" /> {isSaving ? "저장 중..." : "저장"}
        </button>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-4">기본 정보</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">ID (영문/숫자)</label>
              <input value={dest.id} readOnly disabled className="w-full p-2 border rounded bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">이미지 URL</label>
              <input value={dest.image} onChange={e => setDest({ ...dest, image: e.target.value })} className="w-full p-2 border rounded" placeholder="https://..." />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">제목 (한국어)</label>
              <input value={dest.title} onChange={e => setDest({ ...dest, title: e.target.value })} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">제목 (영어)</label>
              <input value={dest.titleEn || ""} onChange={e => setDest({ ...dest, titleEn: e.target.value })} className="w-full p-2 border rounded" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">설명 (한국어)</label>
              <textarea value={dest.description} onChange={e => setDest({ ...dest, description: e.target.value })} className="w-full p-2 border rounded h-20" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">설명 (영어)</label>
              <textarea value={dest.descriptionEn || ""} onChange={e => setDest({ ...dest, descriptionEn: e.target.value })} className="w-full p-2 border rounded h-20" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">태그 (한국어, 쉼표 구분)</label>
              <input value={dest.tags.join(",")} onChange={e => setDest({ ...dest, tags: e.target.value.split(",") })} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">태그 (영어, 쉼표 구분)</label>
              <input value={(dest.tagsEn || []).join(",")} onChange={e => setDest({ ...dest, tagsEn: e.target.value.split(",") })} className="w-full p-2 border rounded" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">서브 코스 (상품)</h2>
            <button onClick={addSubDest} className="flex items-center gap-1 text-sm bg-indigo-50 text-indigo-600 px-3 py-1 rounded hover:bg-indigo-100">
              <Plus className="w-4 h-4" /> 코스 추가
            </button>
          </div>
          
          <div className="space-y-4">
            {dest.subDestinations.map((sub, i) => (
              <div key={i} className="p-4 border border-gray-200 rounded-xl relative bg-gray-50">
                <button onClick={() => removeSubDest(i)} className="absolute top-4 right-4 text-red-500 hover:text-red-700">
                  <Trash2 className="w-5 h-5" />
                </button>
                <div className="grid md:grid-cols-2 gap-4 pr-10">
                  <div>
                    <label className="block text-xs font-medium mb-1">이름 (한국어)</label>
                    <input value={sub.name} onChange={e => updateSubDest(i, "name", e.target.value)} className="w-full p-2 border rounded text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">이름 (영어)</label>
                    <input value={sub.nameEn || ""} onChange={e => updateSubDest(i, "nameEn", e.target.value)} className="w-full p-2 border rounded text-sm" />
                  </div>
                  <div className="md:col-span-2 grid grid-cols-[1fr_1fr_100px] gap-4">
                    <div>
                      <label className="block text-xs font-medium mb-1">설명 (한국어)</label>
                      <input value={sub.desc} onChange={e => updateSubDest(i, "desc", e.target.value)} className="w-full p-2 border rounded text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">설명 (영어)</label>
                      <input value={sub.descEn || ""} onChange={e => updateSubDest(i, "descEn", e.target.value)} className="w-full p-2 border rounded text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">가격(USD)</label>
                      <input type="number" value={sub.priceValue} onChange={e => updateSubDest(i, "priceValue", Number(e.target.value))} className="w-full p-2 border rounded text-sm" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
