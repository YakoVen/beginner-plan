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
}
