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
            <Link href="/gallery" className="text-foreground/80 hover:text-primary transition-colors">Packages</Link>
            <Link href="/custom-request" className="text-foreground/80 hover:text-primary transition-colors">Custom Designs</Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/gallery" 
              className="px-6 py-2.5 bg-primary text-card rounded-full font-medium hover:opacity-90 transition-opacity shadow-sm"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-primary p-2 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-card border-b border-border absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link href="/" className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/occasions" className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary" onClick={() => setIsOpen(false)}>Occasions</Link>
            <Link href="/gallery" className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary" onClick={() => setIsOpen(false)}>Packages</Link>
            <Link href="/custom-request" className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary" onClick={() => setIsOpen(false)}>Custom Designs</Link>
            <Link 
              href="/gallery" 
              className="block mt-4 px-3 py-3 bg-primary text-card text-center rounded-xl font-medium shadow-sm"
              onClick={() => setIsOpen(false)}
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
