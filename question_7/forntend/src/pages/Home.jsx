import { Link } from "react-router-dom";

function Home() {
  return (
    <div>

      <h1>Shopping Cart</h1>

      <h2>Welcome to Shopping Cart</h2>

      <Link to="/admin">
        Go to Admin Panel
      </Link>

    </div>
  );
}

export default Home;