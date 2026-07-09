"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useLanguage } from "@/lib/LanguageContext";
import { translateText } from "@/lib/translate";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function BlogWritePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { t } = useLanguage();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Story");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    
    try {
      const title_en = await translateText(title, "ko", "en");
      const excerpt_en = await translateText(excerpt, "ko", "en");
      const content_en = await translateText(content, "ko", "en");

      await addDoc(collection(db, "journeymate_posts"), {
        title,
        title_en,
        category,
        excerpt,
        excerpt_en,
        content,
        content_en,
        image,
        authorId: user.uid,
        authorEmail: user.email,
        createdAt: new Date().toISOString()
      });
      alert(t("게시글이 성공적으로 등록되었습니다.", "Post published successfully."));
      router.push("/blog");
    } catch (err) {
      console.error(err);
      alert(t("게시글 등록에 실패했습니다.", "Failed to publish post."));
    }
    setSaving(false);
  };

  if (loading || !user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link href="/blog" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 w-fit transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span>{t("돌아가기", "Back to list")}</span>
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border p-8">
          <h1 className="text-3xl font-bold mb-8 text-gray-900">
            {t("새 매거진 작성", "Write a new post")}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">{t("제목", "Title")}</label>
              <input 
                type="text" 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                required
                placeholder={t("게시글 제목을 입력하세요", "Enter post title")}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-shadow" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">{t("카테고리", "Category")}</label>
                <select 
                  value={category} 
                  onChange={e => setCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none bg-white"
                >
                  <option value="Story">Story (여행 후기)</option>
                  <option value="Tips">Tips (여행 꿀팁)</option>
                  <option value="Photography">Photography (사진)</option>
                  <option value="Wellness">Wellness (웰니스/의료)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">{t("대표 이미지 URL", "Cover Image URL")}</label>
                <input 
                  type="url" 
                  value={image} 
                  onChange={e => setImage(e.target.value)} 
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-shadow" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">{t("요약 (리스트에 노출됨)", "Excerpt")}</label>
              <textarea 
                value={excerpt} 
                onChange={e => setExcerpt(e.target.value)} 
                required
                maxLength={150}
                placeholder={t("리스트에 보일 짧은 요약을 150자 내로 작성하세요.", "Write a short summary (max 150 chars).")}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-shadow resize-none h-24" 
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">{t("본문", "Content")}</label>
              <textarea 
                value={content} 
                onChange={e => setContent(e.target.value)} 
                required
                placeholder={t("자유롭게 여행 후기나 정보를 작성해주세요.", "Share your travel experience or tips.")}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-shadow resize-y min-h-[400px]" 
              />
            </div>

            <div className="pt-4 border-t">
              <button 
                type="submit" 
                disabled={saving || !title.trim() || !content.trim()} 
                className="w-full md:w-auto md:px-12 flex items-center justify-center gap-2 bg-blue-600 text-white rounded-xl py-4 font-bold text-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed ml-auto"
              >
                <Save className="w-5 h-5" />
                {saving ? t("저장 중...", "Publishing...") : t("게시글 등록하기", "Publish Post")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
