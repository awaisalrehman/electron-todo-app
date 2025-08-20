import { Todo } from '@prisma/client';
import React from 'react';

function App(): React.JSX.Element {
  window.api.getTodos().then((todos: Todo[]) => {
    console.log('Todos:', todos);
  });

  return <h1>Hello From React</h1>
}

export default App