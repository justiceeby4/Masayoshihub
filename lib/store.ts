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
    slug: "premium-streaming",
    title: "Premium Streaming Access",
    category: "Subscriptions",
    price: 15,
    tone: "purple",
    badge: "Popular",
    rating: 4.8,
  },
  {
    id: "cloud-storage",
    slug: "cloud-storage",
    title: "Cloud Storage Pro",
    category: "Software",
    price: 25,
    tone: "blue",
    badge: "Pro",
    rating: 4.7,
  },
  {
    id: "digital-gift-card",
    slug: "digital-gift-card",
    title: "Digital Gift Card",
    category: "Gift Cards",
    price: 50,
    tone: "green",
    badge: "Gift",
    rating: 4.9,
  },
  {
    id: "creator-toolkit",
    slug: "creator-toolkit",
    title: "Creator Toolkit",
    category: "Services",
    price: 30,
    tone: "orange",
    badge: "Creator",
    rating: 4.6,
  },
];

export function money(value: number) {
  return `$${value.toFixed(2)}`;
}
