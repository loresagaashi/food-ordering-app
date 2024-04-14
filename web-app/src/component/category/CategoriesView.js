import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Search from "../common/Search";

const CategoriesView = () => {
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
      
        const result = await axios.get("http://localhost:8080/categories", {
            validateStatus: () => {
              return true;
            }
          }
          );
          if (result.status === 302) {
            setCategories(result.data);
          }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/categories/delete/${id}`);
            loadCategories();
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    return (
        <section>
            <Search search={search} setSearch={setSearch} />
            <table className="table table-bordered table-hover shadow">
                <thead>
                    <tr className="text-center">
                        <th>ID</th>
                        <th>Name</th>
                        <th colSpan="3">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {categories
                        .filter((cat) =>
                            cat.name.toLowerCase().includes(search)
                        )
                        .map((category, index) => (
                            <tr key={category.id}>
                                <th scope="row">{category.id}</th>
                                <td>{category.name}</td>
                                <td className="mx-2">
                                    <Link
                                        to={`/category-profile/${category.id}`}
                                        className="btn btn-info"
                                    >
                                        View
                                    </Link>
                                </td>
                                <td className="mx-2">
                                    <Link
                                        to={`/edit-category/${category.id}`}
                                        className="btn btn-warning"
                                    >
                                        Update
                                    </Link>
                                </td>
                                <td className="mx-2">
                                    <button
                                        className="btn btn-danger"
                                        onClick={() =>
                                            handleDelete(category.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </section>
    );
};

export default CategoriesView;
