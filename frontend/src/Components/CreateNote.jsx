const { useState } = require("react")

const CreateNote = () => {
    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");
    const [category, setCategory] = useState("");

    const handleNote = () => {
        const payload = { title, note, category };
        // console.log(payload);

        fetch("http://localhost:8080/notes/addnote", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        })
            .then((res) => res.json())
            .then((res) => console.log(res))
            .catch((error) => console.log(error))
    }

    return (
        <div>
            <h4>Create Note page</h4>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Title"
            />
            <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Enter Note"
            />
            <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter Category"
            />
            <button onClick={handleNote}>NOTE</button>
        </div>
    )
}


export default CreateNote;