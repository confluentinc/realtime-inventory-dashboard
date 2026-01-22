export interface InventoryAPIResponse {
  productId: number;
  nameJa: string;
  nameEn: string;
  category: string;
  salesPerHour: number;
  inventoryQty: number;
  deliveryQty: number;
  updatedAt: number;
}

const API_URL = 'http://52.68.213.179:7001/inventory';

export async function fetchInventory(): Promise<InventoryAPIResponse[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch inventory due to ${response}`);
  }
  return await response.json();
}
