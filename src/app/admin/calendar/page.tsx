import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center">
          <Link href="/admin" className="mr-4 p-2 rounded-full hover:bg-card border border-transparent hover:border-border transition-colors">
            <ArrowLeft size={20} className="text-muted-foreground" />
          </Link>
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground">Event Calendar</h1>
            <p className="text-muted-foreground">Manage your event schedule</p>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-sm p-8 text-center min-h-[500px] flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
          </div>
          <h2 className="text-xl font-bold mb-2">Calendar View Coming Soon</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            This module is currently under development. Soon you'll be able to view all your upcoming, pending, and completed events visually on a calendar.
          </p>
        </div>
      </div>
    </div>
  );
}
