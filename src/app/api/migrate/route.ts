import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { destinations } from "@/data/destinations";

export async function GET() {
  try {
    for (const dest of destinations) {
      const destRef = doc(db, "journeymate_destinations", dest.id);
      await setDoc(destRef, dest);
    }
    
    // Also add the admin email
    const adminRef = doc(db, "journeymate_admins", "baeyongkim@gmail.com");
    await setDoc(adminRef, {
      email: "baeyongkim@gmail.com",
      role: "superadmin",
      createdAt: new Date().toISOString()
    });

    return NextResponse.json({ success: true, message: "Migration completed successfully." });
  } catch (error) {
    console.error("Migration error:", error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
