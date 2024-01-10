import React, { useState } from 'react';
import axios from 'axios';

export const AddTodo = ({ setTodos }) => {
  const [todo, setTodo] = useState('');

  const handleAdd = async () => {
    if (todo != null && todo.trim().length !== 0) {
      try {
        const postTodo = { name: todo.trim() };
        console.log('Todo to be added:', postTodo);

        const response = await axios.post(
          'http://localhost:3000/todos',
          postTodo
        );
        console.log('Response from server:', response.data);
        setTodos((prevTodos) => [...prevTodos, response.data]);
        setTodo('');
      } catch (error) {
        console.error('Error making POST request:', error);
      }
    }
  };

  return (
    <>
      <section className="fixed bottom-0 text-xl sm:text-md font-sans font-medium justify-center pb-12 flex w-full">
        <div className="py-6 w-4/6 md:w-3/6 flex justify-center ml-7">
          <input
            className="w-4/5 h-12 rounded-full px-4 pb-1 bg-indigo-950 sm:ml-7  ring-2 focus:outline-none caret-white ring-indigo-500"
            type="text"
            placeholder="enter todo"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                handleAdd();
              }
            }}
          />
          <button
            className="bg-indigo-500 w-14 rounded-full text-3xl"
            onClick={handleAdd}
          >
            👍
          </button>
        </div>
      </section>
    </>
  );
};
