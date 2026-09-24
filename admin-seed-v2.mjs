import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

const serviceAccount = JSON.parse(readFileSync(new URL('./serviceAccountKey.json', import.meta.url)));

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const articles = [
  { id: "prod_1", title: "Wireless Noise-Canceling Earbuds", description: "Experience pure sound with these sleek, noise-canceling wireless earbuds. Includes a compact charging case for on-the-go power.", thumbnail: "/images/earbuds.jpg", screenshots: [], price: 89.99, category: 1, active: true },
  { id: "prod_2", title: "Minimalist Ceramic Coffee Mug", description: "Start your morning right with this earthy, matte ceramic coffee mug. Designed for comfort and aesthetic appeal.", thumbnail: "/images/ceramic_mug.jpg", screenshots: [], price: 18.50, category: 2, active: true },
  { id: "prod_3", title: "Premium Eco-Friendly Yoga Mat", description: "Enhance your practice with this non-slip, textured yoga mat. Made from eco-friendly materials to support your wellness journey.", thumbnail: "/images/yoga_mat.jpg", screenshots: [], price: 45.00, category: 3, active: true },
  { id: "prod_4", title: "Classic Canvas Sneakers", description: "A timeless wardrobe staple. These comfortable white canvas sneakers pair perfectly with any casual outfit.", thumbnail: "/images/canvas_sneakers.jpg", screenshots: [], price: 55.00, category: 0, active: true },
  { id: "prod_5", title: "Hydrating Vitamin C Serum", description: "Revitalize your skin with our brightening Vitamin C serum. Formulated to reduce dark spots and provide a radiant glow.", thumbnail: "/images/vitamin_c_serum.jpg", screenshots: [], price: 29.99, category: 4, active: true },
  { id: "prod_6", title: "Smart Fitness Tracker Watch", description: "Keep track of your health metrics, steps, and heart rate. Features a sleek design and a long-lasting battery life.", thumbnail: "/images/smart_watch.jpg", screenshots: [], price: 129.99, category: 1, active: true },
  { id: "prod_7", title: "Ergonomic Office Chair", description: "Upgrade your workspace with this fully adjustable ergonomic chair, designed to provide lumbar support during long hours.", thumbnail: "/images/office_chair.jpg", screenshots: [], price: 199.50, category: 2, active: true },
  { id: "prod_8", title: "Insulated Stainless Steel Water Bottle", description: "Keep your drinks cold for 24 hours or hot for 12 hours. Durable, BPA-free, and perfect for your active lifestyle.", thumbnail: "/images/water_bottle.jpg", screenshots: [], price: 24.00, category: 3, active: true },
  { id: "prod_9", title: "Vintage Leather Backpack", description: "Combine style and functionality. This spacious leather backpack features multiple compartments for your laptop and essentials.", thumbnail: "/images/leather_backpack.jpg", screenshots: [], price: 110.00, category: 5, active: true },
  { id: "prod_10", title: "Organic Soy Wax Candle", description: "Set a relaxing mood with this hand-poured soy wax candle. Features a calming lavender and vanilla scent.", thumbnail: "/images/soy_candle.jpg", screenshots: [], price: 22.00, category: 2, active: true },
  { id: "prod_11", title: "Premium Over-Ear Headphones", description: "Immerse yourself in music with these high-fidelity noise-canceling headphones. Features 30-hour battery life and plush ear cushions.", thumbnail: "/images/headphones.jpg", screenshots: [], price: 149.99, category: 1, active: true },
  { id: "prod_12", title: "Modern LED Desk Lamp", description: "Illuminate your workspace with this sleek, eye-caring LED desk lamp. Features adjustable brightness and color temperature.", thumbnail: "/images/desk_lamp.jpg", screenshots: [], price: 34.50, category: 2, active: true },
  { id: "prod_13", title: "Resistance Band Set", description: "Take your workouts anywhere with this 5-piece premium resistance band set. Perfect for strength training and physical therapy.", thumbnail: "/images/resistance_bands.jpg", screenshots: [], price: 19.99, category: 3, active: true },
  { id: "prod_14", title: "Polarized Aviator Sunglasses", description: "Protect your eyes in style. These classic gold-framed aviators feature polarized lenses to reduce glare and block UV rays.", thumbnail: "/images/sunglasses.jpg", screenshots: [], price: 65.00, category: 0, active: true },
  { id: "prod_15", title: "Daily Hydrating Face Cream", description: "Lock in moisture all day with this lightweight, non-greasy face cream. Formulated with hyaluronic acid for deep hydration.", thumbnail: "/images/face_cream.jpg", screenshots: [], price: 32.00, category: 4, active: true },
  { id: "prod_16", title: "Hardshell Carry-on Luggage", description: "Travel with ease using this durable, lightweight carry-on spinner. Features a TSA-approved lock and smooth 360-degree wheels.", thumbnail: "/images/suitcase.jpg", screenshots: [], price: 89.00, category: 5, active: true },
  { id: "prod_17", title: "Classic Leather Dress Watch", description: "Elevate your look with this elegant men's dress watch, featuring a genuine brown leather strap and a minimalist white dial.", thumbnail: "/images/classic_watch.jpg", screenshots: [], price: 145.00, category: 0, active: true },
  { id: "prod_18", title: "Waterproof Bluetooth Speaker", description: "Bring the party anywhere with this rugged, waterproof portable speaker. Delivers punchy bass and up to 12 hours of playtime.", thumbnail: "/images/speaker.jpg", screenshots: [], price: 59.99, category: 1, active: true },
  { id: "prod_19", title: "Ultrasonic Essential Oil Diffuser", description: "Create a calming atmosphere in any room with this elegant wood-grain essential oil diffuser and cool mist humidifier.", thumbnail: "/images/oil_diffuser.jpg", screenshots: [], price: 28.50, category: 2, active: true },
  { id: "prod_20", title: "Quick-Dry Microfiber Towel", description: "Stay dry and fresh during intense workouts. This highly absorbent microfiber gym towel is compact and dries 3x faster than cotton.", thumbnail: "/images/microfiber_towel.jpg", screenshots: [], price: 14.00, category: 3, active: true }
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
