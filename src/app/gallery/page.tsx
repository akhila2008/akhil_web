"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Upload, X, Check, Search } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

// Extensive mock database for the visual showroom
const DECORATIONS = [
  { id: 1, title: "Royal Marigold Stage", occasion: "Haldi", category: "Stage", price: 35000, img: "/haldi.jpg", desc: "A vibrant yellow setup featuring marigold strings, saffron drapes, and traditional brass props." },
  { id: 2, title: "Pastel Dream Canopy", occasion: "Birthday", category: "Ceiling", price: 22000, img: "/birthday.jpg", desc: "Magical pastel balloons and soft floral arrangements perfect for an elegant birthday." },
  { id: 3, title: "Ivory & Champagne Arch", occasion: "Wedding", category: "Entrance", price: 45000, img: "/wedding.jpg", desc: "Luxurious entrance arch featuring premium ivory roses and champagne accents." },
  { id: 4, title: "Blush Rose Backdrop", occasion: "Engagement", category: "Backdrop", price: 28000, img: "/engagement.jpg", desc: "Romantic blush pink backdrop with warm lighting and elegant seating for the couple." },
  { id: 5, title: "Terracotta Home Setup", occasion: "Housewarming", category: "Stage", price: 18000, img: "/housewarming.jpg", desc: "Traditional terracotta pots and sage green foliage for a warm welcoming home." },
  { id: 6, title: "Deep Burgundy Romance", occasion: "Anniversary", category: "Floral", price: 40000, img: "/anniversary.jpg", desc: "Deep red roses, candlelight, and a premium intimate setup." },
  { id: 7, title: "Fairy Light Canopy", occasion: "Reception", category: "Lighting", price: 30000, img: "/reception.jpg", desc: "Crystal chandeliers and plum fabric drapes for a grand reception stage." },
  { id: 8, title: "Soft Baby Blue Florals", occasion: "Baby Shower", category: "Backdrop", price: 25000, img: "/baby-shower.jpg", desc: "Delicate baby blue and pale pink floral arrangements." },
];

const OCCASIONS = ["All", "Wedding", "Haldi", "Birthday", "Engagement", "Baby Shower", "Reception", "Anniversary", "Housewarming"];
const CATEGORIES = ["All", "Stage", "Backdrop", "Entrance", "Ceiling", "Floral", "Lighting"];

export default function GalleryPage() {
  const [selectedOccasion, setSelectedOccasion] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDecor, setSelectedDecor] = useState<typeof DECORATIONS[0] | null>(null);
  
  const { setTheme } = useTheme();

  // Filter logic
  const filteredDecorations = DECORATIONS.filter(decor => {
    if (selectedOccasion !== "All" && decor.occasion !== selectedOccasion) return false;
    if (selectedCategory !== "All" && decor.category !== selectedCategory) return false;
    return true;
  });

  const handleOccasionClick = (occasion: string) => {
    setSelectedOccasion(occasion);
    if (occasion !== "All") {
      setTheme(occasion.toLowerCase().replace(' ', '-') as any);
    } else {
      setTheme("default");
    }
  };

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Header section */}
      <div className="bg-card border-b border-border pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Design Gallery Showroom
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Browse our curated collection of luxury event decorations. Find your perfect design and customize it to your needs.
          </p>
        </div>
      </div>

      {/* Filters and Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Visual Occasion Filters */}
        <div className="mb-12">
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Select Occasion</h3>
          <div className="flex flex-wrap gap-2">
            {OCCASIONS.map(occ => (
              <button
                key={occ}
                onClick={() => handleOccasionClick(occ)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  selectedOccasion === occ 
                    ? 'bg-primary text-card shadow-md scale-105' 
                    : 'bg-card border border-border text-foreground hover:border-primary/50 hover:bg-primary/5'
                }`}
              >
                {occ}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Category Filters (Cards) */}
        <div className="mb-12">
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Browse by Element</h3>
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
            {CATEGORIES.filter(c => c !== "All").map(cat => (
              <div 
                key={cat}
                onClick={() => setSelectedCategory(selectedCategory === cat ? "All" : cat)}
                className={`flex-shrink-0 w-32 h-24 rounded-xl border flex items-end p-3 cursor-pointer transition-all relative overflow-hidden group ${
                  selectedCategory === cat ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="absolute inset-0 bg-muted/50 group-hover:bg-primary/10 transition-colors z-0"></div>
                <span className="relative z-10 font-bold text-foreground text-sm">{cat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDecorations.map((decor) => (
            <div 
              key={decor.id} 
              className="group cursor-pointer bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              onClick={() => setSelectedDecor(decor)}
            >
              <div className="relative h-72 w-full overflow-hidden">
                <Image 
                  src={decor.img} 
                  alt={decor.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Labels */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 bg-card/90 backdrop-blur-md rounded-full text-xs font-bold text-foreground">
                    {decor.occasion}
                  </span>
                  <span className="px-3 py-1 bg-primary/90 backdrop-blur-md rounded-full text-xs font-bold text-card">
                    {decor.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 relative">
                <h3 className="font-serif text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{decor.title}</h3>
                <p className="text-xl font-medium text-foreground mb-6">Starting ₹{decor.price.toLocaleString('en-IN')}</p>
                
                <div className="flex gap-3">
                  <button className="flex-1 py-2.5 rounded-lg border border-border text-foreground font-medium text-sm group-hover:bg-primary group-hover:text-card group-hover:border-primary transition-all flex items-center justify-center gap-2">
                    View Details <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredDecorations.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <Search size={48} className="mx-auto mb-4 opacity-20" />
            <h3 className="text-xl font-bold text-foreground mb-2">No designs found</h3>
            <p>Try selecting a different occasion or category.</p>
            <button onClick={() => {setSelectedOccasion("All"); setSelectedCategory("All");}} className="mt-6 text-primary font-medium hover:underline">
              Clear all filters
            </button>
          </div>
        )}

        {/* Prominent Custom Upload CTA */}
        <div className="mt-24 mb-12 bg-card rounded-3xl border border-border shadow-lg p-10 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10 max-w-xl">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Can't find what you're looking for?
            </h2>
            <div className="w-16 h-1 bg-primary rounded-full mb-6"></div>
            <p className="text-lg text-muted-foreground mb-8">
              Have your own decoration idea? Upload your Pinterest or Instagram inspiration photo and let our design team create a custom quotation just for you.
            </p>
            <Link 
              href="/custom-request" 
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-card rounded-xl font-bold hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <Upload size={20} className="mr-3" />
              Upload Your Decoration
            </Link>
          </div>
          
          <div className="relative z-10 w-full md:w-auto flex-shrink-0">
            <div className="w-48 h-64 md:w-64 md:h-80 bg-muted/30 rounded-2xl border-2 border-dashed border-primary/30 flex flex-col items-center justify-center text-primary/50 rotate-3 transform-gpu">
              <Upload size={40} className="mb-4" />
              <span className="font-medium">Drag & Drop Idea</span>
            </div>
          </div>
        </div>

      </div>

      {/* Detail View Modal */}
      {selectedDecor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-card w-full max-w-5xl h-[90vh] sm:h-auto sm:max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col sm:flex-row relative">
            
            <button 
              onClick={() => setSelectedDecor(null)} 
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full text-white flex items-center justify-center transition-colors"
            >
              <X size={20} />
            </button>

            {/* Image side */}
            <div className="w-full sm:w-1/2 h-64 sm:h-auto relative bg-muted">
              <Image src={selectedDecor.img} alt={selectedDecor.title} fill className="object-cover" />
            </div>
            
            {/* Details side */}
            <div className="w-full sm:w-1/2 p-8 sm:p-12 overflow-y-auto">
              <div className="flex gap-2 mb-6">
                <span className="px-3 py-1 bg-muted rounded-full text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  {selectedDecor.occasion}
                </span>
                <span className="px-3 py-1 bg-primary/10 rounded-full text-xs font-bold text-primary uppercase tracking-wider">
                  {selectedDecor.category}
                </span>
              </div>
              
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
                {selectedDecor.title}
              </h2>
              
              <div className="text-3xl font-medium text-foreground mb-6 pb-6 border-b border-border">
                <span className="text-sm text-muted-foreground block mb-1">Starting from</span>
                ₹{selectedDecor.price.toLocaleString('en-IN')}
              </div>
              
              <p className="text-lg text-muted-foreground mb-8">
                {selectedDecor.desc}
              </p>
              
              <div className="space-y-3 mb-10">
                <h4 className="font-bold text-foreground mb-4">Available Customizations:</h4>
                <div className="flex items-center gap-3 text-muted-foreground"><Check size={18} className="text-primary" /> Floral color matching</div>
                <div className="flex items-center gap-3 text-muted-foreground"><Check size={18} className="text-primary" /> Lighting warmth & color adjustments</div>
                <div className="flex items-center gap-3 text-muted-foreground"><Check size={18} className="text-primary" /> Seating arrangement expansion</div>
              </div>
              
              <div className="flex flex-col gap-4">
                <Link 
                  href={`/build?decor=${selectedDecor.id}`}
                  className="w-full py-4 bg-primary text-card text-center rounded-xl font-bold text-lg hover:shadow-lg transition-all shadow-md"
                >
                  Select This Design
                </Link>
                <button 
                  onClick={() => setSelectedDecor(null)}
                  className="w-full py-4 bg-card border border-border text-foreground text-center rounded-xl font-bold text-lg hover:bg-muted transition-all"
                >
                  Back to Gallery
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
