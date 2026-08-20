"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Plus, Search, Edit2, Trash2, X, Image as ImageIcon, UploadCloud } from "lucide-react";

type Decoration = {
  id: string;
  name: string;
  occasion: string;
  category: string;
  price: number;
  status: "Active" | "Draft";
  img?: string;
  desc?: string;
};

const INITIAL_DATA: Decoration[] = [
  { id: "1", name: "Royal Marigold Stage", occasion: "Haldi", category: "Stage", price: 35000, status: "Active", img: "/haldi.jpg" },
  { id: "2", name: "Pastel Dream Canopy", occasion: "Birthday", category: "Ceiling", price: 22000, status: "Active", img: "/birthday.jpg" },
  { id: "3", name: "Ivory & Champagne Arch", occasion: "Wedding", category: "Entrance", price: 45000, status: "Active", img: "/wedding.jpg" },
];

export default function DecorationsPage() {
  const [decorations, setDecorations] = useState<Decoration[]>(INITIAL_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Image Upload State
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Sync with localStorage so the gallery can see new uploads
    const saved = localStorage.getItem('adminDecorations');
    if (saved) {
      setDecorations(JSON.parse(saved));
    } else {
      localStorage.setItem('adminDecorations', JSON.stringify(INITIAL_DATA));
    }
  }, []);

  const saveToStorage = (newDecors: Decoration[]) => {
    setDecorations(newDecors);
    localStorage.setItem('adminDecorations', JSON.stringify(newDecors));
  };

  // Form State
  const [formData, setFormData] = useState({
    name: "", occasion: "Wedding", category: "Stage", price: "", status: "Active", desc: ""
  });

  const filteredDecorations = decorations.filter(dec => 
    dec.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    dec.occasion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (dec?: Decoration) => {
    if (dec) {
      setFormData({
        name: dec.name, occasion: dec.occasion, category: dec.category, 
        price: dec.price.toString(), status: dec.status, desc: dec.desc || ""
      });
      setImagePreview(dec.img || null);
      setEditingId(dec.id);
    } else {
      setFormData({ name: "", occasion: "Wedding", category: "Stage", price: "", status: "Active", desc: "" });
      setImagePreview(null);
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePreview) {
      alert("Please upload a decoration image.");
      return;
    }

    if (editingId) {
      saveToStorage(decorations.map(d => d.id === editingId ? { 
        ...formData, id: editingId, price: Number(formData.price), img: imagePreview 
      } as Decoration : d));
    } else {
      const newDec: Decoration = { 
        ...formData, id: Date.now().toString(), price: Number(formData.price), img: imagePreview 
      } as Decoration;
      saveToStorage([newDec, ...decorations]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if(confirm("Are you sure you want to delete this decoration?")) {
      saveToStorage(decorations.filter(d => d.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center">
            <Link href="/admin" className="mr-4 p-2 rounded-full hover:bg-card border border-transparent hover:border-border transition-colors">
              <ArrowLeft size={20} className="text-muted-foreground" />
            </Link>
            <div>
              <h1 className="font-serif text-3xl font-bold text-foreground">Manage Decorations</h1>
              <p className="text-muted-foreground">Upload and manage your decoration gallery</p>
            </div>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="px-5 py-2.5 bg-primary text-card rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center shadow-sm"
          >
            <Plus size={18} className="mr-2" /> Upload Decoration
          </button>
        </div>

        {/* Filters & Search */}
        <div className="bg-card p-4 rounded-t-2xl border-t border-l border-r border-border flex items-center">
          <div className="relative w-full max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search decorations..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-card rounded-b-2xl border border-border shadow-sm overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-muted/50 text-muted-foreground text-sm border-b border-border">
                <th className="p-4 font-medium w-24">Photo</th>
                <th className="p-4 font-medium">Design Name</th>
                <th className="p-4 font-medium">Occasion</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Starting Price</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDecorations.map((dec) => (
                <tr key={dec.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <div className="w-16 h-12 rounded-lg bg-muted flex items-center justify-center border border-border overflow-hidden relative">
                      {dec.img ? (
                        <Image src={dec.img} alt={dec.name} fill className="object-cover" unoptimized={true} />
                      ) : (
                        <ImageIcon size={16} className="text-muted-foreground" />
                      )}
                    </div>
                  </td>
                  <td className="p-4 font-bold text-foreground">{dec.name}</td>
                  <td className="p-4 text-muted-foreground">{dec.occasion}</td>
                  <td className="p-4 text-muted-foreground">{dec.category}</td>
                  <td className="p-4 font-medium text-foreground">₹{dec.price.toLocaleString('en-IN')}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${dec.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                      {dec.status}
                    </span>
                  </td>
                  <td className="p-4 flex justify-end gap-2">
                    <button onClick={() => handleOpenModal(dec)} className="p-2 text-muted-foreground hover:text-primary transition-colors hover:bg-primary/10 rounded-lg" title="Edit">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(dec.id)} className="p-2 text-muted-foreground hover:text-red-500 transition-colors hover:bg-red-50 rounded-lg" title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredDecorations.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-muted-foreground">
                    <ImageIcon size={48} className="mx-auto mb-4 opacity-20" />
                    No decorations found. Upload a new design to show it in the gallery.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-card w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative">
            
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/10 hover:bg-black/80 backdrop-blur-md rounded-full text-white flex items-center justify-center transition-colors">
              <X size={20} />
            </button>
            
            {/* Image Upload Side */}
            <div className="w-full md:w-2/5 bg-muted p-8 border-b md:border-b-0 md:border-r border-border flex flex-col items-center justify-center relative">
              {!imagePreview ? (
                <div 
                  className="w-full h-full min-h-[300px] border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <UploadCloud size={48} className="text-primary/50 mb-4" />
                  <h3 className="font-bold text-foreground mb-2">Upload Photo</h3>
                  <p className="text-xs text-muted-foreground">Click to select an image from your device</p>
                </div>
              ) : (
                <div className="w-full h-full min-h-[300px] relative rounded-2xl overflow-hidden group">
                  <Image src={imagePreview} alt="Preview" fill className="object-cover" unoptimized={true} />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-white text-black rounded-full text-sm font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors"
                    >
                      Change Photo
                    </button>
                  </div>
                </div>
              )}
              <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
            </div>

            {/* Form Side */}
            <form onSubmit={handleSave} className="w-full md:w-3/5 p-8 flex flex-col h-full max-h-[80vh] overflow-y-auto">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                {editingId ? "Edit Decoration" : "Upload New Decoration"}
              </h2>
              
              <div className="space-y-4 flex-1">
                <div>
                  <label className="block text-sm font-bold text-foreground mb-1">Design Name</label>
                  <input 
                    type="text" required placeholder="e.g. Royal Marigold Stage"
                    className="w-full p-3 rounded-xl border border-border bg-card focus:border-primary outline-none"
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-1">Occasion</label>
                    <select 
                      className="w-full p-3 rounded-xl border border-border bg-card focus:border-primary outline-none"
                      value={formData.occasion} onChange={e => setFormData({...formData, occasion: e.target.value})}
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
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-1">Category</label>
                    <select 
                      className="w-full p-3 rounded-xl border border-border bg-card focus:border-primary outline-none"
                      value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
                    >
                      <option value="Stage">Stage</option>
                      <option value="Backdrop">Backdrop</option>
                      <option value="Entrance">Entrance</option>
                      <option value="Ceiling">Ceiling</option>
                      <option value="Lighting">Lighting</option>
                      <option value="Floral">Floral</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-foreground mb-1">Starting Price (₹)</label>
                  <input 
                    type="number" required min="0" placeholder="e.g. 35000"
                    className="w-full p-3 rounded-xl border border-border bg-card focus:border-primary outline-none"
                    value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-foreground mb-1">Description</label>
                  <textarea 
                    rows={2} placeholder="Describe the decoration..."
                    className="w-full p-3 rounded-xl border border-border bg-card focus:border-primary outline-none resize-none"
                    value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-foreground mb-1">Status</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" checked={formData.status === "Active"} onChange={() => setFormData({...formData, status: "Active"})} className="accent-primary" />
                      <span className="text-sm font-medium">Active (Visible in Gallery)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" checked={formData.status === "Draft"} onChange={() => setFormData({...formData, status: "Draft"})} className="accent-primary" />
                      <span className="text-sm font-medium text-muted-foreground">Draft (Hidden)</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 mt-6 border-t border-border flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-3 rounded-xl border border-border text-foreground font-bold hover:bg-muted transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-3 rounded-xl bg-primary text-card font-bold hover:opacity-90 transition-opacity shadow-md flex items-center">
                  {editingId ? "Save Changes" : <><UploadCloud size={18} className="mr-2" /> Upload Decoration</>}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}
