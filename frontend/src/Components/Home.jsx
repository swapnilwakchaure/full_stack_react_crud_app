import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1>Welcome to Full Stack CRUD App Using React JS, Node JS, Express JS and MongoDB</h1>
            <Link to="/notes"><button>NOTE</button></Link>
        </div>
    )
}

export default Home;