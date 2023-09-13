// RegistrationForm.js
import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link
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

const [registrationSuccessful, setRegistrationSuccessful] = useState(false);// track registration status

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Format the data as "YYYY-MM-DD" for the API
    const formattedDate = formData.dob.replaceAll("/", "-");
    // Add the formatted date to the form data
    setFormData({
      ...formData,
      dob: formattedDate,
    });

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
        setRegistrationSuccessful(true);// set registration status to true
        const data = await response.json();
        // Redirect to the confirmation page using Link
        // Use the `to` prop to specify the target URL
        return <Link to={`/confirmation?user_id=${data.user_id}`} />;
      } else {
        // Registration failed
        // Handle error message
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
      {registrationSuccessful && (
        <div className="success-message">
        Registration successful!{" "}
        <Link to="/confirmation">Goto confirmation page</Link>
        </div>
        )}
    </div>
  );
}

export default RegistrationForm;
