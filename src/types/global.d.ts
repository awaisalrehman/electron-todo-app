import { Todo } from '@prisma/client';

declare global {
  interface Window {
    api: {
      getTodos: () => Promise<Todo[]>;
    };
  }
}
