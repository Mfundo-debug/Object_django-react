import React from 'react';
import validator from 'validator';
import './RegistrationForm.css';

function PersonalInfo({ formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the input is an email address before updating the state
    if (name === 'email_address') {
      if (!validator.isEmail(value)) {
        // Handle the invalid address
        alert('Please enter a valid email address');
      } else {
        // Update the state
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    } else if (name === 'student_identity_number' && !validator.isNumeric(value)) {
      // Alert the user if the student number is invalid
      alert('Please enter a valid student number');
      return;
    } else if (['dob', 'gender', 'country'].includes(name)) {
      // Update the state for new fields: dob, gender, and country
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <div>
      <h1>Personal Information</h1>
      <form>
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
        />
        {/* Add similar input fields for last name, email, address, and student number */}
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="email_address"
          placeholder="Email Address"
          value={formData.email_address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="residential_address"
          placeholder=" Residential Address"
          value={formData.residential_address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="student_identity_number"
          placeholder="Student Number"
          value={formData.student_identity_number}
          onChange={handleChange}
        />
        {/* New input fields for dob, gender, and country */}
        <input type='text' name ='nationality'placeholder='Nationality' value={formData.nationality} onChange={handleChange} />
        <input
          type="date"
          name="dob"
          placeholder="Date of Birth"
          value={formData.dob}
          onChange={handleChange}
        />
        <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
        </select>
        <select name="country" value={formData.country} onChange={handleChange}>
  <option value="Select a Country">Select a Country</option>
  <option value="USA">USA</option>
  <option value="Canada">Canada</option>
  <option value="UK">UK</option>
  <option value="Australia">Australia</option>
  <option value="Germany">Germany</option>
  <option value="France">France</option>
  <option value="Japan">Japan</option>
  <option value="Brazil">Brazil</option>
  <option value="India">India</option>
  <option value="Mexico">Mexico</option>
  <option value ="Nigeria">Nigeria</option>
    <option value ="Ghana">Ghana</option>
    <option value="Kenya">Kenya</option>
    <option value="Botswana">Botswana</option>
    <option value="Congo">Congo</option>
    <option value="Egypt">Egypt</option>
    <option value="Ethiopia">Ethiopia</option>
    <option value="Morocco">Morocco</option>
    <option value="Zimbabwe">Zimbabwe</option>
  <option value="Other">Other</option> 
</select>

        {/* Radio buttons for student status */}
        <div>
          <label>
            <input
              type="radio"
              name="student_status"
              value="New Student"
              checked={formData.student_status === 'New Student'}
              onChange={handleChange}
            />
            New Student
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="student_status"
              value="Returning Student"
              checked={formData.student_status === 'Returning Student'}
              onChange={handleChange}
            />
            Returning Student
          </label>
        </div>
      </form>
    </div>
  );
}

export default PersonalInfo;
