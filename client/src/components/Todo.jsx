import React, { useState } from 'react';
import axios from 'axios';

export const Todo = ({ name, done, id, setTodos }) => {
  const [isDone, setIsDone] = useState(done);

  const handleToggle = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/todos/${id}`, {
        done: !isDone,
      });
      console.log('PUT request successful:', response.data);
      setIsDone((prevIsDone) => !prevIsDone);
    } catch (error) {
      console.error('Error making PUT request:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/todos/${id}`);
      console.log('DELETE request successful:', response.data);
      setTodos((prevTodos) => {
        const newTodos = prevTodos.filter((t) => t._id != id);
        return newTodos;
      });
    } catch (error) {
      console.error('Error making DELETE request:', error);
    }
  };

  return (
    <div className="flex min-h-12 justify-center items-start ">
      <button
        onClick={handleToggle}
        className=" text-xl sm:text-3xl w-1/12 rounded-full"
      >
        {isDone ? '✅' : '🟨'}
      </button>

      <div
        className=" bg-indigo-900 
      rounded-lg h-full p-2 sm:p-4 mx-1 flex items-center w-9/12 sm:10/12"
      >
        <p
          className={`whitespace-normal max-w-full break-words text-lg font-medium ${
            isDone ? 'line-through' : ''
          }`}
        >
          {name}
        </p>
      </div>

      <button
        onClick={handleDelete}
        className="w-1/12 text-xl  sm:text-3xl rounded-full"
      >
        ❌
      </button>
    </div>
  );
};
