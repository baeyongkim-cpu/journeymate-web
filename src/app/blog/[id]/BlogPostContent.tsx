"use client";

import Link from "next/link";
import { ArrowLeft, Clock, User } from "lucide-react";
import { PostActions } from "@/components/blog/PostActions";
import { useLanguage } from "@/lib/LanguageContext";
import { getYouTubeEmbedUrl } from "@/lib/youtube";

export function BlogPostContent({ post }: { post: any }) {
  const { t, lang } = useLanguage();

  const title = lang === 'en' && post.title_en ? post.title_en : post.title;
  const content = lang === 'en' && post.content_en ? post.content_en : post.content;
  const category = post.category || "Story";
  const embedUrl = post.videoUrl ? getYouTubeEmbedUrl(post.videoUrl) : null;

  return (
    <article className="min-h-screen bg-[var(--color-jm-cream)] pb-24">
      {/* Hero Image */}
      <div className="w-full h-[400px] md:h-[500px] relative">
        <div className="absolute inset-0 bg-black/60 z-10" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={post.image || "https://images.unsplash.com/photo-1490682143684-14369e18dce8"} 
          alt={title} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute top-28 left-4 md:left-8 z-20">
          <Link href="/blog" className="flex items-center gap-2 text-white font-bold hover:text-white transition-colors bg-black/40 px-5 py-2.5 rounded-full backdrop-blur-md border border-white/30 shadow-md">
            <ArrowLeft className="w-4 h-4" /> {t("목록으로", "Back")}
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-32 relative z-20">
        {/* Article Header Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12 relative">
          <div className="flex justify-between items-start mb-4">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
              {category}
            </span>
            <PostActions postId={post.id} authorId={post.authorId} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {title}
          </h1>
          <div className="flex items-center gap-6 text-sm text-gray-500 border-t pt-6">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" /> {post.authorEmail || "Anonymous"}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" /> {new Date(post.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* YouTube Video Player Embed */}
        {embedUrl && (
          <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl border border-gray-200 aspect-video w-full bg-black">
            <iframe
              src={embedUrl}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg md:prose-xl max-w-none text-gray-700">
          {content?.split('\n').map((paragraph: string, idx: number) => (
            <p key={idx} className="mb-6 leading-relaxed">{paragraph}</p>
          ))}
        </div>

        {/* Multi-Image Gallery */}
        {Array.isArray(post.images) && post.images.length > 1 && (
          <div className="mt-12 pt-8 border-t border-gray-200 space-y-4">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              📸 {t("포토 갤러리", "Photo Gallery")} ({post.images.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {post.images.map((imgSrc: string, idx: number) => (
                <div key={idx} className="relative rounded-2xl overflow-hidden shadow-md border border-gray-100 h-64 md:h-80 group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imgSrc} alt={`Gallery image ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
