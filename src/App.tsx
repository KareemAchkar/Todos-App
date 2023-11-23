/* eslint-disable @typescript-eslint/no-shadow */
import React, { useContext, useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, postTodo } from './api/todos';
import { TodosList } from './Components/TodosList/TodosList';
import { TodosError } from './Components/TodosError/TodosError';
import { TodosContext } from './Context/TodoContext';
import { ErrorMessageContext, ErrorMessages } from './Context/ErrorMessage';
import { Todo } from './types/Todo';
import { TemptodoContext } from './Context/TempTodo';

const USER_ID = 11673;

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isInputDisabled, setIsInputDisabled] = useState(false);

  const { todos, setTodos } = useContext(TodosContext);
  const { errorMessage, setErrorMessage } = useContext(ErrorMessageContext);
  const { filteredTodos } = useContext(TodosContext);
  const { setTempTodo } = useContext(TemptodoContext);

  const loadTodos = async () => {
    try {
      const loadedTodos = await getTodos(USER_ID);

      setTodos(loadedTodos);
    } catch (error) {
      setErrorMessage(ErrorMessages.unableToLoad);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const onQuery = (value: string) => {
    setQuery(value);
  };

  const onAdd = async (query: string) => {
    setIsInputDisabled(true);

    try {
      const newTempTodo = {
        id: 0,
        userId: USER_ID,
        title: query,
        completed: false,
      };

      setTempTodo(newTempTodo); // the temp todo is assigned to this object and in todoId is conditioned to appear only in this case

      const maxId = Math.max(...todos.map((todo) => todo.id));
      const newTodo: Todo = {
        id: maxId + 1,
        userId: USER_ID,
        title: query,
        completed: false,
      };

      await postTodo(newTodo);

      setTodos([
        ...todos,
        newTodo,
      ]);
    } catch (error) {
      setErrorMessage(ErrorMessages.unableToAdd);
    } finally {
      setIsInputDisabled(false);

      setTempTodo(null); // we removed the newTempTodo when data is updated
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <TodosList
        filteredTodos={filteredTodos}
        onQuery={onQuery}
        query={query}
        setQuery={setQuery}
        onAdd={onAdd}
        isInputDisabled={isInputDisabled}
      />

      {errorMessage && (
        <TodosError />
      )}
    </div>
  );
};
