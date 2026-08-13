"use client";

import { Category, MenuItem, Lang } from "./types";

export function getCategoryName(cat: Category, lang: Lang): string {
  if (lang === "en") return cat.nameEn || cat.name;
  if (lang === "es") return cat.nameEs || cat.name;
  return cat.name;
}

export function getItemName(item: MenuItem, lang: Lang): string {
  if (lang === "en") return item.nameEn || item.name;
  if (lang === "es") return item.nameEs || item.name;
  return item.name;
}

export function getItemDesc(item: MenuItem, lang: Lang): string {
  if (lang === "en") return item.descEn || item.description;
  if (lang === "es") return item.descEs || item.description;
  return item.description;
}

export function formatPrice(price: number, currency: string = "€"): string {
  return `${price.toFixed(2).replace(".00", "")} ${currency}`;
}

export function getItemsByCategory(
  items: MenuItem[],
  categoryId: string
): MenuItem[] {
  return items.filter((i) => i.categoryId === categoryId && i.available);
}

export function sortCategories(cats: Category[]): Category[] {
  if (!cats) return [];
  return [...cats].sort((a, b) => a.order - b.order);
}
