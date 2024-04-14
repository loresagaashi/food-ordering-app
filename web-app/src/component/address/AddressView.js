import React, {useEffect, useState} from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import Search from '../common/Search';

const AddressView = () => {

    const[addresses, setAddresses]=useState([]); 
    const[search, setSearch] = useState("");

    useEffect(() =>{
        loadAddresses();
    }, []);  

    const loadAddresses = async()=>{
        const result = await axios.get("http://localhost:8080/addresses", {
            validateStatus: () =>{
                return true;
            }
        });
        if(result.status== 302){
            
            setAddresses(result.data);
        } 
    };

    const handleDelete = async(id)=>{
        try {
            await axios.delete(`http://localhost:8080/addresses/delete/${id}`);
            loadAddresses();
        } catch (error) {
            if (!error.response) {
                console.error('Network error:', error);
              } else {
                console.error('Error response:', error.response);
              }
        }
        
    };

  return (
    <section>
        <Search search={search}
        setSearch={setSearch}/>
        <table className='table table-bordered table-hover shadow'>
            <thead>
                <tr className='text-center'>
                   <th>ID </th>  
                   <th>Street Name</th>
                   <th>City</th>
                   <th>Postal Code</th>
                   <th>Instructions</th> 
                   <th colSpan="3">Actions</th> 
                </tr>
            </thead>
            <tbody className='text-center'>
                {addresses.filter((adr) => 
                adr.streetName
                .toLowerCase()
                .includea(search))
                .map((address,index)=>(
                    <tr key={address.id }>
                    <th scope='row' key={index}>
                        {index+1}
                    </th>
                    <td>{address.streetName}</td>
                    <td>{address.city}</td>
                    <td>{address.postalcode}</td>
                    <td>{address.instructions}</td> 
                    <td className='mx-2'>
                    <Link 
                        to={`/address-profile/${address.id}`} className='btn btn-warning'>
                        View
                    </Link>
                        </td>
                    <td className='mx-2'>
                    <Link 
                        to={`/edit-address/${address.id}`} className='btn btn-warning'>
                        Update
                    </Link>
                        </td>

                    <td className='mx-2'>
                    <button className='btn btn-danger'
                            onClick={()=>handleDelete(address.id)} >
                            Delete
                        </button>
                        </td>
                </tr>
                ))}  
            </tbody>
        </table>

    </section>
  )
}

export default AddressView