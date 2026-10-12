import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const [empId, setEmpId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          empId,
          password
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      navigate("/home");

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (
    <div className="container">

      <h1>Employee Login</h1>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <form onSubmit={handleLogin}>

        <input
          type="text"
          placeholder="Employee ID"
          value={empId}
          onChange={(e) =>
            setEmpId(e.target.value)
          }
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <br /><br />

        <button type="submit">
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;