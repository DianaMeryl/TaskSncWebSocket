import React, { useState } from 'react';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { updateTask } from '../redux/actions';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";

export default function Update() {

  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { id }= useParams();
  const currentUser = useSelector(state => state.currentUser);

    const updateOneTask = async (title, description) => {
      try {
          const response =  axios.put(`http://localhost:3001/tasks/${id}`, {
            title: title,
            description: description,
          }, {withCredentials: true});
          return response.data;  
      } catch (error) {
        console.error('Error updating task:', error.response?.data || error.message);
          throw error;
      }
    };
    
    
    const handleUpdateTaskClick = async (e) => {
      e.preventDefault();
      try {
          const newTask = await updateOneTask(title, description);
          dispatch(updateTask(newTask));
          setTitle('');
          setDescription('');
          navigate("/task");
      } catch (error) {
          console.error('Error adding task:', error.message);
      }
    };

    const handleKeyDown = async (event) => {
      if (event.key === 'Enter') {
          await handleUpdateTaskClick();
      }
    };
    return (
        <div className="flex h-screen bg-info bg-opacity-25 justify-center items-center">
            <div className="w-1/2 bg-danger bg-opacity-25 rounded p-3 text-lg">
                <form onSubmit={handleUpdateTaskClick} className="space-y-4">
                    <h2 className="text-primary text-center mb-4 font-bold text-2xl">Update Task</h2>
                    <div className='mb-2'>
                        <input
                              id="addTaskInput"
                              className="h-24 flex-grow p-2 border-b-2 border-gray-300 text-2xl italic focus:outline-none focus:border-blue-500"
                              type="text"
                              placeholder="Update Title"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              onKeyDown={handleKeyDown}
                          />
                          </div> 
                          <div className="flex items-center mt-10 mb-4">
                          <input
                              id="addTaskInput"
                              className="h-24 flex-grow p-2 border-b-2 border-gray-300 text-2xl italic focus:outline-none focus:border-blue-500"
                              type="text"
                              placeholder="Update Description"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              onKeyDown={handleKeyDown}
                          />
                    </div>
                    <div className='flex justify-center mb-3'>
                        <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-lg'>Update</button>
                    </div>
                    <div className='flex justify-end mb-3'>
                        <Link to='/task' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-lg'>Back</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}