import { Product } from '../types';

export const products: Product[] = [
  // ── Electronics ──
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-fidelity audio with active noise cancellation and 40-hour battery life. Features Bluetooth 5.3, multipoint connection, and a premium carrying case.',
    price: 299.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 124
  },
  {
    id: '4',
    name: 'Smart Home Hub',
    description: 'Control your entire home with voice commands and automated routines. Compatible with Alexa, Google Home, and Apple HomeKit.',
    price: 129.00,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&q=80&w=800',
    rating: 4.5,
    reviews: 56
  },
  {
    id: '7',
    name: '4K Ultra HD Monitor',
    description: '32-inch IPS display with HDR10 support, 144Hz refresh rate, and USB-C connectivity. Perfect for creative professionals and gamers.',
    price: 599.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviews: 203
  },
  {
    id: '8',
    name: 'Wireless Charging Pad',
    description: 'Fast 15W wireless charger with LED indicator and anti-slip surface. Compatible with all Qi-enabled devices.',
    price: 39.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1586953208270-767889db7bc2?auto=format&fit=crop&q=80&w=800',
    rating: 4.3,
    reviews: 87
  },
  {
    id: '9',
    name: 'Portable Bluetooth Speaker',
    description: 'Waterproof IPX7 rated speaker with 360-degree sound, 20-hour playtime, and built-in microphone for calls.',
    price: 89.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    reviews: 312
  },
  {
    id: '10',
    name: 'Mechanical Keyboard RGB',
    description: 'Hot-swappable Cherry MX switches, per-key RGB lighting, and aircraft-grade aluminum frame. N-key rollover for gaming.',
    price: 149.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 445
  },
  {
    id: '11',
    name: 'Smart Fitness Watch',
    description: 'Track heart rate, SpO2, sleep, and 100+ workout modes. 7-day battery life with always-on AMOLED display.',
    price: 249.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviews: 567
  },
  {
    id: '12',
    name: 'USB-C Docking Station',
    description: '12-in-1 hub with dual HDMI, Ethernet, SD card reader, and 100W power delivery pass-through charging.',
    price: 79.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&q=80&w=800',
    rating: 4.4,
    reviews: 134
  },

  // ── Accessories ──
  {
    id: '2',
    name: 'Minimalist Leather Watch',
    description: 'Elegant timepiece with genuine Italian leather strap and Japanese quartz movement. Water resistant to 50m.',
    price: 150.00,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    reviews: 89
  },
  {
    id: '13',
    name: 'Designer Sunglasses',
    description: 'UV400 polarized lenses in a classic aviator frame. Titanium hinges and scratch-resistant coating.',
    price: 120.00,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800',
    rating: 4.5,
    reviews: 178
  },
  {
    id: '14',
    name: 'Leather Backpack',
    description: 'Full-grain leather backpack with padded laptop compartment, multiple organizer pockets, and YKK zippers.',
    price: 189.00,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 256
  },
  {
    id: '15',
    name: 'Canvas Belt',
    description: 'Reinforced canvas belt with quick-release buckle. Adjustable size fits all. Perfect for outdoor adventures.',
    price: 29.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
    rating: 4.3,
    reviews: 64
  },
  {
    id: '16',
    name: 'Minimalist Wallet',
    description: 'RFID-blocking slim wallet crafted from vegan leather. Holds up to 8 cards with a quick-access cash slot.',
    price: 45.00,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviews: 342
  },
  {
    id: '17',
    name: 'Silicone Watch Band',
    description: 'Premium silicone replacement band compatible with Apple Watch and Samsung Galaxy Watch. Multiple colors available.',
    price: 19.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1546868871-af0de0ae72be?auto=format&fit=crop&q=80&w=800',
    rating: 4.2,
    reviews: 89
  },

  // ── Apparel ──
  {
    id: '3',
    name: 'Organic Cotton Hoodie',
    description: 'Ultra-soft, sustainable GOTS-certified organic cotton hoodie designed for maximum comfort and warmth.',
    price: 85.00,
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviews: 215
  },
  {
    id: '18',
    name: 'Slim Fit Denim Jeans',
    description: 'Premium stretch denim with a modern slim fit. Features reinforced stitching and a timeless wash.',
    price: 79.99,
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    reviews: 189
  },
  {
    id: '19',
    name: 'Performance Running Shoes',
    description: 'Lightweight mesh upper with responsive foam cushioning and rubber outsole for superior grip on any terrain.',
    price: 139.99,
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 534
  },
  {
    id: '20',
    name: 'Merino Wool Sweater',
    description: 'Breathable temperature-regulating merino wool. Naturally odor-resistant and machine washable.',
    price: 95.00,
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cda3a1a?auto=format&fit=crop&q=80&w=800',
    rating: 4.5,
    reviews: 112
  },
  {
    id: '21',
    name: 'Classic White T-Shirt',
    description: 'Heavyweight 100% combed cotton tee with a relaxed fit. Pre-shrunk and built to last through hundreds of washes.',
    price: 35.00,
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
    rating: 4.4,
    reviews: 890
  },
  {
    id: '22',
    name: 'Waterproof Hiking Jacket',
    description: '3-layer waterproof shell with sealed seams, adjustable hood, and underarm vents. Rated for extreme conditions.',
    price: 199.99,
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 267
  },

  // ── Furniture ──
  {
    id: '5',
    name: 'Ergonomic Desk Chair',
    description: 'Supportive office chair with adjustable lumbar support, breathable mesh back, and 4D armrests.',
    price: 450.00,
    category: 'Furniture',
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 342
  },
  {
    id: '23',
    name: 'Standing Desk',
    description: 'Electric height-adjustable desk with memory presets, cable management tray, and solid bamboo desktop.',
    price: 549.00,
    category: 'Furniture',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 198
  },
  {
    id: '24',
    name: 'Mid-Century Bookshelf',
    description: 'Solid walnut bookshelf with 5 tiers and a clean mid-century modern aesthetic. Easy assembly required.',
    price: 279.00,
    category: 'Furniture',
    image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    reviews: 76
  },
  {
    id: '25',
    name: 'Velvet Accent Chair',
    description: 'Plush velvet upholstery with gold-finished metal legs. Adds a touch of luxury to any living space.',
    price: 349.00,
    category: 'Furniture',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviews: 143
  },
  {
    id: '26',
    name: 'Minimalist Floor Lamp',
    description: 'Adjustable LED floor lamp with warm/cool temperature control and touch dimming. Slim profile fits any corner.',
    price: 129.00,
    category: 'Furniture',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?auto=format&fit=crop&q=80&w=800',
    rating: 4.5,
    reviews: 98
  },

  // ── Lifestyle ──
  {
    id: '6',
    name: 'Stainless Steel Water Bottle',
    description: 'Vacuum-insulated bottle that keeps drinks cold for 24 hours or hot for 12. BPA-free and leak-proof.',
    price: 35.00,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1602143301015-81867a502d42?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 720
  },
  {
    id: '27',
    name: 'Aromatherapy Candle Set',
    description: 'Set of 3 hand-poured soy wax candles in lavender, eucalyptus, and vanilla. 45-hour burn time each.',
    price: 42.00,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1602607747359-0987e tried?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    reviews: 234
  },
  {
    id: '28',
    name: 'Yoga Mat Premium',
    description: 'Extra-thick 6mm non-slip natural rubber mat with alignment lines. Includes carrying strap.',
    price: 68.00,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviews: 456
  },
  {
    id: '29',
    name: 'Leather Journal Notebook',
    description: 'Handbound genuine leather cover with 200 pages of acid-free cream paper. Perfect for sketching or journaling.',
    price: 34.99,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 567
  },
  {
    id: '30',
    name: 'Pour-Over Coffee Maker',
    description: 'Borosilicate glass carafe with reusable stainless steel filter. Brews 4 cups of perfectly extracted coffee.',
    price: 44.99,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    reviews: 321
  },
  {
    id: '31',
    name: 'Indoor Herb Garden Kit',
    description: 'Self-watering planter with LED grow light. Includes basil, cilantro, and mint seed pods to get you started.',
    price: 59.99,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=800',
    rating: 4.4,
    reviews: 178
  },

  // ── Books ──
  {
    id: '32',
    name: 'The Art of Clean Code',
    description: 'A comprehensive guide to writing maintainable, scalable software. Covers principles, patterns, and practices used by top engineers.',
    price: 39.99,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 1024
  },
  {
    id: '33',
    name: 'Design Thinking Handbook',
    description: 'Learn the design thinking methodology from ideation to prototyping. Packed with real-world case studies from leading companies.',
    price: 29.99,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800',
    rating: 4.5,
    reviews: 456
  },
  {
    id: '34',
    name: 'Mindful Leadership Guide',
    description: 'Discover how mindfulness practices can transform your leadership style and improve team performance and well-being.',
    price: 24.99,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1519682577862-22b62b24e493?auto=format&fit=crop&q=80&w=800',
    rating: 4.3,
    reviews: 189
  },

  // ── Sports & Fitness ──
  {
    id: '35',
    name: 'Resistance Band Set',
    description: 'Set of 5 latex bands with varying resistance levels. Includes door anchor, handles, and carry bag.',
    price: 29.99,
    category: 'Sports & Fitness',
    image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&q=80&w=800',
    rating: 4.5,
    reviews: 678
  },
  {
    id: '36',
    name: 'Insulated Protein Shaker',
    description: 'Double-wall insulated shaker with mixing ball and storage compartments. Keeps drinks cold for 24 hours.',
    price: 24.99,
    category: 'Sports & Fitness',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=800',
    rating: 4.4,
    reviews: 345
  },
  {
    id: '37',
    name: 'Adjustable Dumbbell Set',
    description: 'Replace 15 sets of weights with one pair. Quick-change mechanism adjusts from 5 to 52.5 lbs per hand.',
    price: 349.99,
    category: 'Sports & Fitness',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 234
  },
  {
    id: '38',
    name: 'Cycling GPS Computer',
    description: 'Track rides with GPS, heart rate, and power meter connectivity. 20-hour battery with turn-by-turn navigation.',
    price: 199.99,
    category: 'Sports & Fitness',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    reviews: 156
  },

  // ── Home & Kitchen ──
  {
    id: '39',
    name: 'Smart Air Purifier',
    description: 'HEPA H13 filter removes 99.97% of particles. App-controlled with real-time air quality monitoring.',
    price: 179.99,
    category: 'Home & Kitchen',
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviews: 321
  },
  {
    id: '40',
    name: 'Cast Iron Skillet Set',
    description: 'Pre-seasoned 3-piece set (8", 10", 12") for stovetop, oven, grill, and campfire cooking. Lifetime warranty.',
    price: 89.99,
    category: 'Home & Kitchen',
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 876
  },
  {
    id: '41',
    name: 'Automatic Espresso Machine',
    description: 'Bean-to-cup espresso with built-in grinder, milk frother, and programmable drink settings. Barista quality at home.',
    price: 699.99,
    category: 'Home & Kitchen',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    reviews: 234
  },
  {
    id: '42',
    name: 'Bamboo Knife Block Set',
    description: '8-piece professional knife set with ergonomic handles and a beautiful bamboo storage block.',
    price: 149.99,
    category: 'Home & Kitchen',
    image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviews: 198
  }
];
