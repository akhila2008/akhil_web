"use client";

import React from "react";
import { Users, Calendar as CalendarIcon, IndianRupee, TrendingUp, Package, Image as ImageIcon } from "lucide-react";

export default function AdminDashboardPage() {
  const stats = [
    { label: "Total Revenue", value: "₹24,50,000", icon: <IndianRupee size={24} className="text-primary" />, trend: "+12%" },
    { label: "Upcoming Events", value: "14", icon: <CalendarIcon size={24} className="text-primary" />, trend: "+3" },
    { label: "Pending Requests", value: "5", icon: <Package size={24} className="text-primary" />, trend: "-2" },
    { label: "Total Customers", value: "89", icon: <Users size={24} className="text-primary" />, trend: "+8%" }
  ];

  const recentBookings = [
    { id: "FE-8291", customer: "Anjali Gupta", occasion: "Wedding", date: "15 Dec 2026", status: "Confirmed", amount: "₹4,50,000" },
    { id: "FE-8292", customer: "Rahul Sharma", occasion: "Haldi", date: "18 Dec 2026", status: "Design Discussion", amount: "₹85,000" },
    { id: "FE-8293", customer: "Priya Singh", occasion: "Birthday", date: "22 Dec 2026", status: "New", amount: "₹45,000" },
    { id: "FE-8294", customer: "Vikram Reddy", occasion: "Reception", date: "05 Jan 2027", status: "Advance Paid", amount: "₹2,10,000" },
  ];

  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground">Business Dashboard</h1>
            <p className="text-muted-foreground">Overview of Floraa Events operations</p>
          </div>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors flex items-center">
              <CalendarIcon size={16} className="mr-2" /> View Calendar
            </button>
            <button className="px-4 py-2 bg-primary text-card rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center">
              <ImageIcon size={16} className="mr-2" /> Manage Decorations
            </button>
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
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border flex justify-between items-center">
            <h2 className="font-serif text-xl font-bold text-foreground">Recent Bookings</h2>
            <button className="text-primary text-sm font-medium hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/50 text-muted-foreground text-sm border-b border-border">
                  <th className="p-4 font-medium">Booking ID</th>
                  <th className="p-4 font-medium">Customer</th>
                  <th className="p-4 font-medium">Occasion</th>
                  <th className="p-4 font-medium">Event Date</th>
                  <th className="p-4 font-medium">Amount</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking, i) => (
                  <tr key={i} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium text-foreground">{booking.id}</td>
                    <td className="p-4 text-foreground">{booking.customer}</td>
                    <td className="p-4 text-muted-foreground">{booking.occasion}</td>
                    <td className="p-4 text-muted-foreground">{booking.date}</td>
                    <td className="p-4 font-medium text-foreground">{booking.amount}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'Confirmed' ? 'bg-green-100 text-green-700 border border-green-200' :
                        booking.status === 'New' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                        booking.status === 'Advance Paid' ? 'bg-purple-100 text-purple-700 border border-purple-200' :
                        'bg-orange-100 text-orange-700 border border-orange-200'
                      }`}>
                        {booking.status}
                      </span>
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
