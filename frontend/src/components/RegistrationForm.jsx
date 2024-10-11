import React from "react";
import { useState } from "react";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { registerUserSuccess } from '../redux/actions';
import { useDispatch } from 'react-redux';
import axios from 'axios';

export default function RegistrationForm() {

const history = useNavigate();
const dispatch = useDispatch();

const[inpValue, setInpValue] = useState({
    nickName:"",
    password:"",
});

const getdata = (e) => {
    const { value, name } = e.target;

    setInpValue(() => {
        return { ...inpValue,
                [name]:value,
            }
    })
}

const registerUser = async (nickName, password) => {
    try {
        const response = await axios.post('http://localhost:3001/registration', {
            nickName,
            password
        });

        const newUser = response.data;

        dispatch(registerUserSuccess(newUser));

    } catch (error) {
        console.error('Error:', error.response?.data?.message || error.message);
    }
};

const addData = (e) => {
    e.preventDefault();

    const{nickName, password} = inpValue;

    if( nickName === ""){
        alert("name is required")
    }
    else if( password === ""){
        alert("password is required")
    }
    else {
        registerUser(nickName, password);
        history("/login");
    }
};

return (
    <div className="flex">
    <div className="w-full flex items-center justify-center min-h-screen bg-blue-200 ">
        <div className="w-full max-w-md">
            <h3 className="text-center mb-5 text-5xl text-green-600 font-bold">Sign Up</h3>
            <form className="bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4 space-y-4 bg-opacity-50">
                <div className="mb-4">
                    <label className="block text-blue-500 text-2xl italic font-bold mb-2" htmlFor="nickName">
                        nickName
                    </label>
                    <input 
                        className="h-16 shadow appearance-none border rounded w-full py-2 px-3 text-xl text-blue-800 font-bold leading-tight focus:outline-none focus:shadow-outline" 
                        placeholder="Enter your name"
                        type="text" 
                        onChange={getdata} 
                        name="nickName" 
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-blue-500 text-2xl italic font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input 
                        className="h-16 shadow appearance-none border rounded w-full py-2 px-3 text-xl text-blue-800 font-bold leading-tight focus:outline-none focus:shadow-outline" 
                        placeholder="Enter your password"
                        type="password" 
                        onChange={getdata} 
                        name="password"  
                        required
                    />
                </div>
                <div className="flex items-center justify-center">
                    <button 
                        onClick={addData} 
                        type="submit" 
                        className="bg-green-500 h-16 hover:bg-indigo-600 text-white text-2xl font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Submit
                    </button>
                </div>
            </form>
            <p className="mt-1 text-center text-2xl italic">Already Have an Account? 
                <span>
                    <NavLink to="/login" className="text-indigo-500 hover:underline"> Sign In</NavLink>
                </span>
            </p>
        </div>
    </div>
    </div>
);
}
