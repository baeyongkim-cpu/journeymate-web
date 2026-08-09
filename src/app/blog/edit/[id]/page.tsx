"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useLanguage } from "@/lib/LanguageContext";
import { translateText } from "@/lib/translate";
import { ArrowLeft, Save, Upload, X } from "lucide-react";
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
  const [images, setImages] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleMultiImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (images.length >= 5) {
      alert(t("이미지는 최대 5장까지 업로드 가능합니다.", "Maximum 5 images allowed."));
      return;
    }

    if (images.length + files.length > 5) {
      alert(t("이미지는 최대 5장까지 업로드할 수 있습니다. 5장을 초과한 파일은 제외됩니다.", "Maximum 5 images allowed. Excess files will be omitted."));
    }

    const availableSlots = 5 - images.length;
    const filesToProcess = files.slice(0, availableSlots);
    const maxSizeBytes = 20 * 1024 * 1024; // 20MB limit per image

    filesToProcess.forEach(file => {
      if (file.size > maxSizeBytes) {
        alert(t(`이미지 용량이 20MB를 초과합니다: ${file.name}`, `Image size exceeds 20MB: ${file.name}`));
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          const maxDim = 1200;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);

          const compressedBase64 = canvas.toDataURL("image/jpeg", 0.85);
          setImages(prev => {
            if (prev.length >= 5) return prev;
            return [...prev, compressedBase64];
          });
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

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
          if (Array.isArray(data.images) && data.images.length > 0) {
            setImages(data.images);
          } else if (data.image) {
            setImages([data.image]);
          }
          setVideoUrl(data.videoUrl || "");
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
        image: images[0] || "",
        images: images,
        videoUrl,
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
    <div className="min-h-screen bg-gray-50 pt-28 pb-20">
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
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center justify-between">
                  <span>{t("이미지 업로드 (여러 장 가능)", "Upload Images (Multiple allowed)")}</span>
                  <span className="text-xs font-normal text-gray-500">1장당 최대 20MB</span>
                </label>
                <div className="space-y-4">
                  <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-5 hover:border-blue-500 transition-colors text-center bg-gray-50/50 cursor-pointer group">
                    <input 
                      type="file" 
                      accept="image/*"
                      multiple
                      onChange={handleMultiImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                    />
                    <div className="flex flex-col items-center gap-1.5">
                      <Upload className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      <p className="text-sm font-bold text-gray-700">
                        {t("이미지 파일 여러 개 선택 (클릭/드래그)", "Choose Multiple Images (Click/Drag)")}
                      </p>
                      <p className="text-xs text-gray-400">JPG, PNG, WEBP 지원 · 1장당 최대 20MB</p>
                    </div>
                  </div>

                  {images.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-gray-600">
                        {t(`업로드된 이미지 (${images.length}장) - 첫 번째 이미지가 대표 썸네일로 사용됩니다`, `Uploaded Images (${images.length}) - 1st image used as cover`)}
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {images.map((imgSrc, idx) => (
                          <div key={idx} className="relative h-28 rounded-xl overflow-hidden border border-gray-200 shadow-sm group">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={imgSrc} alt={`Uploaded ${idx + 1}`} className="w-full h-full object-cover" />
                            {idx === 0 && (
                              <span className="absolute top-1.5 left-1.5 px-2 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded shadow">
                                {t("대표 이미지", "Cover")}
                              </span>
                            )}
                            <button
                              type="button"
                              onClick={() => removeImage(idx)}
                              className="absolute top-1.5 right-1.5 p-1 bg-black/75 text-white rounded-full hover:bg-red-600 transition-colors shadow"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <span className="text-red-600 font-bold">▶</span>
                {t("유튜브 동영상 URL (선택사항)", "YouTube Video URL (Optional)")}
              </label>
              <input 
                type="url" 
                value={videoUrl} 
                onChange={e => setVideoUrl(e.target.value)} 
                placeholder="https://www.youtube.com/watch?v=... 또는 https://youtu.be/..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-shadow" 
              />
              <p className="text-xs text-gray-500 mt-1">
                {t("유튜브 영상 링크를 입력하시면 본문에 4K 고화질 플레이어가 자동 연동됩니다.", "Enter a YouTube video link to automatically embed a 4K video player.")}
              </p>
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
