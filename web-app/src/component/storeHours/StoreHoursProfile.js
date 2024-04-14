import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const StoreHoursProfile = () => {
    const { id } = useParams();
    const [storeHours, setStoreHours] = useState({
        id: '',
        dayOfWeek: '',
        startTime: '',
        endTime: ''
    });

    useEffect(() => {
        loadStoreHours();
    }, []);

    const loadStoreHours = async () => {
        try {
            const result = await axios.get(`http://localhost:8080/storeHours/storeHour/${id}`);
            setStoreHours(result.data);
        } catch (error) {
            console.error("Error loading store hour:", error);
        }
    };

    return (
        <section className="shadow" style={{ backgroundColor: "whitesmoke" }}>
            <div className="container py-5">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">Store Hours Details</h5>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h5 className="mb-0">ID</h5>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{storeHours.id}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h5 className="mb-0">Day of Week</h5>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{storeHours.dayOfWeek}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h5 className="mb-0">Start Time</h5>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{storeHours.startTime}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h5 className="mb-0">End Time</h5>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{storeHours.endTime}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StoreHoursProfile;
