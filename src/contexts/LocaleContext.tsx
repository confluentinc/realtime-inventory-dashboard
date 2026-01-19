import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ja' | 'en';

interface Translations {
  [key: string]: {
    ja: string;
    en: string;
  };
}

const translations: Translations = {
  'app.title': {
    ja: '在庫モニター',
    en: 'Inventory Monitor',
  },
  'app.subtitle': {
    ja: 'リアルタイム購買追跡と店舗在庫管理',
    en: 'Real-time product tracking and stock management',
  },
  'app.live': {
    ja: 'ライブ',
    en: 'LIVE',
  },
  'metrics.totalUnits': {
    ja: '店舗在庫数',
    en: 'Total Units',
  },
  'metrics.totalUnits.subtitle': {
    ja: '全ての場所',
    en: 'Across all locations',
  },
  'metrics.lowStock': {
    ja: '店舗在庫不足',
    en: 'Low Stock Alert',
  },
  'metrics.lowStock.subtitle.single': {
    ja: '1商品が閾値以下',
    en: '1 product below threshold',
  },
  'metrics.lowStock.subtitle.multiple': {
    ja: '商品が閾値以下',
    en: 'products below threshold',
  },
  'metrics.inDelivery': {
    ja: '店舗へ配送中',
    en: 'In Delivery',
  },
  'metrics.inDelivery.subtitle': {
    ja: '輸送中の商品',
    en: 'Units in transit',
  },
  'metrics.onDisplay': {
    ja: '店舗内展示中',
    en: 'On Display',
  },
  'metrics.onDisplay.subtitle': {
    ja: '現在展示中',
    en: 'Currently on shelves',
  },
  'inventory.title': {
    ja: '商品在庫状況',
    en: 'Product Inventory Status',
  },
  'inventory.loading': {
    ja: '商品を読み込んでいます...',
    en: 'Loading products...',
  },
  'product.shown': {
    ja: '展示中',
    en: 'Shown',
  },
  'product.storage': {
    ja: '店舗在庫',
    en: 'Storage',
  },
  'product.delivery': {
    ja: '配送中',
    en: 'Delivery',
  },
  'product.salesForecast': {
    ja: '販売予測',
    en: 'Sales Forecast',
  },
  'product.perHour': {
    ja: '個/時',
    en: '/hr',
  },
  'product.hour': {
    ja: '時間',
    en: 'hour',
  },
  'product.hours': {
    ja: '時間',
    en: 'hours',
  },
  'product.emptyIn': {
    ja: '時間後に展示品切れ（予測）',
    en: 'Empty in',
  },
  'alert.lowDisplay': {
    ja: '展示商品不足',
    en: 'Low On Display Alert',
  },
  'alert.lowStore': {
    ja: '展示+店舗在庫不足',
    en: 'Low On Display + In Store Stock Alert',
  },
  'alert.critical': {
    ja: '緊急在庫不足',
    en: 'Critical Shortage',
  },
  'alert.noDelivery': {
    ja: '配送予定なし',
    en: 'No Delivery Scheduled',
  },
  'category.beverages': {
    ja: '飲料',
    en: 'Beverages',
  },
  'category.food': {
    ja: '食品',
    en: 'Food',
  },
  'category.snacks': {
    ja: 'お菓子',
    en: 'Snacks',
  },
  'category.frozen': {
    ja: '冷凍食品',
    en: 'Frozen',
  },
  'settings.fixedPosition': {
    ja: '固定位置',
    en: 'Fixed Position',
  },
  'settings.fixedPosition.enabled': {
    ja: '商品位置を固定',
    en: 'Products stay in place',
  },
  'settings.fixedPosition.disabled': {
    ja: '重要度順に並べ替え',
    en: 'Sort by priority',
  },
  'product.lastUpdated': {
    ja: '最終更新',
    en: 'Last updated',
  },
};

interface LocaleContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  getProductName: (product: { name_ja: string; name_en: string }) => string;
  formatDateTime: (timestamp: string) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ja');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  const getProductName = (product: { name_ja: string; name_en: string }): string => {
    return language === 'ja' ? product.name_ja : product.name_en;
  };

  const formatDateTime = (timestamp: string): string => {
    const date = new Date(timestamp);
    const locale = language === 'ja' ? 'ja-JP' : 'en-US';

    return date.toLocaleString(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: language === 'en',
      timeZone: 'Asia/Tokyo',
    });
  };

  return (
    <LocaleContext.Provider value={{ language, setLanguage, t, getProductName, formatDateTime }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}
