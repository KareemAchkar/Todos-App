import React, { ReactNode, useState } from 'react';

export enum ErrorMessages {
  unableToLoad = 'Unable to load todos',
  emptyTitle = 'Title should not be empty',
  unableToAdd = 'unable to add a todo',
  unableToDelete = ' Unable to delete a todo',
  unableToUpdate = 'Unable to update a todo',
}

type ErrorContextType = {
  errorMessage: string,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
};

export const ErrorMessageContext = React.createContext<ErrorContextType>({
  errorMessage: '',
  setErrorMessage: () => { },
});

type Props = {
  children: ReactNode
};

export const ErrorMessagesProvider: React.FC<Props> = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState<string>(''); // because i want to initialize the enum with ''

  const context = {
    errorMessage,
    setErrorMessage,
  };

  return (
    <ErrorMessageContext.Provider value={context}>
      {children}
    </ErrorMessageContext.Provider>
  );
};
