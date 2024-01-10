import React, { useState, useEffect } from 'react';
import { Todo } from './Todo';
import axios from 'axios';

export const TodoContainer = ({ setTodos, todos }) => {
  const [nthngtd, setNthngtd] = useState(
    'Hold on, let me fetch this real quick.'
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/todos');
        console.log(response.data);
        setTodos(response.data);
        setNthngtd('Well, looks like you really have " nothingtodo ".');
      } catch (error) {
        console.error('Error fetching data:', error);
        setNthngtd('Oops, guess I failed to fetch. My bad.');
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex justify-center">
      <section className="w-5/6 md:w-3/6 flex flex-col gap-4">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <Todo
              key={todo._id}
              name={todo.name}
              done={todo.done}
              id={todo._id}
              setTodos={setTodos}
            />
          ))
        ) : (
          <div className=" text-slate-400 w-full text-center text-xl  rounded-full font-sans font-medium ">
            {nthngtd}
          </div>
        )}
        <div className="h-36"></div>
      </section>
    </main>
  );
};
