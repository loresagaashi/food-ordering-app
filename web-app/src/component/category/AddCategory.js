import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddCategory = () => {
    let navigate = useNavigate();
    const [category, setCategory] = useState({
        name: ''
    });

    const { name } = category;

    const handleInputChange = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
    };

    const saveCategory = async (e) => {
        try {
            e.preventDefault();
            await axios.post("http://localhost:8080/categories", category);
            navigate("/view-categories");
        } catch (error) {
            console.error("Error saving category:", error);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div className="col-sm-6 shadow p-5" style={{ marginTop: 0 }}>
                <h2 className="mb-4">Add Category</h2>
                <form onSubmit={(e) => saveCategory(e)}>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            name="name"
                            id="name"
                            required
                            value={name}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button
                            type="submit"
                            className="btn btn-outline-success me-2">
                            Save
                        </button>
                        <Link
                            to={"/view-categories"}
                            type="submit"
                            className="btn btn-outline-warning">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCategory;
