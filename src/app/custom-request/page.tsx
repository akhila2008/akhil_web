"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, UploadCloud, X, CheckCircle2, Image as ImageIcon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export default function CustomRequestPage() {
  const { setTheme } = useTheme();
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    eventType: "Wedding",
    eventDate: "",
    venue: "",
    description: "",
    requirements: ""
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEventTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value;
    setFormData({ ...formData, eventType: newType });
    setTheme(newType.toLowerCase().replace(' ', '-') as any);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setImagePreview(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePreview) {
      alert("Please upload an inspiration photo.");
      return;
    }
    
    // MOCK: Save to localStorage for demo purposes
    const request = {
      id: "CR-" + Math.floor(Math.random() * 10000),
      ...formData,
      imagePreview,
      status: "PENDING_REVIEW",
      submittedAt: new Date().toISOString()
    };
    
    const existing = JSON.parse(localStorage.getItem('customRequests') || '[]');
    localStorage.setItem('customRequests', JSON.stringify([request, ...existing]));

    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-muted/20 flex flex-col items-center justify-center p-4">
        <div className="bg-card p-10 rounded-3xl shadow-xl max-w-md w-full text-center border border-border animate-fade-in">
          <CheckCircle2 size={64} className="text-green-500 mx-auto mb-6" />
          <h2 className="font-serif text-3xl font-bold text-foreground mb-4">Request Sent!</h2>
          <p className="text-muted-foreground mb-8">
            Your custom decoration inspiration has been uploaded. Our design team will review your requirements and finalize a custom quotation for you shortly.
          </p>
          <div className="bg-muted p-4 rounded-xl mb-8 border border-border">
            <span className="block text-sm font-bold text-foreground mb-1">Current Status:</span>
            <span className="inline-flex items-center gap-2 text-orange-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse"></span>
              Awaiting Design Review
            </span>
          </div>
          <Link href="/dashboard" className="block w-full py-3 bg-primary text-card rounded-xl font-bold hover:opacity-90 transition-opacity">
            Track Request in Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 pt-24 pb-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
      <div className="max-w-4xl mx-auto">
        
        <Link href="/gallery" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft size={16} className="mr-2" /> Back to Gallery
        </Link>
        
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Upload Your Inspiration
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Share a photo of the exact decoration design you want. Our expert team will review it and provide a custom quotation.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-3xl shadow-xl border border-border overflow-hidden">
          
          <div className="flex flex-col md:flex-row">
            {/* Upload Area */}
            <div className="w-full md:w-1/2 p-8 md:p-12 border-b md:border-b-0 md:border-r border-border bg-muted/10 flex flex-col justify-center">
              
              {!imagePreview ? (
                <div 
                  className={`w-full h-80 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all ${
                    isDragging ? 'border-primary bg-primary/10 scale-[1.02]' : 'border-border hover:border-primary/50 hover:bg-muted'
                  }`}
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      const url = URL.createObjectURL(e.dataTransfer.files[0]);
                      setImagePreview(url);
                    }
                  }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <UploadCloud size={48} className="text-primary/60 mb-4" />
                  <h3 className="text-lg font-bold text-foreground mb-2">Drag & Drop Photo</h3>
                  <p className="text-sm text-muted-foreground mb-6">or click to browse from device</p>
                  <span className="px-6 py-2 bg-primary text-card rounded-full text-sm font-bold">
                    Select File
                  </span>
                  <p className="text-xs text-muted-foreground mt-4">Supports JPG, PNG, WEBP</p>
                </div>
              ) : (
                <div className="relative w-full h-80 rounded-3xl overflow-hidden border border-border group">
                  <Image src={imagePreview} alt="Uploaded Inspiration" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      type="button"
                      onClick={() => setImagePreview(null)}
                      className="px-4 py-2 bg-white text-black rounded-full text-sm font-bold flex items-center gap-2 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <X size={16} /> Remove Photo
                    </button>
                  </div>
                  <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                    <CheckCircle2 size={12} /> Uploaded
                  </div>
                </div>
              )}
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
              />
            </div>
            
            {/* Form Details */}
            <div className="w-full md:w-1/2 p-8 md:p-12 space-y-6">
              
              <div>
                <label className="block text-sm font-bold text-foreground mb-2">Event Occasion</label>
                <select 
                  required
                  value={formData.eventType}
                  onChange={handleEventTypeChange}
                  className="w-full p-4 rounded-xl border border-border bg-card focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none"
                >
                  <option value="Wedding">Wedding</option>
                  <option value="Haldi">Haldi</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Engagement">Engagement</option>
                  <option value="Baby Shower">Baby Shower</option>
                  <option value="Reception">Reception</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Housewarming">Housewarming</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">Event Date</label>
                  <input 
                    type="date" required
                    value={formData.eventDate} onChange={e => setFormData({...formData, eventDate: e.target.value})}
                    className="w-full p-4 rounded-xl border border-border bg-card focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">Venue Location</label>
                  <input 
                    type="text" required placeholder="e.g. Taj Krishna"
                    value={formData.venue} onChange={e => setFormData({...formData, venue: e.target.value})}
                    className="w-full p-4 rounded-xl border border-border bg-card focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-foreground mb-2">Describe what you want</label>
                <textarea 
                  rows={2} placeholder="E.g. I want exactly this backdrop but with red roses instead of pink..."
                  value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full p-4 rounded-xl border border-border bg-card focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                />
              </div>

              {/* Price Disclaimer */}
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex gap-4">
                <div className="mt-1">
                  <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">i</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm">No Payment Required Yet</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Custom designs do not have automatic pricing. Once you submit this photo, our team will review the complexity and materials required, then send you a final quotation.
                  </p>
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full py-4 bg-primary text-card rounded-xl font-bold text-lg hover:shadow-lg transition-all shadow-md"
              >
                Submit Decoration Request
              </button>

            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
