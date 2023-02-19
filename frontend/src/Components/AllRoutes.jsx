import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import CreateNote from "./CreateNote";
import Notes from "./Notes";
import Home from "./Home";

const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />   
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createnote" element={<CreateNote />} />
            <Route path="/notes" element={<Notes />} />
        </Routes>
    )
}


export default AllRoutes;