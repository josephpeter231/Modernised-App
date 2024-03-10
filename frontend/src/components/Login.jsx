import React, { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from "../Axios/axios.js"
import TokenContext from '../context/TokenContext.js';

function Login() {
    const [formData, setFormData] = useState({});
    const { userToken, tokenDispatch, userDispatch } = useContext(TokenContext);
    const [error, setError] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post("/user/login", formData)
            tokenDispatch({ type: "SET_TOKEN", payload: result.data.token })
            userDispatch({ type: "SET_USER", payload: result.data.user })
            localStorage.setItem("authToken", JSON.stringify(result.data.token))
        } catch (error) {
            setError({ message: error.response.data.message })
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            {userToken && <Navigate to="/" />}
            <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="email"
                        onChange={handleChange}
                        className="block w-full px-4 py-2 mb-4 text-xl text-gray-800 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        placeholder="Email address"
                    />
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        className="block w-full px-4 py-2 mb-4 text-xl text-gray-800 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        placeholder="Password"
                    />
                    {error && (
                        <div className="text-sm text-red-600 mb-4">{error.message}</div>
                    )}
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-500 text-white text-xl font-semibold rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Login
                    </button>
                </form>
                <div className="text-center mt-4">
                    <Link to="/forgotPassword" className="text-blue-500 hover:text-blue-600">Forgot Password?</Link>
                </div>
                <div className="text-center mt-4">
                    <p className="text-gray-600">Don't have an account? <Link to="/register" className="text-blue-500 hover:text-blue-600">Register</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Login;
