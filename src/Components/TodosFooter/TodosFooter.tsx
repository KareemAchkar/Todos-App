import { useContext, useEffect } from 'react';
import cn from 'classnames';
import { FilterTodos, TodosContext } from '../../Context/TodoContext';

// type LoadedMapType = {

// }

export const TodosFooter: React.FC = () => {
  const { todos } = useContext(TodosContext);
  const { selectedFilter, setSelectedFilter } = useContext(TodosContext);
  const { filteredTodos, setFilteredTodos } = useContext(TodosContext);
  const { onDelete } = useContext(TodosContext);

  const counter = filteredTodos.filter((todo) => !todo.completed);
  const completedTodos = filteredTodos.filter((todo) => todo.completed);

  const clearCompleted = () => {
    completedTodos.forEach((todo) => onDelete(todo.id));
  };

  useEffect(() => {
    switch (selectedFilter) {
      case FilterTodos.active:
        setFilteredTodos(todos.filter((todo) => !todo.completed));
        break;
      case FilterTodos.Completed:
        setFilteredTodos(todos.filter((todo) => todo.completed));
        break;
      default:
        setFilteredTodos(todos);
    }
  }, [selectedFilter, setFilteredTodos, todos]);

  return (
    <>
      {/* Hide the footer if there are no todos */}
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">

          {counter.length}
          {' '}
          items left
        </span>

        {/* Active filter should have a 'selected' class */}
        <nav className="filter" data-cy="Filter">
          <a
            href="#/"
            className={cn('filter__link', {
              selected: selectedFilter
                === FilterTodos.all,
            })}
            data-cy="FilterLinkAll"
            onClick={() => setSelectedFilter(FilterTodos.all)}
          >
            All
          </a>

          <a
            href="#/active"
            className={cn('filter__link', {
              selected: selectedFilter
                === FilterTodos.active,
            })}
            data-cy="FilterLinkActive"
            onClick={() => setSelectedFilter(FilterTodos.active)}
          >
            Active
          </a>

          <a
            href="#/completed"
            className={cn('filter__link', {
              selected: selectedFilter
                === FilterTodos.Completed,
            })}
            data-cy="FilterLinkCompleted"
            onClick={() => setSelectedFilter(FilterTodos.Completed)}
          >
            Completed
          </a>
        </nav>

        {/* don't show this button if there are no completed todos */}
        {completedTodos.length > 0 && (
          <button
            type="button"
            className={cn(
              'todoapp__clear-completed', {
                disabled: completedTodos.length === 0,
              },
            )}
            data-cy="ClearCompletedButton"
            onClick={clearCompleted}
          >
            Clear completed
          </button>
        )}
      </footer>
    </>
  );
};
