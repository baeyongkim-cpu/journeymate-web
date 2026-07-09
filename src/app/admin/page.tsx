"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { Plus, Edit } from "lucide-react";
import { Destination } from "@/data/destinations"; // for typing

export default function AdminDashboardPage() {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.push("/");
    }
  }, [loading, isAdmin, router]);

  useEffect(() => {
    if (isAdmin) {
      const fetchDestinations = async () => {
        try {
          const snapshot = await getDocs(collection(db, "journeymate_destinations"));
          const destData = snapshot.docs.map(doc => {
            const data = doc.data();
            return { 
              id: doc.id, 
              ...data,
              subDestinations: data.subDestinations || []
            } as Destination;
          });
          setDestinations(destData);
        } catch (e) {
          console.error("Error fetching destinations", e);
        } finally {
          setIsFetching(false);
        }
      };
      fetchDestinations();
    }
  }, [isAdmin]);

  if (loading || isFetching) {
    return <div className="p-12 text-center text-gray-500">로딩 중... (Loading...)</div>;
  }

  if (!isAdmin) {
    return null; // Will redirect
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Link href="/admin/new" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" /> 새 여행지 추가
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map(dest => (
          <div key={dest.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="h-40 bg-gray-200 overflow-hidden relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={dest.image} alt={dest.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{dest.title}</h3>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">{dest.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-400">{dest.subDestinations?.length || 0} 코스</span>
                <Link href={`/admin/${dest.id}`} className="flex items-center gap-1 text-blue-600 font-medium hover:text-blue-800 transition-colors">
                  <Edit className="w-4 h-4" /> 수정
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
