"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react";

export default function AdminBookingsPage() {
  const [allBookings, setAllBookings] = useState<any[]>([
    { id: "FE-8291", customerName: "Anjali Gupta", occasion: "Wedding", date: "15 Dec 2026", status: "Confirmed", estimatedPrice: "₹4,50,000" },
    { id: "FE-8292", customerName: "Rahul Sharma", occasion: "Haldi", date: "18 Dec 2026", status: "Design Discussion", estimatedPrice: "₹85,000" },
    { id: "FE-8293", customerName: "Priya Singh", occasion: "Birthday", date: "22 Dec 2026", status: "New Request", estimatedPrice: "₹45,000" },
    { id: "FE-8294", customerName: "Vikram Reddy", occasion: "Reception", date: "05 Jan 2027", status: "Advance Paid", estimatedPrice: "₹2,10,000" },
  ]);

  useEffect(() => {
    const saved = localStorage.getItem('standardBookings');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.length > 0) {
        setAllBookings(parsed);
      }
    }
  }, []);

  const handleStatusChange = (id: string, newStatus: string) => {
    const updated = allBookings.map(booking => 
      booking.id === id ? { ...booking, status: newStatus } : booking
    );
    setAllBookings(updated);
    localStorage.setItem('standardBookings', JSON.stringify(updated));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-700 border-green-200';
      case 'Rejected': return 'bg-red-100 text-red-700 border-red-200';
      case 'New Request': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Advance Paid': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Completed': return 'bg-teal-100 text-teal-700 border-teal-200';
      default: return 'bg-orange-100 text-orange-700 border-orange-200';
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <Link href="/admin" className="mr-4 p-2 bg-card border border-border rounded-lg hover:bg-muted transition-colors shadow-sm">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground">All Customer Bookings</h1>
            <p className="text-muted-foreground">Manage and track all standard event bookings</p>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden overflow-x-auto">
          <div className="p-6 border-b border-border bg-muted/10">
            <h2 className="font-serif text-xl font-bold text-foreground">Complete Booking Registry</h2>
            <p className="text-sm text-muted-foreground mt-1">Total Bookings: {allBookings.length}</p>
          </div>
          <div className="min-w-[800px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/30 text-muted-foreground text-sm border-b border-border">
                  <th className="p-4 font-medium">Booking ID</th>
                  <th className="p-4 font-medium">Customer</th>
                  <th className="p-4 font-medium">Occasion</th>
                  <th className="p-4 font-medium">Event Date</th>
                  <th className="p-4 font-medium">Amount</th>
                  <th className="p-4 font-medium">Update Status</th>
                  <th className="p-4 font-medium text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody>
                {allBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                    <td className="p-4 font-medium text-foreground">{booking.id}</td>
                    <td className="p-4 text-foreground">{booking.customerName}</td>
                    <td className="p-4 text-muted-foreground">{booking.occasion}</td>
                    <td className="p-4 text-muted-foreground">{booking.date}</td>
                    <td className="p-4 font-medium text-foreground">{booking.estimatedPrice?.toString().includes('₹') ? booking.estimatedPrice : `₹${booking.estimatedPrice}`}</td>
                    <td className="p-4">
                      <select
                        value={booking.status}
                        onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold border outline-none cursor-pointer appearance-none ${getStatusColor(booking.status)}`}
                      >
                        <option value="New Request">New Request</option>
                        <option value="Design Discussion">Design Discussion</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Advance Paid">Advance Paid</option>
                        <option value="Completed">Completed</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="p-4 flex justify-end gap-2">
                      {booking.status === 'New Request' && (
                        <>
                          <button 
                            onClick={() => handleStatusChange(booking.id, 'Confirmed')}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-transparent hover:border-green-200" title="Confirm Order"
                          >
                            <CheckCircle size={18} />
                          </button>
                          <button 
                            onClick={() => handleStatusChange(booking.id, 'Rejected')}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200" title="Reject Order"
                          >
                            <XCircle size={18} />
                          </button>
                        </>
                      )}
                      {booking.status !== 'New Request' && (
                        <button className="text-primary text-sm font-medium hover:underline p-2">
                          Details
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {allBookings.length === 0 && (
              <div className="p-12 text-center text-muted-foreground">
                No bookings found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
