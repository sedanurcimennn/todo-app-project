import { useState, useMemo } from "react";
import { Todo, FilterType, Category } from "./types/todo";
import { useLocalStorage } from "./hooks/useLocalStorage";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import FilterButtons from "./components/FilterButtons";

const CATEGORY_LABELS: Record<Category, string> = {
  ev: "Ev",
  iş: "İş",
  kişisel: "Kişisel",
  alışveriş: "Alışveriş",
  sağlık: "Sağlık",
  eğitim: "Eğitim",
  diğer: "Diğer",
};

function App() {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const [filter, setFilter] = useState<FilterType>("all");
  const [categoryFilter, setCategoryFilter] = useState<Category | "all">("all");

  const addTodo = (
    text: string,
    category: Category,
    deadline: string | null
  ) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now(),
      category,
      deadline,
    };
    setTodos((prevTodos) => [newTodo, ...prevTodos]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = useMemo(() => {
    let result = todos;

    // Status filter
    switch (filter) {
      case "active":
        result = result.filter((todo) => !todo.completed);
        break;
      case "completed":
        result = result.filter((todo) => todo.completed);
        break;
      default:
        break;
    }

    // Category filter
    if (categoryFilter !== "all") {
      result = result.filter((todo) => todo.category === categoryFilter);
    }

    return result;
  }, [todos, filter, categoryFilter]);

  const counts = useMemo(
    () => ({
      all: todos.length,
      active: todos.filter((todo) => !todo.completed).length,
      completed: todos.filter((todo) => todo.completed).length,
    }),
    [todos]
  );

  const categoryCounts = useMemo(() => {
    const counts: Record<Category, number> = {
      ev: 0,
      iş: 0,
      kişisel: 0,
      alışveriş: 0,
      sağlık: 0,
      eğitim: 0,
      diğer: 0,
    };
    todos.forEach((todo) => {
      if (!todo.completed) {
        counts[todo.category]++;
      }
    });
    return counts;
  }, [todos]);

  return (
    <div className="min-h-screen py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            TickDone
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Modern ve kullanışlı görev yönetimi
          </p>
        </header>

        {/* Main Card */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 md:p-8">
          {/* Todo Form */}
          <TodoForm onAddTodo={addTodo} />

          {/* Category Filter */}
          {todos.length > 0 && (
            <div className="mb-4">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Kategoriye Göre Filtrele
              </label>
              <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                <button
                  onClick={() => setCategoryFilter("all")}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all
                    min-h-[36px] sm:min-h-[40px]
                    ${
                      categoryFilter === "all"
                        ? "bg-purple-500 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                >
                  Tümü
                </button>
                {(
                  [
                    "ev",
                    "iş",
                    "kişisel",
                    "alışveriş",
                    "sağlık",
                    "eğitim",
                    "diğer",
                  ] as Category[]
                ).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all
                      min-h-[36px] sm:min-h-[40px]
                      ${
                        categoryFilter === cat
                          ? "bg-purple-500 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                  >
                    {CATEGORY_LABELS[cat]}{" "}
                    {categoryCounts[cat] > 0 && `(${categoryCounts[cat]})`}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Filter Buttons */}
          {todos.length > 0 && (
            <div className="mb-6">
              <FilterButtons
                currentFilter={filter}
                onFilterChange={setFilter}
                counts={counts}
              />
            </div>
          )}

          {/* Todo List */}
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />

          {/* Footer Stats */}
          {todos.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex-wrap gap-2 sm:gap-0">
                <span>
                  Toplam:{" "}
                  <strong className="text-gray-900 dark:text-gray-100">
                    {counts.all}
                  </strong>
                </span>
                <span>
                  Aktif:{" "}
                  <strong className="text-purple-600 dark:text-purple-400">
                    {counts.active}
                  </strong>
                </span>
                <span>
                  Tamamlanan:{" "}
                  <strong className="text-green-600 dark:text-green-400">
                    {counts.completed}
                  </strong>
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="text-center mt-8 text-gray-500 dark:text-gray-400 text-sm">
          <p>
            Created by{' '}
            <a
              href="https://sedanurcimen.com.tr/tr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors duration-200 underline decoration-2 underline-offset-2"
            >
              Seda Nur Çimen
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
