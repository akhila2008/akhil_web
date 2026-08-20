"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, UploadCloud, X, Plus } from "lucide-react";

export default function AdminDecorationsPage() {
  const [adminDecors, setAdminDecors] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Form State
  const [title, setTitle] = useState("");
  const [occasion, setOccasion] = useState("Wedding");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [imgBase64, setImgBase64] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const OCCASIONS_LIST = [
    "Wedding", "Haldi", "Birthday", "Engagement", "Baby Shower", 
    "Anniversary", "Reception", "Housewarming", "Mehendi", 
    "Naming Ceremony", "Corporate Event"
  ];

  useEffect(() => {
    const saved = localStorage.getItem('adminDecorations');
    if (saved) {
      setAdminDecors(JSON.parse(saved));
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddDecoration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imgBase64) {
      alert("Please upload an image.");
      return;
    }
    
    const newDecor = {
      id: Date.now(), // Unique ID based on timestamp
      title,
      occasion,
      price: parseInt(price),
      img: imgBase64,
      desc,
      status: 'Active'
    };
    
    const updated = [newDecor, ...adminDecors];
    setAdminDecors(updated);
    localStorage.setItem('adminDecorations', JSON.stringify(updated));
    
    // Reset Form
    setTitle("");
    setPrice("");
    setDesc("");
    setImgBase64(null);
    setShowAddForm(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to remove this decoration from the gallery?")) {
      const updated = adminDecors.filter(d => d.id !== id);
      setAdminDecors(updated);
      localStorage.setItem('adminDecorations', JSON.stringify(updated));
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/admin" className="mr-4 p-2 rounded-full hover:bg-card border border-transparent hover:border-border transition-colors">
              <ArrowLeft size={20} className="text-muted-foreground" />
            </Link>
            <div>
              <h1 className="font-serif text-3xl font-bold text-foreground">Gallery Management</h1>
              <p className="text-muted-foreground">Add and manage stage decorations in your public gallery.</p>
            </div>
          </div>
          <button 
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-primary text-card rounded-lg font-bold hover:shadow-md transition-shadow flex items-center"
          >
            <Plus size={18} className="mr-2" /> Add New Design
          </button>
        </div>

        {/* Existing Admin Uploads */}
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6 mb-8">
          <h2 className="font-serif text-xl font-bold text-foreground mb-6">Your Uploaded Designs</h2>
          
          {adminDecors.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              You haven't uploaded any custom designs yet. Click "Add New Design" to expand your gallery!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adminDecors.map(decor => (
                <div key={decor.id} className="border border-border rounded-xl overflow-hidden shadow-sm relative group">
                  <div className="h-48 w-full bg-muted relative">
                    <img src={decor.img} alt={decor.title} className="w-full h-full object-cover" />
                    <button 
                      onClick={() => handleDelete(decor.id)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-1">{decor.occasion}</span>
                    <h3 className="font-bold text-foreground mb-1">{decor.title}</h3>
                    <p className="text-sm text-muted-foreground font-medium mb-2">₹{decor.price?.toLocaleString('en-IN')}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{decor.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Decoration Modal */}
        {showAddForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-card w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]">
              
              <div className="p-6 border-b border-border flex justify-between items-center bg-muted/10">
                <h2 className="font-serif text-2xl font-bold text-foreground">Upload New Decoration</h2>
                <button onClick={() => setShowAddForm(false)} className="text-muted-foreground hover:text-foreground">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleAddDecoration} className="p-6 overflow-y-auto flex-1 space-y-6">
                
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">Stage Decoration Photo</label>
                  {!imgBase64 ? (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full h-48 border-2 border-dashed border-border hover:border-primary rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors bg-muted/30 text-muted-foreground"
                    >
                      <UploadCloud size={32} className="mb-2" />
                      <span className="font-medium">Click to upload photo</span>
                    </div>
                  ) : (
                    <div className="relative w-full h-64 rounded-xl overflow-hidden border border-border">
                      <img src={imgBase64} alt="Preview" className="w-full h-full object-cover" />
                      <button 
                        type="button"
                        onClick={() => setImgBase64(null)}
                        className="absolute top-2 right-2 bg-black/50 hover:bg-black/80 text-white rounded-full p-2"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-2">Decoration Title</label>
                    <input 
                      type="text" required placeholder="e.g. Elegant White Mandap"
                      value={title} onChange={e => setTitle(e.target.value)}
                      className="w-full p-3 rounded-xl border border-border bg-card outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-2">Occasion Category</label>
                    <select 
                      value={occasion} onChange={e => setOccasion(e.target.value)}
                      className="w-full p-3 rounded-xl border border-border bg-card outline-none focus:border-primary appearance-none"
                    >
                      {OCCASIONS_LIST.map(occ => (
                        <option key={occ} value={occ}>{occ}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">Starting Price (₹)</label>
                  <input 
                    type="number" required placeholder="e.g. 25000"
                    value={price} onChange={e => setPrice(e.target.value)}
                    className="w-full p-3 rounded-xl border border-border bg-card outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">Description</label>
                  <textarea 
                    required rows={3} placeholder="Describe the materials, setup, and vibe..."
                    value={desc} onChange={e => setDesc(e.target.value)}
                    className="w-full p-3 rounded-xl border border-border bg-card outline-none focus:border-primary resize-none"
                  />
                </div>

                <button type="submit" className="w-full py-4 bg-primary text-card rounded-xl font-bold hover:shadow-lg transition-shadow mt-4">
                  Publish to Gallery
                </button>
              </form>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
