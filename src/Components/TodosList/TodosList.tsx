import { useContext, useEffect, useRef } from 'react';
import { TodosFooter } from '../TodosFooter/TodosFooter';
import { TodosContext } from '../../Context/TodoContext';
import { ErrorMessageContext, ErrorMessages } from '../../Context/ErrorMessage';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';
/* eslint-disable jsx-a11y/control-has-associated-label */

type Props = {
  filteredTodos: Todo[];
  onQuery: (value: string) => void;
  query: string;
  setQuery: (query: string) => void
  onAdd: (query: string) => void;
  isInputDisabled: boolean;
};

export const TodosList: React.FC<Props> = ({
  filteredTodos,
  onQuery,
  query,
  setQuery,
  onAdd,
  isInputDisabled,
}) => {
  const { todos } = useContext(TodosContext);
  const { setErrorMessage } = useContext(ErrorMessageContext);

  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();
    if (!query) {
      setErrorMessage(ErrorMessages.emptyTitle);
    }

    if (!query) {
      return;
    }

    setQuery('');

    onAdd(query);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInputDisabled]); // here when the render happens, input is disabled temporarily for Post to resolve then it enables when it finishes in the finally , but the useEffect was mounted in the disabled , to mount it back when the input is enable you will need to track the isDisabled to change with it and execute the focus back again
  // you track the isInputDisabled state to make sure the useEffect executes the focus behavior when the input is enabled again.

  return (
    <div className="todoapp__content">
      <header className="todoapp__header">
        {/* this buttons is active only if there are some active todos */}
        {todos.length !== 0 && (
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />
        )}

        {/* Add a todo on form submit */}
        <form onSubmit={onSubmitForm}>
          <input
            data-cy="NewTodoField"
            type="text"
            className="todoapp__new-todo"
            placeholder="What needs to be done?"
            value={query}
            onChange={(event) => onQuery(event.target.value)}
            disabled={isInputDisabled}
            ref={inputRef}
          />
        </form>
      </header>

      <TodoItem
        filteredTodos={filteredTodos}
      />

      {todos.length !== 0 && (
        <TodosFooter />
      )}
    </div>
  );
};
