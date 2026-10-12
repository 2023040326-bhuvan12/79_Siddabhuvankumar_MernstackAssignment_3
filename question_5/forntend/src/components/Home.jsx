import { Link, useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <div className="container">

      <h1>Employee Home</h1>

      <p>Welcome to Employee Portal</p>

      <nav>

        <Link to="/profile">
          Profile
        </Link>

        {" | "}

        <Link to="/leave">
          Leave Application
        </Link>

        {" | "}

        <Link to="/leaves">
          Leave List
        </Link>

        {" | "}

        <button onClick={logout}>
          Logout
        </button>

      </nav>

    </div>
  );
}

export default Home;