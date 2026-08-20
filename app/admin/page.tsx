'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, Clock, CheckCircle2, XCircle, 
  RefreshCw, ChefHat, Truck, ShoppingBag, 
  MapPin, Phone, Mail, Loader2, ArrowRight, User 
} from 'lucide-react';
import { Order } from '../../lib/db';

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'all' | Order['status']>('all');
  const [isAdminEnabled, setIsAdminEnabled] = useState<boolean | null>(null);

  const fetchOrders = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error('Error loading admin orders', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const checkSettingsAndFetch = async () => {
      try {
        const res = await fetch('/api/settings');
        const data = await res.json();
        if (data.success && data.settings?.adminEnabled) {
          setIsAdminEnabled(true);
          await fetchOrders();
          interval = setInterval(() => fetchOrders(), 8000); // Auto-refresh every 8s
        } else {
          setIsAdminEnabled(false);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        setIsAdminEnabled(false);
        setLoading(false);
      }
    };

    checkSettingsAndFetch();

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: Order['status']) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        // Optimistic state update
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus, updatedAt: new Date().toISOString() } : o));
      } else {
        alert('Failed to update status.');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating status.');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Metrics
  const completedOrders = orders.filter(o => o.status === 'completed');
  const activeOrders = orders.filter(o => ['received', 'preparing', 'ready'].includes(o.status));
  const cancelledOrders = orders.filter(o => o.status === 'cancelled');

  const totalSales = completedOrders.reduce((sum, o) => sum + o.totalAmount, 0);

  const filteredOrders = statusFilter === 'all'
    ? orders
    : orders.filter(o => o.status === statusFilter);

  if (isAdminEnabled === null || loading) {
    return (
      <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-brand-terracotta animate-spin stroke-[1.5]" />
        <p className="text-sm font-semibold text-brand-charcoal/70">Checking authentication permissions...</p>
      </div>
    );
  }

  if (isAdminEnabled === false) {
    return (
      <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center space-y-6 px-4">
        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-brand-sand shadow-lg max-w-md text-center space-y-6">
          <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center text-brand-terracotta mx-auto">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold font-serif text-brand-terracotta">Portal Access Locked</h2>
            <p className="text-sm text-brand-charcoal/70 leading-relaxed font-light">
              This admin panel has been deactivated for security. It will not show or be active until you explicitly enable it in your database setting.
            </p>
          </div>

          <div className="bg-brand-sand/30 p-4 rounded-xl text-left border border-brand-sand/50 space-y-2">
            <h4 className="text-xs uppercase font-bold text-brand-charcoal tracking-wide">To Unlock Access:</h4>
            <p className="text-[11px] text-brand-charcoal/60 leading-normal">
              Open your project database file <code className="bg-white px-1.5 py-0.5 rounded border border-brand-sand font-mono">db.json</code> in your code editor and change the settings key:
            </p>
            <pre className="text-[10px] bg-brand-charcoal text-brand-cream p-3 rounded-lg overflow-x-auto font-mono">
{`"settings": {
  "adminEnabled": true
}`}
            </pre>
          </div>

          <div className="pt-2">
            <Link
              href="/"
              className="inline-block bg-brand-terracotta hover:bg-brand-orange text-white font-bold text-sm px-6 py-2.5 rounded-lg transition-colors w-full animate-bounce"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-sand/20 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold font-serif text-brand-terracotta">
              Àdùn Kitchen Portal
            </h1>
            <p className="text-xs sm:text-sm text-brand-charcoal/60 mt-1">
              Monitor incoming orders, edit status tracking, and view sales metrics.
            </p>
          </div>
          
          <button
            onClick={() => fetchOrders(true)}
            disabled={refreshing}
            className="bg-brand-charcoal hover:bg-brand-dark disabled:bg-brand-charcoal/50 text-white font-bold text-sm px-5 py-2.5 rounded-lg flex items-center gap-2 transition-colors duration-300"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>{refreshing ? 'Refreshing...' : 'Refresh Orders'}</span>
          </button>
        </div>

        {/* Sales & Activity Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Revenue */}
          <div className="bg-white p-6 rounded-2xl border border-brand-sand shadow-xs space-y-2">
            <div className="flex justify-between items-center text-emerald-600">
              <span className="text-xs uppercase font-bold tracking-wider">Total Sales</span>
              <TrendingUp className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold font-serif text-brand-charcoal">
              {formatPrice(totalSales)}
            </p>
            <p className="text-[10px] text-brand-charcoal/50 font-semibold">From {completedOrders.length} completed orders</p>
          </div>

          {/* Active Orders */}
          <div className="bg-white p-6 rounded-2xl border border-brand-sand shadow-xs space-y-2">
            <div className="flex justify-between items-center text-brand-gold">
              <span className="text-xs uppercase font-bold tracking-wider">Active Queue</span>
              <Clock className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold font-serif text-brand-charcoal">
              {activeOrders.length}
            </p>
            <p className="text-[10px] text-brand-charcoal/50 font-semibold">Currently cooking or shipping</p>
          </div>

          {/* Completed Orders */}
          <div className="bg-white p-6 rounded-2xl border border-brand-sand shadow-xs space-y-2">
            <div className="flex justify-between items-center text-emerald-500">
              <span className="text-xs uppercase font-bold tracking-wider">Completed</span>
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold font-serif text-brand-charcoal">
              {completedOrders.length}
            </p>
            <p className="text-[10px] text-brand-charcoal/50 font-semibold">Dispatched or collected</p>
          </div>

          {/* Cancelled */}
          <div className="bg-white p-6 rounded-2xl border border-brand-sand shadow-xs space-y-2">
            <div className="flex justify-between items-center text-red-500">
              <span className="text-xs uppercase font-bold tracking-wider">Cancelled</span>
              <XCircle className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold font-serif text-brand-charcoal">
              {cancelledOrders.length}
            </p>
            <p className="text-[10px] text-brand-charcoal/50 font-semibold">Voided transactions</p>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex overflow-x-auto pb-1 gap-2.5 scrollbar-hide border-b border-brand-sand/55">
          {[
            { id: 'all', label: 'All Orders' },
            { id: 'received', label: 'Received' },
            { id: 'preparing', label: 'Preparing' },
            { id: 'ready', label: 'Ready/Dispatched' },
            { id: 'completed', label: 'Completed' },
            { id: 'cancelled', label: 'Cancelled' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id as any)}
              className={`whitespace-nowrap pb-3.5 px-4 text-sm font-semibold border-b-2 transition-all ${
                statusFilter === tab.id
                  ? 'border-brand-terracotta text-brand-terracotta font-bold'
                  : 'border-transparent text-brand-charcoal/60 hover:text-brand-charcoal'
              }`}
            >
              {tab.label} ({
                tab.id === 'all' ? orders.length :
                tab.id === 'ready' ? orders.filter(o => o.status === 'ready').length :
                orders.filter(o => o.status === tab.id).length
              })
            </button>
          ))}
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-brand-sand p-16 text-center space-y-4">
            <ShoppingBag className="w-14 h-14 text-brand-gold/30 mx-auto stroke-[1.5]" />
            <div>
              <h3 className="font-bold text-lg text-brand-charcoal">No orders found</h3>
              <p className="text-xs text-brand-charcoal/60 mt-1">There are no orders listed under this status filter.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => {
              const dateObj = new Date(order.createdAt);
              const formattedDate = dateObj.toLocaleDateString('en-NG', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div 
                  key={order.id} 
                  className={`bg-white rounded-2xl border p-6 sm:p-8 shadow-xs transition-all duration-300 ${
                    order.status === 'completed' ? 'border-brand-sand/50 opacity-90' :
                    order.status === 'cancelled' ? 'border-red-100 bg-red-50/10' :
                    'border-brand-sand/80 shadow-md ring-1 ring-brand-gold/10'
                  }`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* 1. Header Details (3 columns) */}
                    <div className="lg:col-span-3 space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-sm font-bold text-brand-terracotta">
                          {order.id}
                        </span>
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                          order.type === 'delivery' ? 'bg-indigo-50 text-indigo-600 border border-indigo-200' : 'bg-amber-50 text-amber-600 border border-amber-200'
                        }`}>
                          {order.type}
                        </span>
                      </div>

                      <div className="text-xs text-brand-charcoal/60 font-semibold">
                        Ordered: {formattedDate}
                      </div>

                      <div className="pt-2 border-t border-brand-sand/40 space-y-1">
                        <div className="text-xs font-bold text-brand-charcoal flex items-center">
                          <User className="w-3.5 h-3.5 text-brand-orange mr-1.5 shrink-0" />
                          <span>{order.customerName}</span>
                        </div>
                        <div className="text-[11px] text-brand-charcoal/70 flex items-center">
                          <Phone className="w-3.5 h-3.5 text-brand-orange mr-1.5 shrink-0" />
                          <a href={`tel:${order.customerPhone}`} className="hover:underline">{order.customerPhone}</a>
                        </div>
                        <div className="text-[11px] text-brand-charcoal/70 flex items-center truncate">
                          <Mail className="w-3.5 h-3.5 text-brand-orange mr-1.5 shrink-0" />
                          <a href={`mailto:${order.customerEmail}`} className="hover:underline">{order.customerEmail}</a>
                        </div>
                      </div>

                      {order.type === 'delivery' && (
                        <div className="text-[11px] bg-brand-sand/30 p-2.5 rounded-lg text-brand-charcoal/80 flex items-start">
                          <MapPin className="w-3.5 h-3.5 text-brand-orange mr-1.5 mt-0.5 shrink-0" />
                          <span className="line-clamp-2 leading-relaxed">{order.address}</span>
                        </div>
                      )}
                    </div>

                    {/* 2. Items List (5 columns) */}
                    <div className="lg:col-span-5 space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-brand-charcoal/65">
                        Items Ordered
                      </h4>
                      <ul className="divide-y divide-brand-sand/50 space-y-2 text-xs sm:text-sm">
                        {order.items.map((item, idx) => (
                          <li key={idx} className="flex justify-between items-start py-2">
                            <div>
                              <span className="font-semibold text-brand-charcoal">
                                {item.name}
                              </span>
                              <span className="text-[10px] text-brand-orange block mt-0.5">
                                {item.spiceLevel}
                              </span>
                            </div>
                            <span className="font-bold text-brand-charcoal shrink-0 ml-3">
                              {item.quantity}x
                            </span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="flex justify-between items-center bg-brand-sand/20 p-3 rounded-xl border border-brand-sand/50 text-sm">
                        <span className="font-bold text-brand-charcoal/70 font-serif">Total Amount Paid</span>
                        <span className="font-extrabold text-brand-terracotta text-base">
                          {formatPrice(order.totalAmount)}
                        </span>
                      </div>
                    </div>

                    {/* 3. Status Operations (4 columns) */}
                    <div className="lg:col-span-4 bg-brand-sand/15 p-5 rounded-2xl border border-brand-sand/60 space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-brand-charcoal/65">
                        Pipeline Actions
                      </h4>

                      {/* Current Status display */}
                      <div className="flex items-center space-x-2 text-xs">
                        <span className="text-brand-charcoal/60">Current Status:</span>
                        <span className="font-bold uppercase text-brand-terracotta capitalize">
                          {order.status === 'ready' ? (order.type === 'delivery' ? 'Out for Delivery' : 'Ready for Pickup') : order.status}
                        </span>
                      </div>

                      {/* Control buttons */}
                      <div className="flex flex-col gap-2">
                        {order.status === 'received' && (
                          <button
                            onClick={() => handleUpdateStatus(order.id, 'preparing')}
                            className="w-full bg-brand-gold hover:bg-brand-orange text-white font-bold py-2.5 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors duration-300"
                          >
                            <ChefHat className="w-3.5 h-3.5" />
                            <span>Start Prep 🍳</span>
                          </button>
                        )}

                        {order.status === 'preparing' && (
                          <button
                            onClick={() => handleUpdateStatus(order.id, 'ready')}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors duration-300"
                          >
                            {order.type === 'delivery' ? (
                              <>
                                <Truck className="w-3.5 h-3.5" />
                                <span>Dispatch Rider 🚴</span>
                              </>
                            ) : (
                              <>
                                <ShoppingBag className="w-3.5 h-3.5" />
                                <span>Set Ready for Pickup 📦</span>
                              </>
                            )}
                          </button>
                        )}

                        {order.status === 'ready' && (
                          <button
                            onClick={() => handleUpdateStatus(order.id, 'completed')}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors duration-300"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Complete Order ✅</span>
                          </button>
                        )}

                        {/* Order completed banner */}
                        {order.status === 'completed' && (
                          <div className="bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg p-3 text-center text-xs font-bold flex items-center justify-center gap-1">
                            <CheckCircle2 className="w-4 h-4 shrink-0" />
                            <span>Completed & Collected</span>
                          </div>
                        )}

                        {/* Order cancelled banner */}
                        {order.status === 'cancelled' && (
                          <div className="bg-red-50 text-red-500 border border-red-100 rounded-lg p-3 text-center text-xs font-bold flex items-center justify-center gap-1">
                            <XCircle className="w-4 h-4 shrink-0" />
                            <span>Order Voided</span>
                          </div>
                        )}

                        {/* Cancellation button (Only if not completed or cancelled) */}
                        {!['completed', 'cancelled'].includes(order.status) && (
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to void order ${order.id}?`)) {
                                handleUpdateStatus(order.id, 'cancelled');
                              }
                            }}
                            className="w-full bg-white hover:bg-red-50 text-red-500 border border-red-200 hover:border-red-300 font-bold py-2 rounded-lg text-[10px] uppercase tracking-wider flex items-center justify-center gap-1 transition-all"
                          >
                            <XCircle className="w-3 h-3" />
                            <span>Cancel Order</span>
                          </button>
                        )}

                        {/* View Tracking page link */}
                        <Link
                          href={`/order-status/${order.id}`}
                          target="_blank"
                          className="w-full text-center border border-brand-sand hover:bg-brand-sand text-brand-charcoal/80 font-bold py-2 rounded-lg text-[10px] uppercase tracking-wider block transition-all"
                        >
                          View Tracker Page <ArrowRight className="w-3 h-3 inline-block ml-0.5" />
                        </Link>
                      </div>

                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
