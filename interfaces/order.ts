export interface OrderItem {
  article_id: string;
  title: string;
  price: number;
  thumb: string;
}

export interface Order {
  id: string;
  date: string;
  name: string;
  phone: string;
  command: OrderItem;
  quantity: number;
  address: string;
  state: number;

  /* --- DzShip shipping fields (optional) --- */

  /** What the customer picked (1-69). */
  wilayaCode?: number;
  /** What the courier receives (1-58, or the `shipAs` code for 59-69). */
  wilayaShipCode?: number;
  /** Courier spelling of the commune. */
  communeName?: string;
  /** What the driver collects. Integer DZD. */
  codAmount?: number;
  /** Delivery fee captured at quote time — quotes change, accounting should not. */
  quotedDeliveryFee?: number;
  /** Captured at quote time. A returned parcel costs this plus handling. */
  returnFee?: number;
}
