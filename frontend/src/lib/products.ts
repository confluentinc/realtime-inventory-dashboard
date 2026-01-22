export interface Product {
  id: string;
  productId: number;
  name: string;
  name_ja: string;
  name_en: string;
  category: string;
  shown_in_store: number;
  inventory_in_store: number;
  in_delivery: number;
  minimum_threshold: number;
  sales_per_hour: number;
  max_inventory: number;
  max_shown_in_store: number;
  max_shown_in_store_for_refill: number;
  restock_iteration: number;
  delivery_iteration: number;
  created_at: string;
  updated_at: string;
}


export const getDefaultProductData = (productId: number) => ({
  id: String(productId),
  productId,
  inventory_in_store: 80,
  in_delivery: 50,
  minimum_threshold: 10,
  sales_per_hour: 12,
  max_inventory: 120,
  max_shown_in_store: 50,
  max_shown_in_store_for_refill: 2,
  restock_iteration: 1,
  delivery_iteration: 3,
  created_at: new Date().toISOString(),
});
