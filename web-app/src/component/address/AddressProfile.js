import React, {useEffect, useState} from 'react';
import axios from "axios";
import { Link,useNavigate,useParams } from "react-router-dom";

const AddressProfile = () => {

    const{id}=useParams();
    const[address,setAddresses]=useState({
        streetName:"",
        city:"",
        postalCode:"",
        instructions:""
    });

    useEffect(() =>{
        loadAddresses();
    }, []);  

    const loadAddresses = async()=>{
		try {
			const result = await axios.get(`http://localhost:8080/addresses/address/${id}`);
        	setAddresses(result.data);
		} catch (error) {
			if (!error.response) {
				// Network error occurred
				console.error('Network error:', error);
			  } else {
				// The server responded with a status other than 200 range
				console.error('Error response:', error.response);
			  }
		}
        
    };
    
    return (
    <section
			className="shadow"
			style={{ backgroundColor: "whitesmoke" }}>
			<div className="container py-5">
				<div className="row">
					<div className="col-lg-3">
						<div className="card mb-4">
							<div className="card-body text-center">
								<img
									src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
									alt="avatar"
									className="rounded-circle img-fluid"
									style={{ width: 150 }}
								/>
								<h5 className="my-3">
									{`${address.streetName} ${address.city}`}
								</h5>
							</div>
						</div>
					</div>

					<div className="col-lg-9">
						<div className="card mb-4">
							<div className="card-body">
								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											Street Name
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{address.streettName}
										</p>
									</div>
								</div>

								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											City
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{address.city}
										</p>
									</div>
								</div>
								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											Postal Code
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{address.postalCode}
										</p>
									</div>
								</div>
								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											Instructions
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{address.instructions}
										</p>
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


export default AddressProfile