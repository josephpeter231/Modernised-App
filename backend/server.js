import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import taskModel from "./models/taskModel.js";
import userRouter from "./routes/userRoute.js"
import taskRouter from "./routes/taskRoute.js"
import forgotPasswordRouter from "./routes/forgotPassword.js"

//app config
dotenv.config() 
const app = express()
const port = 8000
mongoose.set('strictQuery', true);
 
//middlewares 
app.use(express.json())
app.use(cors()) 
 
//db config 
mongoose.connect("mongodb+srv://josephpeterjece2021:AJ9Hg6xTtQBUCoGr@cluster1.xaacunv.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
}, (err) => {
    if (err) {
        console.log(err) 
    } else {
        console.log("DB Connected")
    }
})
 
// const WebSocket = require('ws');

// const wss = new WebSocket.Server({ port: 8000 });

// wss.on('connection', function connection(ws) {
//   ws.on('message', function incoming(message) {
//     console.log('received: %s', message);
//   });

//   ws.send('Connected to WebSocket server!');
// });


//api endpoints 
app.use("/api/user", userRouter)
app.delete('/deletetask/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await taskModel.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.put('/updatetask/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTask = req.body; 
        const result = await taskModel.findByIdAndUpdate(id, updatedTask, { new: true });

        if (!result) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/updatecompleted/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { completed } = req.body;
        const updatedTask = await taskModel.findByIdAndUpdate(id, { completed }, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.use("/api/task", taskRouter)
app.use("/api/forgotPassword", forgotPasswordRouter)
 
//listen
app.listen(port, () => console.log(`Listening on localhost:${port}`))