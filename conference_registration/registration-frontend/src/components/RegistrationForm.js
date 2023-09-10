import React from "react";
import PersonalInfo from "./PersonalInfo";
import "./RegistrationForm.css";

function RegistrationForm(){
  const [formData, setFormData] = React.useState({
    first_name: "",
    last_name: "",
    email_address: "",
    residential_address: "",
    student_identity_number: "",
});

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    //Send a POST request to my Django backend API
    const respose = await fetch("http://localhost:8000/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (Response.ok){
      //Registration successful
      alert("Registration successful");
    } else {
      //Registration failed
      alert("Registration failed. Please try again");
    }
  } catch (error){
    console.error("Registration failed", error);
    //Handle any error that occurs during the request
    alert("An error occurred during registration. Please try again later!");
  }
};
return (
  <div className={"registration-form"}>
    <h1>Registration Form</h1>
    <form onSubmit={handleSubmit}>
      <PersonalInfo formData={formData} setFormData={setFormData} />
      <button type="submit">Submit</button>
    </form>
  </div>
);
}
export default RegistrationForm;