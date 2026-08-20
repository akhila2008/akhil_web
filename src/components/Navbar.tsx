"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full glass-card border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-primary">
              Floraa Events
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-foreground/80 hover:text-primary transition-colors">Home</Link>
            <Link href="/occasions" className="text-foreground/80 hover:text-primary transition-colors">Occasions</Link>
            <Link href="/gallery" className="text-foreground/80 hover:text-primary transition-colors">Gallery</Link>
            <Link href="/build" className="text-foreground/80 hover:text-primary transition-colors">Packages</Link>
            
            <Link 
              href="/build" 
              className="ml-4 px-6 py-2.5 rounded-full bg-primary text-card transition-transform hover:scale-105 active:scale-95 shadow-sm font-medium"
            >
              Plan My Event
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-primary"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass-card absolute w-full border-b animate-fade-in shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-4 flex flex-col">
            <Link href="/" className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/occasions" className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary" onClick={() => setIsOpen(false)}>Occasions</Link>
            <Link href="/gallery" className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary" onClick={() => setIsOpen(false)}>Gallery</Link>
            <Link href="/build" className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary" onClick={() => setIsOpen(false)}>Packages</Link>
            <Link 
              href="/build" 
              onClick={() => setIsOpen(false)}
              className="block mt-4 text-center px-6 py-3 rounded-xl bg-primary text-card font-medium"
            >
              Plan My Event
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
