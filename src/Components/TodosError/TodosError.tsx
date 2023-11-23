import { useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import { ErrorMessageContext } from '../../Context/ErrorMessage';

/* eslint-disable jsx-a11y/control-has-associated-label */
export const TodosError = () => {
  const { errorMessage } = useContext(ErrorMessageContext);
  const [errorToggler, setErrorToggler] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setErrorToggler(true);
    }, 3000);
  }, []);

  return (
    <>
      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: errorToggler },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorToggler(true)}
        />
        {/* show only one message at a time */}
        {errorMessage}
      </div>
    </>
  );
};
