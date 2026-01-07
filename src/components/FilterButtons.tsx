import { FilterType } from '../types/todo';

interface FilterButtonsProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

export default function FilterButtons({ currentFilter, onFilterChange, counts }: FilterButtonsProps) {
  const filters: { type: FilterType; label: string; count: number }[] = [
    { type: 'all', label: 'Tümü', count: counts.all },
    { type: 'active', label: 'Aktif', count: counts.active },
    { type: 'completed', label: 'Tamamlanan', count: counts.completed },
  ];

  return (
    <div className="flex gap-2 flex-wrap justify-center">
      {filters.map((filter) => (
        <button
          key={filter.type}
          onClick={() => onFilterChange(filter.type)}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200
                     ${
                       currentFilter === filter.type
                         ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md'
                         : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600'
                     }`}
        >
          {filter.label}
          <span
            className={`ml-2 px-2 py-0.5 rounded-full text-xs
                       ${
                         currentFilter === filter.type
                           ? 'bg-white/20 text-white'
                           : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                       }`}
          >
            {filter.count}
          </span>
        </button>
      ))}
    </div>
  );
}

