import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

const serviceAccount = JSON.parse(readFileSync(new URL('./serviceAccountKey.json', import.meta.url)));

if (!getApps().length) initializeApp({ credential: cert(serviceAccount) });

const admin = await getAuth().getUserByEmail('admin@store.com');
const db = getFirestore();
const now = Date.now();

const demos = [
  {
    id: 'ord_demo_1',
    article: { id: 'prod_1', title: 'Wireless Noise-Canceling Earbuds', price: 89.99, thumb: '/images/earbuds.jpg' },
    qty: 1,
    state: 3,
    daysAgo: 12,
  },
  {
    id: 'ord_demo_2',
    article: { id: 'prod_6', title: 'Smart Fitness Tracker Watch', price: 129.99, thumb: '/images/smart_watch.jpg' },
    qty: 2,
    state: 1,
    daysAgo: 2,
  },
];

for (const d of demos) {
  await db.collection('orders').doc(d.id).set(
    {
      userId: admin.uid,
      date: new Date(now - d.daysAgo * 86400000).toISOString(),
      name: 'Store Admin',
      phone: '0555123456',
      command: {
        article_id: d.article.id,
        title: d.article.title,
        price: d.article.price,
        thumb: d.article.thumb,
      },
      quantity: d.qty,
      address: '123 Rue Principale, Alger',
      state: d.state,
    },
    { merge: true }
  );
  console.log('upserted', d.id);
}
console.log('demo admin orders ready');
process.exit(0);
