"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useAuth } from "@/lib/AuthContext";
import { useLanguage } from "@/lib/LanguageContext";

export default function BlogPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const { user } = useAuth();
  const { t, lang } = useLanguage();

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(db, "journeymate_posts"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const posts: any[] = [];
      snapshot.forEach(doc => {
        posts.push({ id: doc.id, ...doc.data() });
      });
      
      // 기존에 있던 '인천 프라이빗 스냅' 글을 항상 마지막(가장 오래된 글)에 추가하여 복구
      posts.push({
        id: "featured",
        title: "왜 지금 외국인들은 서울이 아닌 '인천' 프라이빗 스냅에 열광할까?",
        title_en: "Why are foreigners crazy about 'Incheon' private snaps instead of Seoul?",
        excerpt: "공항에서 30분 거리, 오염되지 않은 자연, 붐비지 않는 프라이빗한 환경까지. 북적이는 서울을 피하고 싶은 글로벌 여행자들의 새로운 성지.",
        excerpt_en: "30 minutes from the airport, unpolluted nature, and a private environment that is not crowded. A new sanctuary for global travelers who want to avoid crowded Seoul.",
        content: "공항에서 30분 거리, 오염되지 않은 자연, 붐비지 않는 프라이빗한 환경까지. 북적이는 서울을 피하고 싶은 글로벌 여행자들의 새로운 성지가 되고 있는 인천의 스냅 포인트들을 소개합니다.\n\n인천은 교통 접근성이 뛰어난 반면, 서울처럼 사진 한 장을 찍기 위해 줄을 서야 하는 수고로움이 덜합니다. 서해의 아름다운 일몰을 배경으로 인생샷을 건질 수 있는 무의도, 영흥도의 숨겨진 해변들은 프라이빗한 분위기 속에서 자유롭게 화보 촬영을 즐길 수 있는 최고의 무대입니다.",
        content_en: "30 minutes from the airport, unpolluted nature, and a private environment that is not crowded. We introduce snap points in Incheon, which are becoming a new sanctuary for global travelers who want to avoid crowded Seoul.\n\nWhile Incheon has excellent transportation accessibility, there is less hassle of having to stand in line to take a picture like in Seoul. The hidden beaches of Muuido and Yeongheungdo, where you can get a life shot with the beautiful sunset of the West Sea in the background, are the best stages where you can freely enjoy a photo shoot in a private atmosphere.",
        category: "Hot Issue",
        createdAt: "2024-01-01T00:00:00.000Z",
        authorEmail: "admin@journeymate.com",
        image: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?q=80&w=2070&auto=format&fit=crop"
      });

      setArticles(posts);
    };
    fetchPosts();
  }, []);

  const featuredArticle = articles.length > 0 ? articles[0] : null;
  const gridArticles = articles.length > 0 ? articles.slice(1) : [];

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              JourneyMate <span className="text-blue-600">Magazine</span>
            </h1>
            <p className="text-lg text-gray-500 max-w-xl">
              {t("한국 여행을 더 특별하게 만드는 로컬 팁, 촬영 가이드, 그리고 생생한 리뷰를 확인하세요.", "Check out local tips, photography guides, and reviews to make your Korea trip special.")}
            </p>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <Link href="/blog/write">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  {t("글쓰기", "Write Post")}
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Featured Article - Dynamic */}
        {featuredArticle && (
          <Link href={`/blog/${featuredArticle.id}`}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16 group cursor-pointer block"
            >
              <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-6">
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500 z-10" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={featuredArticle.image || "https://images.unsplash.com/photo-1517154421773-0529f29ea451?q=80&w=2070&auto=format&fit=crop"} 
                  alt={featuredArticle.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute bottom-0 left-0 p-8 md:p-12 z-20 text-white w-full md:w-2/3 bg-gradient-to-t from-black/80 to-transparent">
                  <span className="inline-block px-3 py-1 bg-blue-600 rounded-full text-sm font-bold mb-4">{featuredArticle.category || "Hot Issue"}</span>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                    {lang === 'en' && featuredArticle.title_en ? featuredArticle.title_en : featuredArticle.title}
                  </h2>
                  <p className="text-gray-200 line-clamp-2">
                    {lang === 'en' && featuredArticle.excerpt_en ? featuredArticle.excerpt_en : (featuredArticle.excerpt || featuredArticle.content?.substring(0, 100) + '...')}
                  </p>
                </div>
              </div>
            </motion.div>
          </Link>
        )}

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {gridArticles.map((article, index) => (
            <Link href={`/blog/${article.id}`} key={article.id}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer block h-full"
              >
                <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={article.image || "https://images.unsplash.com/photo-1490682143684-14369e18dce8?q=80&w=2070&auto=format&fit=crop"} 
                    alt={article.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur text-xs font-bold text-gray-900 rounded-full">
                      {article.category || "Story"}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-500 gap-2">
                    <Clock className="w-4 h-4" /> {new Date(article.createdAt).toLocaleDateString()}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                    {lang === 'en' && article.title_en ? article.title_en : article.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-2 text-sm leading-relaxed">
                    {lang === 'en' && article.excerpt_en ? article.excerpt_en : (article.excerpt || article.content?.substring(0, 100) + '...')}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
        
        {articles.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            {t("불러오는 중이거나 등록된 게시글이 없습니다.", "Loading or no posts available.")}
          </div>
        )}
      </div>
    </div>
  );
}
