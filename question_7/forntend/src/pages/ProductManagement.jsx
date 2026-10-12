import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import ProductForm from "../components/ProductForm";

function ProductManagement() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    // Edit mode
    const [editingProduct, setEditingProduct] = useState(null);

    // ==============================
    // LOAD PRODUCTS
    // ==============================

    const loadProducts = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/products"
            );

            setProducts(response.data);
        } catch (error) {
            console.log("Product loading error:", error);
        }
    };

    // ==============================
    // LOAD CATEGORIES
    // ==============================

    const loadCategories = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/categories"
            );

            setCategories(response.data);
        } catch (error) {
            console.log("Category loading error:", error);
        }
    };

    // ==============================
    // PAGE LOAD
    // ==============================

    useEffect(() => {
        loadProducts();
        loadCategories();
    }, []);

    // ==============================
    // DELETE PRODUCT
    // ==============================

    const deleteProduct = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await axios.delete(
                `http://localhost:5000/api/products/${id}`
            );

            alert("Product deleted successfully");

            loadProducts();
        } catch (error) {
            console.log(error);

            alert("Unable to delete product");
        }
    };

    // ==============================
    // EDIT PRODUCT
    // ==============================

    const editProduct = (product) => {
        setEditingProduct(product);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    // ==============================
    // CANCEL EDIT
    // ==============================

    const cancelEdit = () => {
        setEditingProduct(null);
    };

    // ==============================
    // AFTER PRODUCT SAVE
    // ==============================

    const handleProductSaved = () => {
        setEditingProduct(null);
        loadProducts();
    };

    return (
        <div>

            <Navbar />

            <div
                style={{
                    width: "90%",
                    margin: "30px auto"
                }}
            >

                <h1>Product Management</h1>

                {/* ==============================
                    PRODUCT FORM
                ============================== */}

                <ProductForm
                    categories={categories}
                    editingProduct={editingProduct}
                    onProductSaved={handleProductSaved}
                    onCancelEdit={cancelEdit}
                />

                {/* ==============================
                    PRODUCT LIST
                ============================== */}

                <h2>Product List</h2>

                <table
                    border="1"
                    cellPadding="10"
                    style={{
                        width: "100%",
                        backgroundColor: "white",
                        borderCollapse: "collapse"
                    }}
                >

                    <thead>

                        <tr>

                            <th>#</th>

                            <th>Image</th>

                            <th>Product Name</th>

                            <th>Description</th>

                            <th>Price</th>

                            <th>Quantity</th>

                            <th>Category</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {products.map((product, index) => (

                            <tr key={product._id}>

                                <td>
                                    {index + 1}
                                </td>

                                <td>

                                    {product.image ? (

                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            width="70"
                                            height="70"
                                            style={{
                                                objectFit: "cover"
                                            }}
                                        />

                                    ) : (
                                        "No Image"
                                    )}

                                </td>

                                <td>
                                    {product.name}
                                </td>

                                <td>
                                    {product.description}
                                </td>

                                <td>
                                    ₹{product.price}
                                </td>

                                <td>
                                    {product.quantity}
                                </td>

                                <td>

                                    {product.category
                                        ? product.category.name
                                        : "No Category"}

                                </td>

                                <td>

                                    <button
                                        onClick={() =>
                                            editProduct(product)
                                        }
                                        style={{
                                            marginRight: "10px"
                                        }}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            deleteProduct(
                                                product._id
                                            )
                                        }
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

                {products.length === 0 && (
                    <p>No products found.</p>
                )}

            </div>

        </div>
    );
}

export default ProductManagement;