import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function UserProducts() {

    const [products, setProducts] = useState([]);

    const [error, setError] = useState("");

    const [message, setMessage] = useState("");


    const loadProducts = async () => {

        try {

            const response = await axios.get(
                "http://localhost:5000/api/products"
            );

            setProducts(response.data);

        } catch (error) {

            console.log(error);

            setError("Unable to load products");

        }

    };


    useEffect(() => {

        loadProducts();

    }, []);


    const addToCart = async (productId) => {

        setError("");
        setMessage("");


        const token = localStorage.getItem("token");


        if (!token) {

            setError(
                "Please login before adding products to cart"
            );

            return;

        }


        try {

            await axios.post(

                "http://localhost:5000/api/cart/add",

                {
                    productId: productId,
                    quantity: 1
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );


            setMessage(
                "Product added to cart successfully"
            );


        } catch (error) {

            console.log(error);

            setError(

                error.response?.data?.message ||

                "Unable to add product to cart"

            );

        }

    };


    return (

        <div>

            {/* NAVBAR */}

            <nav
                style={{
                    padding: "15px",
                    backgroundColor: "#222",
                    color: "white"
                }}
            >

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
                        textDecoration: "none"
                    }}
                >
                    Cart
                </Link>

            </nav>


            <div
                style={{
                    width: "90%",
                    margin: "30px auto"
                }}
            >

                <h1>
                    Products
                </h1>


                {message && (

                    <p style={{ color: "green" }}>
                        {message}
                    </p>

                )}


                {error && (

                    <p style={{ color: "red" }}>
                        {error}
                    </p>

                )}


                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(4, 1fr)",
                        gap: "20px"
                    }}
                >

                    {products.map((product) => (

                        <div
                            key={product._id}
                            style={{
                                backgroundColor: "white",
                                padding: "15px",
                                borderRadius: "10px",
                                boxShadow:
                                    "0 2px 8px #ddd"
                            }}
                        >

                            {product.image ? (

                                <img
                                    src={product.image}
                                    alt={product.name}
                                    style={{
                                        width: "100%",
                                        height: "180px",
                                        objectFit: "cover"
                                    }}
                                />

                            ) : (

                                <div
                                    style={{
                                        height: "180px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "#eee"
                                    }}
                                >
                                    No Image
                                </div>

                            )}


                            <h3>
                                {product.name}
                            </h3>


                            <p>
                                {product.description}
                            </p>


                            <h3>
                                ₹{product.price}
                            </h3>


                            <p>
                                Available:
                                {" "}
                                {product.quantity}
                            </p>


                            <button
                                onClick={() =>
                                    addToCart(product._id)
                                }
                                disabled={
                                    product.quantity <= 0
                                }
                            >
                                {product.quantity > 0
                                    ? "Add to Cart"
                                    : "Out of Stock"}
                            </button>

                        </div>

                    ))}

                </div>


                {products.length === 0 && (

                    <p>
                        No products available.
                    </p>

                )}

            </div>

        </div>

    );
}

export default UserProducts;