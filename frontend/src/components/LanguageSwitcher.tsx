import { Languages } from 'lucide-react';
import { useLocale } from '../contexts/LocaleContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLocale();

  return (
    <div className="flex items-center gap-2 bg-[#181B1F] border border-[#2B2F36] rounded-lg p-1">
      <Languages className="w-4 h-4 text-[#A0A4A8] ml-2" />
      <button
        onClick={() => setLanguage('ja')}
        className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
          language === 'ja'
            ? 'bg-emerald-500 text-white'
            : 'text-[#A0A4A8] hover:text-white'
        }`}
      >
        日本語
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
          language === 'en'
            ? 'bg-emerald-500 text-white'
            : 'text-[#A0A4A8] hover:text-white'
        }`}
      >
        English
      </button>
    </div>
  );
}
