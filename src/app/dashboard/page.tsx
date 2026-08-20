"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, CheckCircle, Package, ArrowRight, Image as ImageIcon } from "lucide-react";

export default function DashboardPage() {
  const [customRequests, setCustomRequests] = useState<any[]>([]);

  const [standardBookings, setStandardBookings] = useState<any[]>([]);

  useEffect(() => {
    // Load mock custom requests from localStorage
    const savedCustom = localStorage.getItem('customRequests');
    if (savedCustom) {
      setCustomRequests(JSON.parse(savedCustom));
    }
    
    // Load standard bookings from localStorage
    const savedStandard = localStorage.getItem('standardBookings');
    if (savedStandard) {
      setStandardBookings(JSON.parse(savedStandard));
    } else {
      // Mock event data if none exist
      setStandardBookings([{
        id: "FE-8291",
        occasion: "Haldi",
        date: "15 December 2026",
        location: "Hyderabad, Grand Banquet",
        decoration: "Premium Marigold Theme",
        status: "Design Confirmed",
        estimatedPrice: "72,000"
      }]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-muted/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between animate-fade-in">
          <div>
            <h1 className="font-serif text-4xl font-bold text-foreground mb-2">My Dashboard</h1>
            <p className="text-muted-foreground">Manage your upcoming celebrations and custom design requests.</p>
          </div>
          <Link href="/gallery" className="mt-4 md:mt-0 px-6 py-3 rounded-xl bg-primary text-card font-bold hover:shadow-lg transition-all inline-flex items-center">
            Book New Event <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>

        {/* Custom Decoration Requests Section */}
        {customRequests.length > 0 && (
          <div className="mb-12 animate-fade-in">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">My Custom Decoration Requests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {customRequests.map((req: any) => (
                <div key={req.id} className="bg-card rounded-3xl p-6 border border-border shadow-sm flex flex-col sm:flex-row gap-6 relative overflow-hidden group hover:border-primary/50 transition-colors">
                  <div className="w-full sm:w-32 h-32 rounded-2xl overflow-hidden relative flex-shrink-0 bg-muted border border-border">
                    {req.imagePreview ? (
                      <Image src={req.imagePreview} alt="Custom Request" fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized={true} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground"><ImageIcon /></div>
                    )}
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg text-foreground">{req.eventType} Custom Design</h3>
                        <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border ${
                          req.status === 'PENDING_REVIEW' ? 'bg-orange-50 text-orange-600 border-orange-200' : 
                          req.status === 'QUOTATION_READY' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                          'bg-green-50 text-green-600 border-green-200'
                        }`}>
                          {req.status.replace('_', ' ')}
                        </span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                        <Calendar size={14} className="text-primary/70" /> {req.eventDate}
                      </p>
                      <p className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
                        <MapPin size={14} className="text-primary/70" /> {req.venue}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-border flex justify-between items-center">
                      {req.status === 'PENDING_REVIEW' ? (
                        <div>
                          <span className="text-xs text-muted-foreground block">Price</span>
                          <span className="font-medium text-sm text-foreground">Not Finalized</span>
                        </div>
                      ) : (
                        <div>
                          <span className="text-xs text-muted-foreground block">Final Quotation</span>
                          <span className="font-bold text-lg text-foreground">₹{req.adminPrice?.toLocaleString('en-IN') || '---'}</span>
                        </div>
                      )}
                      
                      {req.status === 'QUOTATION_READY' ? (
                        <button className="px-4 py-2 bg-primary text-card rounded-lg text-sm font-bold hover:shadow-md transition-shadow">
                          Accept Quotation
                        </button>
                      ) : (
                        <button className="px-4 py-2 bg-muted text-foreground rounded-lg text-sm font-medium hover:bg-muted/80 transition-colors">
                          View Details
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Confirmed Bookings</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Event Cards (Flow A Bookings) */}
          <div className="md:col-span-2 space-y-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            {standardBookings.map((booking: any) => (
              <div key={booking.id} className="bg-card rounded-3xl p-8 border border-border shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -mr-10 -mt-10" />
                
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-1">Upcoming Event</div>
                    <h2 className="font-serif text-3xl font-bold text-foreground">{booking.occasion} Ceremony</h2>
                  </div>
                  <span className={`px-3 py-1 border text-sm font-bold rounded-full ${booking.status === 'New Request' ? 'bg-orange-50 text-orange-700 border-orange-200' : 'bg-green-50 text-green-700 border-green-200'}`}>
                    {booking.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-start">
                    <Calendar className="text-primary mr-3 mt-0.5" size={20} />
                    <div>
                      <div className="text-sm text-muted-foreground">Date</div>
                      <div className="font-medium text-foreground">{booking.date}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="text-primary mr-3 mt-0.5" size={20} />
                    <div>
                      <div className="text-sm text-muted-foreground">Venue</div>
                      <div className="font-medium text-foreground">{booking.location}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Package className="text-primary mr-3 mt-0.5" size={20} />
                    <div>
                      <div className="text-sm text-muted-foreground">Decoration</div>
                      <div className="font-medium text-foreground">{booking.decoration}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-primary font-bold text-lg mr-3 mt-0.5">₹</span>
                    <div>
                      <div className="text-sm text-muted-foreground">Total Price</div>
                      <div className="font-medium text-foreground">{booking.estimatedPrice?.toString().includes('₹') ? booking.estimatedPrice : `₹${booking.estimatedPrice}`}</div>
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
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center z-10 mb-2 ${booking.status !== 'New Request' ? 'bg-primary text-card' : 'bg-card border-2 border-primary text-primary'}`}>
                          {booking.status !== 'New Request' ? <CheckCircle size={14} /> : <div className="w-2 h-2 rounded-full bg-primary"></div>}
                        </div>
                        <span className="text-xs font-medium text-foreground">Confirmed</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-muted border-2 border-border z-10 mb-2"></div>
                        <span className="text-xs font-medium text-muted-foreground">Payment</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-muted border-2 border-border z-10 mb-2"></div>
                        <span className="text-xs font-medium text-muted-foreground">Setup</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="bg-card rounded-3xl p-6 border border-border shadow-sm">
              <h3 className="font-serif text-xl font-bold text-foreground mb-4">Event Manager</h3>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center border border-border">
                  <span className="text-lg font-bold text-primary">R</span>
                </div>
                <div>
                  <div className="font-medium text-foreground">Rahul Sharma</div>
                  <div className="text-sm text-muted-foreground">Lead Decorator</div>
                </div>
              </div>
              <button className="w-full py-2.5 rounded-xl bg-muted text-foreground font-medium hover:bg-primary/10 hover:text-primary transition-colors border border-transparent hover:border-primary/20">
                Contact Team
              </button>
            </div>

            <div className="bg-card rounded-3xl p-6 border border-border shadow-sm">
              <h3 className="font-serif text-xl font-bold text-foreground mb-4">Documents</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all">
                  <span className="text-sm font-medium text-foreground">Initial Quotation.pdf</span>
                  <ArrowRight size={16} className="text-muted-foreground" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all">
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
