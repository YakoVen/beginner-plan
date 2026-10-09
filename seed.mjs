import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQAfxkKiwuZstT4HcPGSTfpQ4y1Hcgbs8",
  authDomain: "basic-store-plan-147e2.firebaseapp.com",
  projectId: "basic-store-plan-147e2",
  storageBucket: "basic-store-plan-147e2.firebasestorage.app",
  messagingSenderId: "67339402775",
  appId: "1:67339402775:web:8bbfff1b763f12a76b6652"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
    thumbnail: "https://via.placeholder.com/500x500?text=Yoga+Mat",
    screenshots: [],
    price: 45.00,
    category: 3,
    active: true
  },
  {
    id: "prod_4",
    title: "Classic Canvas Sneakers",
    description: "A timeless wardrobe staple. These comfortable white canvas sneakers pair perfectly with any casual outfit.",
    thumbnail: "https://via.placeholder.com/500x500?text=Canvas+Sneakers",
    screenshots: [],
    price: 55.00,
    category: 0,
    active: true
  },
  {
    id: "prod_5",
    title: "Hydrating Vitamin C Serum",
    description: "Revitalize your skin with our brightening Vitamin C serum. Formulated to reduce dark spots and provide a radiant glow.",
    thumbnail: "https://via.placeholder.com/500x500?text=Vitamin+C+Serum",
    screenshots: [],
    price: 29.99,
    category: 3,
    active: true
  },
  {
    id: "prod_6",
    title: "Smart Fitness Tracker Watch",
    description: "Keep track of your health metrics, steps, and heart rate. Features a sleek design and a long-lasting battery life.",
    thumbnail: "https://via.placeholder.com/500x500?text=Smart+Watch",
    screenshots: [],
    price: 129.99,
    category: 2,
    active: true
  },
  {
    id: "prod_7",
    title: "Ergonomic Office Chair",
    description: "Upgrade your workspace with this fully adjustable ergonomic chair, designed to provide lumbar support during long hours.",
    thumbnail: "https://via.placeholder.com/500x500?text=Office+Chair",
    screenshots: [],
    price: 199.50,
    category: 3,
    active: true
  },
  {
    id: "prod_8",
    title: "Insulated Stainless Steel Water Bottle",
    description: "Keep your drinks cold for 24 hours or hot for 12 hours. Durable, BPA-free, and perfect for your active lifestyle.",
    thumbnail: "https://via.placeholder.com/500x500?text=Water+Bottle",
    screenshots: [],
    price: 24.00,
    category: 1,
    active: true
  },
  {
    id: "prod_9",
    title: "Vintage Leather Backpack",
    description: "Combine style and functionality. This spacious leather backpack features multiple compartments for your laptop and essentials.",
    thumbnail: "https://via.placeholder.com/500x500?text=Leather+Backpack",
    screenshots: [],
    price: 110.00,
    category: 1,
    active: true
  },
  {
    id: "prod_10",
    title: "Organic Soy Wax Candle",
    description: "Set a relaxing mood with this hand-poured soy wax candle. Features a calming lavender and vanilla scent.",
    thumbnail: "https://via.placeholder.com/500x500?text=Soy+Candle",
    screenshots: [],
    price: 22.00,
    category: 3,
    active: true
  }
];

async function seed() {
  let successCount = 0;
  const now = Date.now();
  for (let i = 0; i < articles.length; i++) {
    const item = articles[i];
    try {
      // Stagger createdAt so newest-first ordering is deterministic.
      // Uses setDoc merge so re-seeding never wipes dashboard edits.
      await setDoc(
        doc(db, "articles", item.id),
        { ...item, createdAt: item.createdAt ?? new Date(now - i * 86400000).toISOString() },
        { merge: true }
      );
      successCount++;
      console.log(`Saved ${item.title}`);
    } catch (e) {
      console.error(`Failed to save ${item.title}:`, e);
    }
  }
  console.log(`Successfully seeded ${successCount} products into Firestore.`);
  process.exit(0);
}

seed();
