import { Category, CATEGORY_ICONS, CATEGORY_COLORS } from "../types/todo";

interface CategorySelectorProps {
  value: Category;
  onChange: (category: Category) => void;
}

const CATEGORIES: Category[] = [
  "ev",
  "iş",
  "kişisel",
  "alışveriş",
  "sağlık",
  "eğitim",
  "diğer",
];

const CATEGORY_LABELS: Record<Category, string> = {
  ev: "Ev",
  iş: "İş",
  kişisel: "Kişisel",
  alışveriş: "Alışveriş",
  sağlık: "Sağlık",
  eğitim: "Eğitim",
  diğer: "Diğer",
};

export default function CategorySelector({
  value,
  onChange,
}: CategorySelectorProps) {
  return (
    <div className="w-full">
      <label className="block text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-3 sm:mb-4">
        Kategori Seç
      </label>
      <div className="w-full overflow-x-auto overflow-y-visible scrollbar-hide pt-1">
        <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
        <div className="flex gap-3 sm:gap-5 pb-3 min-w-max">
          {CATEGORIES.map((category) => {
            const isSelected = value === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => onChange(category)}
                className={`
                  relative flex-shrink-0 flex flex-col items-center justify-center gap-1.5 sm:gap-2
                  px-2 sm:px-2 py-2.5 sm:py-3 rounded-lg border transition-all duration-200
                  w-[100px] sm:w-[120px] transform hover:scale-105 active:scale-95
                  min-h-[80px] sm:min-h-[90px]
                  ${
                    isSelected
                      ? `${CATEGORY_COLORS[category]} border-current shadow-lg ring ring-purple-300 dark:ring-purple-600`
                      : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm hover:shadow-md"
                  }
                `}
              >
                {isSelected && (
                  <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg z-10">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                )}
                <span className="text-xl sm:text-2xl">{CATEGORY_ICONS[category]}</span>
                <span
                  className={`text-xs font-semibold ${
                    isSelected
                      ? "text-current"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {CATEGORY_LABELS[category]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
