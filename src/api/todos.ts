/* eslint-disable @typescript-eslint/quotes */
import { Todo } from "../types/Todo";
import { client } from "../utils/fetchClient";

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

// Add more methods here

type TodoData = Omit<Todo, "id">;

export const postTodo = (newTodo: TodoData) => {
  return client.post<Todo>("/todos", newTodo);
};

export const deleteTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

export const editTodo = (todoId: number, data: Todo) => {
  return client.patch(`/todos/${todoId}`, data);
};
