import { courses } from "@/data/courses";
import CourseDetailClient from "./CourseDetailClient";

export function generateStaticParams() {
  return courses.map((course) => ({
    id: course.id,
  }));
}

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const course = courses.find(c => c.id === resolvedParams.id);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-jm-cream)] text-[var(--color-jm-navy)]">
        <h1 className="text-2xl font-bold">Course not found</h1>
      </div>
    );
  }

  return <CourseDetailClient course={course} />;
}
