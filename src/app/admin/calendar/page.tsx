"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight, Calendar as CalendarIcon, MapPin, Clock, Users } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

// Mock Data for Events
type CalendarEvent = {
  id: string;
  title: string;
  type: string;
  date: number; // Day of the month
  status: "Confirmed" | "Pending" | "Completed" | "Setup";
  location: string;
  guests: string;
  time: string;
};

const MOCK_EVENTS: CalendarEvent[] = [
  { id: "1", title: "Anjali's Wedding", type: "Wedding", date: 15, status: "Confirmed", location: "Taj Krishna Banquet", guests: "800", time: "6:00 PM" },
  { id: "2", title: "Rahul's Haldi", type: "Haldi", date: 18, status: "Pending", location: "Farmhouse, Jubilee Hills", guests: "150", time: "10:00 AM" },
  { id: "3", title: "Priya's Birthday", type: "Birthday", date: 22, status: "Setup", location: "Novotel Poolside", guests: "50", time: "4:00 PM" },
  { id: "4", title: "Vikram's Reception", type: "Reception", date: 5, status: "Completed", location: "ITC Kakatiya", guests: "1200", time: "7:00 PM" },
  { id: "5", title: "Neha's Baby Shower", type: "Baby Shower", date: 28, status: "Confirmed", location: "Home Setup, Banjara Hills", guests: "30", time: "11:00 AM" },
];

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<number | null>(15);
  const { setTheme } = useTheme();

  // Basic calendar logic for a mock month (e.g., December 2026)
  const daysInMonth = 31;
  const startingDayOfWeek = 2; // e.g., Tuesday
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: startingDayOfWeek }, (_, i) => i);

  const selectedEvents = MOCK_EVENTS.filter(e => e.date === selectedDate);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Confirmed': return 'bg-green-100 text-green-700 border-green-200';
      case 'Pending': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Completed': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Setup': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTypeColorClass = (type: string) => {
    switch(type) {
      case 'Wedding': return 'bg-rose-500';
      case 'Haldi': return 'bg-yellow-500';
      case 'Birthday': return 'bg-pink-400';
      case 'Reception': return 'bg-purple-600';
      case 'Baby Shower': return 'bg-blue-400';
      default: return 'bg-primary';
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* Main Calendar View */}
        <div className="flex-1">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/admin" className="mr-4 p-2 rounded-full hover:bg-card border border-transparent hover:border-border transition-colors">
                <ArrowLeft size={20} className="text-muted-foreground" />
              </Link>
              <div>
                <h1 className="font-serif text-3xl font-bold text-foreground">Event Calendar</h1>
                <p className="text-muted-foreground">Manage your event schedule</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
            {/* Calendar Header */}
            <div className="p-6 border-b border-border flex justify-between items-center bg-muted/10">
              <h2 className="text-xl font-bold text-foreground">December 2026</h2>
              <div className="flex gap-2">
                <button className="p-2 rounded-lg border border-border hover:bg-muted transition-colors">
                  <ChevronLeft size={20} />
                </button>
                <button className="p-2 rounded-lg border border-border hover:bg-muted transition-colors">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="p-6">
              {/* Days of week */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-2 auto-rows-[120px]">
                {blanks.map(blank => (
                  <div key={`blank-${blank}`} className="rounded-xl bg-muted/20 border border-transparent"></div>
                ))}
                
                {daysArray.map(day => {
                  const dayEvents = MOCK_EVENTS.filter(e => e.date === day);
                  const isSelected = selectedDate === day;
                  const isToday = day === 15; // Mocking today as Dec 15

                  return (
                    <div 
                      key={day}
                      onClick={() => setSelectedDate(day)}
                      className={`relative rounded-xl border p-2 cursor-pointer transition-all duration-300 flex flex-col
                        ${isSelected ? 'border-primary ring-1 ring-primary shadow-md bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-card'}
                      `}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${isToday ? 'bg-primary text-card' : 'text-foreground'}`}>
                          {day}
                        </span>
                        {dayEvents.length > 0 && (
                          <span className="text-xs font-bold text-muted-foreground">{dayEvents.length}</span>
                        )}
                      </div>
                      
                      <div className="flex-1 overflow-y-auto space-y-1 pr-1 scrollbar-hide">
                        {dayEvents.map(evt => (
                          <div 
                            key={evt.id} 
                            className="text-xs p-1.5 rounded-md bg-card border border-border truncate flex items-center shadow-sm"
                            title={evt.title}
                          >
                            <div className={`w-2 h-2 rounded-full mr-1.5 flex-shrink-0 ${getTypeColorClass(evt.type)}`}></div>
                            <span className="truncate">{evt.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Side Panel for Selected Date */}
        <div className="lg:w-96">
          <div className="sticky top-8 bg-card rounded-2xl border border-border shadow-sm p-6">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
              Dec {selectedDate}, 2026
            </h3>
            <p className="text-muted-foreground mb-6 pb-6 border-b border-border">
              {selectedEvents.length} event{selectedEvents.length !== 1 ? 's' : ''} scheduled
            </p>

            <div className="space-y-4">
              {selectedEvents.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground flex flex-col items-center">
                  <CalendarIcon size={40} className="mb-4 opacity-20" />
                  No events scheduled for this day.
                </div>
              ) : (
                selectedEvents.map(evt => (
                  <div 
                    key={evt.id} 
                    className="p-5 rounded-xl border border-border bg-muted/10 hover:border-primary/30 transition-all group cursor-pointer"
                    onMouseEnter={() => setTheme(evt.type.toLowerCase().replace(' ', '-') as any)}
                    onMouseLeave={() => setTheme("default")}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${getTypeColorClass(evt.type)}`}></div>
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{evt.type}</span>
                      </div>
                      <span className={`px-2 py-1 rounded text-[10px] font-bold border uppercase tracking-wider ${getStatusColor(evt.status)}`}>
                        {evt.status}
                      </span>
                    </div>
                    
                    <h4 className="font-serif text-lg font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                      {evt.title}
                    </h4>
                    
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-start gap-2">
                        <Clock size={16} className="mt-0.5 text-primary/70" />
                        <span>{evt.time}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin size={16} className="mt-0.5 text-primary/70" />
                        <span className="leading-tight">{evt.location}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Users size={16} className="mt-0.5 text-primary/70" />
                        <span>{evt.guests} Guests expected</span>
                      </div>
                    </div>
                    
                    <button className="w-full mt-5 py-2.5 rounded-lg bg-card border border-border text-foreground text-sm font-medium hover:bg-primary hover:text-card hover:border-primary transition-colors">
                      View Full Details
                    </button>
                  </div>
                ))
              )}
            </div>
            
            <button className="w-full mt-6 py-3 rounded-xl bg-primary text-card font-medium shadow-sm hover:opacity-90 transition-opacity flex items-center justify-center">
              + Add Event
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
