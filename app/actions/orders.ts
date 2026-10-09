"use server";

import { Order } from "@/interfaces/order";
import { validateAddress, validatePhone, resolveShipCode } from "@/service/shipping/wilaya-data";
import { delivery_price as FALLBACK_DELIVERY_PRICE } from "@/service/constants";

/**
 * Server Action: Create an order with server-side price lookup.
 * This prevents client-side price manipulation.
 */
export async function createOrder(formData: {
  name: string;
  phone: string;
  address: string;
  wilayaCode?: number;
  communeName?: string;
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

  const phoneCheck = validatePhone(formData.phone);
  if (!phoneCheck.ok) return { success: false, error: phoneCheck.error };

  // Validate the commune the way the courier will, when the client sent codes.
  const wilayaCode = formData.wilayaCode;
  const communeName = formData.communeName?.trim();
  if (wilayaCode !== undefined) {
    if (!Number.isInteger(wilayaCode) || wilayaCode < 1 || wilayaCode > 69) {
      return { success: false, error: "Wilaya invalide" };
    }
    if (!communeName) return { success: false, error: "Commune requise" };
    const addressCheck = validateAddress(wilayaCode, communeName);
    if (!addressCheck.ok) return { success: false, error: addressCheck.error };
  }

  // Look up the real price from the database (don't trust client)
  const article = await getArticle(formData.articleId);
  if (!article) return { success: false, error: "Article introuvable" };

  const serverPrice = article.price; // Price from DB, not from client

  // Prefer a live courier quote; fall back to the flat configured price when
  // the gateway is unreachable, so checkout never blocks on a third party.
  let deliveryFee = FALLBACK_DELIVERY_PRICE;
  let verifiedReturnFee = 0;
  if (wilayaCode !== undefined && communeName) {
    try {
      const { quoteRate, getDefaultCourier } = await import("@/service/shipping/dzship");
      const quote = await quoteRate(
        {
          toWilaya: resolveShipCode(wilayaCode),
          toCommune: communeName,
          deliveryType: "home",
        },
        getDefaultCourier()
      );
      deliveryFee = quote.deliveryFee;
      verifiedReturnFee = quote.returnFee;
    } catch {
      // Gateway unavailable: keep the flat fallback price.
    }
  }

  const total = serverPrice * formData.quantity + deliveryFee;

  const order: Order = {
    id: `order-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`,
    date: new Date().toISOString(),
    name: formData.name.trim(),
    phone: phoneCheck.phone,
    address: formData.address.trim(),
    command: {
      article_id: formData.articleId,
      title: article.title,
      price: serverPrice,
      thumb: article.thumbnail,
    },
    quantity: formData.quantity,
    state: 0,
    ...(wilayaCode !== undefined ? { wilayaCode } : {}),
    ...(wilayaCode !== undefined ? { wilayaShipCode: resolveShipCode(wilayaCode) } : {}),
    ...(communeName ? { communeName } : {}),
    // What the driver collects.
    codAmount: total,
    quotedDeliveryFee: deliveryFee,
    returnFee: verifiedReturnFee,
  };

  await saveOrder(order);
  return { success: true, orderId: order.id };
}
