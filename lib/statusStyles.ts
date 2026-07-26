import type { OrderStatus, OrderType, ReservationStatus, TableStatus } from "./types";

export const orderStatusStyle: Record<OrderStatus, string> = {
  new: "bg-amber-400/20 text-amber-300",
  preparing: "bg-sky-400/20 text-sky-300",
  ready: "bg-emerald-400/20 text-emerald-300",
  served: "bg-forest-100/10 text-cream/70",
  completed: "bg-cream/10 text-cream/50",
  cancelled: "bg-red-400/20 text-red-300",
};

export const orderTypeStyle: Record<OrderType, string> = {
  "dine-in": "bg-gold/20 text-gold-light",
  takeaway: "bg-purple-400/20 text-purple-300",
  delivery: "bg-orange-400/20 text-orange-300",
};

export const reservationStatusStyle: Record<ReservationStatus, string> = {
  pending: "bg-amber-400/20 text-amber-300",
  confirmed: "bg-emerald-400/20 text-emerald-300",
  seated: "bg-sky-400/20 text-sky-300",
  cancelled: "bg-red-400/20 text-red-300",
};

export const tableStatusStyle: Record<TableStatus, string> = {
  free: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  reserved: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  occupied: "bg-red-500/15 text-red-300 border-red-500/30",
};
