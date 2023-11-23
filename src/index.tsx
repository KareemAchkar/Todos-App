import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './styles/index.scss';

import { App } from './App';
import { TodosProvider } from './Context/TodoContext';
import { ErrorMessagesProvider } from './Context/ErrorMessage';
import { TempTodoProvider } from './Context/TempTodo';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <TodosProvider>
      <ErrorMessagesProvider>
        <TempTodoProvider>
          <App />
        </TempTodoProvider>
      </ErrorMessagesProvider>
    </TodosProvider>,
  );
