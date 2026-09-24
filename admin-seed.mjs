import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

const serviceAccount = JSON.parse(readFileSync(new URL('./serviceAccountKey.json', import.meta.url)));

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const articles = [
  {
    id: "prod_1",
    title: "Wireless Noise-Canceling Earbuds",
    description: "Experience pure sound with these sleek, noise-canceling wireless earbuds. Includes a compact charging case for on-the-go power.",
    thumbnail: "/images/earbuds.jpg",
    screenshots: [],
    price: 89.99,
    category: 2,
    active: true
  },
  {
    id: "prod_2",
    title: "Minimalist Ceramic Coffee Mug",
    description: "Start your morning right with this earthy, matte ceramic coffee mug. Designed for comfort and aesthetic appeal.",
    thumbnail: "/images/ceramic_mug.jpg",
    screenshots: [],
    price: 18.50,
    category: 3,
    active: true
  },
  {
    id: "prod_3",
    title: "Premium Eco-Friendly Yoga Mat",
    description: "Enhance your practice with this non-slip, textured yoga mat. Made from eco-friendly materials to support your wellness journey.",
    thumbnail: "/images/yoga_mat.jpg",
    screenshots: [],
    price: 45.00,
    category: 3,
    active: true
  },
  {
    id: "prod_4",
    title: "Classic Canvas Sneakers",
    description: "A timeless wardrobe staple. These comfortable white canvas sneakers pair perfectly with any casual outfit.",
    thumbnail: "/images/canvas_sneakers.jpg",
    screenshots: [],
    price: 55.00,
    category: 0,
    active: true
  },
  {
    id: "prod_5",
    title: "Hydrating Vitamin C Serum",
    description: "Revitalize your skin with our brightening Vitamin C serum. Formulated to reduce dark spots and provide a radiant glow.",
    thumbnail: "/images/vitamin_c_serum.jpg",
    screenshots: [],
    price: 29.99,
    category: 3,
    active: true
  },
  {
    id: "prod_6",
    title: "Smart Fitness Tracker Watch",
    description: "Keep track of your health metrics, steps, and heart rate. Features a sleek design and a long-lasting battery life.",
    thumbnail: "/images/smart_watch.jpg",
    screenshots: [],
    price: 129.99,
    category: 2,
    active: true
  },
  {
    id: "prod_7",
    title: "Ergonomic Office Chair",
    description: "Upgrade your workspace with this fully adjustable ergonomic chair, designed to provide lumbar support during long hours.",
    thumbnail: "/images/office_chair.jpg",
    screenshots: [],
    price: 199.50,
    category: 3,
    active: true
  },
  {
    id: "prod_8",
    title: "Insulated Stainless Steel Water Bottle",
    description: "Keep your drinks cold for 24 hours or hot for 12 hours. Durable, BPA-free, and perfect for your active lifestyle.",
    thumbnail: "/images/water_bottle.jpg",
    screenshots: [],
    price: 24.00,
    category: 1,
    active: true
  },
  {
    id: "prod_9",
    title: "Vintage Leather Backpack",
    description: "Combine style and functionality. This spacious leather backpack features multiple compartments for your laptop and essentials.",
    thumbnail: "/images/leather_backpack.jpg",
    screenshots: [],
    price: 110.00,
    category: 1,
    active: true
  },
  {
    id: "prod_10",
    title: "Organic Soy Wax Candle",
    description: "Set a relaxing mood with this hand-poured soy wax candle. Features a calming lavender and vanilla scent.",
    thumbnail: "/images/soy_candle.jpg",
    screenshots: [],
    price: 22.00,
    category: 3,
    active: true
  }
];

async function seed() {
  let successCount = 0;
  for (const item of articles) {
    if (!item.screenshots || item.screenshots.length === 0) {
      item.screenshots = [item.thumbnail];
    }
    try {
      await db.collection("articles").doc(item.id).set(item);
      successCount++;
      console.log(`Saved ${item.title}`);
    } catch (e) {
      console.error(`Failed to save ${item.title}:`, e);
    }
  }
  console.log(`Successfully seeded ${successCount} products into Firestore using Admin SDK.`);
  process.exit(0);
}

seed();
