import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function UserLogin() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");


        if (!email.trim()) {
            setError("Please enter your email");
            return;
        }


        if (!password) {
            setError("Please enter your password");
            return;
        }


        try {

            const response = await axios.post(

                "http://localhost:5000/api/auth/login",

                {
                    email,
                    password
                }

            );


            // Save JWT
            localStorage.setItem(
                "token",
                response.data.token
            );


            // Save user information
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );


            // Go to user home
            navigate("/user/home");


        } catch (error) {

            console.log(error);

            setError(
                error.response?.data?.message ||
                "Login failed"
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

            <h1>User Login</h1>


            {error && (
                <p style={{ color: "red" }}>
                    {error}
                </p>
            )}


            <form onSubmit={handleSubmit}>

                <div style={{ marginBottom: "15px" }}>

                    <label>Email</label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        placeholder="Enter email"
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


                <button
                    type="submit"
                    style={{
                        padding: "10px 20px",
                        cursor: "pointer"
                    }}
                >
                    Login
                </button>

            </form>


            <p style={{ marginTop: "20px" }}>

                Don't have an account?

                {" "}

                <Link to="/user/register">
                    Register
                </Link>

            </p>

        </div>

    );
}

export default UserLogin;