// RegistrationForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OIP from "./OIP.jpeg";
import PersonalInfo from "./PersonalInfo";
import "./RegistrationForm.css";

function RegistrationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email_address: "",
    residential_address: "",
    student_identity_number: "",
    dob: "",
    gender: "",
    country: "",
    age: "",
    nationality: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to my Django backend API
      const response = await fetch("http://localhost:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Registration successful
        const data = await response.json();
        navigate(`/confirmation?user_id=${data.user_id}`);
        alert("Registration successful");
        // Clear the form or reset it as needed
        setFormData({
          first_name: "",
          last_name: "",
          email_address: "",
          residential_address: "",
          student_identity_number: "",
          dob: "",
          gender: "",
          country: "",
          age: "",
          nationality: "",
        });
        // Handle the response data if needed
        console.log("Response Data:", data);
      } else {
        // Registration failed
        alert("Registration failed. Please try again");
      }
    } catch (error) {
      console.error("Registration failed", error);
      // Handle any error that occurs during the request
      alert("An error occurred during registration. Please try again later!");
    }
  };

  return (
    <div className={"registration-form"}>
      <h1>Registration Form</h1>
      <img src={OIP} alt="Logo" className="logo" />
      <form onSubmit={handleSubmit}>
        {/* Include PersonalInfo component here */}
        <PersonalInfo formData={formData} setFormData={setFormData} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default RegistrationForm;
