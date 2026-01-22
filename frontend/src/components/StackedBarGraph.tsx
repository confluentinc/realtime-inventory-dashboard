import { useEffect, useState, useCallback } from 'react';

import { AlertTriangle, TrendingDown, PackageX, ShoppingCart } from 'lucide-react';
import { Product } from '../lib/products';
import { useLocale } from '../contexts/LocaleContext';
import { fetchAggregation, getCurrentWindowStart, getWindowStarts } from '../lib/api';

interface StackedBarGraphProps {
  product: Product;
}
interface WindowData {
  windowStart: number;
  quantity: number;
}
const WINDOW_COUNT = 12; // Show 12 bars (1 hour of 5-minute windows)


// Generate dummy hourly purchase data for the past 12 hours
const generateHourlyPurchases = (productId: number): number[] => {
  // Use productId as seed for consistent dummy data per product
  const seed = productId * 7;
  return Array.from({ length: 12 }, (_, i) => {
    const base = ((seed + i * 13) % 20) + 5;
    const variation = ((seed + i * 7) % 10) - 5;
    return Math.max(0, base + variation);
  });
};
// Get hour labels for the past 12 hours
const getHourLabels = (): string[] => {
  const now = new Date();
  const labels: string[] = [];
  for (let i = 11; i >= 0; i--) {
    const hour = new Date(now.getTime() - i * 60 * 60 * 1000);
    labels.push(`${hour.getHours()}:00`);
  }
  return labels;
};
export default function StackedBarGraph({ product }: StackedBarGraphProps) {
  const { t, getProductName, formatDateTime } = useLocale();
  const [windowData, setWindowData] = useState<WindowData[]>([]);
  const [currentWindowStart, setCurrentWindowStart] = useState<number>(getCurrentWindowStart());

  const total = product.inventory_in_store + product.in_delivery;
  const inventoryPercentage = total > 0 ? (product.inventory_in_store / total) * 100 : 0;
  const deliveryPercentage = total > 0 ? (product.in_delivery / total) * 100 : 0;

  const isLowDisplay = product.inventory_in_store < product.minimum_threshold;
  const isLowStorage = product.inventory_in_store < product.minimum_threshold;
  const isCritical = isLowDisplay && isLowStorage;

  const remaining1h = product.inventory_in_store - product.sales_per_hour;
  const remaining2h = product.inventory_in_store - (product.sales_per_hour * 2);
  const remaining3h = product.inventory_in_store - (product.sales_per_hour * 3);

  const hoursUntilEmpty = product.inventory_in_store > 0 ? product.inventory_in_store / product.sales_per_hour : 0;

  const noDelivery = product.in_delivery === 0;
  const totalAvailable = product.inventory_in_store + product.inventory_in_store;
  const expectedSales3h = product.sales_per_hour * 3;
  const isCriticalShortage = expectedSales3h > totalAvailable;

    // Fetch data for a single window
  const fetchWindowData = useCallback(async (windowStart: number): Promise<WindowData> => {
    const data = await fetchAggregation(product.productId, windowStart);
    return { 
      windowStart, 
      quantity: data?.total_quantity ?? 0 
    };
  }, [product.productId]);

  // Fetch all windows data
  const fetchAllWindows = useCallback(async () => {
    const windows = getWindowStarts(WINDOW_COUNT);
    const results = await Promise.all(windows.map(w => fetchWindowData(w)));
    setWindowData(results);
    setCurrentWindowStart(getCurrentWindowStart());
  }, [fetchWindowData]);

  // Initial fetch of all windows
  useEffect(() => {
    fetchAllWindows();
  }, [fetchAllWindows]);

  // Update current window every second
  useEffect(() => {
    const interval = setInterval(async () => {
      const newCurrentWindow = getCurrentWindowStart();
      
      // Check if we've moved to a new 5-minute window
      if (newCurrentWindow !== currentWindowStart) {
        // Fetch all windows when we move to a new window
        await fetchAllWindows();
      } else {
        // Just update the current window's data
        const currentData = await fetchWindowData(newCurrentWindow);
        setWindowData(prev => {
          const updated = [...prev];
          const lastIndex = updated.length - 1;
          if (lastIndex >= 0 && updated[lastIndex].windowStart === newCurrentWindow) {
            updated[lastIndex] = currentData;
          }
          return updated;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentWindowStart, fetchWindowData, fetchAllWindows]);

  // Calculate graph data
  const maxQuantity = Math.max(...windowData.map(w => w.quantity), 1);
  const totalPurchases = windowData.reduce((sum, w) => sum + w.quantity, 0);

  // Format time label from Unix timestamp
  const formatTimeLabel = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <div className={`border rounded-lg p-4 hover:border-[#3B3F46] transition-colors ${
      isCriticalShortage
        ? 'bg-red-950/40 border-red-500/50'
        : 'bg-[#181B1F] border-[#2B2F36]'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <h3 className="text-white font-medium">{getProductName(product)}</h3>
            {isCriticalShortage ? (
              <div className="flex items-center gap-1 bg-red-500/20 border border-red-500/50 rounded px-2 py-0.5">
                <AlertTriangle className="w-3 h-3 text-red-500" />
                <span className="text-xs text-red-500 font-medium">{t('alert.critical')}</span>
              </div>
            ) : isCritical ? (
              <div className="flex items-center gap-1 bg-red-500/20 border border-red-500/50 rounded px-2 py-0.5">
                <AlertTriangle className="w-3 h-3 text-red-500" />
                <span className="text-xs text-red-500 font-medium">{t('alert.lowStore')}</span>
              </div>
            ) : isLowDisplay ? (
              <div className="flex items-center gap-1 bg-red-500/20 border border-red-500/50 rounded px-2 py-0.5">
                <AlertTriangle className="w-3 h-3 text-red-500" />
                <span className="text-xs text-red-500 font-medium">{t('alert.lowDisplay')}</span>
              </div>
            ) : null}
          </div>
          {noDelivery && (
            <div className="flex items-center gap-1 bg-orange-500/20 border border-orange-500/50 rounded px-2 py-0.5 w-fit">
              <PackageX className="w-3 h-3 text-orange-500" />
              <span className="text-xs text-orange-500 font-medium">{t('alert.noDelivery')}</span>
            </div>
          )}
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[#A0A4A8] text-sm">
            {t('product.lastUpdated')}: {formatDateTime(product.updated_at)}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-full h-8 bg-[#0E1013] rounded-md overflow-hidden flex">
            <div
              className="bg-yellow-500/70 flex items-center justify-center transition-all duration-500"
              style={{ width: `${inventoryPercentage}%` }}
            >
              {inventoryPercentage > 10 && (
                <span className="text-xs font-semibold text-white">{product.inventory_in_store}</span>
              )}
            </div>
            <div
              className="bg-gray-500 flex items-center justify-center transition-all duration-500"
              style={{ width: `${deliveryPercentage}%` }}
            >
              {deliveryPercentage > 10 && (
                <span className="text-xs font-semibold text-white">{product.in_delivery}</span>
              )}
            </div>
          </div>
          <span className="text-[#A0A4A8] text-sm font-medium min-w-[3rem] text-right">{total}</span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-yellow-500/70"></div>
            <span className="text-[#A0A4A8]">{t('product.storage')}:</span>
            <span className="text-white font-medium">{product.inventory_in_store}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-gray-500"></div>
            <span className="text-[#A0A4A8]">{t('product.delivery')}:</span>
            <span className="text-white font-medium">{product.in_delivery}</span>
          </div>
        </div>

        <div className="pt-2 border-t border-[#2B2F36]">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[#A0A4A8] text-xs font-medium">{t('product.salesForecast')} ({product.sales_per_hour}{t('product.perHour')})</span>
          </div>
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className={`rounded px-2 py-1.5 border ${
              remaining1h <= 0
                ? 'bg-red-600 border-red-500'
                : 'bg-[#0E1013] border-[#2B2F36]'
            }`}>
              <div className={remaining1h <= 0 ? 'text-red-200 mb-0.5' : 'text-[#6C7075] mb-0.5'}>1{t('product.hour')}</div>
              <div className={`font-semibold ${remaining1h <= 0 ? 'text-white' : remaining1h < 5 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {remaining1h <= 0 ? 'OUT' : Math.round(remaining1h)}
              </div>
            </div>
            <div className={`rounded px-2 py-1.5 border ${
              remaining2h <= 0
                ? 'bg-red-600 border-red-500'
                : 'bg-[#0E1013] border-[#2B2F36]'
            }`}>
              <div className={remaining2h <= 0 ? 'text-red-200 mb-0.5' : 'text-[#6C7075] mb-0.5'}>2{t('product.hours')}</div>
              <div className={`font-semibold ${remaining2h <= 0 ? 'text-white' : remaining2h < 5 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {remaining2h <= 0 ? 'OUT' : Math.round(remaining2h)}
              </div>
            </div>
            <div className={`rounded px-2 py-1.5 border ${
              remaining3h <= 0
                ? 'bg-red-600 border-red-500'
                : 'bg-[#0E1013] border-[#2B2F36]'
            }`}>
              <div className={remaining3h <= 0 ? 'text-red-200 mb-0.5' : 'text-[#6C7075] mb-0.5'}>3{t('product.hours')}</div>
              <div className={`font-semibold ${remaining3h <= 0 ? 'text-white' : remaining3h < 5 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {remaining3h <= 0 ? 'OUT' : Math.round(remaining3h)}
              </div>
            </div>
          </div>
          {hoursUntilEmpty > 0 && hoursUntilEmpty < 4 && (
            <div className="mt-2 text-xs text-amber-400 font-medium flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              {hoursUntilEmpty.toFixed(1)}{t('product.emptyIn')}
            </div>
          )}
        </div>

        {/* Hourly Purchases Graph */}
        {/* 5-Minute Purchase Graph */}
        <div className="pt-3 border-t border-[#2B2F36]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-purple-400" />
              <span className="text-[#A0A4A8] text-xs font-medium">{t('product.purchases5min')}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-purple-400 text-xs font-semibold">{totalPurchases}</span>
              <span className="text-[#6C7075] text-xs">{t('product.totalInHour')}</span>
            </div>
          </div>
          
          <div className="flex items-end gap-1 h-16">
            {windowData.map((window, index) => {
              const heightPercent = (window.quantity / maxQuantity) * 100;
              const isCurrentWindow = index === windowData.length - 1;
              return (
                <div key={window.windowStart} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex flex-col items-center justify-end h-12">
                    {window.quantity > 0 && (
                      <span className="text-[8px] text-[#6C7075] mb-0.5">{window.quantity}</span>
                    )}
                    <div
                      className={`w-full rounded-t transition-all duration-300 ${
                        isCurrentWindow 
                          ? 'bg-gradient-to-t from-purple-500 to-purple-300 animate-pulse' 
                          : 'bg-gradient-to-t from-purple-900 to-purple-700'
                      }`}
                      style={{ height: `${Math.max(heightPercent, window.quantity > 0 ? 8 : 0)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="flex gap-1 mt-1">
            {windowData.map((window, index) => (
              <div key={window.windowStart} className="flex-1 text-center">
                <span className={`text-[8px] ${index === windowData.length - 1 ? 'text-purple-400 font-medium' : index % 3 === 0 ? 'text-[#A0A4A8]' : 'text-[#4A4E54]'}`}>
                  {index % 3 === 0 || index === windowData.length - 1 ? formatTimeLabel(window.windowStart) : ''}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
