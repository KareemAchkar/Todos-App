import React, { ReactNode, useContext, useState } from 'react';
import { Todo } from '../types/Todo';
import { deleteTodo, editTodo } from '../api/todos';
import { ErrorMessageContext, ErrorMessages } from './ErrorMessage';

// CREATECONTEXT ==> CONTEXT-TYPE ==> CONTEXT

export enum FilterTodos {
  all = 'All',
  active = 'Active',
  Completed = 'Completed',
}

type TodosContextType = {
  todos: Todo[];

  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  selectedFilter: FilterTodos;
  setSelectedFilter: React.Dispatch<React.SetStateAction<FilterTodos>>;
  filteredTodos: Todo[];
  setFilteredTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  todoId: number,
  setTodoId: (id: number) => void,
  onDelete: (id: number) => void,
  onUpdateCompletion: (id: number) => void,
  onUpdateTitle: (id: number, value: string) => void,
  editTodoId: number,
  setEditTodoId: (id: number) => void,
};

export const TodosContext = React.createContext<TodosContextType>({
  todos: [],
  setTodos: () => [],
  selectedFilter: FilterTodos.all,
  setSelectedFilter: () => FilterTodos.all,
  filteredTodos: [],
  setFilteredTodos: () => [],
  todoId: 0,
  setTodoId: () => 0,
  onDelete: () => { },
  onUpdateCompletion: () => { },
  onUpdateTitle: () => { },
  editTodoId: 0,
  setEditTodoId: () => { },

});

type Props = {
  children: ReactNode
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState(FilterTodos.all); // because i want to initialize the enum with this
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [todoId, setTodoId] = useState(0);
  const [editTodoId, setEditTodoId] = useState(0);

  const { setErrorMessage } = useContext(ErrorMessageContext);

  const onDelete = async (id: number) => {
    try {
      await deleteTodo(id);
      // eslint-disable-next-line max-len
      setFilteredTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      setErrorMessage(ErrorMessages.unableToDelete);
    }
  };

  const onUpdateCompletion = async (id: number) => {
    try {
      const editingTodo = filteredTodos.find((todo) => todo.id === id);

      if (editingTodo) {
        const updatedTodo = {
          ...editingTodo,
          completed: !editingTodo.completed,
        };

        await editTodo(id, updatedTodo);

        setFilteredTodos(filteredTodos
          .map((todo) => (todo.id === id ? updatedTodo : todo)));
      }
    } catch (error) {
      setErrorMessage(ErrorMessages.unableToUpdate);
    } finally {
      setTodoId(0);
    }
  };

  const onUpdateTitle = async (id: number, newTitle: string) => {
    try {
      const editingTodo = filteredTodos.find((todo) => todo.id === id);

      if (editingTodo) {
        const updatedTodo = {
          ...editingTodo,
          title: newTitle,
        };

        await editTodo(id, updatedTodo);

        setFilteredTodos(filteredTodos
          .map((todo) => (todo.id === id ? updatedTodo : todo)));
      }
    } catch (error) {
      setErrorMessage(ErrorMessages.unableToUpdate);
    } finally {
      setTodoId(0);
      setEditTodoId(0);
    }
  };

  const context = {
    todos,
    setTodos,
    selectedFilter,
    setSelectedFilter,
    filteredTodos,
    setFilteredTodos,
    todoId,
    setTodoId,
    onDelete,
    onUpdateCompletion,
    onUpdateTitle,
    editTodoId,
    setEditTodoId,
  };

  return (
    <TodosContext.Provider value={context}>
      {children}
    </TodosContext.Provider>
  );
};
