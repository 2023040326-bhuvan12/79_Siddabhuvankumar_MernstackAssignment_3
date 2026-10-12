import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Cart() {

    const [cart, setCart] = useState(null);

    const [error, setError] = useState("");


    const token = localStorage.getItem("token");


    const loadCart = async () => {

        try {

            const response = await axios.get(

                "http://localhost:5000/api/cart",

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }

            );

            setCart(response.data);

        } catch (error) {

            console.log(error);

            setError(
                error.response?.data?.message ||
                "Unable to load cart"
            );

        }

    };


    useEffect(() => {

        if (token) {
            loadCart();
        }

    }, []);


    const updateQuantity = async (
        productId,
        quantity
    ) => {

        try {

            await axios.put(

                `http://localhost:5000/api/cart/update/${productId}`,

                {
                    quantity
                },

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }

            );

            loadCart();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Unable to update cart"
            );

        }

    };


    const removeProduct = async (productId) => {

        try {

            await axios.delete(

                `http://localhost:5000/api/cart/remove/${productId}`,

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }

            );

            loadCart();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Unable to remove product"
            );

        }

    };


    const calculateTotal = () => {

        if (!cart || !cart.items) {
            return 0;
        }


        return cart.items.reduce(

            (total, item) => {

                return total +
                    (
                        item.product.price *
                        item.quantity
                    );

            },

            0

        );

    };


    if (!token) {

        return (

            <div
                style={{
                    textAlign: "center",
                    marginTop: "50px"
                }}
            >

                <h2>
                    Please login to view cart
                </h2>

                <Link to="/user/login">
                    Login
                </Link>

            </div>

        );

    }


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
                        marginRight: "20px"
                    }}
                >
                    Home
                </Link>


                <Link
                    to="/user/products"
                    style={{
                        color: "white",
                        marginRight: "20px"
                    }}
                >
                    Products
                </Link>


                <Link
                    to="/user/cart"
                    style={{
                        color: "white"
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
                    My Cart
                </h1>


                {error && (

                    <p style={{ color: "red" }}>
                        {error}
                    </p>

                )}


                {!cart ||
                !cart.items ||
                cart.items.length === 0 ? (

                    <div>

                        <h3>
                            Your cart is empty
                        </h3>

                        <Link to="/user/products">
                            Continue Shopping
                        </Link>

                    </div>

                ) : (

                    <div>

                        {cart.items.map((item) => (

                            <div
                                key={item.product._id}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "20px",
                                    padding: "20px",
                                    marginBottom: "15px",
                                    backgroundColor: "white",
                                    boxShadow:
                                        "0 2px 8px #ddd"
                                }}
                            >

                                {item.product.image && (

                                    <img
                                        src={
                                            item.product.image
                                        }
                                        alt={
                                            item.product.name
                                        }
                                        width="100"
                                        height="100"
                                        style={{
                                            objectFit:
                                                "cover"
                                        }}
                                    />

                                )}


                                <div>

                                    <h3>
                                        {item.product.name}
                                    </h3>


                                    <p>
                                        Price:
                                        {" "}
                                        ₹{item.product.price}
                                    </p>


                                    <p>
                                        Quantity:
                                        {" "}
                                        {item.quantity}
                                    </p>


                                    <button
                                        onClick={() =>
                                            updateQuantity(
                                                item.product._id,
                                                item.quantity + 1
                                            )
                                        }
                                    >
                                        +
                                    </button>


                                    <button
                                        onClick={() => {

                                            if (
                                                item.quantity > 1
                                            ) {

                                                updateQuantity(
                                                    item.product._id,
                                                    item.quantity - 1
                                                );

                                            }

                                        }}
                                        style={{
                                            marginLeft: "5px"
                                        }}
                                    >
                                        -
                                    </button>


                                    <button
                                        onClick={() =>
                                            removeProduct(
                                                item.product._id
                                            )
                                        }
                                        style={{
                                            marginLeft: "15px"
                                        }}
                                    >
                                        Remove
                                    </button>

                                </div>

                            </div>

                        ))}


                        <h2>
                            Total:
                            {" "}
                            ₹{calculateTotal()}
                        </h2>

                    </div>

                )}

            </div>

        </div>

    );

}

export default Cart;