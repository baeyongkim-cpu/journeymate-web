"use client";

import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface PostActionsProps {
  postId: string;
  authorId: string;
}

export function PostActions({ postId, authorId }: PostActionsProps) {
  const { user } = useAuth();
  const router = useRouter();

  if (!user || user.uid !== authorId) {
    return null;
  }

  const handleDelete = async () => {
    if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      try {
        await deleteDoc(doc(db, "journeymate_posts", postId));
        alert("삭제되었습니다.");
        router.push("/blog");
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("삭제에 실패했습니다.");
      }
    }
  };

  return (
    <div className="flex gap-2">
      <Link href={`/blog/edit/${postId}`}>
        <Button variant="outline" size="sm" className="flex items-center gap-1 border-blue-200 text-blue-700 hover:bg-blue-50">
          <Edit className="w-4 h-4" />
          수정
        </Button>
      </Link>
      <Button variant="outline" size="sm" onClick={handleDelete} className="flex items-center gap-1 border-red-200 text-red-700 hover:bg-red-50">
        <Trash2 className="w-4 h-4" />
        삭제
      </Button>
    </div>
  );
}
