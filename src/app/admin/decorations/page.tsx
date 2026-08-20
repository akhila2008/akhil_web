"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, UploadCloud, X, Plus, Image as ImageIcon } from "lucide-react";
import { DEFAULT_DECORATIONS, DEFAULT_OCCASIONS } from "@/lib/defaultData";

export default function AdminDecorationsPage() {
  const [adminDecors, setAdminDecors] = useState<any[]>([]);
  const [adminOccasions, setAdminOccasions] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Form State
  const [title, setTitle] = useState("");
  const [occasion, setOccasion] = useState("Wedding");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [imgBase64, setImgBase64] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cover Image State
  const coverInputRef = useRef<HTMLInputElement>(null);
  const [editingCoverFor, setEditingCoverFor] = useState<string | null>(null);

  useEffect(() => {
    // Load Decorations
    const savedDecors = localStorage.getItem('adminDecorations');
    if (savedDecors) {
      setAdminDecors(JSON.parse(savedDecors));
    } else {
      setAdminDecors(DEFAULT_DECORATIONS);
      localStorage.setItem('adminDecorations', JSON.stringify(DEFAULT_DECORATIONS));
    }

    // Load Occasions
    const savedOccasions = localStorage.getItem('adminOccasions');
    if (savedOccasions) {
      setAdminOccasions(JSON.parse(savedOccasions));
    } else {
      setAdminOccasions(DEFAULT_OCCASIONS);
      localStorage.setItem('adminOccasions', JSON.stringify(DEFAULT_OCCASIONS));
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

  const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && editingCoverFor) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        const updated = adminOccasions.map(occ => 
          occ.id === editingCoverFor ? { ...occ, img: base64 } : occ
        );
        setAdminOccasions(updated);
        localStorage.setItem('adminOccasions', JSON.stringify(updated));
        setEditingCoverFor(null);
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
      id: Date.now(), 
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
    
    setTitle("");
    setPrice("");
    setDesc("");
    setImgBase64(null);
    setShowAddForm(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to permanently remove this decoration from the gallery?")) {
      const updated = adminDecors.filter(d => d.id !== id);
      setAdminDecors(updated);
      localStorage.setItem('adminDecorations', JSON.stringify(updated));
    }
  };

  // Group decorations by occasion
  const groupedDecors = adminOccasions.map(occ => ({
    ...occ,
    decorations: adminDecors.filter(d => d.occasion === occ.title)
  }));

  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center">
            <Link href="/admin" className="mr-4 p-2 rounded-full hover:bg-card border border-transparent hover:border-border transition-colors">
              <ArrowLeft size={20} className="text-muted-foreground" />
            </Link>
            <div>
              <h1 className="font-serif text-3xl font-bold text-foreground">Gallery & Occasions Manager</h1>
              <p className="text-muted-foreground">Manage your public portfolio, update cover images, and remove old designs.</p>
            </div>
          </div>
          <button 
            onClick={() => setShowAddForm(true)}
            className="px-6 py-3 bg-primary text-card rounded-xl font-bold hover:shadow-lg transition-shadow flex items-center justify-center flex-shrink-0"
          >
            <Plus size={20} className="mr-2" /> Upload New Design
          </button>
        </div>

        {/* Hidden Cover Image Input */}
        <input 
          type="file" 
          ref={coverInputRef} 
          onChange={handleCoverFileChange} 
          accept="image/*" 
          className="hidden" 
        />

        {/* Categorized Gallery Management */}
        <div className="space-y-12">
          {groupedDecors.map((group) => (
            <div key={group.id} className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden">
              
              {/* Category Header */}
              <div className="p-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-6 bg-muted/10">
                <div className="flex items-center gap-6">
                  {/* Editable Cover Image */}
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-border bg-muted flex-shrink-0 group">
                    {group.img ? (
                      <img src={group.img} alt={group.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground opacity-50">
                        <ImageIcon size={24} />
                      </div>
                    )}
                    
                    {/* Hover Overlay for Uploading */}
                    <div 
                      onClick={() => {
                        setEditingCoverFor(group.id);
                        coverInputRef.current?.click();
                      }}
                      className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm"
                    >
                      <UploadCloud size={20} className="mb-1" />
                      <span className="text-[10px] font-bold text-center">Set Cover</span>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-1">{group.title}</h2>
                    <p className="text-sm text-muted-foreground">
                      Cover Image & {group.decorations.length} Stage {group.decorations.length === 1 ? 'Design' : 'Designs'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Category Decorations */}
              <div className="p-6">
                {group.decorations.length === 0 ? (
                  <div className="text-center py-10 bg-muted/30 rounded-2xl border border-dashed border-border">
                    <p className="text-muted-foreground font-medium mb-2">No stage designs uploaded for {group.title} yet.</p>
                    <button 
                      onClick={() => {
                        setOccasion(group.title);
                        setShowAddForm(true);
                      }}
                      className="text-sm font-bold text-primary hover:underline"
                    >
                      + Upload the first design
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {group.decorations.map((decor: any) => (
                      <div key={decor.id} className="border border-border rounded-xl overflow-hidden shadow-sm relative group bg-card">
                        <div className="h-40 w-full bg-muted relative">
                          <img src={decor.img} alt={decor.title} className="w-full h-full object-cover" />
                          <button 
                            onClick={() => handleDelete(decor.id)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 shadow-md hover:scale-105"
                            title="Delete permanently"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-foreground mb-1 line-clamp-1">{decor.title}</h3>
                          <p className="text-xs text-muted-foreground font-medium mb-2">₹{decor.price?.toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

        {/* Add Decoration Modal */}
        {showAddForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-card w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]">
              
              <div className="p-6 border-b border-border flex justify-between items-center bg-muted/10">
                <h2 className="font-serif text-2xl font-bold text-foreground">Upload New Decoration</h2>
                <button onClick={() => setShowAddForm(false)} className="text-muted-foreground hover:text-foreground bg-card p-1 rounded-full shadow-sm border border-border">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddDecoration} className="p-6 overflow-y-auto flex-1 space-y-6">
                
                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">Stage Decoration Photo</label>
                  {!imgBase64 ? (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full h-48 border-2 border-dashed border-border hover:border-primary rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors bg-muted/30 text-muted-foreground hover:bg-primary/5"
                    >
                      <UploadCloud size={32} className="mb-2" />
                      <span className="font-medium">Click to upload photo</span>
                    </div>
                  ) : (
                    <div className="relative w-full h-64 rounded-xl overflow-hidden border border-border shadow-sm">
                      <img src={imgBase64} alt="Preview" className="w-full h-full object-cover" />
                      <button 
                        type="button"
                        onClick={() => setImgBase64(null)}
                        className="absolute top-3 right-3 bg-black/60 hover:bg-black/90 text-white rounded-full p-2 backdrop-blur-md transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-2">Decoration Title</label>
                    <input 
                      type="text" required placeholder="e.g. Elegant White Mandap"
                      value={title} onChange={e => setTitle(e.target.value)}
                      className="w-full p-3 rounded-xl border border-border bg-card outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-2">Occasion Category</label>
                    <select 
                      value={occasion} onChange={e => setOccasion(e.target.value)}
                      className="w-full p-3 rounded-xl border border-border bg-card outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all appearance-none"
                    >
                      {adminOccasions.map(occ => (
                        <option key={occ.id} value={occ.title}>{occ.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">Starting Price (₹)</label>
                  <input 
                    type="number" required placeholder="e.g. 25000"
                    value={price} onChange={e => setPrice(e.target.value)}
                    className="w-full p-3 rounded-xl border border-border bg-card outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">Description</label>
                  <textarea 
                    required rows={3} placeholder="Describe the materials, setup, and vibe..."
                    value={desc} onChange={e => setDesc(e.target.value)}
                    className="w-full p-3 rounded-xl border border-border bg-card outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                  />
                </div>

                <button type="submit" className="w-full py-4 bg-primary text-card rounded-xl font-bold hover:shadow-lg hover:-translate-y-1 transition-all mt-4">
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
