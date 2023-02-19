const express = require("express");

const noteRouter = express.Router();

const { NoteModel } = require("../models/note.model");


// ----------------- NOTE GET REQUEST ----------------- //
noteRouter.get("/", async (request, response) => {
    const query = request.query;

    try {
        const notes = await NoteModel.find(query);
        response.send(notes);
    } catch (error) {
        response.send({ "Message": "Cannot able to get notes data", "Error": error.message });
    }
});

// ----------------- NOTE DELETE REQUEST ----------------- //
noteRouter.post("/addnote", async (request, response) => {
    const payload = request.body;

    try {
        const note = new NoteModel(payload);
        await note.save();
        response.send({ "Message": "Note Successfully added in the database" });
    } catch (error) {
        response.send({ "Message": "Cannot able to add notes data", "Error": error.message });
    }
});

// ----------------- NOTE UPDATE REQUEST ----------------- //
noteRouter.patch("/update/:id", async (request, response) => {
    const ID = request.params.id;
    const payload = request.body;
    const note = await NoteModel.findOne({ _id: ID });
    const userID_in_note = note.userID;
    const userID_making_req = request.body.userID;

    try {
        if (userID_making_req !== userID_in_note) {
            response.send({ "Message": "You are not authorized" });
        } else {
            await NoteModel.findByIdAndUpdate({ _id: ID }, payload);
            response.send({ "Message": `Successfully updated note data of id ${ID}` });
        }
    } catch (error) {
        response.send({ "Message": `Cannot able to update the data of id: ${ID}`, "Error": error.message });
    }
});

// ----------------- NOTE DELETE REQUEST ----------------- //
noteRouter.delete("/delete/:id", async (request, response) => {
    const ID = request.params.id;

    try {
        await NoteModel.findByIdAndDelete({ _id: ID });
        response.send({ "Message": `Successfully deleted note data of id: ${ID}` });
    } catch (error) {
        response.send({ "Message": `Cannot able to delete note data of id: ${ID}`, "Error": error.message });
    }
});



module.exports = { noteRouter };