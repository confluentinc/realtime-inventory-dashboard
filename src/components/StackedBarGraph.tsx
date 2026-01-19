import { AlertTriangle, TrendingDown, PackageX } from 'lucide-react';
import { Product } from '../lib/products';
import { useLocale } from '../contexts/LocaleContext';

interface StackedBarGraphProps {
  product: Product;
}

export default function StackedBarGraph({ product }: StackedBarGraphProps) {
  const { t, getProductName, formatDateTime } = useLocale();
  const total = product.shown_in_store + product.inventory_in_store + product.in_delivery;
  const shownPercentage = (product.shown_in_store / total) * 100;
  const inventoryPercentage = (product.inventory_in_store / total) * 100;
  const deliveryPercentage = (product.in_delivery / total) * 100;

  const isLowDisplay = product.shown_in_store < product.minimum_threshold;
  const isLowStorage = product.inventory_in_store < product.minimum_threshold;
  const isCritical = isLowDisplay && isLowStorage;

  const remaining1h = product.shown_in_store - product.sales_per_hour;
  const remaining2h = product.shown_in_store - (product.sales_per_hour * 2);
  const remaining3h = product.shown_in_store - (product.sales_per_hour * 3);

  const hoursUntilEmpty = product.shown_in_store > 0 ? product.shown_in_store / product.sales_per_hour : 0;

  const noDelivery = product.in_delivery === 0;
  const totalAvailable = product.shown_in_store + product.inventory_in_store;
  const expectedSales3h = product.sales_per_hour * 3;
  const isCriticalShortage = expectedSales3h > totalAvailable;

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
              className={`${isLowDisplay ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-emerald-500 to-emerald-600'} flex items-center justify-center transition-all duration-500`}
              style={{ width: `${shownPercentage}%` }}
            >
              {shownPercentage > 10 && (
                <span className="text-xs font-semibold text-white">{product.shown_in_store}</span>
              )}
            </div>
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
            <div className={`w-2.5 h-2.5 rounded-sm ${isLowDisplay ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
            <span className="text-[#A0A4A8]">{t('product.shown')}:</span>
            <span className="text-white font-medium">{product.shown_in_store}</span>
          </div>
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
      </div>
    </div>
  );
}
