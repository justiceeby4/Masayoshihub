export const categories = [
  { name: "Digital Accounts", icon: "👤", count: 170 },
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
    price: 10000, old: 12000,
    tone: "purple",
    badge: "Popular",
    rating: 4.8,
  },
  {
    id: "cloud-storage",
    slug: "cloud-storage",
    title: "Cloud Storage Pro",
    category: "Software",
    price: 25000, old: 28000,
    tone: "blue",
    badge: "Pro",
    rating: 4.7,
  },
  {
    id: "digital-gift-card",
    slug: "digital-gift-card",
    title: "Digital Gift Card",
    category: "Gift Cards",
    price: 1350,old: 1250,
    tone: "green",
    badge: "Gift",
    rating: 4.9,
  },
  {
    id: "creator-toolkit",
    slug: "creator-toolkit",
    title: "Creator Toolkit",
    category: "Services",
    price: 4000, old: 4500,
    tone: "orange",
    badge: "Creator",
    rating: 4.6,
  },
];

export function money(value: number) {
  return `$${value.toFixed(2)}`;
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
