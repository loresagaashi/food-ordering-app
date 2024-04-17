import React, {useEffect, useState} from "react";
import axios from "axios";
import Search from "../common/Search";
import {Link} from "react-router-dom";

const CitiesView = () => {
   const [cities, setCities] = useState([]);
   
   const [search, setSearch] = useState("");

   useEffect(() => {
       loadCities();
   }, []);

   const loadCities = async () => {
      const result = await axios.get("http://localhost:8080/cities", {
         validateStatus: () => {
            return true;
         }
      });
      if(result.status === 302){
          setCities(result.data);
      }
   };

   const handleDelete = async (id) => {
     const confirmed = window.confirm("Are you sure you want to delete this city?");
     if(confirmed){
         try{
             await axios.delete(`http://localhost:8080/cities/delete/${id}`);
             loadCities();
         }catch(error){
             console.error("Error deleting city:", error);
         }
     }
   };
  
   return (
       <section>
         <Search search = {search}
         setSearch = {setSearch}/>
         <table className="table table-bordered table-hover shadow">
           <thead>
             <tr className="text-center">
               <th>ID</th>
               <th>Name</th>
               <th>Address</th>
               <th colSpan="3">Actions</th>
             </tr>
           </thead>

           <tbody className="text-center">
             {cities.filter((c) =>
             c.name.toLowerCase().includes(search))
             .map((city,index) => (
               <tr key = {city.id}>
                 <th scope="row" key={index}>
                     {city.id}
                 </th>
                 <td>{city.name}</td>
                 <td>{city.address}</td>

                 <td className="mx-2">
                   <Link 
                     to = {`/city-profile/${city.id}`}
                     className="btn btn-info">
                     View
                   </Link>
                 </td>

                  <td className="mx-2">
                   <Link 
                     to = {`/edit-city/${city.id}`}
                     className="btn btn-warning">
                     Update
                   </Link>
                  </td>

                  <td className="mx-2">
                    <button className="btn btn-danger"
                    onClick={() => handleDelete(city.id)}>
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

export default CitiesView;