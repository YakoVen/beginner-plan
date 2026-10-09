import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

const serviceAccount = JSON.parse(readFileSync(new URL('./serviceAccountKey.json', import.meta.url)));

if (!getApps().length) initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

const snap = await db.collection('orders').get();
console.log('orders total:', snap.size);

const batch = db.batch();
let patched = 0;
for (const d of snap.docs) {
  const o = d.data();
  const patch = {};
  if (typeof o.total !== 'number') {
    const total = (o?.command?.price ?? 0) * (o?.quantity ?? 1);
    patch.total = total;
    patch.subtotal = o?.subtotal ?? total;
  }
  if (!Array.isArray(o.items)) {
    if (o.command) {
      patch.items = [
        {
          articleId: o.command.article_id,
          title: o.command.title,
          price: o.command.price,
          thumbnail: o.command.thumb,
          quantity: o.quantity ?? 1,
          variantName: null,
        },
      ];
    } else {
      patch.items = [];
    }
  }
  if (o.deliveryFee === undefined) patch.deliveryFee = 0;
  if (o.discount === undefined) patch.discount = 0;
  if (Object.keys(patch).length) {
    batch.set(d.ref, patch, { merge: true });
    patched++;
  }
}
if (patched) await batch.commit();
console.log(`patched ${patched} orders`);
process.exit(0);
