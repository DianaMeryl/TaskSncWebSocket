 
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { fetchTasks, addTaskSuccess } from '../redux/actions';
import TaskList from '../components/TaskList';


function Task() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [status, setStatus] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/alltasks`, {
              withCredentials: true
            });
            dispatch(fetchTasks(response.data));
        } catch (error) {
            console.error('Error fetching user todos:', error.message);
        }
    };

        getTasks();
}, [dispatch]);


const addTask = async (title, description) => {
  try {
      const response = await axios.post('http://localhost:3001/addtask', {
        title: title,
        description: description,
      }, {
        withCredentials: true
      });
      return response.data;  
  } catch (error) {
    console.error('Error adding task:', error.response?.data || error.message);
      throw error;
  }
};


const handleAddTaskClick = async () => {
  try {
      const newTask = await addTask(title, description);
      dispatch(addTaskSuccess(newTask));
      setTitle('');
      setDescription('');

  } catch (error) {
      console.error('Error adding task:', error.message);
  }
};

const handleKeyDown = async (event) => {
  if (event.key === 'Enter') {
      await handleAddTaskClick();
  }
};




  return (
    <div style={{ maxWidth: '80%' }} className="mx-auto p-4 bg-opacity-85 bg-yellow-50 rounded">
    <h2 className='mt-3 mb-6 text-4xl text-teal-600 font-bold text-center uppercase'>
        <strong>Список справ на сьогодні: </strong> 
        <em className='text-cyan-400'> 1. Не сьогодні!</em>
    </h2>
    <div className="flex items-center mt-10 mb-4">
        <input
            id="addTaskInput"
            className="h-24 flex-grow p-2 border-b-2 border-gray-300 text-3xl italic focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Add Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
        />
        </div> 
        <div className="flex items-center mt-10 mb-4">
        <input
            id="addTaskInput"
            className="h-24 flex-grow p-2 border-b-2 border-gray-300 text-3xl italic focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Add Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={handleKeyDown}
        />
        <button
            className="ml-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
            onClick={handleAddTaskClick}
        >Add
        </button>
    </div>
    <TaskList />
</div>
  );
}

export default Task