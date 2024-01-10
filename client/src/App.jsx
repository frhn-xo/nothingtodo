import { useState } from 'react';
import { AddTodo } from './components/AddTodo';
import { SiteHeader } from './components/SiteHeader';
import { TodoContainer } from './components/TodoContainer';

export default function App() {
  const [todos, setTodos] = useState([]);

  return (
    <div>
      <SiteHeader />
      <TodoContainer todos={todos} setTodos={setTodos} />
      <AddTodo setTodos={setTodos} />
    </div>
  );
}
