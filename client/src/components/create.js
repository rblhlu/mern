import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Create() {
 const [form, setForm] = useState({
   name: "",
   dob: "",
   gender: "",
   salary: "",
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newEmployee = { ...form };
 
   await fetch("http://localhost:5000/record/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newEmployee),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ name: "", dob: "", gender: "", salary: "" });
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New Employee Record</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Name</label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="dob">DOB</label>
         <input
           type="date"
           className="form-control"
           id="dob"
           value={form.dob}
           onChange={(e) => updateForm({ dob: e.target.value })}
         />
       </div>
       <div className="form-group">
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="genderOptions"
             id="genderMale"
             value="Male"
             checked={form.gender === "Male"}
             onChange={(e) => updateForm({ gender: e.target.value })}
           />
           <label htmlFor="genderMale" className="form-check-label">Male</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="genderOptions"
             id="genderFemale"
             value="Female"
             checked={form.gender === "Female"}
             onChange={(e) => updateForm({ gender: e.target.value })}
           />
           <label htmlFor="genderFemale" className="form-check-label">Female</label>
         </div>
         <div className="form-group">
         <label htmlFor="salary">Salary</label>
         <input
           type="text"
           className="form-control"
           id="salary"
           value={form.salary}
           onChange={(e) => updateForm({ salary: e.target.value })}
         />
       </div>
       </div>
       <div className="form-group">
         <input
           type="submit"
           value="Create New Employee"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}