"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Upload, X, Check, Search } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

// Extensive mock database for the visual showroom
// Dynamically generate 10 decorations for each occasion to populate the visual showroom
const OCCASION_NAMES = ["Wedding", "Haldi", "Birthday", "Engagement", "Baby Shower", "Anniversary", "Reception", "Housewarming"];
const OCCASION_IMAGES: Record<string, string[]> = {
  Wedding: ["/wedding.jpg", "/wedding-2.jpg"],
  Haldi: ["/haldi.jpg", "/haldi-2.jpg", "/haldi-3.jpg"],
  Birthday: ["/birthday.jpg", "/birthday-2.jpg"],
  Engagement: ["/engagement.jpg"],
  "Baby Shower": ["/baby-shower.jpg", "/baby-shower-2.jpg"],
  Anniversary: ["/anniversary.jpg"],
  Reception: ["/reception.jpg"],
  Housewarming: ["/housewarming.jpg"]
};

const DECORATIONS = OCCASION_NAMES.flatMap((occ, oIdx) => {
  return Array.from({ length: 10 }).map((_, i) => {
    // Generate a unique image for each of the 80 items using a stable lock seed
    const seed = (oIdx * 10) + i + 1;
    const category = occ.toLowerCase().replace(" ", "");
    // Use LoremFlickr to fetch unique but stable photos for each category
    const img = `https://loremflickr.com/800/600/${category},decoration?lock=${seed}`;
    
    const styles = ["Premium", "Luxury", "Classic", "Modern", "Traditional", "Elegant", "Vibrant", "Minimalist", "Grand", "Royal"];
    return {
      id: seed,
      title: `${occ} Design - ${styles[i]}`,
      occasion: occ,
      price: 15000 + (Math.floor(Math.random() * 50) * 1000),
      img: img,
      desc: `A stunning ${styles[i].toLowerCase()} ${occ.toLowerCase()} setup featuring high-quality floral arrangements, beautiful lighting, and premium props tailored perfectly for your special day.`
    };
  });
});

const OCCASIONS = [
  { name: "Wedding", img: "/wedding.jpg" },
  { name: "Haldi", img: "/haldi.jpg" },
  { name: "Birthday", img: "/birthday.jpg" },
  { name: "Engagement", img: "/engagement.jpg" },
  { name: "Baby Shower", img: "/baby-shower.jpg" },
  { name: "Anniversary", img: "/anniversary.jpg" },
  { name: "Reception", img: "/reception.jpg" },
  { name: "Housewarming", img: "/housewarming.jpg" }
];

export default function GalleryPage() {
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
  const [selectedDecor, setSelectedDecor] = useState<any | null>(null);
  const [allDecorations, setAllDecorations] = useState<any[]>(DECORATIONS);
  
  const { setTheme } = useTheme();

  // Load dynamically uploaded decorations from the Admin Panel
  React.useEffect(() => {
    // 1. Check URL for pre-selected occasion (from Home or Occasions page)
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlOccasion = params.get('occasion');
      if (urlOccasion) {
        setSelectedOccasion(urlOccasion);
      }
    }

    // 2. Load custom decorations from local storage
    const saved = localStorage.getItem('adminDecorations');
    if (saved) {
      const adminDecors = JSON.parse(saved);
      // Merge admin uploaded decors (which have status 'Active') with our base mock DECORATIONS
      // Ensure we don't duplicate hardcoded ones (mock ids are short, admin ids are timestamps)
      const newAdminDecors = adminDecors.filter((d: any) => d.status === 'Active' && !DECORATIONS.find(orig => orig.id.toString() === d.id.toString()));
      setAllDecorations([...newAdminDecors, ...DECORATIONS]);
    }
  }, []);

  // Filter logic
  const filteredDecorations = selectedOccasion 
    ? allDecorations.filter(decor => decor.occasion === selectedOccasion)
    : [];

  const handleOccasionClick = (occasion: string) => {
    setSelectedOccasion(occasion);
    setTheme(occasion.toLowerCase().replace(' ', '-') as any);
    // Scroll to gallery
    document.getElementById('gallery-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClearSelection = () => {
    setSelectedOccasion(null);
    setTheme("default");
  };

  return (
    <div className="min-h-screen bg-muted/10 transition-colors duration-500">
      
      {/* Visual Occasion Selection Header */}
      {!selectedOccasion && (
        <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Select an Occasion
            </h1>
            <p className="text-xl text-muted-foreground">
              Choose an event to explore our luxury decoration portfolio.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {OCCASIONS.map((occ) => (
              <div 
                key={occ.name}
                onClick={() => handleOccasionClick(occ.name)}
                className="group cursor-pointer rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image src={occ.img} alt={occ.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{occ.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Occasion Gallery View */}
      {selectedOccasion && (
        <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="gallery-grid">
          
          <div className="flex items-center justify-between mb-12">
            <div>
              <button onClick={handleClearSelection} className="text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors mb-2 inline-block">
                ← Back to Occasions
              </button>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
                {selectedOccasion} Decorations
              </h1>
            </div>
          </div>

          {/* Masonry Layout Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredDecorations.map((decor, i) => (
              <div 
                key={decor.id} 
                onClick={() => setSelectedDecor(decor)}
                className="break-inside-avoid relative group cursor-pointer rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                {/* Asymmetric height trick for mock images */}
                <div className={`relative w-full ${i % 2 === 0 ? 'h-[400px]' : 'h-[300px]'}`}>
                  <img 
                    src={decor.img} 
                    alt={decor.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                  
                  {/* Text Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-1 shadow-black drop-shadow-md">
                      {decor.title}
                    </h3>
                    
                    {/* View Design Hover CTA */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2">
                      <span className="inline-flex items-center text-sm font-bold text-white bg-primary/80 backdrop-blur-sm px-4 py-2 rounded-full">
                        View Design <ArrowRight size={16} className="ml-2" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredDecorations.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <Search size={48} className="mx-auto mb-4 opacity-20" />
              <h3 className="text-xl font-bold text-foreground mb-2">More designs coming soon</h3>
              <p>We are currently updating our portfolio for {selectedOccasion}.</p>
            </div>
          )}

          {/* Prominent Custom Upload CTA */}
          <div className="mt-24 mb-12 bg-card rounded-3xl border border-border shadow-lg p-10 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10 max-w-xl">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Can't find your perfect decoration?
              </h2>
              <div className="w-16 h-1 bg-primary rounded-full mb-6"></div>
              <p className="text-lg text-muted-foreground mb-8">
                Have your own decoration inspiration? Upload your photo and our design team will review it and provide a custom quotation.
              </p>
              <Link 
                href="/custom-request" 
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-card rounded-xl font-bold hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <Upload size={20} className="mr-3" />
                Upload Your Own Design
              </Link>
            </div>
            
            <div className="relative z-10 w-full md:w-auto flex-shrink-0">
              <div className="w-48 h-64 md:w-64 md:h-80 bg-muted/30 rounded-2xl border-2 border-dashed border-primary/30 flex flex-col items-center justify-center text-primary/50 rotate-3 transform-gpu">
                <Upload size={40} className="mb-4" />
                <span className="font-medium text-center px-4">Upload Inspiration</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail View Modal (Fullscreen immersive) */}
      {selectedDecor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-6 bg-background/95 backdrop-blur-lg animate-fade-in">
          <div className="bg-card w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-6xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative">
            
            <button 
              onClick={() => setSelectedDecor(null)} 
              className="absolute top-6 right-6 z-20 w-12 h-12 bg-black/40 hover:bg-black/80 backdrop-blur-md rounded-full text-white flex items-center justify-center transition-colors"
            >
              <X size={24} />
            </button>

            {/* Image side - Dominant */}
            <div className="w-full min-h-[300px] md:min-h-[500px] md:w-3/5 relative bg-muted flex-shrink-0">
              <img src={selectedDecor.img} alt={selectedDecor.title} className="absolute inset-0 w-full h-full object-cover" />
            </div>
            
            {/* Details side */}
            <div className="w-full h-1/2 md:h-full md:w-2/5 p-8 md:p-12 overflow-y-auto flex flex-col justify-center">
              <div className="mb-6">
                <span className="text-sm font-bold text-primary uppercase tracking-wider mb-2 block">
                  {selectedDecor.occasion} Design
                </span>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
                  {selectedDecor.title}
                </h2>
              </div>
              
              <div className="text-3xl font-medium text-foreground mb-6 pb-6 border-b border-border">
                <span className="text-sm text-muted-foreground block mb-1">Starting from</span>
                ₹{selectedDecor.price.toLocaleString('en-IN')}
              </div>
              
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                {selectedDecor.desc}
              </p>
              
              <div className="flex flex-col gap-4 mt-auto">
                <Link 
                  href={`/book?decor=${selectedDecor.id}`}
                  className="w-full py-4 bg-primary text-card text-center rounded-xl font-bold text-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  Select This Design
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
