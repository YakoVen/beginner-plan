import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

const serviceAccount = JSON.parse(readFileSync(new URL('./serviceAccountKey.json', import.meta.url)));

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

const products = [
  { id: "prod_1", title: "Wireless Noise-Canceling Earbuds", price: 89.99, thumb: "/images/earbuds.jpg" },
  { id: "prod_2", title: "Minimalist Ceramic Coffee Mug", price: 18.50, thumb: "/images/ceramic_mug.jpg" },
  { id: "prod_3", title: "Premium Eco-Friendly Yoga Mat", price: 45.00, thumb: "/images/yoga_mat.jpg" },
  { id: "prod_4", title: "Classic Canvas Sneakers", price: 55.00, thumb: "/images/canvas_sneakers.jpg" },
  { id: "prod_5", title: "Hydrating Vitamin C Serum", price: 29.99, thumb: "/images/vitamin_c_serum.jpg" },
  { id: "prod_6", title: "Smart Fitness Tracker Watch", price: 129.99, thumb: "/images/smart_watch.jpg" },
  { id: "prod_7", title: "Ergonomic Office Chair", price: 199.50, thumb: "/images/office_chair.jpg" },
  { id: "prod_8", title: "Insulated Stainless Steel Water Bottle", price: 24.00, thumb: "/images/water_bottle.jpg" },
  { id: "prod_9", title: "Vintage Leather Backpack", price: 110.00, thumb: "/images/leather_backpack.jpg" },
  { id: "prod_10", title: "Organic Soy Wax Candle", price: 22.00, thumb: "/images/soy_candle.jpg" },
  { id: "prod_11", title: "Premium Over-Ear Headphones", price: 149.99, thumb: "/images/headphones.jpg" },
  { id: "prod_12", title: "Modern LED Desk Lamp", price: 34.50, thumb: "/images/desk_lamp.jpg" },
  { id: "prod_13", title: "Resistance Band Set", price: 19.99, thumb: "/images/resistance_bands.jpg" },
  { id: "prod_14", title: "Polarized Aviator Sunglasses", price: 65.00, thumb: "/images/sunglasses.jpg" },
  { id: "prod_15", title: "Daily Hydrating Face Cream", price: 32.00, thumb: "/images/face_cream.jpg" },
  { id: "prod_16", title: "Hardshell Carry-on Luggage", price: 89.00, thumb: "/images/suitcase.jpg" },
  { id: "prod_17", title: "Classic Leather Dress Watch", price: 145.00, thumb: "/images/classic_watch.jpg" },
  { id: "prod_18", title: "Waterproof Bluetooth Speaker", price: 59.99, thumb: "/images/speaker.jpg" },
  { id: "prod_19", title: "Ultrasonic Essential Oil Diffuser", price: 28.50, thumb: "/images/oil_diffuser.jpg" },
  { id: "prod_20", title: "Quick-Dry Microfiber Towel", price: 14.00, thumb: "/images/microfiber_towel.jpg" }
];

const names = ["Jean Dupont", "Marie Curie", "Sophie Bernard", "Lucas Martin", "Emma Robert", "Hugo Dubois", "Alice Petit", "Leo Leroy", "Chloe Moreau", "Thomas Simon", "Paul Roux", "Julie Richard", "Antoine Blanc", "Camille Garnier", "Victor Fournier"];
const cities = ["Paris", "Lyon", "Marseille", "Toulouse", "Nice", "Nantes", "Strasbourg", "Montpellier", "Bordeaux", "Lille", "Rennes", "Reims", "Le Havre", "Saint-Étienne", "Toulon"];

function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const generateOrders = (count) => {
  const orders = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const product = products[randomInt(0, products.length - 1)];
    // Random date over the last 30 days
    const date = new Date(now.getTime() - randomInt(0, 30) * 24 * 60 * 60 * 1000 - randomInt(0, 86400000));
    const name = names[randomInt(0, names.length - 1)];
    const order = {
      id: "ord_" + Math.random().toString(36).substring(2, 11),
      date: date.toISOString(),
      name: name,
      phone: "0" + randomInt(600000000, 799999999).toString(),
      command: {
        article_id: product.id,
        title: product.title,
        price: product.price,
        thumb: product.thumb
      },
      quantity: randomInt(1, 4),
      address: randomInt(1, 200) + " Rue de " + cities[randomInt(0, cities.length - 1)],
      state: randomInt(0, 3) // Assuming 0-3 are typical order states (pending, processing, shipped, delivered)
    };
    orders.push(order);
  }
  return orders;
};

async function seedOrders() {
  const orders = generateOrders(40);
  let successCount = 0;
  
  const batch = db.batch();
  for (const order of orders) {
    const docRef = db.collection("orders").doc(order.id);
    batch.set(docRef, order);
    successCount++;
  }
  
  try {
    await batch.commit();
    console.log(`Successfully seeded ${successCount} virtual orders into Firestore!`);
  } catch(e) {
    console.error("Failed to seed orders:", e);
  }
  process.exit(0);
}

seedOrders();
