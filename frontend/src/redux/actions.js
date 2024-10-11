import {
    SET_CURRENT_USER, 
    LOGOUT_USER, 
    REGISTER_USER_SUCCESS,
    FETCH_TASKS, 
    ADD_TASK_SUCCESS,
    REMOVE_TASK,
    MARK_COMPLETED,
    MARK_INCOMPLETE,
    UPDATE_TASK,
} from './actionTypes';
import axios from 'axios';

export const setCurrentUser = (user) => { 
    return {
        type: SET_CURRENT_USER,
        payload: user,
    };
};

export const logoutUser = () => {
    return {
        type: LOGOUT_USER,
    };
};

export const registerUserSuccess = (userData) => {
    return {
        type: REGISTER_USER_SUCCESS,
        payload: userData
    }
};

export const fetchTasks = (tasks) => ({
    type: FETCH_TASKS,
    payload: tasks
});

export const addTaskSuccess = (task) => {
    return {
        type: ADD_TASK_SUCCESS,
        payload: task,
    };
};

export const removeTask = (taskID) => ({
    type: REMOVE_TASK,
    payload:  { taskID },
    });
    
// export const markCompleted = (taskID) => ({
//     type: MARK_COMPLETED,
//     payload:   { taskID} ,
//     });
    
// export const markIncomplete = (taskID) => ({
//     type: MARK_INCOMPLETE,
//     payload: { taskID},
//     });

export const updateTask = (tasks) => {
    return {
        type: UPDATE_TASK,
        payload: tasks
    }
}

export const markCompleted= (taskID, completedBy) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`http://localhost:3001/tasks/${taskID}/complete`,  {completedBy}, {
                withCredentials: true
            });

            if (response.status === 200) {
            dispatch({
                type: MARK_COMPLETED,
                payload: { taskID, completedBy }
            });    } 
            else {
                console.error('Failed to mark task as incomplete. Status:', response.status);
            }
        } catch (error) {
            console.error('Failed to mark task as completed:', error);
        }
    };
};

export const markIncomplete = (taskID) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`http://localhost:3001/tasks/${taskID}/incomplete`,  {}, {
                withCredentials: true
            });
            if (response.status === 200) {
            dispatch({
                type: MARK_INCOMPLETE,
                payload: { taskID }
            });    } else {
                console.error('Failed to mark task as incomplete. Status:', response.status);
            }
        } catch (error) {
            console.error('Failed to mark task as incomplete:', error);
        }
    };
}