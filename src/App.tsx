import { useEffect, useState } from 'react';
import { Package, AlertCircle, Truck, Store, RefreshCw } from 'lucide-react';
import StackedBarGraph from './components/StackedBarGraph';
import MetricCard from './components/MetricCard';
import LanguageSwitcher from './components/LanguageSwitcher';
import { Product, getDefaultProductData } from './lib/products';
import { useLocale } from './contexts/LocaleContext';
import { fetchInventory } from './lib/api';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [fixedPosition, setFixedPosition] = useState(true);
  const { t } = useLocale();

  useEffect(() => {
    loadInventory();
    const interval = setInterval(() => {
      loadInventory();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  async function loadInventory() {
    try {
      const inventoryData = await fetchInventory();

      setProducts(
        inventoryData.map(item => ({
          ...getDefaultProductData(item.productId),
          name: item.nameEn,
          name_ja: item.nameJa,
          name_en: item.nameEn,
          category: item.category,
          shown_in_store: item.shownInStore,
          updated_at: new Date(item.updatedAt).toISOString(),
        }))
      );
      setLoading(false);
    } catch (error) {
      console.error('Failed to load inventory:', error);
      setLoading(false);
    }
  }

  const totalItems = products.reduce((sum, p) => sum + p.shown_in_store, 0);
  const lowStockItems = products.filter(p => p.shown_in_store < p.minimum_threshold).length;
  const totalDelivery = products.reduce((sum, p) => sum + p.in_delivery, 0);
  const totalShownInStore = products.reduce((sum, p) => sum + p.shown_in_store, 0);

  const getSortedProducts = () => {
    if (fixedPosition) {
      return [...products].sort((a, b) => a.category.localeCompare(b.category));
    }

    return [...products].sort((a, b) => {
      const aTotalAvailable = a.shown_in_store + a.inventory_in_store;
      const bTotalAvailable = b.shown_in_store + b.inventory_in_store;
      const aExpectedSales3h = a.sales_per_hour * 3;
      const bExpectedSales3h = b.sales_per_hour * 3;
      const aIsCritical = aExpectedSales3h > aTotalAvailable;
      const bIsCritical = bExpectedSales3h > bTotalAvailable;

      if (aIsCritical && !bIsCritical) return -1;
      if (!aIsCritical && bIsCritical) return 1;

      const aIsOutOfStock = a.shown_in_store === 0;
      const bIsOutOfStock = b.shown_in_store === 0;

      if (aIsOutOfStock && !bIsOutOfStock) return -1;
      if (!aIsOutOfStock && bIsOutOfStock) return 1;

      const aIsLowDisplay = a.shown_in_store < a.minimum_threshold;
      const bIsLowDisplay = b.shown_in_store < b.minimum_threshold;

      if (aIsLowDisplay && !bIsLowDisplay) return -1;
      if (!aIsLowDisplay && bIsLowDisplay) return 1;

      return a.category.localeCompare(b.category);
    });
  };

  const sortedProducts = getSortedProducts();

  return (
    <div className="min-h-screen bg-[#0E1013]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Store className="w-8 h-8 text-emerald-400" />
              <h1 className="text-3xl font-bold text-white">{t('app.title')}</h1>
            </div>
            <LanguageSwitcher />
          </div>
          <p className="text-[#A0A4A8]">{t('app.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard
            title={t('metrics.totalUnits')}
            value={totalItems.toLocaleString()}
            icon={Package}
            iconColor="text-blue-400"
            subtitle={t('metrics.totalUnits.subtitle')}
          />
          <MetricCard
            title={t('metrics.lowStock')}
            value={lowStockItems}
            icon={AlertCircle}
            iconColor="text-red-400"
            subtitle={lowStockItems === 1 ? t('metrics.lowStock.subtitle.single') : `${lowStockItems}${t('metrics.lowStock.subtitle.multiple')}`}
          />
          <MetricCard
            title={t('metrics.inDelivery')}
            value={totalDelivery}
            icon={Truck}
            iconColor="text-amber-400"
            subtitle={t('metrics.inDelivery.subtitle')}
          />
          <MetricCard
            title={t('metrics.onDisplay')}
            value={totalShownInStore}
            icon={Store}
            iconColor="text-emerald-400"
            subtitle={t('metrics.onDisplay.subtitle')}
          />
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">{t('inventory.title')}</h2>
            <div className="flex items-center gap-3">
              <button
                onClick={loadInventory}
                disabled={loading}
                className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-4 py-2 hover:bg-emerald-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`w-4 h-4 text-emerald-400 ${loading ? 'animate-spin' : ''}`} />
                <span className="text-emerald-400 text-sm font-medium">
                  {loading ? 'Loading...' : 'Refresh'}
                </span>
              </button>
              <button
                onClick={() => setFixedPosition(!fixedPosition)}
                className="flex items-center gap-3 bg-[#181B1F] border border-[#2B2F36] rounded-lg px-4 py-2 hover:border-[#3B3F46] transition-all"
              >
                <span className="text-[#A0A4A8] text-sm font-medium">{t('settings.fixedPosition')}</span>
                <div className="relative">
                  <div className={`w-11 h-6 rounded-full transition-colors ${
                    fixedPosition ? 'bg-emerald-500' : 'bg-[#2B2F36]'
                  }`}>
                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      fixedPosition ? 'translate-x-5' : 'translate-x-0'
                    }`}></div>
                  </div>
                </div>
                <span className="text-xs text-[#6C7075]">
                  {fixedPosition ? t('settings.fixedPosition.enabled') : t('settings.fixedPosition.disabled')}
                </span>
              </button>
            </div>
          </div>
          {loading ? (
            <div className="bg-[#181B1F] border border-[#2B2F36] rounded-lg p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-400"></div>
              <p className="text-[#A0A4A8] mt-4">{t('inventory.loading')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {sortedProducts.map((product) => (
                <StackedBarGraph key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
