"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const occasions = [
  { id: "wedding", title: "Wedding", desc: "Timeless luxury and elegant traditions.", img: "/wedding.jpg" },
  { id: "haldi", title: "Haldi", desc: "Vibrant marigolds and joyful moments.", img: "/haldi.jpg" },
  { id: "birthday", title: "Birthday", desc: "Pastel themes and magical setups.", img: "/birthday.jpg" },
  { id: "engagement", title: "Engagement", desc: "Romantic blush and champagne decor.", img: "/engagement.jpg" },
  { id: "baby-shower", title: "Baby Shower", desc: "Soft, welcoming and beautiful themes.", img: "/baby-shower.jpg" },
  { id: "anniversary", title: "Anniversary", desc: "Deep romance with rich burgundy.", img: "/anniversary.jpg" },
];

export default function Home() {
  const { setTheme } = useTheme();

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero-bg.jpg" 
            alt="Luxurious Event Decoration" 
            fill 
            className="object-cover object-center animate-fade-in"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <div className="mb-6 inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-card border-white/20 text-white/90 text-sm font-medium animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Sparkles size={16} className="text-accent" />
            <span>Premium Event Styling</span>
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white leading-tight mb-6 animate-fade-in drop-shadow-lg" style={{ animationDelay: '0.4s' }}>
            We Decorate Your Moments <br className="hidden md:block"/> Into Memories.
          </h1>
          
          <p className="text-lg md:text-2xl text-white/90 mb-10 font-light max-w-2xl animate-fade-in drop-shadow-md" style={{ animationDelay: '0.6s' }}>
            Beautiful, personalized decorations for every celebration, crafted with elegance and passion.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <Link 
              href="/gallery" 
              className="px-8 py-4 rounded-full bg-accent text-accent-foreground font-semibold text-lg transition-transform hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl flex items-center justify-center"
            >
              Explore Gallery
            </Link>
            <Link 
              href="/gallery" 
              className="px-8 py-4 rounded-full glass-card text-white font-semibold text-lg hover:bg-white/20 transition-all flex items-center justify-center group"
            >
              Explore Decorations
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Occasions Section */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Celebrate Every Occasion
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose your celebration and watch our visual theme adapt to your chosen event.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {occasions.map((occ) => (
              <div 
                key={occ.id}
                className="group relative overflow-hidden rounded-2xl cursor-pointer bg-card shadow-sm hover:shadow-xl transition-all duration-500 border border-border"
                onMouseEnter={() => setTheme(occ.id as any)}
                onMouseLeave={() => setTheme("default")}
                onClick={() => {
                  setTheme(occ.id as any);
                  // In a real app, this would route to /occasions/[id]
                }}
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image 
                    src={occ.img} 
                    alt={occ.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-serif text-2xl font-semibold text-white mb-2">{occ.title}</h3>
                  <p className="text-white/80 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {occ.desc}
                  </p>
                  <div className="flex items-center text-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                    Explore <ArrowRight size={16} className="ml-1" />
                  </div>
                </div>
                
                {/* Petal hover effect wrapper (CSS visual only) */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
