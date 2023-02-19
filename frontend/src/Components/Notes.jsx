import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Notes = () => {
    const [notes, setNotes] = useState("");

    useEffect(() => {
        fetch("http://localhost:8080/notes", {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                setNotes(res)
            })
            .catch((error) => console.log(error))
    }, []);

    const handleDelete = (noteID) => {
        fetch(`http://localhost:8080/notes/delete/${noteID}`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
    }

    return (
        <div>
            <h4>All Notes</h4>
            <Link to="/register"><button>REGISTER</button></Link>
            {notes ? notes.map((el) => {
                return (
                    <>
                        <h5>Title: {el.title}</h5>
                        <p>Note: {el.note}</p>
                        <button onClick={() => handleDelete(el._id)}>DELETE</button>
                        <Link to="/update"><button>UPDATE</button></Link>
                    </>
                )
            })
                : <h5>Notes section is empty</h5>}
        </div>
    )
}


export default Notes;