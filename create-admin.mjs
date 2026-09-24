import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { readFileSync } from 'fs';

const serviceAccount = JSON.parse(readFileSync(new URL('./serviceAccountKey.json', import.meta.url)));

initializeApp({
  credential: cert(serviceAccount)
});

const auth = getAuth();

async function createAdmin() {
  try {
    const userRecord = await auth.createUser({
      email: 'admin@store.com',
      emailVerified: true,
      password: 'password123',
      displayName: 'Store Admin',
    });
    console.log('Successfully created new user:', userRecord.uid);
  } catch (error) {
    if (error.code === 'auth/email-already-exists') {
       console.log('Admin user already exists! Updating password...');
       const user = await auth.getUserByEmail('admin@store.com');
       await auth.updateUser(user.uid, { password: 'password123' });
       console.log('Password updated successfully');
    } else {
       console.log('Error creating new user:', error);
    }
  }
}

createAdmin();
