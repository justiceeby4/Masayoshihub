export const categories = [
  { name: "Digital Accounts", icon: "👤", count: 0 },
  { name: "Subscriptions", icon: "📺", count: 1 },
  { name: "Gift Cards", icon: "🎁", count: 1 },
  { name: "Software", icon: "💻", count: 1 },
  { name: "Games", icon: "🎮", count: 0 },
  { name: "Services", icon: "🛠️", count: 1 },
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
