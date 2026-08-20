'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { 
  ArrowLeft, CreditCard, Building, Smartphone, MapPin, 
  User, Mail, Phone, Loader2, ShieldCheck, ShoppingBag 
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartSubtotal, orderType, setOrderType, deliveryFee, clearCart } = useCart();

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [address, setAddress] = useState('');

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  // Simulated Paystack states
  const [paymentTab, setPaymentTab] = useState<'card' | 'bank' | 'ussd'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [selectedBank, setSelectedBank] = useState('GTBank');
  const [simulatedProgress, setSimulatedProgress] = useState<'idle' | 'authorizing' | 'success'>('idle');

  const totalAmount = cartSubtotal + deliveryFee;

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0 && !showPaymentModal && simulatedProgress !== 'success') {
      router.push('/menu');
    }
  }, [cart, router, showPaymentModal, simulatedProgress]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    // Open payment portal
    setShowPaymentModal(true);
  };

  const executePayment = async (reference: string = '') => {
    setSimulatedProgress('authorizing');
    
    // Simulate server side delays
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setSimulatedProgress('success');
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const orderData = {
        customerName,
        customerEmail,
        customerPhone,
        type: orderType,
        address: orderType === 'delivery' ? address : undefined,
        items: cart.map(item => ({
          menuItemId: item.menuItemId,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          spiceLevel: item.spiceLevel
        })),
        totalAmount,
        paymentMethod: paymentTab,
        paymentReference: reference || 'ADUN-MOCK-REF-' + Math.random().toString(36).substr(2, 9).toUpperCase()
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      const data = await res.json();
      if (data.success) {
        clearCart();
        setShowPaymentModal(false);
        router.push(`/order-status/${data.order.id}`);
      } else {
        alert('Failed to save order. Please contact support.');
        setSimulatedProgress('idle');
      }
    } catch (err) {
      console.error(err);
      alert('Network error. Please try again.');
      setSimulatedProgress('idle');
    }
  };

  return (
    <div className="bg-brand-cream min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back link */}
        <Link href="/menu" className="inline-flex items-center text-sm font-semibold text-brand-terracotta hover:text-brand-orange mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Menu
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-brand-terracotta mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Side */}
          <div className="lg:col-span-7">
            <form onSubmit={handleCheckoutSubmit} className="space-y-8">
              
              {/* Order Type Toggle */}
              <div className="bg-brand-sand/30 p-6 rounded-2xl border border-brand-sand space-y-4">
                <h2 className="font-bold text-lg font-serif text-brand-terracotta">
                  How should we get it to you?
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`py-3.5 rounded-xl border-2 font-semibold text-sm transition-all flex flex-col items-center gap-1.5 ${
                      orderType === 'delivery'
                        ? 'border-brand-terracotta bg-brand-terracotta/5 text-brand-terracotta'
                        : 'border-brand-gold/30 hover:border-brand-gold bg-white text-brand-charcoal/80'
                    }`}
                  >
                    <span className="font-bold text-base">🚴 Delivery</span>
                    <span className="text-[10px] opacity-75">Delivered to your doorstep</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType('pickup')}
                    className={`py-3.5 rounded-xl border-2 font-semibold text-sm transition-all flex flex-col items-center gap-1.5 ${
                      orderType === 'pickup'
                        ? 'border-brand-terracotta bg-brand-terracotta/5 text-brand-terracotta'
                        : 'border-brand-gold/30 hover:border-brand-gold bg-white text-brand-charcoal/80'
                    }`}
                  >
                    <span className="font-bold text-base">🛍️ Pickup</span>
                    <span className="text-[10px] opacity-75">Ready at Lekki Phase 1</span>
                  </button>
                </div>
              </div>

              {/* Personal Details */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-brand-sand/80 space-y-6">
                <h2 className="text-xl font-bold font-serif text-brand-terracotta border-b border-brand-sand/50 pb-4">
                  Contact Information
                </h2>

                <div className="space-y-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase font-bold tracking-wider text-brand-charcoal/70 flex items-center">
                      <User className="w-3.5 h-3.5 mr-1.5 text-brand-orange" /> Name
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      className="w-full bg-brand-cream/50 border border-brand-sand focus:border-brand-orange rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                      placeholder="e.g. Chinwe Obi"
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase font-bold tracking-wider text-brand-charcoal/70 flex items-center">
                        <Mail className="w-3.5 h-3.5 mr-1.5 text-brand-orange" /> Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={customerEmail}
                        onChange={e => setCustomerEmail(e.target.value)}
                        className="w-full bg-brand-cream/50 border border-brand-sand focus:border-brand-orange rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                        placeholder="chinwe@example.com"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase font-bold tracking-wider text-brand-charcoal/70 flex items-center">
                        <Phone className="w-3.5 h-3.5 mr-1.5 text-brand-orange" /> Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={e => setCustomerPhone(e.target.value)}
                        className="w-full bg-brand-cream/50 border border-brand-sand focus:border-brand-orange rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                        placeholder="e.g. +234 803 123 4567"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Address (conditionally shown) */}
              {orderType === 'delivery' && (
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-brand-sand/80 space-y-4 animate-scale-up">
                  <h2 className="text-xl font-bold font-serif text-brand-terracotta border-b border-brand-sand/50 pb-4 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-brand-orange" /> Delivery Address
                  </h2>
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase font-bold tracking-wider text-brand-charcoal/70">
                      Full Address
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      className="w-full bg-brand-cream/50 border border-brand-sand focus:border-brand-orange rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors resize-none"
                      placeholder="e.g. House 4, Block B, Lagoon View Estate, Lekki Phase 1"
                    />
                  </div>
                </div>
              )}

              {/* Checkout CTA */}
              <button
                type="submit"
                className="w-full bg-brand-terracotta hover:bg-brand-orange text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-brand-orange/20 transition-all duration-300 transform active:scale-98 flex items-center justify-center space-x-2"
              >
                <span>Proceed to Secure Payment</span>
              </button>
            </form>
          </div>

          {/* Cart Sidebar Summary */}
          <div className="lg:col-span-5">
            <div className="bg-brand-sand/20 p-6 sm:p-8 rounded-2xl border border-brand-sand/80 space-y-6 sticky top-28">
              <h2 className="text-lg font-bold font-serif text-brand-terracotta border-b border-brand-sand/50 pb-3 flex items-center">
                <ShoppingBag className="w-5 h-5 mr-2 text-brand-orange" /> Summary of Order
              </h2>

              {/* Cart List */}
              <div className="max-h-60 overflow-y-auto space-y-4 pr-1 scrollbar-hide">
                {cart.map((item) => (
                  <div key={`${item.menuItemId}-${item.spiceLevel}`} className="flex justify-between items-center text-sm">
                    <div className="min-w-0 flex-grow">
                      <p className="font-semibold text-brand-charcoal truncate">{item.name}</p>
                      <p className="text-[10px] font-semibold text-brand-orange">
                        {item.spiceLevel} · Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="font-bold text-brand-terracotta ml-3 shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Fees */}
              <div className="border-t border-brand-sand/50 pt-4 space-y-2 text-sm text-brand-charcoal/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Order Type</span>
                  <span className="capitalize">{orderType}</span>
                </div>
                {orderType === 'delivery' && (
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>{formatPrice(deliveryFee)}</span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="border-t border-brand-sand/50 pt-4 flex justify-between items-center text-brand-charcoal">
                <span className="font-bold text-base font-serif">Total to Pay</span>
                <span className="text-2xl font-bold text-brand-terracotta">
                  {formatPrice(totalAmount)}
                </span>
              </div>

              {/* Secure checkout info */}
              <div className="pt-2 flex items-center space-x-2 text-[10px] text-brand-charcoal/60 leading-normal">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Encrypted Paystack Gateway. We do not store card details.</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Paystack Simulated Overlay Portal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay backdrop */}
          <div className="absolute inset-0 bg-brand-charcoal/70 backdrop-blur-xs" onClick={() => {
            if (simulatedProgress !== 'authorizing') setShowPaymentModal(false);
          }} />

          {/* Checkout Frame */}
          <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-100 z-10 font-sans flex flex-col min-h-[450px]">
            
            {/* Paystack Styled Header */}
            <div className="bg-slate-50 border-b border-slate-100 p-6 flex justify-between items-start">
              <div className="space-y-1">
                {/* Paystack Simulated Icon */}
                <div className="flex items-center space-x-1">
                  <span className="text-emerald-500 font-extrabold text-lg">p</span>
                  <span className="text-slate-800 font-bold text-xs uppercase tracking-wider">paystack</span>
                </div>
                <p className="text-xs text-slate-500">Paying to <span className="font-semibold text-slate-700">Àdùn Restaurant</span></p>
                <p className="text-xs text-slate-400 font-mono break-all">{customerEmail}</p>
              </div>

              <div className="text-right">
                <span className="text-sm font-semibold text-slate-400">Amount</span>
                <p className="text-xl font-extrabold text-slate-800 tracking-tight">{formatPrice(totalAmount)}</p>
              </div>
            </div>

            {/* Simulated Payment Container */}
            {simulatedProgress === 'idle' ? (
              <div className="flex-1 flex flex-col md:flex-row">
                
                {/* Left/Top Menu Panel */}
                <div className="bg-slate-50 border-r border-slate-100 flex md:flex-col md:w-36 overflow-x-auto shrink-0 md:pt-4">
                  <button
                    onClick={() => setPaymentTab('card')}
                    className={`flex-1 md:flex-initial text-left px-4 py-3 text-xs font-semibold flex items-center space-x-2 border-b-2 md:border-b-0 md:border-l-2 transition-colors ${
                      paymentTab === 'card'
                        ? 'bg-white text-emerald-600 border-emerald-500'
                        : 'text-slate-500 hover:text-slate-800 border-transparent'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 shrink-0" />
                    <span className="truncate">Pay with Card</span>
                  </button>

                  <button
                    onClick={() => setPaymentTab('bank')}
                    className={`flex-1 md:flex-initial text-left px-4 py-3 text-xs font-semibold flex items-center space-x-2 border-b-2 md:border-b-0 md:border-l-2 transition-colors ${
                      paymentTab === 'bank'
                        ? 'bg-white text-emerald-600 border-emerald-500'
                        : 'text-slate-500 hover:text-slate-800 border-transparent'
                    }`}
                  >
                    <Building className="w-4 h-4 shrink-0" />
                    <span className="truncate">Bank Transfer</span>
                  </button>

                  <button
                    onClick={() => setPaymentTab('ussd')}
                    className={`flex-1 md:flex-initial text-left px-4 py-3 text-xs font-semibold flex items-center space-x-2 border-b-2 md:border-b-0 md:border-l-2 transition-colors ${
                      paymentTab === 'ussd'
                        ? 'bg-white text-emerald-600 border-emerald-500'
                        : 'text-slate-500 hover:text-slate-800 border-transparent'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 shrink-0" />
                    <span className="truncate">USSD Code</span>
                  </button>
                </div>

                {/* Tab Forms */}
                <div className="flex-grow p-6 flex flex-col justify-between">
                  {/* Card payment content */}
                  {paymentTab === 'card' && (
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-slate-800">Enter your card details</h3>
                      
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Card Number</label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={e => setCardNumber(e.target.value.replace(/\D/g, '').substr(0, 16))}
                            placeholder="0000 0000 0000 0000"
                            className="w-full border border-slate-200 focus:border-emerald-500 rounded-lg px-3 py-2 text-sm focus:outline-none tracking-widest font-mono"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Expiry</label>
                            <input
                              type="text"
                              value={cardExpiry}
                              onChange={e => setCardExpiry(e.target.value.substr(0, 5))}
                              placeholder="MM/YY"
                              className="w-full border border-slate-200 focus:border-emerald-500 rounded-lg px-3 py-2 text-sm focus:outline-none text-center font-mono"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">CVV</label>
                            <input
                              type="password"
                              value={cardCvv}
                              onChange={e => setCardCvv(e.target.value.replace(/\D/g, '').substr(0, 3))}
                              placeholder="123"
                              className="w-full border border-slate-200 focus:border-emerald-500 rounded-lg px-3 py-2 text-sm focus:outline-none text-center font-mono"
                            />
                          </div>
                        </div>
                      </div>

                      <p className="text-[10px] text-slate-400 leading-normal">
                        Simulating sandbox payment. Use dummy credit card numbers for testing (e.g. standard mock numbers).
                      </p>
                    </div>
                  )}

                  {/* Bank transfer content */}
                  {paymentTab === 'bank' && (
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-slate-800">Transfer bank payment</h3>
                      
                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-2 text-slate-700 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Bank:</span>
                          <span className="font-semibold">Sterling Bank (Mock)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Account Number:</span>
                          <span className="font-mono font-bold text-sm text-slate-800">9024 1823 00</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Beneficiary:</span>
                          <span className="font-semibold text-slate-800">Àdùn Restaurant Ltd</span>
                        </div>
                      </div>

                      <p className="text-[10px] text-slate-400 leading-normal">
                        Send the exact amount shown. Tap the confirmation button below once the transfer has been completed.
                      </p>
                    </div>
                  )}

                  {/* USSD payment content */}
                  {paymentTab === 'ussd' && (
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-slate-800">USSD Code Transaction</h3>
                      
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Choose Bank</label>
                        <select
                          value={selectedBank}
                          onChange={e => setSelectedBank(e.target.value)}
                          className="w-full border border-slate-200 focus:border-emerald-500 rounded-lg px-3 py-2 text-sm focus:outline-none text-slate-700 font-semibold"
                        >
                          <option>GTBank (*737#)</option>
                          <option>Access Bank (*901#)</option>
                          <option>UBA (*919#)</option>
                          <option>Zenith Bank (*966#)</option>
                        </select>
                      </div>

                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-center">
                        <p className="text-[10px] uppercase text-slate-400 font-bold mb-1">Dial Code Below</p>
                        <code className="text-base font-bold text-slate-800 select-all font-mono">
                          *737*1*2*{totalAmount}#
                        </code>
                      </div>
                    </div>
                  )}

                  {/* Submit Button inside tab container */}
                  <div className="pt-4 mt-auto">
                    <button
                      onClick={() => executePayment()}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-lg text-sm shadow-sm transition-colors"
                    >
                      {paymentTab === 'card' && `Pay ${formatPrice(totalAmount)}`}
                      {paymentTab === 'bank' && "I've sent the money"}
                      {paymentTab === 'ussd' && "Dial Code & Confirm"}
                    </button>
                  </div>
                </div>

              </div>
            ) : (
              // Payment progress screens
              <div className="flex-grow flex flex-col items-center justify-center p-8 text-center space-y-6">
                {simulatedProgress === 'authorizing' ? (
                  <>
                    <Loader2 className="w-16 h-16 text-emerald-500 animate-spin stroke-[1.5]" />
                    <div className="space-y-2">
                      <h4 className="text-lg font-bold text-slate-800">Processing Transaction...</h4>
                      <p className="text-xs text-slate-400 max-w-xs mx-auto leading-normal">
                        Please do not refresh the browser or press the back button. Authenticating checkout credentials.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold text-slate-800">Payment Successful</h4>
                      <p className="text-xs text-emerald-600 font-semibold">Redirecting to order tracking...</p>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
