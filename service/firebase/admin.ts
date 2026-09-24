import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import * as serviceAccount from '@/serviceAccountKey.json';

const apps = getApps();

const adminApp = apps.length === 0 
  ? initializeApp({
      credential: cert(serviceAccount as any),
    }) 
  : apps[0];

export const adminAuth = getAuth(adminApp);
