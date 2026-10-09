import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

const serviceAccount = JSON.parse(readFileSync(new URL('./serviceAccountKey.json', import.meta.url)));

if (!getApps().length) initializeApp({ credential: cert(serviceAccount) });

const admin = await getAuth().getUserByEmail('admin@store.com');
console.log('admin uid:', admin.uid);

await getFirestore().collection('users').doc(admin.uid).set(
  {
    email: 'admin@store.com',
    displayName: 'Store Admin',
    role: 'owner',
    updatedAt: new Date().toISOString(),
  },
  { merge: true }
);
console.log('role set to owner');
process.exit(0);
