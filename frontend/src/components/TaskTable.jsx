import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { useSelector, useDispatch } from "react-redux";
import { updateTask, markCompleted, markIncomplete, fetchTasks, updateTaskCompleted } from '../redux/actions';
import axios from 'axios';
import { FaCheck } from 'react-icons/fa';
import { BiDotsHorizontal } from "react-icons/bi";
// import TaskItem from "./TaskItem";

const socket = io('http://localhost:3001'); 

const TaskTable = () => {

    const tasks = useSelector(state => state.tasks); 

    const currentUser = useSelector(state => state.currentUser);
    const dispatch = useDispatch();

    useEffect(() => {

        const getTasks = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/alltasks`, {
                    withCredentials: true
                });
                dispatch(fetchTasks(response.data));
            } catch (error) {
                console.error('Error fetching user tasks:', error.message);
            }
        };
    
        getTasks();

        socket.on('updateTasks', (updatedTasks) => {
            dispatch(updateTask(updatedTasks));
        });
        socket.on('tasksList', (initialTasks) => {
            dispatch(updateTask(initialTasks)); 
        });

        socket.on('taskCompleted', ({ taskID, completedBy, completedByNickName }) => {
            dispatch(markCompleted(taskID, completedBy, completedByNickName)); 
            dispatch(updateTaskCompleted({ taskID, completedBy, completedByNickName }));
        });

        socket.on('taskIncompleted', ({ taskID }) => {
            dispatch(markIncomplete(taskID)); 
        });

        socket.on('newTask', (newTask) => {
            dispatch(updateTask([...tasks, newTask]));
        });


        return () => {
        socket.off('tasksList');
        socket.off('taskCompleted');
        socket.off('taskIncompleted');
        socket.off('newTask');
        socket.off('updateTasks');
        };
    }, [dispatch, tasks]);

    const markTaskAsCompleted = (taskID, userID) => {
        socket.emit('markTaskAsCompleted', { taskID, completedBy: userID });
    };
    const markTaskAsIncompleted = (taskID) => {
        socket.emit('markTaskAsIncompleted', { taskID });
    };

    const toggleTaskStatus = (task, userID) => {
        
        if (task.status) {
            markTaskAsIncompleted(task.taskID);
        } else {
            markTaskAsCompleted(task.taskID, userID);
        }
    };

    return (
        <div style={{ maxWidth: '80%' }} className="mx-auto p-4 bg-opacity-85 bg-yellow-50 rounded">
            <h2 className='mt-3 mb-6 text-4xl text-teal-600 font-bold text-center uppercase'>
                <strong>Список справ: </strong> 
            </h2>
        <ul className="mt-10">
            <li className="my-2 text-xl italic">All Tasks Here...</li>
            {tasks && tasks.length > 0 ? (
                tasks.map((task, index) => (
                    <li key={index}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 py-2 gap-4     font-roboto text-3xl font-bold h-24 ">
                            <div className="flex items-center">
                                <span className="mr-4 text-gray-500">{index + 1}.</span>
                                <span className={`mr-4 ${task.status ? 'line-through-color text-gray-300' : ''}`}>{task.title}</span> <span className={`mr-4 ${task.status ? 'line-through-color text-gray-300' : ''}`}>{task.description}</span>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    className={`flex items-center justify-center ${
                                        task.status ? 'bg-green-500 hover:bg-yellow-700' : 'bg-yellow-500 hover:bg-green-700'
                                    } text-white text-3xl font-bold py-2 px-3 rounded`}
                                    onClick={() => toggleTaskStatus(task, currentUser.userID)}>
                                    {task.status ? <FaCheck /> : <BiDotsHorizontal />}
                                </button>

                                {task.status && (
                                    <div>
                                        <em className='text-cyan-400'>Completed by </em> 
                                        <strong>{task.completer ? task.completer.nickName : 'Unknown'}</strong> 
                                    </div>
                                )}
                            </div>
                    </div>
            </li>
            ))) : ( <p>No tasks available</p> )}
        </ul>
        </div>
    );
};

export default TaskTable;