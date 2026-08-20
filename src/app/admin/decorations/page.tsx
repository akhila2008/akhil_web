"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Search, Edit2, Trash2, X, Image as ImageIcon } from "lucide-react";

type Decoration = {
  id: string;
  name: string;
  occasion: string;
  category: string;
  price: number;
  status: "Active" | "Draft";
};

const INITIAL_DATA: Decoration[] = [
  { id: "1", name: "Royal Marigold Stage", occasion: "Haldi", category: "Stage", price: 35000, status: "Active" },
  { id: "2", name: "Pastel Dream Canopy", occasion: "Birthday", category: "Ceiling", price: 22000, status: "Active" },
  { id: "3", name: "Ivory & Champagne Arch", occasion: "Wedding", category: "Entrance", price: 45000, status: "Active" },
];

export default function DecorationsPage() {
  const [decorations, setDecorations] = useState<Decoration[]>(INITIAL_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "", occasion: "Wedding", category: "Stage", price: "", status: "Active"
  });

  const filteredDecorations = decorations.filter(dec => 
    dec.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    dec.occasion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (dec?: Decoration) => {
    if (dec) {
      setFormData({
        name: dec.name, occasion: dec.occasion, category: dec.category, price: dec.price.toString(), status: dec.status
      });
      setEditingId(dec.id);
    } else {
      setFormData({ name: "", occasion: "Wedding", category: "Stage", price: "", status: "Active" });
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setDecorations(decorations.map(d => d.id === editingId ? { ...formData, id: editingId, price: Number(formData.price) } as Decoration : d));
    } else {
      const newDec: Decoration = { ...formData, id: Date.now().toString(), price: Number(formData.price) } as Decoration;
      setDecorations([...decorations, newDec]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if(confirm("Are you sure you want to delete this decoration?")) {
      setDecorations(decorations.filter(d => d.id !== id));
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
              <p className="text-muted-foreground">Add, edit, or remove decoration packages</p>
            </div>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="px-5 py-2.5 bg-primary text-card rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center shadow-sm"
          >
            <Plus size={18} className="mr-2" /> Add Decoration
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
                <th className="p-4 font-medium w-16">Image</th>
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
                    <div className="w-10 h-10 rounded bg-muted flex items-center justify-center border border-border">
                      <ImageIcon size={16} className="text-muted-foreground" />
                    </div>
                  </td>
                  <td className="p-4 font-medium text-foreground">{dec.name}</td>
                  <td className="p-4 text-muted-foreground">{dec.occasion}</td>
                  <td className="p-4 text-muted-foreground">{dec.category}</td>
                  <td className="p-4 font-medium text-foreground">₹{dec.price.toLocaleString('en-IN')}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${dec.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                      {dec.status}
                    </span>
                  </td>
                  <td className="p-4 flex justify-end gap-2">
                    <button onClick={() => handleOpenModal(dec)} className="p-2 text-muted-foreground hover:text-primary transition-colors hover:bg-primary/10 rounded-lg">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(dec.id)} className="p-2 text-muted-foreground hover:text-red-500 transition-colors hover:bg-red-50 rounded-lg">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredDecorations.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-muted-foreground">
                    No decorations found. Try adjusting your search or add a new one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-card w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-border">
            <div className="p-6 border-b border-border flex justify-between items-center bg-muted/30">
              <h2 className="font-serif text-xl font-bold text-foreground">
                {editingId ? "Edit Decoration" : "Add New Decoration"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Design Name</label>
                <input 
                  type="text" required
                  className="w-full p-3 rounded-xl border border-border bg-card focus:border-primary outline-none"
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Occasion</label>
                  <select 
                    className="w-full p-3 rounded-xl border border-border bg-card focus:border-primary outline-none"
                    value={formData.occasion} onChange={e => setFormData({...formData, occasion: e.target.value})}
                  >
                    <option value="Wedding">Wedding</option>
                    <option value="Haldi">Haldi</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Engagement">Engagement</option>
                    <option value="Baby Shower">Baby Shower</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Category</label>
                  <select 
                    className="w-full p-3 rounded-xl border border-border bg-card focus:border-primary outline-none"
                    value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="Stage">Stage</option>
                    <option value="Backdrop">Backdrop</option>
                    <option value="Entrance">Entrance</option>
                    <option value="Ceiling">Ceiling</option>
                    <option value="Lighting">Lighting</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Starting Price (₹)</label>
                <input 
                  type="number" required min="0"
                  className="w-full p-3 rounded-xl border border-border bg-card focus:border-primary outline-none"
                  value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Status</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" checked={formData.status === "Active"} onChange={() => setFormData({...formData, status: "Active"})} />
                    <span className="text-sm">Active</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" checked={formData.status === "Draft"} onChange={() => setFormData({...formData, status: "Draft"})} />
                    <span className="text-sm">Draft</span>
                  </label>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl border border-border text-foreground font-medium hover:bg-muted">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-primary text-card font-medium hover:opacity-90">
                  {editingId ? "Save Changes" : "Add Decoration"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
