'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  Check, Clock, ChefHat, Truck, ShoppingBag, 
  MapPin, Phone, User, CheckCircle2, ChevronRight, Loader2 
} from 'lucide-react';
import { Order } from '../../../lib/db';

export default function OrderStatusPage() {
  const params = useParams();
  const id = params?.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [confettiFired, setConfettiFired] = useState(false);

  // Poll order status
  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders/${id}`);
        const data = await res.json();
        if (data.success) {
          setOrder(data.order);
          setError(false);
          
          // Fire confetti if status is completed and not already fired
          if (data.order.status === 'completed' && !confettiFired) {
            import('canvas-confetti').then((confetti) => {
              confetti.default({
                particleCount: 150,
                spread: 80,
                origin: { y: 0.6 }
              });
              setConfettiFired(true);
            });
          }
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error fetching order', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder(); // Initial fetch
    const interval = setInterval(fetchOrder, 5000); // Poll every 5s

    return () => clearInterval(interval);
  }, [id, confettiFired]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStatusIndex = (status: Order['status']) => {
    const sequence: Order['status'][] = ['received', 'preparing', 'ready', 'completed'];
    return sequence.indexOf(status);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-brand-terracotta animate-spin stroke-[1.5]" />
        <p className="text-sm font-semibold text-brand-charcoal/70">Retrieving order details...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center space-y-6 px-4">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold font-serif text-brand-terracotta">Order Not Found</h2>
          <p className="text-sm text-brand-charcoal/70 max-w-sm">
            We couldn't locate an order with ID <span className="font-mono font-bold text-brand-charcoal">{id}</span>.
          </p>
        </div>
        <Link
          href="/menu"
          className="bg-brand-terracotta hover:bg-brand-orange text-white font-bold px-8 py-3 rounded-full transition-colors text-sm shadow-md"
        >
          Browse Menu & Order
        </Link>
      </div>
    );
  }

  const currentStatusIndex = getStatusIndex(order.status);
  const isDelivery = order.type === 'delivery';

  // Dynamic Status Title Copy
  const statusTitles = {
    received: "We've received your order",
    preparing: "Chef is simmering your meal",
    ready: isDelivery ? "Out for delivery" : "Ready for pickup",
    completed: "Enjoy the sweetness of home!",
    cancelled: "Order was cancelled"
  };

  const statusDescriptions = {
    received: "Your payment was processed and your order is in the kitchen queue. We will start preparing it shortly.",
    preparing: "Spices are being ground, stews are simmering, and swallowed doughs are being pounded by hand.",
    ready: isDelivery 
      ? "Our dispatch rider has picked up your food in an insulated pack and is heading your way."
      : "Your food is fresh off the stove, packed, and waiting at our Lekki Phase 1 counter.",
    completed: "Order completed. We hope each bite brings a warm feeling of home. See you next week!",
    cancelled: "This order has been cancelled. Please contact support if you need refund details."
  };

  const timelineSteps = [
    { label: 'Received', icon: Clock, desc: 'Logged in queue' },
    { label: 'Preparing', icon: ChefHat, desc: 'Cooking fresh' },
    { label: isDelivery ? 'Dispatched' : 'Ready', icon: isDelivery ? Truck : ShoppingBag, desc: isDelivery ? 'Out for delivery' : 'Ready to collect' },
    { label: 'Completed', icon: CheckCircle2, desc: 'Served with soul' }
  ];

  return (
    <div className="bg-brand-cream min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Order Header / Hero Banner */}
        <div className="bg-brand-sand/30 p-8 rounded-2xl border border-brand-sand/80 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-brand-sand/50 pb-5">
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-brand-orange">
                Tracking Order
              </p>
              <h1 className="text-2xl font-bold font-serif text-brand-charcoal mt-1">
                ID: <span className="font-mono text-brand-terracotta">{order.id}</span>
              </h1>
            </div>
            
            <div className="px-4 py-2 rounded-lg bg-white border border-brand-sand shadow-xs text-xs font-semibold text-brand-charcoal/80 flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full ${
                order.status === 'completed' ? 'bg-emerald-500' :
                order.status === 'cancelled' ? 'bg-red-500' : 'bg-brand-gold animate-ping'
              }`} />
              <span className="capitalize font-bold">{order.status === 'ready' ? (isDelivery ? 'Out for Delivery' : 'Ready for Pickup') : order.status}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-brand-terracotta">
              {statusTitles[order.status]}
            </h2>
            <p className="text-sm text-brand-charcoal/70 leading-relaxed font-light">
              {statusDescriptions[order.status]}
            </p>
          </div>
        </div>

        {/* Timeline Status Flow (Hidden if Cancelled) */}
        {order.status !== 'cancelled' && (
          <div className="bg-white p-8 sm:p-10 rounded-2xl border border-brand-sand/80">
            <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-4">
              
              {/* Desktop connecting lines */}
              <div className="hidden md:block absolute left-6 right-6 top-6 h-0.5 bg-brand-sand -z-1" />

              {timelineSteps.map((step, idx) => {
                const IconComponent = step.icon;
                const isPast = idx < currentStatusIndex;
                const isCurrent = idx === currentStatusIndex;
                
                return (
                  <div key={idx} className="relative z-10 flex md:flex-col items-center md:text-center gap-4 md:gap-3 flex-1">
                    
                    {/* Circle badge */}
                    <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                      isPast 
                        ? 'bg-emerald-500 border-emerald-500 text-white' 
                        : isCurrent 
                        ? 'bg-brand-terracotta border-brand-terracotta text-white scale-110 shadow-lg shadow-brand-terracotta/20 animate-pulse'
                        : 'bg-white border-brand-sand text-brand-charcoal/40'
                    }`}>
                      {isPast ? <Check className="w-5 h-5 stroke-[2.5]" /> : <IconComponent className="w-5 h-5" />}
                    </div>

                    <div className="space-y-0.5">
                      <h3 className={`font-bold text-sm leading-none ${
                        isCurrent ? 'text-brand-terracotta' : isPast ? 'text-emerald-600' : 'text-brand-charcoal/60'
                      }`}>
                        {step.label}
                      </h3>
                      <p className="text-[11px] text-brand-charcoal/50 font-light">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}

            </div>
          </div>
        )}

        {/* Order Details & Summary Receipts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Delivery details */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-brand-sand/80 space-y-6">
            <h3 className="font-bold text-lg font-serif text-brand-terracotta border-b border-brand-sand/50 pb-3">
              Delivery Details
            </h3>

            <div className="space-y-4 text-sm text-brand-charcoal/80">
              <div className="flex items-start space-x-3">
                <User className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-brand-charcoal">{order.customerName}</p>
                  <p className="text-xs text-brand-charcoal/50 mt-0.5">{order.customerEmail}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-brand-orange shrink-0" />
                <span>{order.customerPhone}</span>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-brand-charcoal">
                    {order.type === 'delivery' ? 'Ship to Doorstep' : 'Pickup at Lekki Kitchen'}
                  </p>
                  {order.type === 'delivery' ? (
                    <p className="text-xs text-brand-charcoal/70 mt-1 max-w-xs">{order.address}</p>
                  ) : (
                    <p className="text-xs text-brand-charcoal/70 mt-1 max-w-xs">
                      15 Admiralty Way, Lekki Phase 1, Lagos, Nigeria
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Items summary */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-brand-sand/80 space-y-6">
            <h3 className="font-bold text-lg font-serif text-brand-terracotta border-b border-brand-sand/50 pb-3">
              Order Receipt
            </h3>

            <div className="space-y-3.5 max-h-48 overflow-y-auto scrollbar-hide pr-1">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start text-xs sm:text-sm">
                  <div className="min-w-0 flex-grow">
                    <p className="font-semibold text-brand-charcoal truncate">{item.name}</p>
                    <p className="text-[10px] text-brand-orange mt-0.5">
                      {item.spiceLevel} · Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="font-bold text-brand-terracotta ml-3 shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Sum metrics */}
            <div className="border-t border-brand-sand/50 pt-4 space-y-2 text-xs text-brand-charcoal/80">
              <div className="flex justify-between">
                <span>Payment Reference</span>
                <span className="font-mono text-[10px] uppercase font-bold text-brand-charcoal/60">
                  {order.paymentReference}
                </span>
              </div>
              {isDelivery && (
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>{formatPrice(1500)}</span>
                </div>
              )}
            </div>

            <div className="border-t border-brand-sand/50 pt-4 flex justify-between items-center text-brand-charcoal">
              <span className="font-bold text-sm font-serif">Total Amount Paid</span>
              <span className="text-xl font-bold text-brand-terracotta">
                {formatPrice(order.totalAmount)}
              </span>
            </div>
          </div>

        </div>

        {/* Back Home Link */}
        <div className="text-center pt-4">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-semibold text-brand-terracotta hover:text-brand-orange transition-colors border-b border-brand-terracotta pb-0.5"
          >
            Go Back Home <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

      </div>
    </div>
  );
}
