export interface InventoryAPIResponse {
  productId: number;
  nameJa: string;
  nameEn: string;
  category: string;
  shownInStore: number;
  updatedAt: number;
}

const API_URL = 'https://54.178.79.135/inventory';

export async function fetchInventory(): Promise<InventoryAPIResponse[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch inventory due to ${response}`);
  }
  return await response.json();
}
