import { useState } from "react";
import axios from "axios";

function CategoryForm({
  mainCategories,
  onCategoryAdded
}) {
  const [name, setName] = useState("");

  const [parentCategory, setParentCategory] =
    useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!name.trim()) {
      setError("Please enter category name");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/categories/add",
        {
          name: name.trim(),
          parentCategory:
            parentCategory || null
        }
      );

      setName("");
      setParentCategory("");

      alert("Category added successfully");

      if (onCategoryAdded) {
        onCategoryAdded();
      }

    } catch (error) {
      console.log(error);

      setError(
        error.response?.data?.message ||
        "Unable to add category"
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
      <h2>Add Category</h2>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>

        <div style={{ marginBottom: "15px" }}>

          <label>
            Category Name
          </label>

          <br />

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Enter category name"
            style={{
              width: "300px",
              padding: "10px",
              marginTop: "5px"
            }}
          />

        </div>

        <div style={{ marginBottom: "15px" }}>

          <label>
            Parent Category
          </label>

          <br />

          <select
            value={parentCategory}
            onChange={(e) =>
              setParentCategory(e.target.value)
            }
            style={{
              width: "320px",
              padding: "10px",
              marginTop: "5px"
            }}
          >

            <option value="">
              Main Category
            </option>

            {mainCategories.map(
              (category) => (
                <option
                  key={category._id}
                  value={category._id}
                >
                  {category.name}
                </option>
              )
            )}

          </select>

        </div>

        <button type="submit">
          Add Category
        </button>

      </form>
    </div>
  );
}

export default CategoryForm;