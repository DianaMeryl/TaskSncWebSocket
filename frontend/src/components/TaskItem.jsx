/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import {
    removeTask,
    markCompleted,
    markIncomplete,
} from '../redux/actions';
import { FaTrash, FaCheck, FaEdit } from 'react-icons/fa';
import { BiDotsHorizontal } from "react-icons/bi";
import axios from 'axios';
import { Link } from 'react-router-dom';


const TaskItem = ({ task, index }) => {

const dispatch = useDispatch();
const currentUser = useSelector(state => state.currentUser);

const removeTaskDB = async () => {
    try {

        await axios.delete(`http://localhost:3001/removetask/${task.taskID}`, 
        {
            withCredentials: true
        });

        dispatch(removeTask(task.taskID));

} catch (error) {
    console.error('Error removing user tasks:', error.message);
}
};

return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 py-2 gap-4 font-roboto text-3xl font-bold h-24 ">
        <div className="flex items-center">
            <span className="mr-4 text-gray-500">{index + 1}.</span>
            <span className={`mr-4 ${task.status ? 'line-through-color text-gray-300' : ''}`}>{task.title}</span> <span className={`mr-4 ${task.status ? 'line-through-color text-gray-300' : ''}`}>{task.description}</span>
        </div>
        <div className="flex space-x-2">
            <Link
                to={`/edit/${task.taskID}`}
                className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white  text-3xl font-bold py-3 px-4 rounded">
                <FaEdit />
            </Link>
            <button
                className="flex items-center justify-center bg-red-500 hover:bg-red-700 text-white text-2xl font-bold py-2 px-3 rounded"
                onClick={removeTaskDB}>
                <FaTrash />
            </button>
        </div>
        </div>
    );
};

export default TaskItem;