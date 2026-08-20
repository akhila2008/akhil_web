"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, MapPin, User, Phone, CheckCircle2 } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

// Shared database logic to find the decoration (normally would fetch from API)
const DECORATIONS = [
  { id: 1, title: "Royal Marigold Stage", occasion: "Haldi", price: 35000, img: "/haldi.jpg" },
  { id: 2, title: "Pastel Dream Canopy", occasion: "Birthday", price: 22000, img: "/birthday.jpg" },
  { id: 3, title: "Ivory & Champagne Arch", occasion: "Wedding", price: 45000, img: "/wedding.jpg" },
  { id: 4, title: "Blush Rose Backdrop", occasion: "Engagement", price: 28000, img: "/engagement.jpg" },
  { id: 5, title: "Terracotta Home Setup", occasion: "Housewarming", price: 18000, img: "/housewarming.jpg" },
  { id: 6, title: "Deep Burgundy Romance", occasion: "Anniversary", price: 40000, img: "/anniversary.jpg" },
  { id: 7, title: "Fairy Light Canopy", occasion: "Reception", price: 30000, img: "/reception.jpg" },
  { id: 8, title: "Soft Baby Blue Florals", occasion: "Baby Shower", price: 25000, img: "/baby-shower.jpg" },
  { id: 9, title: "Luxury Floral Mandap", occasion: "Wedding", price: 85000, img: "/wedding-2.jpg" },
  { id: 10, title: "Saffron & Marigold Canopy", occasion: "Haldi", price: 28000, img: "/haldi-2.jpg" },
  { id: 11, title: "Sunshine Seating Lounge", occasion: "Haldi", price: 24000, img: "/haldi-3.jpg" },
  { id: 12, title: "Neon Glow Celebration", occasion: "Birthday", price: 32000, img: "/birthday-2.jpg" },
  { id: 13, title: "Peach Garden Arch", occasion: "Baby Shower", price: 35000, img: "/baby-shower-2.jpg" },
];

function BookingForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setTheme } = useTheme();
  
  const [decor, setDecor] = useState<any>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    date: "",
    venue: "",
    name: "",
    phone: "",
    notes: ""
  });

  useEffect(() => {
    const decorId = searchParams.get("decor");
    if (decorId) {
      // Check local storage first (for admin uploaded)
      const savedAdmin = localStorage.getItem('adminDecorations');
      let found = null;
      if (savedAdmin) {
        const adminDecors = JSON.parse(savedAdmin);
        found = adminDecors.find((d: any) => d.id.toString() === decorId);
      }
      
      // Then check hardcoded
      if (!found) {
        found = DECORATIONS.find(d => d.id.toString() === decorId);
      }

      if (found) {
        setDecor(found);
        setTheme(found.occasion.toLowerCase().replace(' ', '-') as any);
      } else {
        router.push("/gallery");
      }
    } else {
      router.push("/gallery");
    }
  }, [searchParams, router, setTheme]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new booking object
    const newBooking = {
      id: "FE-" + Math.floor(1000 + Math.random() * 9000),
      occasion: decor.occasion,
      date: formData.date,
      location: formData.venue,
      decoration: decor.title,
      status: "New Request",
      estimatedPrice: decor.price.toLocaleString('en-IN'),
      customerName: formData.name,
      customerPhone: formData.phone,
      notes: formData.notes,
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('standardBookings') || '[]');
    localStorage.setItem('standardBookings', JSON.stringify([newBooking, ...existing]));

    setIsSubmitted(true);
    
    // Redirect to dashboard after a short delay
    setTimeout(() => {
      router.push("/dashboard");
    }, 3000);
  };

  if (!decor) return null; // Loading state

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="bg-card p-10 rounded-3xl shadow-xl max-w-md w-full text-center border border-border animate-fade-in">
          <CheckCircle2 size={64} className="text-green-500 mx-auto mb-6" />
          <h2 className="font-serif text-3xl font-bold text-foreground mb-4">Booking Requested!</h2>
          <p className="text-muted-foreground mb-8">
            You have successfully requested the <strong>{decor.title}</strong> design. Our team will contact you shortly to confirm details and process the advance payment.
          </p>
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm text-muted-foreground">Redirecting to Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        
        <Link href="/gallery" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft size={16} className="mr-2" /> Back to Gallery
        </Link>
        
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Selected Decoration Summary (Left Column) */}
          <div className="w-full lg:w-5/12">
            <div className="bg-card rounded-3xl shadow-lg border border-border overflow-hidden sticky top-32">
              <div className="h-64 w-full relative">
                <Image src={decor.img} alt={decor.title} fill className="object-cover" />
              </div>
              <div className="p-8">
                <span className="text-xs font-bold text-primary uppercase tracking-wider mb-2 block">
                  Selected Design
                </span>
                <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
                  {decor.title}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {decor.occasion} Design
                </p>
                
                <div className="pt-6 border-t border-border flex justify-between items-end">
                  <span className="text-sm font-bold text-muted-foreground uppercase">Fixed Price</span>
                  <span className="text-2xl font-bold text-foreground">₹{decor.price.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Booking Form (Right Column) */}
          <div className="w-full lg:w-7/12">
            <div className="bg-card rounded-3xl shadow-lg border border-border p-8 md:p-12">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-2">Event Details</h2>
              <p className="text-muted-foreground mb-8">Please provide your event information to finalize this booking.</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-2 flex items-center">
                      <Calendar size={16} className="mr-2 text-primary" /> Event Date
                    </label>
                    <input 
                      type="date" required
                      value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})}
                      className="w-full p-4 rounded-xl border border-border bg-muted/30 focus:bg-card focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-2 flex items-center">
                      <MapPin size={16} className="mr-2 text-primary" /> Event Location
                    </label>
                    <input 
                      type="text" required placeholder="Venue name & address"
                      value={formData.venue} onChange={e => setFormData({...formData, venue: e.target.value})}
                      className="w-full p-4 rounded-xl border border-border bg-muted/30 focus:bg-card focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-2 flex items-center">
                      <User size={16} className="mr-2 text-primary" /> Your Name
                    </label>
                    <input 
                      type="text" required placeholder="John Doe"
                      value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full p-4 rounded-xl border border-border bg-muted/30 focus:bg-card focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-2 flex items-center">
                      <Phone size={16} className="mr-2 text-primary" /> Phone Number
                    </label>
                    <input 
                      type="tel" required placeholder="+91 98765 43210"
                      value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full p-4 rounded-xl border border-border bg-muted/30 focus:bg-card focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">Additional Notes (Optional)</label>
                  <textarea 
                    rows={3} placeholder="Any specific instructions for reaching the venue, preferred timing, etc."
                    value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})}
                    className="w-full p-4 rounded-xl border border-border bg-muted/30 focus:bg-card focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                  />
                </div>
                
                <div className="bg-primary/5 p-4 rounded-xl border border-primary/20 flex gap-3 text-sm">
                  <span className="text-primary font-bold">i</span>
                  <p className="text-muted-foreground">
                    By requesting this booking, you are confirming the <strong>{decor.title}</strong> design exactly as shown in the gallery. No further customizations are applied to this package.
                  </p>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-5 bg-primary text-card rounded-xl font-bold text-lg hover:shadow-xl hover:-translate-y-1 transition-all shadow-md mt-4"
                >
                  Request Booking
                </button>

              </form>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-muted/20 flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
      <BookingForm />
    </React.Suspense>
  );
}
