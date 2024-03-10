import React, { useState, useContext } from 'react';
import TaskContext from '../../context/TaskContext';
import TokenContext from '../../context/TokenContext';
import axios from "../../Axios/axios.js";
import "./createTask.css";

function CreateTask() {
    const { dispatch } = useContext(TaskContext);
    const { userToken } = useContext(TokenContext);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [toastVisible, setToastVisible] = useState(false);

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/task/addTask", { title, description }, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            // Show toast
            setToastVisible(true);
            // Clear form fields after successful submission
            setTitle("");
            setDescription("");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="addContainer md:w-1/3 md:mx-auto mx-3 mt-28 flex justify-center">
            <div className="w-full max-w-md">
                <form onSubmit={handleAdd} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={title}
                            required
                            onChange={(e) => setTitle(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter title"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                        <textarea
                            rows={5}
                            name="description"
                            id="description"
                            value={description}
                            required
                            onChange={(e) => setDescription(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter description"
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Add Task
                        </button>
                    </div>
                </form>
                {toastVisible && (
                    <div className="toast bg-green-600 text-white p-3 rounded-xl shadow-2xl text-center mt-4">
                        <p>Task added successfully!</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CreateTask;
