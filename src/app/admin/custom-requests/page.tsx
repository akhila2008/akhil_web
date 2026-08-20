"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CheckCircle, Clock, Search, Filter, Image as ImageIcon, X } from "lucide-react";

export default function AdminCustomRequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  
  // Admin Review Form State
  const [adminPrice, setAdminPrice] = useState("");
  const [adminNotes, setAdminNotes] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem('customRequests');
    if (saved) {
      setRequests(JSON.parse(saved));
    }
  }, []);

  const handleReviewOpen = (req: any) => {
    setSelectedRequest(req);
    setAdminPrice(req.adminPrice ? req.adminPrice.toString() : "");
    setAdminNotes(req.adminNotes || "");
  };

  const handleSaveReview = (e: React.FormEvent, status: string) => {
    e.preventDefault();
    if (status === 'QUOTATION_READY' && !adminPrice) {
      alert("You must enter a price to send a quotation.");
      return;
    }

    const updatedRequests = requests.map(req => {
      if (req.id === selectedRequest.id) {
        return {
          ...req,
          adminPrice: adminPrice ? parseInt(adminPrice) : null,
          adminNotes,
          status,
          reviewedAt: new Date().toISOString()
        };
      }
      return req;
    });

    setRequests(updatedRequests);
    localStorage.setItem('customRequests', JSON.stringify(updatedRequests));
    setSelectedRequest(null);
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/admin" className="mr-4 p-2 rounded-full hover:bg-card border border-transparent hover:border-border transition-colors">
              <ArrowLeft size={20} className="text-muted-foreground" />
            </Link>
            <div>
              <h1 className="font-serif text-3xl font-bold text-foreground">Custom Design Requests</h1>
              <p className="text-muted-foreground">Review customer inspiration uploads and finalize quotations.</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <div className="px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium flex items-center shadow-sm">
              <span className="w-2 h-2 rounded-full bg-orange-500 mr-2 animate-pulse"></span>
              {requests.filter(r => r.status === 'PENDING_REVIEW').length} Pending
            </div>
          </div>
        </div>

        {/* Requests Table */}
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden overflow-x-auto">
          <div className="p-4 border-b border-border flex items-center justify-between bg-muted/10">
            <div className="relative w-full max-w-sm">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input type="text" placeholder="Search Request ID or Event..." className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-sm outline-none focus:border-primary" />
            </div>
            <button className="p-2 border border-border rounded-lg hover:bg-muted text-muted-foreground"><Filter size={18} /></button>
          </div>
          
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-muted/30 text-muted-foreground text-sm border-b border-border">
                <th className="p-4 font-medium w-16">Photo</th>
                <th className="p-4 font-medium">Request ID</th>
                <th className="p-4 font-medium">Customer Details</th>
                <th className="p-4 font-medium">Event & Date</th>
                <th className="p-4 font-medium">Venue</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Quotation</th>
                <th className="p-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-muted-foreground">
                    <ImageIcon size={48} className="mx-auto mb-4 opacity-20" />
                    No custom decoration requests yet.
                  </td>
                </tr>
              ) : (
                requests.map(req => (
                  <tr key={req.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                    <td className="p-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted relative border border-border">
                        {req.imagePreview ? <Image src={req.imagePreview} alt="upload" fill className="object-cover" unoptimized={true} /> : <ImageIcon />}
                      </div>
                    </td>
                    <td className="p-4 font-bold text-foreground">{req.id}</td>
                    <td className="p-4">
                      <div className="font-medium text-foreground">{req.customerName || 'N/A'}</div>
                      <div className="text-sm text-muted-foreground">{req.customerPhone || 'N/A'}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-foreground">{req.eventType}</div>
                      <div className="text-sm text-muted-foreground">{req.eventDate}</div>
                    </td>
                    <td className="p-4 text-muted-foreground text-sm truncate max-w-[150px]">{req.venue}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-md border inline-flex items-center gap-1 ${
                        req.status === 'PENDING_REVIEW' ? 'bg-orange-50 text-orange-600 border-orange-200' : 
                        req.status === 'QUOTATION_READY' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                        'bg-green-50 text-green-600 border-green-200'
                      }`}>
                        {req.status === 'PENDING_REVIEW' ? <Clock size={12} /> : <CheckCircle size={12} />}
                        {req.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-foreground">
                      {req.adminPrice ? `₹${req.adminPrice.toLocaleString('en-IN')}` : <span className="text-muted-foreground font-normal">Not Finalized</span>}
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => handleReviewOpen(req)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                          req.status === 'PENDING_REVIEW' 
                            ? 'bg-primary text-card shadow-sm hover:opacity-90' 
                            : 'bg-muted text-foreground border border-border hover:bg-card'
                        }`}
                      >
                        {req.status === 'PENDING_REVIEW' ? 'Review Design' : 'Update Review'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Admin Review Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-card w-full max-w-4xl h-[90vh] sm:h-auto sm:max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative">
            
            <button onClick={() => setSelectedRequest(null)} className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full text-white flex items-center justify-center transition-colors">
              <X size={20} />
            </button>

            {/* Inspiration Image Side */}
            <div className="w-full md:w-1/2 bg-muted p-8 border-b md:border-b-0 md:border-r border-border flex flex-col">
              <h3 className="font-bold text-muted-foreground uppercase tracking-wider text-xs mb-4">Customer Inspiration</h3>
              <div className="flex-1 relative rounded-2xl overflow-hidden border border-border shadow-inner min-h-[300px]">
                {selectedRequest.imagePreview && (
                  <Image src={selectedRequest.imagePreview} alt="Customer upload" fill className="object-cover" unoptimized={true} />
                )}
              </div>
              <div className="mt-6 bg-card p-4 rounded-xl border border-border">
                <p className="text-sm text-foreground"><strong>Customer Note:</strong> "{selectedRequest.description || 'No description provided.'}"</p>
              </div>
            </div>

            {/* Review Form Side */}
            <div className="w-full md:w-1/2 flex flex-col h-full bg-card">
              <div className="p-8 border-b border-border bg-muted/10">
                <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border bg-orange-50 text-orange-600 border-orange-200 mb-2 inline-block">
                  {selectedRequest.status.replace('_', ' ')}
                </span>
                <h2 className="font-serif text-2xl font-bold text-foreground">Request {selectedRequest.id}</h2>
                <p className="text-muted-foreground text-sm mt-1">{selectedRequest.customerName || 'No Name Provided'} • {selectedRequest.customerPhone || 'No Phone'}</p>
                <p className="text-muted-foreground text-sm mt-1">{selectedRequest.eventType} • {selectedRequest.eventDate} • {selectedRequest.venue}</p>
              </div>

              <form className="p-8 flex-1 overflow-y-auto space-y-6">
                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">Final Quotation Amount (₹)</label>
                  <input 
                    type="number" 
                    value={adminPrice} 
                    onChange={e => setAdminPrice(e.target.value)}
                    placeholder="e.g. 75000"
                    className="w-full p-4 rounded-xl border border-border bg-card focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-bold text-lg"
                  />
                  <p className="text-xs text-muted-foreground mt-2">This is the final price the customer will see.</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">Admin Notes (Visible to Customer)</label>
                  <textarea 
                    rows={4} 
                    value={adminNotes} 
                    onChange={e => setAdminNotes(e.target.value)}
                    placeholder="Break down what is included in this price..."
                    className="w-full p-4 rounded-xl border border-border bg-card focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                  />
                </div>

                <div className="pt-6 border-t border-border flex flex-col gap-3">
                  <button 
                    type="button" 
                    onClick={(e) => handleSaveReview(e, 'QUOTATION_READY')}
                    className="w-full py-4 bg-primary text-card rounded-xl font-bold text-lg hover:shadow-lg transition-all shadow-md"
                  >
                    Send Quotation to Customer
                  </button>
                  <button 
                    type="button" 
                    onClick={(e) => handleSaveReview(e, 'NEEDS_CLARIFICATION')}
                    className="w-full py-4 bg-card border border-border text-foreground rounded-xl font-bold hover:bg-muted transition-all"
                  >
                    Request Clarification
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
