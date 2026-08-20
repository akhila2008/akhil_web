import React from "react";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";

export default function DecorationsPage() {
  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/admin" className="mr-4 p-2 rounded-full hover:bg-card border border-transparent hover:border-border transition-colors">
              <ArrowLeft size={20} className="text-muted-foreground" />
            </Link>
            <div>
              <h1 className="font-serif text-3xl font-bold text-foreground">Manage Decorations</h1>
              <p className="text-muted-foreground">Add, edit, or remove decoration packages</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-primary text-card rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center">
            <Plus size={16} className="mr-2" /> Add Decoration
          </button>
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-sm p-8 text-center min-h-[500px] flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
          </div>
          <h2 className="text-xl font-bold mb-2">Decoration Management Coming Soon</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            This module is currently under development. Soon you'll be able to upload new decoration designs, categorize them by occasion, and manage their pricing.
          </p>
        </div>
      </div>
    </div>
  );
}
