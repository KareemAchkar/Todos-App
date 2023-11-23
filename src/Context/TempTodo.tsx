import React, { ReactNode, useState } from 'react';
import { Todo } from '../types/Todo';

type TempTodoContextType = {
  tempTodo: Todo | null;
  setTempTodo: (value: Todo | null) => void;
};

// eslint-disable-next-line max-len
export const TemptodoContext = React.createContext<TempTodoContextType>({
  tempTodo: null,
  setTempTodo: () => { },
});

type Props = {
  children: ReactNode
};

export const TempTodoProvider: React.FC<Props> = ({ children }) => {
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);

  const context = {
    tempTodo,
    setTempTodo,
  };

  return (
    <>
      <TemptodoContext.Provider value={context}>
        {children}
      </TemptodoContext.Provider>

    </>

  );
};
