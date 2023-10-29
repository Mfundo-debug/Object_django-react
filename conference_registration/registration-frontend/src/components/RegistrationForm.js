// RegistrationForm.js
import React, { useState, useEffect, useCallback } from "react";
import OIP from "./OIP.jpeg";
import PersonalInfo from "./PersonalInfo";
import "./RegistrationForm.css";
import UserValidationForm from "./UserValidationForm";
import GoogleSignInButton from "./GoogleSignInButton";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email_address: "",
    residential_address: "",
    student_identity_number: "",
    dob: "",
    age: "",
    gender: "",
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

  // Function to calculate student information based on student_identity_number
  const calculateStudentInfo = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:8000/api/calculate_student_info/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ student_identity_number: formData.student_identity_number }),
      });
      if (response.ok) {
        const data = await response.json();
        setFormData({
          ...formData,
          dob: data.dob,
          age: data.age,
          gender: data.gender,
        });
      }
    } catch (error) {
      console.error("Error calculating student info", error);
    }
  }, [formData]);
  
  useEffect(() => {
    if (formData.student_identity_number) {
      calculateStudentInfo();
    }
  }, [formData.student_identity_number, calculateStudentInfo]);

  // useEffect to call calculateStudentInfo when student_identity_number changes
  useEffect(() => {
    if (formData.student_identity_number) {
      calculateStudentInfo();
    }
    // eslint-disable-next-line
  }, [formData.student_identity_number, calculateStudentInfo]);

  return (
    <div>
      <div className={"registration-form"}>
        <h1>Registration Form</h1>
        <img src={OIP} alt="Logo" className="logo" />
        <form onSubmit={handleSubmit}>
          <PersonalInfo formData={formData} setFormData={setFormData} />
          <button type="submit">Submit</button>
        </form>
        <GoogleSignInButton />
      </div>
      <div className={"validation-container"}>
        <div className={"validation-form"}>
          {/* UserValidationForm component is rendered conditionally based on whether the user is logged in or not */}
          <UserValidationForm formData={formData} setFormData={setFormData} />
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;
