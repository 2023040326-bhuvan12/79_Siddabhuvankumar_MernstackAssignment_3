import { useEffect, useState } from "react";
import axios from "axios";

function ProductForm({
    categories,
    editingProduct,
    onProductSaved,
    onCancelEdit
}) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");

    const [error, setError] = useState("");

    // ==========================================
    // LOAD PRODUCT DATA WHEN EDITING
    // ==========================================

    useEffect(() => {

        if (editingProduct) {

            setName(editingProduct.name || "");

            setDescription(
                editingProduct.description || ""
            );

            setPrice(
                editingProduct.price || ""
            );

            setQuantity(
                editingProduct.quantity || ""
            );

            setImage(
                editingProduct.image || ""
            );

            setCategory(
                editingProduct.category?._id || ""
            );

        } else {

            clearForm();

        }

    }, [editingProduct]);

    // ==========================================
    // CLEAR FORM
    // ==========================================

    const clearForm = () => {

        setName("");
        setDescription("");
        setPrice("");
        setQuantity("");
        setImage("");
        setCategory("");
        setError("");

    };

    // ==========================================
    // FORM SUBMIT
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        // Validation

        if (!name.trim()) {

            setError("Please enter product name");
            return;

        }

        if (!description.trim()) {

            setError("Please enter product description");
            return;

        }

        if (!price || Number(price) <= 0) {

            setError("Please enter a valid price");
            return;

        }

        if (quantity === "" || Number(quantity) < 0) {

            setError("Please enter a valid quantity");
            return;

        }

        if (!category) {

            setError("Please select a category");
            return;

        }

        try {

            const productData = {

                name: name.trim(),

                description: description.trim(),

                price: Number(price),

                quantity: Number(quantity),

                image: image.trim(),

                category: category

            };

            // ==========================================
            // UPDATE PRODUCT
            // ==========================================

            if (editingProduct) {

                await axios.put(
                    `http://localhost:5000/api/products/${editingProduct._id}`,
                    productData
                );

                alert(
                    "Product updated successfully"
                );

            }

            // ==========================================
            // ADD PRODUCT
            // ==========================================

            else {

                await axios.post(
                    "http://localhost:5000/api/products/add",
                    productData
                );

                alert(
                    "Product added successfully"
                );

            }

            clearForm();

            if (onProductSaved) {

                onProductSaved();

            }

        } catch (error) {

            console.log(error);

            setError(
                error.response?.data?.message ||
                "Unable to save product"
            );

        }

    };

    return (

        <div
            style={{
                backgroundColor: "white",
                padding: "20px",
                marginBottom: "30px",
                borderRadius: "10px",
                boxShadow: "0 2px 8px #ddd"
            }}
        >

            <h2>
                {editingProduct
                    ? "Edit Product"
                    : "Add Product"}
            </h2>

            {error && (

                <p
                    style={{
                        color: "red"
                    }}
                >
                    {error}
                </p>

            )}

            <form onSubmit={handleSubmit}>

                {/* PRODUCT NAME */}

                <div
                    style={{
                        marginBottom: "15px"
                    }}
                >

                    <label>
                        Product Name
                    </label>

                    <br />

                    <input
                        type="text"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        placeholder="Enter product name"
                        style={{
                            width: "300px",
                            padding: "10px",
                            marginTop: "5px"
                        }}
                    />

                </div>

                {/* DESCRIPTION */}

                <div
                    style={{
                        marginBottom: "15px"
                    }}
                >

                    <label>
                        Description
                    </label>

                    <br />

                    <textarea
                        value={description}
                        onChange={(e) =>
                            setDescription(
                                e.target.value
                            )
                        }
                        placeholder="Enter product description"
                        rows="4"
                        style={{
                            width: "300px",
                            padding: "10px",
                            marginTop: "5px"
                        }}
                    />

                </div>

                {/* PRICE */}

                <div
                    style={{
                        marginBottom: "15px"
                    }}
                >

                    <label>
                        Price
                    </label>

                    <br />

                    <input
                        type="number"
                        value={price}
                        onChange={(e) =>
                            setPrice(e.target.value)
                        }
                        placeholder="Enter price"
                        style={{
                            width: "300px",
                            padding: "10px",
                            marginTop: "5px"
                        }}
                    />

                </div>

                {/* QUANTITY */}

                <div
                    style={{
                        marginBottom: "15px"
                    }}
                >

                    <label>
                        Quantity
                    </label>

                    <br />

                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) =>
                            setQuantity(
                                e.target.value
                            )
                        }
                        placeholder="Enter quantity"
                        style={{
                            width: "300px",
                            padding: "10px",
                            marginTop: "5px"
                        }}
                    />

                </div>

                {/* IMAGE */}

                <div
                    style={{
                        marginBottom: "15px"
                    }}
                >

                    <label>
                        Image URL
                    </label>

                    <br />

                    <input
                        type="text"
                        value={image}
                        onChange={(e) =>
                            setImage(e.target.value)
                        }
                        placeholder="Enter image URL"
                        style={{
                            width: "300px",
                            padding: "10px",
                            marginTop: "5px"
                        }}
                    />

                </div>

                {/* CATEGORY */}

                <div
                    style={{
                        marginBottom: "15px"
                    }}
                >

                    <label>
                        Category
                    </label>

                    <br />

                    <select
                        value={category}
                        onChange={(e) =>
                            setCategory(
                                e.target.value
                            )
                        }
                        style={{
                            width: "320px",
                            padding: "10px",
                            marginTop: "5px"
                        }}
                    >

                        <option value="">
                            Select Category
                        </option>

                        {categories.map(
                            (item) => (

                                <option
                                    key={item._id}
                                    value={item._id}
                                >

                                    {item.parentCategory
                                        ? `${item.parentCategory.name} → ${item.name}`
                                        : item.name}

                                </option>

                            )
                        )}

                    </select>

                </div>

                {/* SAVE BUTTON */}

                <button type="submit">

                    {editingProduct
                        ? "Update Product"
                        : "Add Product"}

                </button>

                {/* CANCEL BUTTON */}

                {editingProduct && (

                    <button
                        type="button"
                        onClick={onCancelEdit}
                        style={{
                            marginLeft: "10px"
                        }}
                    >
                        Cancel
                    </button>

                )}

            </form>

        </div>

    );
}

export default ProductForm;