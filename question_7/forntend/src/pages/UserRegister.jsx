import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function UserRegister() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");


        if (!name.trim()) {
            setError("Please enter your name");
            return;
        }


        if (!email.trim()) {
            setError("Please enter your email");
            return;
        }


        if (!password) {
            setError("Please enter password");
            return;
        }


        if (password.length < 6) {
            setError("Password must contain at least 6 characters");
            return;
        }


        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }


        try {

            await axios.post(
                "http://localhost:5000/api/auth/register",
                {
                    name,
                    email,
                    password
                }
            );


            setSuccess(
                "Registration successful. You can now login."
            );


            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");


        } catch (error) {

            console.log(error);

            setError(
                error.response?.data?.message ||
                "Registration failed"
            );

        }

    };


    return (

        <div
            style={{
                width: "400px",
                margin: "60px auto",
                padding: "30px",
                backgroundColor: "white",
                boxShadow: "0 2px 10px #ccc",
                borderRadius: "10px"
            }}
        >

            <h1>User Registration</h1>


            {error && (
                <p style={{ color: "red" }}>
                    {error}
                </p>
            )}


            {success && (
                <p style={{ color: "green" }}>
                    {success}
                </p>
            )}


            <form onSubmit={handleSubmit}>

                <div style={{ marginBottom: "15px" }}>

                    <label>Name</label>

                    <input
                        type="text"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        placeholder="Enter your name"
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "5px"
                        }}
                    />

                </div>


                <div style={{ marginBottom: "15px" }}>

                    <label>Email</label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        placeholder="Enter your email"
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "5px"
                        }}
                    />

                </div>


                <div style={{ marginBottom: "15px" }}>

                    <label>Password</label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        placeholder="Enter password"
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "5px"
                        }}
                    />

                </div>


                <div style={{ marginBottom: "15px" }}>

                    <label>Confirm Password</label>

                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
                        }
                        placeholder="Confirm password"
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "5px"
                        }}
                    />

                </div>


                <button
                    type="submit"
                    style={{
                        padding: "10px 20px",
                        cursor: "pointer"
                    }}
                >
                    Register
                </button>

            </form>


            <p style={{ marginTop: "20px" }}>

                Already have an account?

                {" "}

                <Link to="/user/login">
                    Login
                </Link>

            </p>

        </div>

    );
}

export default UserRegister;