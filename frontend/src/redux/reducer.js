import {
    SET_CURRENT_USER,
    LOGOUT_USER, 
    REGISTER_USER_SUCCESS,
    FETCH_TASKS, ADD_TASK_SUCCESS,
    REMOVE_TASK,
    MARK_COMPLETED,
    MARK_INCOMPLETE,
    UPDATE_TASK
} from './actionTypes';

const initialState = { 
    tasks: [], 
    currentUser: {},
    activeUserId: '',
    isLoggedIn: false, 
    users: [],
    error: null,
};

const taskReducer = (state = initialState, action) => {
    switch (action.type) {

        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                activeUserId: action.payload.userID,
                currentUser: action.payload,
                users: [...state.users, action.payload]
            };
        case SET_CURRENT_USER:
                return {
                    ...state,
                    isLoggedIn: true,
                    activeUserId: action.payload.userID,
                    currentUser: action.payload,
        };
        case LOGOUT_USER:
                return {
                    ...state,
                    currentUser: null,
                    isLoggedIn: false,
        };
        case FETCH_TASKS:
            return { 
                ...state, 
                tasks: action.payload 
        };
        case ADD_TASK_SUCCESS:
            return {
                ...state,
                tasks: [...state.tasks, action.payload ],
        };
        case REMOVE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.taskID !== action.payload.taskID),
            };
    
            case MARK_COMPLETED:
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.taskID === action.payload.taskID ? { ...task, status: true  } : task
                ),
            };
    
            case MARK_INCOMPLETE:
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.taskID === action.payload.taskID ? { ...task, status: false } : task
                ),
            };
            case UPDATE_TASK:
                return { 
                    ...state, 
                    tasks: action.payload 
            };
        default:
        return state;
    }
};

export default taskReducer;