export const categories = [
  { name: "Digital Accounts" },
  { name: "Subscriptions" },
  { name: "Gift Cards" },
  { name: "Software" },
  { name: "Games" },
  { name: "Services" },
];

export const products = [
  {
    id: "premium-streaming",
    title: "Premium Streaming Access",
    category: "Subscriptions",
    price: 15,
  },
  {
    id: "cloud-storage",
    title: "Cloud Storage Pro",
    category: "Software",
    price: 25,
  },
  {
    id: "digital-gift-card",
    title: "Digital Gift Card",
    category: "Gift Cards",
    price: 50,
  },
  {
    id: "creator-toolkit",
    title: "Creator Toolkit",
    category: "Services",
    price: 30,
  },
];

export function money(value: number) {
  return `$${value.toFixed(2)}`;
}
