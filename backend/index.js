require('dotenv').config();

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

mongoose.set('strictQuery', true);

const { connection } = require("./configs/db.connect");
const { userRouter } = require("./routes/user.route");
const { noteRouter } = require('./routes/note.route');
const { authenticate } = require('./middlewares/auth.middleware');

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (request, response) => {
    response.send("Welcome to full stack crud app using react js");
});

app.use("/users", userRouter);
app.use(authenticate);
app.use("/notes", noteRouter);



app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log(`Server is running at port ${process.env.port}`);
    } catch (error) {
        console.log("Cannot able to start the server");
    }
});