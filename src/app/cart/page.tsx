import type { Metadata } from "next";
import CartPage from "@/components/CartPage";

export const metadata: Metadata = {
  title: "Shopping Cart - ChocoVilla",
  description: "Review your chocolate selections and place your order on WhatsApp.",
};

export default function Cart() {
  return <CartPage />;
}