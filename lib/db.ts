import fs from 'fs';
import path from 'path';
import { supabase } from './supabase';

// Define DB file path
const DB_FILE = path.join(process.cwd(), 'db.json');

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number; // in NGN (₦)
  category: 'swallow-soups' | 'rice' | 'grills-proteins' | 'sides' | 'drinks';
  spiceLevel: 'none' | 'mild' | 'medium' | 'hot' | 'fiery';
  image: string;
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
  spiceLevel?: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  type: 'delivery' | 'pickup';
  address?: string;
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: 'card' | 'bank_transfer' | 'ussd';
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentReference: string;
  status: 'received' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface Settings {
  adminEnabled: boolean;
}

export interface DatabaseSchema {
  menu: MenuItem[];
  orders: Order[];
  settings: Settings;
}

// Initial seed menu for JSON fallback
const INITIAL_MENU: MenuItem[] = [
  {
    id: 'pounded-yam-egusi',
    name: 'Pounded Yam & Egusi',
    description: 'Hand-pounded the way it\'s always been done. Smooth, stretchy, and paired perfectly with our rich melon-seed soup. Comfort food, no compromises.',
    price: 5000,
    category: 'swallow-soups',
    spiceLevel: 'medium',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'amala-ewedu',
    name: 'Amala & Ewedu',
    description: 'Hand-crafted the way it\'s always been done. Silky amala meets our signature ewedu — smooth, earthy, and deeply satisfying. Comfort food, no compromises.',
    price: 4500,
    category: 'swallow-soups',
    spiceLevel: 'medium',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'eba-egusi',
    name: 'Eba & Egusi',
    description: 'Made the way it\'s always been done. Soft, pliable eba paired with hearty melon-seed soup loaded with assorted meat. Comfort food, no compromises.',
    price: 4000,
    category: 'swallow-soups',
    spiceLevel: 'medium',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'semo-ogbono',
    name: 'Semo & Ogbono',
    description: 'Prepared the way it\'s always been done. Smooth semo with our thick, savory ogbono soup. Comfort food, no compromises.',
    price: 4200,
    category: 'swallow-soups',
    spiceLevel: 'medium',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'efo-riro',
    name: 'Efo Riro',
    description: 'Bold, peppery, and loaded with assorted meat and fish. A rich vegetable stew simmered layer by layer — the dish jollof-lovers secretly crave just as much.',
    price: 3500,
    category: 'swallow-soups',
    spiceLevel: 'hot',
    image: 'https://images.unsplash.com/photo-1649182333068-ad2c4d62b9a7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'jollof-rice',
    name: 'Jollof Rice',
    description: 'Smoky, spiced, and simmered to perfection over an open flame — the dish that started it all.',
    price: 3000,
    category: 'rice',
    spiceLevel: 'medium',
    image: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'fried-rice',
    name: 'Fried Rice',
    description: 'Buttery, colorful, and packed with fresh vegetables — the crowd-pleaser on every table.',
    price: 3000,
    category: 'rice',
    spiceLevel: 'mild',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ofada-rice-ayamase',
    name: 'Ofada Rice & Ayamase',
    description: 'Earthy, robust rice paired with our fiery green pepper sauce — a bold classic for the adventurous eater.',
    price: 4500,
    category: 'rice',
    spiceLevel: 'hot',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'suya-platter',
    name: 'Suya Platter',
    description: 'Charcoal-grilled, spice-crusted, and fiery. Smoky beef coated in our signature suya spice — not for the faint of heart.',
    price: 5500,
    category: 'grills-proteins',
    spiceLevel: 'fiery',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'croaker-fish',
    name: 'Croaker Fish',
    description: 'Fresh-grilled, tender, and seasoned deep to the bone — simple, clean, and packed with flavor.',
    price: 6000,
    category: 'grills-proteins',
    spiceLevel: 'medium',
    image: 'https://images.unsplash.com/photo-1580476214401-4ecd1ad06060?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'meat-egg-stew',
    name: 'Meat & Egg in Stew',
    description: 'Tender meat and boiled egg swimming in a rich, spicy tomato stew — tasty, delicious, and deeply satisfying.',
    price: 2500,
    category: 'grills-proteins',
    spiceLevel: 'hot',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'yamarita-fish-sauce',
    name: 'Yamarita + Fish Sauce',
    description: 'Crispy fried plantain-yam fritters served with a savory fish sauce — golden, crunchy, and impossible to stop eating.',
    price: 3500,
    category: 'grills-proteins',
    spiceLevel: 'mild',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'moin-moin',
    name: 'Moin Moin',
    description: 'Steamed bean pudding, soft and savory — the perfect companion to any main.',
    price: 1000,
    category: 'sides',
    spiceLevel: 'mild',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'plantain-dodo',
    name: 'Plantain (Dodo)',
    description: 'Sweet, caramelized, pan-fried to golden perfection — the side that steals the show.',
    price: 1200,
    category: 'sides',
    spiceLevel: 'mild',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'zobo',
    name: 'Zobo',
    description: 'Fresh hibiscus, ginger, and a touch of spice — our zobo is cold, bold, and refreshing.',
    price: 800,
    category: 'drinks',
    spiceLevel: 'none',
    image: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'chapman',
    name: 'Chapman',
    description: 'Citrus, grenadine, and a splash of soda — bright, fruity, and endlessly drinkable.',
    price: 1500,
    category: 'drinks',
    spiceLevel: 'none',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80'
  }
];

// Helper to initialize local JSON database file if it doesn't exist
function initJSONDB(): DatabaseSchema {
  if (!fs.existsSync(DB_FILE)) {
    const data: DatabaseSchema = {
      menu: INITIAL_MENU,
      orders: [],
      settings: { adminEnabled: false }
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return data;
  }
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (!parsed.settings) {
      parsed.settings = { adminEnabled: false };
      fs.writeFileSync(DB_FILE, JSON.stringify(parsed, null, 2), 'utf-8');
    }
    return parsed;
  } catch (e) {
    const data: DatabaseSchema = {
      menu: INITIAL_MENU,
      orders: [],
      settings: { adminEnabled: false }
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return data;
  }
}

// Database helper adapter supporting both JSON DB and Supabase
export const db = {
  getMenu: async (): Promise<MenuItem[]> => {
    if (supabase) {
      try {
        const { data, error } = await supabase.from('menu_items').select('*');
        if (!error && data) {
          return data.map(item => ({
            id: item.id,
            name: item.name,
            description: item.description,
            price: Number(item.price),
            category: item.category as MenuItem['category'],
            spiceLevel: item.spice_level as MenuItem['spiceLevel'],
            image: item.image
          }));
        }
        console.warn('Supabase menu fetch error, using local fallback:', error);
      } catch (err) {
        console.error('Supabase menu connection failed, using local fallback:', err);
      }
    }
    
    // Local Fallback
    const data = initJSONDB();
    return data.menu;
  },

  getOrders: async (): Promise<Order[]> => {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data) {
          return data.map(o => ({
            id: o.id,
            customerName: o.customer_name,
            customerEmail: o.customer_email,
            customerPhone: o.customer_phone,
            type: o.type as Order['type'],
            address: o.address || undefined,
            items: typeof o.items === 'string' ? JSON.parse(o.items) : o.items,
            totalAmount: Number(o.total_amount),
            paymentMethod: o.payment_method as Order['paymentMethod'],
            paymentStatus: o.payment_status as Order['paymentStatus'],
            paymentReference: o.payment_reference,
            status: o.status as Order['status'],
            createdAt: o.created_at,
            updatedAt: o.updated_at
          }));
        }
        console.warn('Supabase orders fetch error, using local fallback:', error);
      } catch (err) {
        console.error('Supabase orders connection failed, using local fallback:', err);
      }
    }

    // Local Fallback
    const data = initJSONDB();
    return data.orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  getOrderById: async (id: string): Promise<Order | undefined> => {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('id', id)
          .maybeSingle();
        if (!error && data) {
          return {
            id: data.id,
            customerName: data.customer_name,
            customerEmail: data.customer_email,
            customerPhone: data.customer_phone,
            type: data.type as Order['type'],
            address: data.address || undefined,
            items: typeof data.items === 'string' ? JSON.parse(data.items) : data.items,
            totalAmount: Number(data.total_amount),
            paymentMethod: data.payment_method as Order['paymentMethod'],
            paymentStatus: data.payment_status as Order['paymentStatus'],
            paymentReference: data.payment_reference,
            status: data.status as Order['status'],
            createdAt: data.created_at,
            updatedAt: data.updated_at
          };
        }
        console.warn('Supabase orderById fetch error, using local fallback:', error);
      } catch (err) {
        console.error('Supabase orderById connection failed, using local fallback:', err);
      }
    }

    // Local Fallback
    const data = initJSONDB();
    return data.orders.find(o => o.id === id);
  },

  createOrder: async (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<Order> => {
    const id = 'ADUN-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const now = new Date().toISOString();

    if (supabase) {
      try {
        const payload = {
          id,
          customer_name: orderData.customerName,
          customer_email: orderData.customerEmail,
          customer_phone: orderData.customerPhone,
          type: orderData.type,
          address: orderData.address || null,
          items: orderData.items, // supabase-js serializes array/object payloads automatically
          total_amount: orderData.totalAmount,
          payment_method: orderData.paymentMethod,
          payment_status: orderData.paymentStatus,
          payment_reference: orderData.paymentReference,
          status: 'received',
          created_at: now,
          updated_at: now
        };

        const { data, error } = await supabase
          .from('orders')
          .insert([payload])
          .select()
          .single();

        if (!error && data) {
          return {
            id: data.id,
            customerName: data.customer_name,
            customerEmail: data.customer_email,
            customerPhone: data.customer_phone,
            type: data.type as Order['type'],
            address: data.address || undefined,
            items: typeof data.items === 'string' ? JSON.parse(data.items) : data.items,
            totalAmount: Number(data.total_amount),
            paymentMethod: data.payment_method as Order['paymentMethod'],
            paymentStatus: data.payment_status as Order['paymentStatus'],
            paymentReference: data.payment_reference,
            status: data.status as Order['status'],
            createdAt: data.created_at,
            updatedAt: data.updated_at
          };
        }
        console.warn('Supabase createOrder error, using local fallback:', error);
      } catch (err) {
        console.error('Supabase createOrder connection failed, using local fallback:', err);
      }
    }

    // Local Fallback
    const data = initJSONDB();
    const newOrder: Order = {
      ...orderData,
      id,
      status: 'received',
      createdAt: now,
      updatedAt: now
    };
    data.orders.push(newOrder);
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return newOrder;
  },

  updateOrderStatus: async (id: string, status: Order['status'], paymentStatus?: Order['paymentStatus']): Promise<Order | undefined> => {
    const now = new Date().toISOString();

    if (supabase) {
      try {
        const updatePayload: any = {
          status,
          updated_at: now
        };
        if (paymentStatus) {
          updatePayload.payment_status = paymentStatus;
        }

        const { data, error } = await supabase
          .from('orders')
          .update(updatePayload)
          .eq('id', id)
          .select()
          .maybeSingle();

        if (!error && data) {
          return {
            id: data.id,
            customerName: data.customer_name,
            customerEmail: data.customer_email,
            customerPhone: data.customer_phone,
            type: data.type as Order['type'],
            address: data.address || undefined,
            items: typeof data.items === 'string' ? JSON.parse(data.items) : data.items,
            totalAmount: Number(data.total_amount),
            paymentMethod: data.payment_method as Order['paymentMethod'],
            paymentStatus: data.payment_status as Order['paymentStatus'],
            paymentReference: data.payment_reference,
            status: data.status as Order['status'],
            createdAt: data.created_at,
            updatedAt: data.updated_at
          };
        }
        console.warn('Supabase updateOrderStatus error, using local fallback:', error);
      } catch (err) {
        console.error('Supabase updateOrderStatus connection failed, using local fallback:', err);
      }
    }

    // Local Fallback
    const data = initJSONDB();
    const index = data.orders.findIndex(o => o.id === id);
    if (index === -1) return undefined;
    
    data.orders[index].status = status;
    data.orders[index].updatedAt = now;
    if (paymentStatus) {
      data.orders[index].paymentStatus = paymentStatus;
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return data.orders[index];
  },

  getSettings: async (): Promise<Settings> => {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('settings')
          .select('*')
          .eq('id', 'default')
          .maybeSingle();
        if (!error && data) {
          return {
            adminEnabled: data.admin_enabled
          };
        }
        console.warn('Supabase settings fetch error, using local fallback:', error);
      } catch (err) {
        console.error('Supabase settings connection failed, using local fallback:', err);
      }
    }

    // Local Fallback
    const data = initJSONDB();
    return data.settings;
  }
};
