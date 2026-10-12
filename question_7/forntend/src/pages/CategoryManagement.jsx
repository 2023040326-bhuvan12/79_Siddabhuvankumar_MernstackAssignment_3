import { useEffect, useState } from "react";
import axios from "axios";

function CategoryManagement() {

  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");

  const [parentCategory, setParentCategory] =
    useState("");

  const loadCategories = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/categories"
      );

      setCategories(response.data);

    } catch (error) {

      console.log(error);

    }

  };


  useEffect(() => {

    loadCategories();

  }, []);


  const addCategory = async (e) => {

    e.preventDefault();

    if (!name) {

      alert("Please enter category name");

      return;

    }

    try {

      await axios.post(
        "http://localhost:5000/api/categories/add",
        {
          name: name,
          parentCategory:
            parentCategory || null
        }
      );

      alert("Category added successfully");

      setName("");

      setParentCategory("");

      loadCategories();

    } catch (error) {

      console.log(error);

      alert("Unable to add category");

    }

  };


  const deleteCategory = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete?"
      );

    if (!confirmDelete) {
      return;
    }

    try {

      await axios.delete(
        `http://localhost:5000/api/categories/${id}`
      );

      alert("Category deleted");

      loadCategories();

    } catch (error) {

      console.log(error);

    }

  };


  const mainCategories =
    categories.filter(
      (category) =>
        category.parentCategory === null
    );


  const subCategories =
    categories.filter(
      (category) =>
        category.parentCategory !== null
    );


  return (

    <div>

      <h1>Category Management</h1>


      {/* Add Category */}

      <h2>Add Category</h2>

      <form onSubmit={addCategory}>

        <div>

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
          />

        </div>

        <br />


        <div>

          <label>
            Parent Category
          </label>

          <br />

          <select
            value={parentCategory}
            onChange={(e) =>
              setParentCategory(
                e.target.value
              )
            }
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

        <br />

        <button type="submit">
          Add Category
        </button>

      </form>


      <hr />


      {/* Category List */}

      <h2>Categories</h2>

      <table
        border="1"
        cellPadding="10"
      >

        <thead>

          <tr>

            <th>
              #
            </th>

            <th>
              Category
            </th>

            <th>
              Parent Category
            </th>

            <th>
              Type
            </th>

            <th>
              Action
            </th>

          </tr>

        </thead>


        <tbody>

          {categories.map(
            (category, index) => (

              <tr key={category._id}>

                <td>
                  {index + 1}
                </td>

                <td>
                  {category.name}
                </td>

                <td>

                  {category.parentCategory
                    ? category.parentCategory.name
                    : "—"}

                </td>

                <td>

                  {category.parentCategory
                    ? "Sub Category"
                    : "Main Category"}

                </td>

                <td>

                  <button
                    onClick={() =>
                      deleteCategory(
                        category._id
                      )
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>

  );
}

export default CategoryManagement;