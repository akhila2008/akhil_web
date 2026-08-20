"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const occasionsList = [
  { id: "wedding", title: "Wedding", desc: "Timeless luxury and elegant traditions.", img: "/hero-bg.jpg" },
  { id: "haldi", title: "Haldi", desc: "Vibrant marigolds and joyful moments.", img: "/hero-bg.jpg" },
  { id: "birthday", title: "Birthday", desc: "Pastel themes and magical setups.", img: "/hero-bg.jpg" },
  { id: "engagement", title: "Engagement", desc: "Romantic blush and champagne decor.", img: "/hero-bg.jpg" },
  { id: "baby-shower", title: "Baby Shower", desc: "Soft, welcoming and beautiful themes.", img: "/hero-bg.jpg" },
  { id: "anniversary", title: "Anniversary", desc: "Deep romance with rich burgundy.", img: "/hero-bg.jpg" },
  { id: "reception", title: "Reception", desc: "Grandeur with gold and deep plum.", img: "/hero-bg.jpg" },
  { id: "housewarming", title: "Housewarming", desc: "Warm terracotta and sage greens.", img: "/hero-bg.jpg" },
];

export default function OccasionsPage() {
  const { setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6">
            Celebrate Every Occasion
          </h1>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto font-light">
            Each celebration carries its own unique emotion. Select an occasion below to see how our styling adapts perfectly to your special day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {occasionsList.map((occ, index) => (
            <div 
              key={occ.id}
              className="group relative overflow-hidden rounded-3xl cursor-pointer bg-card shadow-sm hover:shadow-2xl transition-all duration-500 border border-border animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setTheme(occ.id as any)}
              onMouseLeave={() => setTheme("default")}
              onClick={() => setTheme(occ.id as any)}
            >
              <div className="relative h-80 w-full overflow-hidden">
                <Image 
                  src={occ.img} 
                  alt={occ.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="font-serif text-3xl font-semibold text-white mb-2">{occ.title}</h3>
                <p className="text-white/80 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 h-10">
                  {occ.desc}
                </p>
                <Link 
                  href={`/build`}
                  onClick={() => setTheme(occ.id as any)}
                  className="inline-flex items-center text-accent text-sm font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150 hover:text-white"
                >
                  Plan this event <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
              
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-primary/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
