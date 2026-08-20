"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Maximize2 } from "lucide-react";
import Link from "next/link";

const FILTERS = ["All", "Wedding", "Haldi", "Birthday", "Engagement", "Baby Shower", "Reception", "Anniversary", "Stage", "Backdrop", "Entrance", "Floral", "Ceiling", "Lighting"];

// Mock gallery data
const GALLERY_ITEMS = [
  { id: 1, title: "Royal Marigold Stage", category: "Haldi", type: "Stage", price: "35,000", span: "col-span-1 md:col-span-2 row-span-2", img: "/hero-bg.jpg" },
  { id: 2, title: "Pastel Dream Canopy", category: "Birthday", type: "Ceiling", price: "22,000", span: "col-span-1 row-span-1", img: "/hero-bg.jpg" },
  { id: 3, title: "Ivory & Champagne Arch", category: "Wedding", type: "Entrance", price: "45,000", span: "col-span-1 row-span-1", img: "/hero-bg.jpg" },
  { id: 4, title: "Blush Rose Backdrop", category: "Engagement", type: "Backdrop", price: "28,000", span: "col-span-1 md:col-span-2 row-span-1", img: "/hero-bg.jpg" },
  { id: 5, title: "Terracotta Home Setup", category: "Housewarming", type: "Stage", price: "18,000", span: "col-span-1 row-span-2", img: "/hero-bg.jpg" },
  { id: 6, title: "Deep Burgundy Romance", category: "Anniversary", type: "Floral", price: "40,000", span: "col-span-1 row-span-1", img: "/hero-bg.jpg" },
  { id: 7, title: "Fairy Light Canopy", category: "Reception", type: "Lighting", price: "30,000", span: "col-span-1 md:col-span-2 row-span-1", img: "/hero-bg.jpg" },
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredItems = GALLERY_ITEMS.filter(item => 
    activeFilter === "All" 
    || item.category === activeFilter 
    || item.type === activeFilter
  );

  return (
    <div className="min-h-screen bg-background pt-12 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Decoration Gallery</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Browse our premium designs and get inspired for your celebration.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {FILTERS.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter 
                  ? "bg-primary text-card shadow-md" 
                  : "bg-card text-foreground border border-border hover:border-primary/50"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Masonry-style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[250px]">
          {filteredItems.map((item, index) => (
            <div 
              key={item.id} 
              className={`relative group rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 animate-fade-in ${item.span}`}
              style={{ animationDelay: `${(index % 5) * 0.1}s` }}
            >
              <Image 
                src={item.img}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              
              <div className="absolute inset-0 p-6 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center space-x-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-medium">
                    {item.category}
                  </span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-medium">
                    {item.type}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-semibold text-white mb-1">{item.title}</h3>
                <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  <span className="text-white/90 text-sm">Starting from ₹{item.price}</span>
                  <Link href={`/build?preset=${item.id}`} className="p-2 bg-accent rounded-full text-accent-foreground hover:scale-110 transition-transform">
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
              
              <div className="absolute top-4 right-4 p-2 bg-black/20 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Maximize2 size={18} />
              </div>
            </div>
          ))}
        </div>
        
        {filteredItems.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No decorations found for this filter. Try selecting another category.
          </div>
        )}
      </div>
    </div>
  );
}
