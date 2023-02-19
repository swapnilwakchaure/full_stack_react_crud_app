const express = require("express");
const { UserModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRouter = express.Router();


// ----------------- USER POST REQUEST ----------------- //
userRouter.post("/register", async (request, response) => {
    const { name, email, password } = request.body;

    try {
        bcrypt.hash(password, 5, async (error, hash) => {
            if (error) {
                response.send({ "Massage": "Something went wrong", "Error": error.message });
            } else {
                const user = new UserModel({ name, email, password: hash });
                await user.save();
                response.send({ "Message": "User Registration Success" });
            }
        });
    } catch (error) {
        response.send({ "Message": "User Registration Failed", "Error": error.message });
    }
});

// ----------------- USER POST REQUEST ----------------- //
userRouter.post("/login", async (request, response) => {
    const { email, password } = request.body;

    try {
        const user = await UserModel.find({ email });
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (error, result) => {
                if (result) {
                    const token = jwt.sign({ userID: user[0]._id }, "auth", { expiresIn: 60 * 60 });                      
                    response.send({ "Message": "User Registration Success", "token": token });
                } else {
                    response.send({ "Message": "Incorrect Password", "Error": error });
                }
            })
        } else {
            response.send({ "Message": "Incorrect Email" });
        }
    } catch (error) {
        response.send({ "Message": "User Login Failed", "Error": error.message });
    }
});

// ----------------- USER DATA DELETE REQUEST ----------------- //
userRouter.delete("/delete/:id", async (request, response) => {
    const ID = request.params.id;

    try {
        await UserModel.findByIdAndDelete({ _id: ID });
        response.send({ "Message": "User Data Successfully Deleted" });
    } catch (error) {
        response.send({ "Message": "Cannot able to delete the data", "Error": error.message });
    }
});


module.exports = { userRouter };