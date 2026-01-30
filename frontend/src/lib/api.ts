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

export interface AggregationResponse {
  bucket_start: number;
  product_id: number;
  total_orders: number;
  total_quantity: number;  // ← Using this for the graph
  total_revenue: string;
  avg_order_value: string;
  last_updated: number;
}

const INVENTORY_API_URL = 'http://52.68.213.179:7001/inventory';
const AGGREGATION_API_URL = 'http://52.68.213.179:7001/aggregation/5min';

export async function fetchInventory(): Promise<InventoryAPIResponse[]> {
  const response = await fetch(INVENTORY_API_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch inventory due to ${response}`);
  }
  return await response.json();
}

export async function fetchAggregation(productId: number, windowStart: number): Promise<number> {
  const url = `${AGGREGATION_API_URL}/${productId}/${windowStart}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      // Return 0 for non-200 responses
      return 0;
    }
    const data: AggregationResponse = await response.json();
    return data.total_quantity ?? 0;
  } catch (error) {
    // Return 0 on any error
    return 0;
  }
}

// Get the start of the current 5-minute window (Unix timestamp in seconds)
export function getCurrentWindowStart(): number {
  const now = Math.floor(Date.now() / 1000);
  return now - (now % 300); // Round down to nearest 5-minute mark
}

// Get array of window starts for the past N windows (including current)
export function getWindowStarts(count: number): number[] {
  const currentWindow = getCurrentWindowStart();
  const windows: number[] = [];
  for (let i = count - 1; i >= 0; i--) {
    windows.push(currentWindow - (i * 300));
  }
  return windows;
}


