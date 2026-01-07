import { useState, FormEvent } from 'react';
import { Category } from '../types/todo';
import CategorySelector from './CategorySelector';
import DatePicker from './DatePicker';

interface TodoFormProps {
  onAddTodo: (text: string, category: Category, deadline: string | null) => void;
}

export default function TodoForm({ onAddTodo }: TodoFormProps) {
  const [input, setInput] = useState('');
  const [category, setCategory] = useState<Category>('diğer');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (trimmedInput) {
      onAddTodo(trimmedInput, category, deadline || null);
      setInput('');
      setDeadline('');
      setCategory('diğer');
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="w-full mb-6 space-y-4">
      {/* Input Field */}
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Yeni bir görev ekle..."
          className="flex-1 px-4 py-3 sm:py-3 text-base rounded-lg border-2 border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:outline-none focus:border-purple-500 dark:focus:border-purple-400
                     transition-colors duration-200 placeholder-gray-400 dark:placeholder-gray-500
                     shadow-sm min-h-[44px]"
        />
        <button
          type="submit"
          className="px-4 sm:px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 
                     text-white font-semibold rounded-lg shadow-md text-sm sm:text-base
                     hover:from-purple-600 hover:to-indigo-700
                     focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                     transition-all duration-200 transform hover:scale-105 active:scale-95
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                     flex items-center justify-center gap-2 min-h-[44px] whitespace-nowrap"
          disabled={!input.trim()}
        >
          <svg
            className="w-5 h-5 flex-shrink-0"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 4v16m8-8H4"></path>
          </svg>
          <span>Ekle</span>
        </button>
      </div>

      {/* Category Selector */}
      <CategorySelector value={category} onChange={setCategory} />

      {/* Date Picker - Moved to bottom and full width */}
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Son Tarih (Opsiyonel)
        </label>
        <DatePicker value={deadline} onChange={setDeadline} minDate={today} />
      </div>
    </form>
  );
}
