"use client";

import Link from "next/link";
import { ArrowLeft, Clock, User } from "lucide-react";
import { PostActions } from "@/components/blog/PostActions";
import { useLanguage } from "@/lib/LanguageContext";

export function BlogPostContent({ post }: { post: any }) {
  const { t, lang } = useLanguage();

  const title = lang === 'en' && post.title_en ? post.title_en : post.title;
  const content = lang === 'en' && post.content_en ? post.content_en : post.content;
  const category = post.category || "Story";

  return (
    <article className="min-h-screen bg-white pb-24">
      {/* Hero Image */}
      <div className="w-full h-[400px] md:h-[500px] relative">
        <div className="absolute inset-0 bg-black/40 z-10" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={post.image || "https://images.unsplash.com/photo-1490682143684-14369e18dce8"} 
          alt={title} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute top-8 left-4 md:left-8 z-20">
          <Link href="/blog" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/20 px-4 py-2 rounded-full backdrop-blur">
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

        {/* Article Content */}
        <div className="prose prose-lg md:prose-xl max-w-none text-gray-700">
          {content?.split('\n').map((paragraph: string, idx: number) => (
            <p key={idx} className="mb-6 leading-relaxed">{paragraph}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
