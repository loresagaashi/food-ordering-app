import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [category, setCategory] = useState({
        name: "",
    });

    const { name } = category;

    useEffect(() => {
        loadCategory();
    }, []);

    const loadCategory = async () => {
        try {
            const result = await axios.get(
                `http://localhost:8080/categories/${id}`
            );
            setCategory(result.data);
        } catch (error) {
            console.error("Error loading category:", error);
        }
    };

    const handleInputChange = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
    };

    const updateCategory = async (e) => {
        try {
            e.preventDefault();
            await axios.put(
                `http://localhost:8080/categories/update/${id}`,
                category
            );
            navigate("/view-categories");
        } catch (error) {
            console.error("Error updating category:", error);
        }
    };

    return (
        <div className="col-sm-8 py-2 px-5 offset-2 shadow">
            <h2 className="mt-5 mb-3">Edit Category</h2>
            <form onSubmit={(e) => updateCategory(e)}>
                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="form-control col-sm-6"
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={name}
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>
                <div className="row mb-5">
                    <div className="col-sm-2">
                        <button
                            type="submit"
                            className="btn btn-outline-success btn-lg"
                        >
                            Save
                        </button>
                    </div>
                    <div className="col-sm-2">
                        <button
                            type="button"
                            className="btn btn-outline-warning btn-lg"
                            onClick={() => navigate("/view-categories")}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditCategory;
