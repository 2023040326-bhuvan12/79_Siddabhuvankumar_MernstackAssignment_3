import { Link, useNavigate } from "react-router-dom";

function UserHome() {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/user/login");
    };

    return (
        <div>

            <nav
                style={{
                    padding: "15px",
                    backgroundColor: "#222",
                    color: "white"
                }}
            >

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >

                    <h2>Shopping Cart</h2>

                    <div>

                        <Link
                            to="/user/home"
                            style={{
                                color: "white",
                                marginRight: "20px",
                                textDecoration: "none"
                            }}
                        >
                            Home
                        </Link>

                        <Link
                            to="/user/products"
                            style={{
                                color: "white",
                                marginRight: "20px",
                                textDecoration: "none"
                            }}
                        >
                            Products
                        </Link>

                        <Link
                            to="/user/cart"
                            style={{
                                color: "white",
                                marginRight: "20px",
                                textDecoration: "none"
                            }}
                        >
                            Cart
                        </Link>

                        <button onClick={logout}>
                            Logout
                        </button>

                    </div>

                </div>

            </nav>


            <div
                style={{
                    padding: "50px",
                    textAlign: "center"
                }}
            >

                <h1>
                    Welcome to Shopping Cart
                </h1>

                <h2>
                    Hello {user?.name || "User"}
                </h2>

                <p>
                    Browse products and add them to your cart.
                </p>

                <Link to="/user/products">

                    <button
                        style={{
                            padding: "12px 25px",
                            marginTop: "20px"
                        }}
                    >
                        Shop Now
                    </button>

                </Link>

            </div>

        </div>
    );
}

export default UserHome;