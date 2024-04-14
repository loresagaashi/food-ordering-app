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

	const loadAddresses = async () => {
		const result = await axios.get(
			`http://localhost:8080/addresses/address/${id}`
		 );
		 setAddresses(result.data);        
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
											{address.streetName}
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