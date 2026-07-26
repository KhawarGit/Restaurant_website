export type Role = "manager" | "waiter" | "chef";

export type Zone = "indoor" | "garden";
export type TableStatus = "free" | "reserved" | "occupied";

export type ReservationStatus = "pending" | "confirmed" | "seated" | "cancelled";
export type OrderType = "dine-in" | "takeaway" | "delivery";
export type OrderStatus =
  | "new"
  | "preparing"
  | "ready"
  | "served"
  | "completed"
  | "cancelled";
export type PaymentStatus = "unpaid" | "paid" | "refunded";
export type PaymentMethod = "cash" | "card" | "online";

export interface Table {
  id: string;
  name: string;
  seats: number;
  zone: Zone;
  status: TableStatus;
}

export interface Reservation {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seating: Zone | "any";
  occasion?: string;
  notes?: string;
  status: ReservationStatus;
  tableId?: string;
  tableName?: string;
  createdAt: number;
}

export interface OrderItem {
  name: string;
  price: number;
  qty: number;
  notes?: string;
}

export interface Order {
  id: string;
  code: string;
  type: OrderType;
  tableId?: string;
  tableName?: string;
  customer: { name: string; phone?: string; address?: string };
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: OrderStatus;
  payment: { method: PaymentMethod; status: PaymentStatus };
  notes?: string;
  createdAt: number;
  updatedAt: number;
}

export interface Feedback {
  id: string;
  name: string;
  orderCode?: string;
  rating: number; // overall 1–5
  food?: number;
  service?: number;
  ambiance?: number;
  comment?: string;
  createdAt: number;
}

export interface Notification {
  id: string;
  kind: "reservation" | "order" | "feedback";
  title: string;
  message: string;
  waLink?: string;
  read: boolean;
  createdAt: number;
}

export interface DB {
  tables: Table[];
  reservations: Reservation[];
  orders: Order[];
  feedback: Feedback[];
  notifications: Notification[];
}
