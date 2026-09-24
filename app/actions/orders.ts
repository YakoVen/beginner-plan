"use server";

import { Order } from "@/interfaces/order";

/**
 * Server Action: Create an order with server-side price lookup.
 * This prevents client-side price manipulation.
 */
export async function createOrder(formData: {
  name: string;
  phone: string;
  address: string;
  articleId: string;
  articleTitle: string;
  articlePrice: number;
  articleThumb: string;
  quantity: number;
}): Promise<{ success: boolean; error?: string; orderId?: string }> {
  // Dynamic import to avoid Firebase client SDK issues in server context
  const { getArticle, saveOrder } = await import(
    "@/service/firebase/database"
  );

  // Server-side validation
  if (!formData.name?.trim()) return { success: false, error: "Nom requis" };
  if (!formData.phone?.trim())
    return { success: false, error: "Téléphone requis" };
  if (!formData.address?.trim())
    return { success: false, error: "Adresse requise" };
  if (!formData.articleId)
    return { success: false, error: "Article invalide" };
  if (formData.quantity < 1)
    return { success: false, error: "Quantité invalide" };

  // Look up the real price from the database (don't trust client)
  const article = await getArticle(formData.articleId);
  if (!article) return { success: false, error: "Article introuvable" };

  const serverPrice = article.price; // Price from DB, not from client

  const order: Order = {
    id: `order-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`,
    date: new Date().toISOString(),
    name: formData.name.trim(),
    phone: formData.phone.replace(/\D/g, ""),
    address: formData.address.trim(),
    command: {
      article_id: formData.articleId,
      title: article.title,
      price: serverPrice,
      thumb: article.thumbnail,
    },
    quantity: formData.quantity,
    state: 0,
  };

  await saveOrder(order);
  return { success: true, orderId: order.id };
}
