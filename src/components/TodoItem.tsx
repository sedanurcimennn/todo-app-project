import { Todo, CATEGORY_COLORS, CATEGORY_ICONS } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todoDate = new Date(date);
  todoDate.setHours(0, 0, 0, 0);
  
  const diffTime = todoDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) {
    return `Geçti (${Math.abs(diffDays)} gün)`;
  } else if (diffDays === 0) {
    return 'Bugün';
  } else if (diffDays === 1) {
    return 'Yarın';
  } else if (diffDays <= 7) {
    return `${diffDays} gün kaldı`;
  } else {
    return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
  }
}

function getDeadlineColor(deadline: string | null): string {
  if (!deadline) return '';
  
  const date = new Date(deadline);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todoDate = new Date(date);
  todoDate.setHours(0, 0, 0, 0);
  
  const diffTime = todoDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) {
    return 'text-red-600 dark:text-red-400 font-semibold';
  } else if (diffDays === 0) {
    return 'text-orange-600 dark:text-orange-400 font-semibold';
  } else if (diffDays <= 3) {
    return 'text-yellow-600 dark:text-yellow-400';
  } else {
    return 'text-gray-600 dark:text-gray-400';
  }
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div
      className={`group flex flex-col gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg border transition-all duration-200
                  ${
                    todo.completed
                      ? 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 opacity-75'
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md'
                  }`}
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={() => onToggle(todo.id)}
          className={`flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center
                      transition-all duration-200 touch-manipulation
                      ${
                        todo.completed
                          ? 'bg-gradient-to-r from-green-400 to-emerald-500 border-green-500'
                          : 'border-gray-300 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-400'
                      }`}
          aria-label={todo.completed ? 'Tamamlanmadı olarak işaretle' : 'Tamamlandı olarak işaretle'}
        >
          {todo.completed && (
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7"></path>
            </svg>
          )}
        </button>
        <span
          className={`flex-1 text-sm sm:text-base text-gray-800 dark:text-gray-200 transition-all duration-200 break-words
                      ${
                        todo.completed
                          ? 'line-through text-gray-500 dark:text-gray-500'
                          : ''
                      }`}
        >
          {todo.text}
        </span>
        <button
          onClick={() => onDelete(todo.id)}
          className="flex-shrink-0 p-2 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300
                     opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200
                     hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Sil"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
        </button>
      </div>
      
      <div className="flex items-center gap-2 flex-wrap">
        <span
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium
                      ${CATEGORY_COLORS[todo.category]}`}
        >
          <span>{CATEGORY_ICONS[todo.category]}</span>
          <span className="capitalize">{todo.category}</span>
        </span>
        
        {todo.deadline && (
          <span
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium
                        bg-gray-100 dark:bg-gray-700 ${getDeadlineColor(todo.deadline)}`}
          >
            <svg
              className="w-3 h-3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            {formatDate(todo.deadline)}
          </span>
        )}
      </div>
    </div>
  );
}
