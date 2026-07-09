import { Metadata } from 'next';
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Link from 'next/link';
import { BlogPostContent } from "./BlogPostContent";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  try {
    const docRef = doc(db, "journeymate_posts", resolvedParams.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        title: `${data.title} | JourneyMate Magazine`,
        description: data.excerpt || data.content?.substring(0, 160),
        openGraph: {
          title: data.title,
          description: data.excerpt,
          images: [data.image || "https://images.unsplash.com/photo-1517154421773-0529f29ea451"],
        }
      };
    }
  } catch (err) {
    console.error(err);
  }
  return { title: 'Post Not Found | JourneyMate' };
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  let post: any = null;
  let errorMsg = "";
  
  try {
    if (resolvedParams.id === "featured") {
      post = {
        id: "featured",
        title: "왜 지금 외국인들은 서울이 아닌 '인천' 프라이빗 스냅에 열광할까?",
        title_en: "Why are foreigners crazy about 'Incheon' private snaps instead of Seoul?",
        excerpt: "공항에서 30분 거리, 오염되지 않은 자연, 붐비지 않는 프라이빗한 환경까지. 북적이는 서울을 피하고 싶은 글로벌 여행자들의 새로운 성지.",
        excerpt_en: "30 minutes from the airport, unpolluted nature, and a private environment that is not crowded. A new sanctuary for global travelers who want to avoid crowded Seoul.",
        content: "공항에서 30분 거리, 오염되지 않은 자연, 붐비지 않는 프라이빗한 환경까지. 북적이는 서울을 피하고 싶은 글로벌 여행자들의 새로운 성지가 되고 있는 인천의 스냅 포인트들을 소개합니다.\n\n인천은 교통 접근성이 뛰어난 반면, 서울처럼 사진 한 장을 찍기 위해 줄을 서야 하는 수고로움이 덜합니다. 서해의 아름다운 일몰을 배경으로 인생샷을 건질 수 있는 무의도, 영흥도의 숨겨진 해변들은 프라이빗한 분위기 속에서 자유롭게 화보 촬영을 즐길 수 있는 최고의 무대입니다.",
        content_en: "30 minutes from the airport, unpolluted nature, and a private environment that is not crowded. We introduce snap points in Incheon, which are becoming a new sanctuary for global travelers who want to avoid crowded Seoul.\n\nWhile Incheon has excellent transportation accessibility, there is less hassle of having to stand in line to take a picture like in Seoul. The hidden beaches of Muuido and Yeongheungdo, where you can get a life shot with the beautiful sunset of the West Sea in the background, are the best stages where you can freely enjoy a photo shoot in a private atmosphere.",
        category: "Hot Issue",
        createdAt: new Date().toISOString(),
        authorEmail: "admin@journeymate.com",
        image: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?q=80&w=2070&auto=format&fit=crop"
      };
    } else {
      const docRef = doc(db, "journeymate_posts", resolvedParams.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        post = { id: docSnap.id, ...docSnap.data() };
      } else {
        errorMsg = "문서가 존재하지 않습니다.";
      }
    }
  } catch (err: any) {
    console.error(err);
    errorMsg = err.message || "알 수 없는 에러가 발생했습니다.";
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <h1 className="text-2xl font-bold">게시글을 찾을 수 없습니다. (Post not found)</h1>
        <p className="text-red-500">{errorMsg}</p>
        <Link href="/blog" className="text-blue-600 hover:underline">목록으로 돌아가기 (Back to list)</Link>
      </div>
    );
  }

  return <BlogPostContent post={post} />;
}
