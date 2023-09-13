// RegistrationForm.js
import React, { useState } from "react";
import OIP from "./OIP.jpeg";
import PersonalInfo from "./PersonalInfo";
import "./RegistrationForm.css";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email_address: "",
    residential_address: "",
    student_identity_number: "",
    dob: "",
    age: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedDate = formData.dob.replaceAll("/", "-");
    setFormData({
      ...formData,
      dob: formattedDate,
    });

    try {
      const response = await fetch("http://localhost:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        alert("Registration successful");

        // Use the `history` object to programmatically navigate to the confirmation page
        window.location.href = `/confirmation?user_id=${data.user_id}`;
      } else {
        alert("Registration failed. Please try again");
      }
    } catch (error) {
      console.error("Registration failed", error);
      alert("An error occurred during registration. Please try again later!");
    }
  };

  return (
    <div className={"registration-form"}>
      <h1>Registration Form</h1>
      <img src={OIP} alt="Logo" className="logo" />
      <form onSubmit={handleSubmit}>
        <PersonalInfo formData={formData} setFormData={setFormData} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default RegistrationForm;
