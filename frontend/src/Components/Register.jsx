import { useState } from "react";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = () => {
        const payload = { name, email, password }
        // console.log(payload);
        fetch("http://localhost:8080/users/register", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((res) => console.log(res))
            .catch((error) => console.log(error))
    }

    return (
        <div>
            <h4>Register Page</h4>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name"
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
            />
            <button onClick={handleRegister}>REGISTER</button>
        </div>
    )
}


export default Register;