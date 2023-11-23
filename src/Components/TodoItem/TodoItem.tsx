import { ChangeEvent, useContext, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { TemptodoContext } from '../../Context/TempTodo';
import { TodosContext } from '../../Context/TodoContext';

type Props = {
  filteredTodos: Todo[]
};

export const TodoItem: React.FC<Props> = ({ filteredTodos }) => {
  const [editedTitle, setEditedTitle] = useState('');

  const { tempTodo } = useContext(TemptodoContext);
  const {
    todoId,
    setTodoId,
    onDelete,
    onUpdateCompletion,
    onUpdateTitle,
    editTodoId,
    setEditTodoId,
  } = useContext(TodosContext);

  const onDeleteHandler = (id: number) => {
    setTodoId(id);
    onDelete(id);
  };

  const onUpdateHandler = (id: number) => {
    setTodoId(id);
    onUpdateCompletion(id);
  };

  const onDoubleClickHandler = (id: number) => {
    setEditTodoId(id);

    const currentTodo = filteredTodos.find((todo) => todo.id === id);

    if (currentTodo) {
      setEditedTitle(currentTodo.title);
    }
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onUpdateTitle(editTodoId, editedTitle);
    setEditedTitle(editedTitle);
    if (!editedTitle) {
      onDelete(editTodoId);
    }

    setTodoId(editTodoId);
  };

  const onTitleEditHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}
      <TransitionGroup>
        {filteredTodos.map((todo) => (
          <CSSTransition
            key={todo.id}
            timeout={300}
            classNames="item" // Define your own CSS classes for the transition
          >
            <div
              data-cy="Todo"
              className={cn('todo', { completed: todo.completed })}
              onDoubleClick={() => onDoubleClickHandler(todo.id)}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  onClick={() => onUpdateHandler(todo.id)}
                />
              </label>

              {editTodoId === todo.id
                ? (
                  <form onSubmit={onSubmitHandler}>
                    <input
                      data-cy="TodoTitleField"
                      type="text"
                      className="todo__title-field"
                      placeholder="Empty todo will be deleted"
                      value={editedTitle}
                      onChange={onTitleEditHandler}
                      // eslint-disable-next-line jsx-a11y/no-autofocus
                      autoFocus
                    />
                  </form>
                )
                : (
                  <>
                    <span data-cy="TodoTitle" className="todo__title">
                      {todo.title}
                    </span>
                    <button
                      type="button"
                      className="todo__remove"
                      data-cy="TodoDelete"
                      onClick={() => onDeleteHandler(todo.id)}

                    >
                      ×
                    </button>
                  </>
                )}
              <div
                data-cy="TodoLoader"
                className={cn(
                  'modal overlay', { 'is-active': todo.id === todoId },
                )}
              >
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          </CSSTransition>

        ))}

        {tempTodo !== null && (
          <CSSTransition
            key={tempTodo.id}
            timeout={300}
            classNames="temp-item" // Define your own CSS classes for the transition
          >
            <div data-cy="Todo" className="todo">
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                />
              </label>

              <span data-cy="TodoTitle" className="todo__title">
                {tempTodo.title}
              </span>

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
              >
                ×
              </button>

              {/* 'is-active' class puts this modal on top of the todo */}
              <div data-cy="TodoLoader" className="modal overlay is-active">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          </CSSTransition>
        )}
      </TransitionGroup>

    </section>
  );
};
