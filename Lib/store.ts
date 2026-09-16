export type Product = {
  slug: string;
  title: string;
  category: string;
  price: number;
  old?: number;
  rating: number;
  badge: string;
  tone: "purple" | "blue" | "orange" | "green";
};

export type Category = {
  name: string;
  icon: string;
  count: number;
};

export const categories: Category[] = [
  { name: "Digital Accounts", icon: "◉", count: 1240 },
  { name: "Subscriptions", icon: "✦", count: 860 },
  { name: "Gift Cards", icon: "◇", count: 520 },
  { name: "Software", icon: "▣", count: 310 },
  { name: "Games", icon: "◈", count: 940 },
  { name: "Services", icon: "⚡", count: 430 },
];

export const products: Product[] = [
  {
    slug: "premium-streaming-access",
    title: "Premium Streaming Access",
    category: "Subscriptions",
    price: 8.99,
    old: 12.99,
    rating: 4.9,
    badge: "Popular",
    tone: "purple",
  },
  {
    slug: "cloud-storage-pro",
    title: "Cloud Storage Pro",
    category: "Software",
    price: 6.5,
    old: 9.0,
    rating: 4.8,
    badge: "Best value",
    tone: "blue",
  },
  {
    slug: "digital-gift-card",
    title: "Digital Gift Card",
    category: "Gift Cards",
    price: 25.0,
    rating: 5.0,
    badge: "Instant",
    tone: "orange",
  },
  {
    slug: "creator-toolkit",
    title: "Creator Toolkit",
    category: "Services",
    price: 14.99,
    old: 19.99,
    rating: 4.7,
    badge: "New",
    tone: "green",
  },
];

export function money(amount: number): string {
  return `$${amount.toFixed(2)}`;
}
