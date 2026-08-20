"use client";

import React from "react";
import Link from "next/link";
import { Calendar, MapPin, CheckCircle, Package } from "lucide-react";

export default function DashboardPage() {
  // Mock event data
  const upcomingEvent = {
    id: "FE-8291",
    occasion: "Haldi",
    date: "15 December 2026",
    location: "Hyderabad, Grand Banquet",
    decoration: "Premium Marigold Theme",
    status: "Design Confirmed",
    estimatedPrice: "72,000"
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between animate-fade-in">
          <div>
            <h1 className="font-serif text-4xl font-bold text-foreground mb-2">My Events</h1>
            <p className="text-muted-foreground">Manage your upcoming and past celebrations.</p>
          </div>
          <Link href="/build" className="mt-4 md:mt-0 px-6 py-2.5 rounded-full bg-primary text-card font-medium transition-transform hover:scale-105 shadow-sm inline-block text-center">
            Book New Event
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Event Card */}
          <div className="md:col-span-2 space-y-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="glass-card rounded-3xl p-8 border border-border shadow-md relative overflow-hidden">
              {/* Decorative accent based on theme */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -mr-10 -mt-10" />
              
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-1">Upcoming Event</div>
                  <h2 className="font-serif text-3xl font-bold text-foreground">{upcomingEvent.occasion} Ceremony</h2>
                </div>
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                  {upcomingEvent.status}
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start">
                  <Calendar className="text-primary mr-3 mt-0.5" size={20} />
                  <div>
                    <div className="text-sm text-muted-foreground">Date</div>
                    <div className="font-medium text-foreground">{upcomingEvent.date}</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="text-primary mr-3 mt-0.5" size={20} />
                  <div>
                    <div className="text-sm text-muted-foreground">Venue</div>
                    <div className="font-medium text-foreground">{upcomingEvent.location}</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <Package className="text-primary mr-3 mt-0.5" size={20} />
                  <div>
                    <div className="text-sm text-muted-foreground">Decoration</div>
                    <div className="font-medium text-foreground">{upcomingEvent.decoration}</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary font-bold text-lg mr-3 mt-0.5">₹</span>
                  <div>
                    <div className="text-sm text-muted-foreground">Estimated Price</div>
                    <div className="font-medium text-foreground">{upcomingEvent.estimatedPrice}</div>
                  </div>
                </div>
              </div>

              {/* Status Tracking Timeline */}
              <div className="mt-8 pt-8 border-t border-border">
                <h3 className="font-medium text-foreground mb-6">Tracking Status</h3>
                <div className="relative">
                  <div className="absolute top-3 left-0 w-full h-0.5 bg-muted"></div>
                  <div className="absolute top-3 left-0 w-1/3 h-0.5 bg-primary"></div>
                  
                  <div className="relative flex justify-between">
                    <div className="flex flex-col items-center">
                      <div className="w-6 h-6 rounded-full bg-primary text-card flex items-center justify-center z-10 mb-2">
                        <CheckCircle size={14} />
                      </div>
                      <span className="text-xs font-medium text-foreground">Requested</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-6 h-6 rounded-full bg-primary text-card flex items-center justify-center z-10 mb-2">
                        <CheckCircle size={14} />
                      </div>
                      <span className="text-xs font-medium text-foreground">Confirmed</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-6 h-6 rounded-full bg-card border-2 border-primary text-primary flex items-center justify-center z-10 mb-2">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                      </div>
                      <span className="text-xs font-medium text-primary">Payment</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-6 h-6 rounded-full bg-muted border-2 border-border z-10 mb-2"></div>
                      <span className="text-xs font-medium text-muted-foreground">Setup</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="glass-card rounded-2xl p-6 border border-border shadow-sm">
              <h3 className="font-serif text-xl font-bold text-foreground mb-4">Event Manager</h3>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">R</span>
                </div>
                <div>
                  <div className="font-medium text-foreground">Rahul Sharma</div>
                  <div className="text-sm text-muted-foreground">Lead Decorator</div>
                </div>
              </div>
              <button className="w-full py-2 rounded-xl bg-muted text-foreground font-medium hover:bg-primary/10 transition-colors">
                Contact Team
              </button>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-border shadow-sm">
              <h3 className="font-serif text-xl font-bold text-foreground mb-4">Documents</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 rounded-xl border border-border hover:border-primary/50 transition-colors">
                  <span className="text-sm font-medium text-foreground">Initial Quotation.pdf</span>
                  <ArrowRight size={16} className="text-muted-foreground" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-xl border border-border hover:border-primary/50 transition-colors">
                  <span className="text-sm font-medium text-foreground">Design Render.jpg</span>
                  <ArrowRight size={16} className="text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Icon hack to reuse ArrowRight without re-importing above
function ArrowRight(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  );
}
