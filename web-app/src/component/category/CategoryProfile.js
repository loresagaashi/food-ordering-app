import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CategoryProfile = () => {
    const { id } = useParams();
    const [category, setCategory] = useState({
        name: ''
    });

    useEffect(() => {
        loadCategory();
    }, []);

    const loadCategory = async () => {
        try {
            const result = await axios.get(`http://localhost:8080/categories/category/${id}`);
            setCategory(result.data);
        } catch (error) {
            console.error("Error loading category:", error);
        }
    };

    return (
        <section className="shadow" style={{ backgroundColor: "whitesmoke" }}>
            <div className="container py-5">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">Category Details</h5>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h5 className="mb-0">Name</h5>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{category.name}</p>
                                    </div>
                                </div>
                                {/* Add more details if needed */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CategoryProfile;
