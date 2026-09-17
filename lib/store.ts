export const categories = [
  {
    name: "Digital Accounts",
    icon: "◉",
    count: "Available",
  },
  {
    name: "Subscriptions",
    icon: "✦",
    count: "Unlimited",
  },
  {
    name: "Gift Cards",
    icon: "🎁",
    count: "Unavailable",
  },
  {
    name: "Software",
    icon: "▣",
    count: "Unavailable",
  },
  {
    name: "Games",
    icon: "◈",
    count: "Unavailable",
  },
  {
    name: "Services",
    icon: "⚡",
    count: "Unlimited",
  },
];
export const products = [
  {
    id: "premium-streaming",
    description: "Premium streaming access for your favorite entertainment.",
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
    description: "Extra cloud storage for your files, photos, and projects.",
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
    description: "A convenient digital gift card for online purchases.",
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
    description: "Useful digital tools and resources for creators.",
    slug: "creator-toolkit",
    title: "Creator Toolkit",
    category: "Services",
    price: 4000, old: 4500,
    tone: "orange",
    badge: "Creator",
    rating: 4.6,
  },
];

export type Product = (typeof products)[number];

export function money(value: number) {
  return `₦${value.toLocaleString("en-NG")}`;
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
