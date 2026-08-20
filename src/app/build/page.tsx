"use client";

import React, { useState, useEffect } from "react";
import { useBuilderStore, PRICES } from "@/store/useBuilderStore";
import { useTheme } from "@/components/ThemeProvider";
import { Check, ChevronRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const STEPS = [
  { id: "occasion", title: "Occasion" },
  { id: "venue", title: "Venue" },
  { id: "stage", title: "Stage" },
  { id: "flowers", title: "Flowers" },
  { id: "backdrop", title: "Backdrop" },
  { id: "entrance", title: "Entrance" },
  { id: "ceiling", title: "Ceiling" },
  { id: "lighting", title: "Lighting" },
  { id: "details", title: "Event Details" }
];

const OPTIONS: Record<string, string[]> = {
  occasion: ["Wedding", "Haldi", "Birthday", "Engagement", "Baby Shower", "Anniversary", "Reception", "Housewarming"],
  venue: ["Indoor Banquet", "Outdoor Lawn", "Open Ground", "Home Setup", "Poolside"],
  stage: Object.keys(PRICES.stage),
  flowers: Object.keys(PRICES.flowers),
  backdrop: Object.keys(PRICES.backdrop),
  entrance: Object.keys(PRICES.entrance),
  ceiling: Object.keys(PRICES.ceiling),
  lighting: Object.keys(PRICES.lighting)
};

export default function BuilderPage() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const store = useBuilderStore();
  const { setTheme } = useTheme();
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentStep = STEPS[currentStepIndex];

  // Update global theme based on selected occasion
  useEffect(() => {
    if (store.occasion) {
      setTheme(store.occasion.toLowerCase().replace(" ", "-") as any);
    } else {
      setTheme("default");
    }
  }, [store.occasion, setTheme]);

  const handleNext = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 bg-background">
        <div className="glass-card p-12 rounded-3xl max-w-2xl text-center animate-fade-in shadow-2xl border border-primary/20">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={48} className="text-primary" />
          </div>
          <h1 className="font-serif text-4xl font-bold text-foreground mb-4">Your Celebration Is One Step Closer.</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Thank you for choosing Floraa Events. Your booking request (ID: #FE-{Math.floor(Math.random()*10000)}) has been received. 
            Our design team will contact you shortly to confirm details.
          </p>
          <Link href="/dashboard" className="px-8 py-4 rounded-full bg-primary text-card font-medium text-lg inline-block transition-transform hover:scale-105">
            Go to My Events Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
        
        {/* Main Builder Form */}
        <div className="flex-1">
          <div className="mb-8 animate-fade-in">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-2">Design Your Celebration</h1>
            <p className="text-muted-foreground text-lg">Step {currentStepIndex + 1} of {STEPS.length}: {currentStep.title}</p>
          </div>

          <div className="glass-card rounded-3xl p-6 md:p-10 shadow-lg border border-border animate-fade-in">
            {/* Render Selection Grid for non-details steps */}
            {currentStep.id !== "details" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {OPTIONS[currentStep.id]?.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      store.setField(currentStep.id as any, option);
                      // Auto-advance if it's the occasion step to feel snappy
                      if (currentStep.id === 'occasion') setTimeout(handleNext, 400);
                    }}
                    className={`p-6 rounded-2xl border-2 text-left transition-all duration-300 relative overflow-hidden group ${
                      (store as any)[currentStep.id] === option 
                        ? 'border-primary bg-primary/5 shadow-md' 
                        : 'border-border hover:border-primary/50 hover:bg-card'
                    }`}
                  >
                    <div className="font-medium text-lg text-foreground mb-1">{option}</div>
                    
                    {/* Display Price if applicable */}
                    {PRICES[currentStep.id] && PRICES[currentStep.id][option] > 0 && (
                      <div className="text-sm text-muted-foreground">
                        + ₹{PRICES[currentStep.id][option].toLocaleString('en-IN')}
                      </div>
                    )}
                    
                    {(store as any)[currentStep.id] === option && (
                      <div className="absolute top-4 right-4 text-primary animate-fade-in">
                        <Check size={24} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Render Event Details Form */}
            {currentStep.id === "details" && (
              <form id="booking-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Event Date</label>
                    <input 
                      type="date" 
                      required
                      className="w-full p-4 rounded-xl border border-border bg-card text-foreground focus:ring-2 focus:ring-primary outline-none transition-all"
                      value={store.eventDetails.date}
                      onChange={(e) => store.setField('eventDetails', { ...store.eventDetails, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Expected Guests</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 500"
                      required
                      className="w-full p-4 rounded-xl border border-border bg-card text-foreground focus:ring-2 focus:ring-primary outline-none transition-all"
                      value={store.eventDetails.guests}
                      onChange={(e) => store.setField('eventDetails', { ...store.eventDetails, guests: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">Event Location/Venue Name</label>
                    <input 
                      type="text" 
                      placeholder="Full venue address"
                      required
                      className="w-full p-4 rounded-xl border border-border bg-card text-foreground focus:ring-2 focus:ring-primary outline-none transition-all"
                      value={store.eventDetails.location}
                      onChange={(e) => store.setField('eventDetails', { ...store.eventDetails, location: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">Contact Number</label>
                    <input 
                      type="tel" 
                      placeholder="+91 "
                      required
                      className="w-full p-4 rounded-xl border border-border bg-card text-foreground focus:ring-2 focus:ring-primary outline-none transition-all"
                      value={store.eventDetails.contact}
                      onChange={(e) => store.setField('eventDetails', { ...store.eventDetails, contact: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">Special Requirements</label>
                    <textarea 
                      rows={4}
                      placeholder="Any specific colors, themes, or additional requests..."
                      className="w-full p-4 rounded-xl border border-border bg-card text-foreground focus:ring-2 focus:ring-primary outline-none transition-all"
                      value={store.eventDetails.requirements}
                      onChange={(e) => store.setField('eventDetails', { ...store.eventDetails, requirements: e.target.value })}
                    />
                  </div>
                </div>
              </form>
            )}

            {/* Navigation Buttons */}
            <div className="mt-10 flex justify-between items-center pt-6 border-t border-border">
              <button
                onClick={handlePrev}
                disabled={currentStepIndex === 0}
                className={`flex items-center px-6 py-3 rounded-full font-medium transition-all ${
                  currentStepIndex === 0 ? 'opacity-50 cursor-not-allowed text-muted-foreground' : 'text-foreground hover:bg-muted'
                }`}
              >
                <ArrowLeft size={20} className="mr-2" /> Back
              </button>
              
              {currentStep.id !== "details" ? (
                <button
                  onClick={handleNext}
                  className="flex items-center px-8 py-3 rounded-full bg-primary text-card font-medium transition-transform hover:scale-105 shadow-md"
                >
                  Continue <ChevronRight size={20} className="ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  form="booking-form"
                  className="flex items-center px-8 py-3 rounded-full bg-primary text-card font-medium transition-transform hover:scale-105 shadow-md"
                >
                  Request Booking
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Sticky Summary */}
        <div className="lg:w-96">
          <div className="sticky top-28 glass-card rounded-3xl p-8 shadow-xl border border-primary/20">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-6 pb-4 border-b border-border">Your Event</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-start">
                <span className="text-muted-foreground">Occasion</span>
                <span className="font-medium text-foreground text-right">{store.occasion || 'Not selected'}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-muted-foreground">Venue</span>
                <span className="font-medium text-foreground text-right">{store.venue || 'Not selected'}</span>
              </div>
              
              {['stage', 'flowers', 'backdrop', 'entrance', 'ceiling', 'lighting'].map((key) => {
                const val = (store as any)[key];
                if (!val) return null;
                return (
                  <div key={key} className="flex justify-between items-start pt-2">
                    <span className="text-muted-foreground capitalize">{key}</span>
                    <span className="font-medium text-foreground text-right">{val}</span>
                  </div>
                )
              })}
            </div>

            <div className="pt-6 border-t border-border">
              <div className="text-sm text-muted-foreground mb-1">Estimated Price</div>
              <div className="font-serif text-4xl font-bold text-primary mb-2">
                ₹{store.totalPrice.toLocaleString('en-IN')}
              </div>
              <p className="text-xs text-muted-foreground">
                *Final price may vary based on venue size and specific customizations.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
