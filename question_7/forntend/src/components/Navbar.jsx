import { Link } from "react-router-dom";

function Navbar() {

    return (

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
                        to="/"
                        style={{
                            color: "white",
                            marginRight: "20px",
                            textDecoration: "none"
                        }}
                    >
                        Home
                    </Link>

                    <Link
                        to="/admin"
                        style={{
                            color: "white",
                            marginRight: "20px",
                            textDecoration: "none"
                        }}
                    >
                        Admin
                    </Link>

                    <Link
                        to="/admin/categories"
                        style={{
                            color: "white",
                            marginRight: "20px",
                            textDecoration: "none"
                        }}
                    >
                        Categories
                    </Link>

                    <Link
                        to="/admin/products"
                        style={{
                            color: "white",
                            textDecoration: "none"
                        }}
                    >
                        Products
                    </Link>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;