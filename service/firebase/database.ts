import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  DocumentData,
} from "firebase/firestore";
import { db } from "./config";
import { Article } from "@/interfaces/article";
import { Order } from "@/interfaces/order";
import { cache } from "react";

// ========================================================
// GENERAL DATABASE FUNCTIONS
// ========================================================

async function getAll<T>(collectionName: string): Promise<T[]> {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as T);
}

async function getById<T>(
  collectionName: string,
  id: string
): Promise<T | null> {
  const docRef = doc(db, collectionName, id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as T;
}

async function saveDocument(
  collectionName: string,
  id: string,
  data: DocumentData
): Promise<{ success: boolean; error?: string }> {
  try {
    await setDoc(doc(db, collectionName, id), data, { merge: true });
    return { success: true };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error(`Error saving to ${collectionName}:`, message);
    return { success: false, error: message };
  }
}

async function removeDocument(
  collectionName: string,
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await deleteDoc(doc(db, collectionName, id));
    return { success: true };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error(`Error deleting from ${collectionName}:`, message);
    return { success: false, error: message };
  }
}

// ========================================================
// ARTICLE FUNCTIONS
// ========================================================

export async function saveArticle(
  data: Article
): Promise<{ success: boolean; error?: string }> {
  return saveDocument("articles", data.id, data);
}

export async function getArticles(): Promise<Article[]> {
  return getAll<Article>("articles");
}

// Wrapped in React.cache() to deduplicate fetches within a single request
// (e.g. generateMetadata + page component both calling getArticle)
export const getArticle = cache(
  async (id: string): Promise<Article | null> => {
    return getById<Article>("articles", id);
  }
);

export async function setVisible(
  id: string,
  visible: boolean
): Promise<{ success: boolean; error?: string }> {
  try {
    await updateDoc(doc(db, "articles", id), { active: visible });
    return { success: true };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return { success: false, error: message };
  }
}

export async function deleteArticle(
  id: string
): Promise<{ success: boolean; error?: string }> {
  return removeDocument("articles", id);
}

// ========================================================
// ORDER FUNCTIONS
// ========================================================

export async function saveOrder(
  data: Order
): Promise<{ success: boolean; error?: string }> {
  return saveDocument("orders", data.id, data);
}

export async function getOrders(): Promise<Order[]> {
  try {
    const q = query(collection(db, "orders"), orderBy("date", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Order);
  } catch {
    // Fallback without ordering if index doesn't exist yet
    return getAll<Order>("orders");
  }
}
