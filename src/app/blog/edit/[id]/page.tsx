"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useLanguage } from "@/lib/LanguageContext";
import { translateText } from "@/lib/translate";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function BlogEditPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;
  const { t } = useLanguage();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Story");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [saving, setSaving] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;
      try {
        const docRef = doc(db, "journeymate_posts", postId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          // Check ownership
          if (data.authorId !== user?.uid) {
            alert(t("수정 권한이 없습니다.", "You do not have permission to edit this post."));
            router.push("/blog");
            return;
          }
          setTitle(data.title || "");
          setCategory(data.category || "Story");
          setExcerpt(data.excerpt || "");
          setContent(data.content || "");
          setImage(data.image || "");
        } else {
          alert(t("게시글을 찾을 수 없습니다.", "Post not found."));
          router.push("/blog");
        }
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setFetching(false);
      }
    };

    if (user) {
      fetchPost();
    }
  }, [postId, user, router, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    
    try {
      const title_en = await translateText(title, "ko", "en");
      const excerpt_en = await translateText(excerpt, "ko", "en");
      const content_en = await translateText(content, "ko", "en");

      const docRef = doc(db, "journeymate_posts", postId);
      await updateDoc(docRef, {
        title,
        title_en,
        category,
        excerpt,
        excerpt_en,
        content,
        content_en,
        image,
        updatedAt: new Date().toISOString()
      });
      alert(t("게시글이 성공적으로 수정되었습니다.", "Post updated successfully."));
      router.push(`/blog/${postId}`);
    } catch (err) {
      console.error(err);
      alert(t("게시글 수정에 실패했습니다.", "Failed to update post."));
    }
    setSaving(false);
  };

  if (loading || !user || fetching) return <div className="min-h-screen py-12 text-center text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link href={`/blog/${postId}`} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 w-fit transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span>{t("돌아가기", "Back")}</span>
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border p-8">
          <h1 className="text-3xl font-bold mb-8 text-gray-900">
            {t("매거진 글 수정", "Edit post")}
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
                {saving ? t("저장 중...", "Updating...") : t("수정 완료", "Update Post")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
