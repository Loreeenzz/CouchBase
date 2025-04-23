import PPTHolder from "@/components/ppt-holder";
import { Hero } from "@/components/hero";

// Sample slide images - replace with your actual paths
const slideImages = [
  "/sample.jpg",
  "/sample.jpg",
  "/sample.jpg",
  "/sample.jpg",
];

export default function Home() {
  return (
    <main className="min-h-screen py-8">
      <div className="container max-w-5xl mx-auto px-4">
        <Hero />
        <PPTHolder slides={slideImages} />
      </div>
    </main>
  );
}
