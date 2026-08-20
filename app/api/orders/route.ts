import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      type,
      address,
      items,
      totalAmount,
      paymentMethod,
      paymentReference
    } = body;

    // Server-side validation
    if (!customerName || !customerEmail || !customerPhone || !type || !items || items.length === 0 || !totalAmount) {
      return NextResponse.json(
        { error: 'Missing required order fields' },
        { status: 400 }
      );
    }

    if (type === 'delivery' && !address) {
      return NextResponse.json(
        { error: 'Delivery address is required for delivery orders' },
        { status: 400 }
      );
    }

    // Save order
    const order = await db.createOrder({
      customerName,
      customerEmail,
      customerPhone,
      type,
      address: type === 'delivery' ? address : undefined,
      items,
      totalAmount,
      paymentMethod,
      paymentStatus: 'paid', // For standard Paystack flow, checkout confirms payment first
      paymentReference: paymentReference || 'MOCK-REF-' + Math.random().toString(36).substr(2, 9).toUpperCase()
    });

    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    console.error('API Orders POST error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const orders = await db.getOrders();
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error('API Orders GET error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
