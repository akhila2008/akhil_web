"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Users, Calendar as CalendarIcon, IndianRupee, Package, Image as ImageIcon, CheckCircle, XCircle } from "lucide-react";

export default function AdminDashboardPage() {
  const stats = [
    { label: "Total Revenue", value: "₹24,50,000", icon: <IndianRupee size={24} className="text-primary" />, trend: "+12%" },
    { label: "Upcoming Events", value: "14", icon: <CalendarIcon size={24} className="text-primary" />, trend: "+3" },
    { label: "Pending Requests", value: "5", icon: <Package size={24} className="text-primary" />, trend: "-2" },
    { label: "Total Customers", value: "89", icon: <Users size={24} className="text-primary" />, trend: "+8%" }
  ];

  const [recentBookings, setRecentBookings] = useState([
    { id: "FE-8291", customer: "Anjali Gupta", occasion: "Wedding", date: "15 Dec 2026", status: "Confirmed", amount: "₹4,50,000" },
    { id: "FE-8292", customer: "Rahul Sharma", occasion: "Haldi", date: "18 Dec 2026", status: "Design Discussion", amount: "₹85,000" },
    { id: "FE-8293", customer: "Priya Singh", occasion: "Birthday", date: "22 Dec 2026", status: "New", amount: "₹45,000" },
    { id: "FE-8294", customer: "Vikram Reddy", occasion: "Reception", date: "05 Jan 2027", status: "Advance Paid", amount: "₹2,10,000" },
  ]);

  const handleStatusChange = (id: string, newStatus: string) => {
    setRecentBookings(recentBookings.map(booking => 
      booking.id === id ? { ...booking, status: newStatus } : booking
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-700 border-green-200';
      case 'Rejected': return 'bg-red-100 text-red-700 border-red-200';
      case 'New': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Advance Paid': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Completed': return 'bg-teal-100 text-teal-700 border-teal-200';
      default: return 'bg-orange-100 text-orange-700 border-orange-200';
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground">Business Dashboard</h1>
            <p className="text-muted-foreground">Overview of Floraa Events operations</p>
          </div>
          <div className="flex gap-4">
            <Link href="/admin/calendar" className="px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors flex items-center shadow-sm">
              <CalendarIcon size={16} className="mr-2" /> View Calendar
            </Link>
            <Link href="/admin/decorations" className="px-4 py-2 bg-primary text-card rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center shadow-sm">
              <ImageIcon size={16} className="mr-2" /> Manage Decorations
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="bg-card p-6 rounded-2xl border border-border shadow-sm flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <h3 className="text-2xl font-bold text-foreground mb-2">{stat.value}</h3>
                <span className={`text-xs font-medium ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend} from last month
                </span>
              </div>
              <div className="p-3 bg-primary/10 rounded-xl">
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Recent Bookings Table */}
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden overflow-x-auto">
          <div className="p-6 border-b border-border flex justify-between items-center bg-muted/10">
            <div>
              <h2 className="font-serif text-xl font-bold text-foreground">Recent Event Bookings</h2>
              <p className="text-sm text-muted-foreground mt-1">Review and manage booking statuses directly.</p>
            </div>
            <button className="text-primary text-sm font-medium hover:underline">View All Bookings</button>
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
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                    <td className="p-4 font-medium text-foreground">{booking.id}</td>
                    <td className="p-4 text-foreground">{booking.customer}</td>
                    <td className="p-4 text-muted-foreground">{booking.occasion}</td>
                    <td className="p-4 text-muted-foreground">{booking.date}</td>
                    <td className="p-4 font-medium text-foreground">{booking.amount}</td>
                    <td className="p-4">
                      {/* Interactive Status Dropdown */}
                      <select
                        value={booking.status}
                        onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold border outline-none cursor-pointer appearance-none ${getStatusColor(booking.status)}`}
                      >
                        <option value="New">New Request</option>
                        <option value="Design Discussion">Design Discussion</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Advance Paid">Advance Paid</option>
                        <option value="Completed">Completed</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="p-4 flex justify-end gap-2">
                      {booking.status === 'New' && (
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
                      {booking.status !== 'New' && (
                        <button className="text-primary text-sm font-medium hover:underline p-2">
                          Details
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
