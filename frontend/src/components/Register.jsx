import React from 'react';
import { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import axios from "../Axios/axios.js"
import TokenContext from '../context/TokenContext.js';

function Register() {
    const [formData, setFormData] = useState({})
    const {userToken, tokenDispatch, userDispatch } = useContext(TokenContext);
    const [error, setError] = useState();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post("/user/register", formData)
            tokenDispatch({ type: "SET_TOKEN", payload: result.data.token })
            userDispatch({ type: "SET_USER", payload: result.data.user })
            localStorage.setItem("authToken", JSON.stringify(result.data.token))
        } catch (error) {
            console.log(error);
            setError({ message: error.response.data.message })
        }
    }

    return (
        <div className="bg-gray-100 min-h-screen flex justify-center items-center">
            {userToken && <Navigate to="/" />}
            <div className="max-w-md w-full mx-auto p-8 bg-white rounded-md shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        {error && (
                            <div className="text-center border-2 border-red-500 p-2 mb-2 rounded-md bg-red-200 shadow-2xl">
                                {error.message}
                            </div>
                        )}
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            name='name'
                            placeholder="Full Name"
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            name='email'
                            placeholder="Email Address"
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            name='password'
                            placeholder="Password"
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Register</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
