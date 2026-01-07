export type Category = 'ev' | 'iş' | 'kişisel' | 'alışveriş' | 'sağlık' | 'eğitim' | 'diğer';

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  category: Category;
  deadline: string | null; // ISO date string veya null
};

export type FilterType = 'all' | 'active' | 'completed';

export const CATEGORY_COLORS: Record<Category, string> = {
  ev: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  iş: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  kişisel: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  alışveriş: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  sağlık: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  eğitim: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  diğer: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
};

export const CATEGORY_ICONS: Record<Category, string> = {
  ev: '🏠',
  iş: '💼',
  kişisel: '👤',
  alışveriş: '🛒',
  sağlık: '🏥',
  eğitim: '📚',
  diğer: '📝',
};

export const CATEGORY_LABELS: Record<Category, string> = {
  ev: 'Ev',
  iş: 'İş',
  kişisel: 'Kişisel',
  alışveriş: 'Alışveriş',
  sağlık: 'Sağlık',
  eğitim: 'Eğitim',
  diğer: 'Diğer',
};
