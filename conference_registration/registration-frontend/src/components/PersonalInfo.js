import React from 'react';
import validator from 'validator';
import './RegistrationForm.css'

function PersonalInfo({formData, setFormData}){
    const handleChange = (e) => {
        const {name, value} = e.target;
        //check if the input is an email address before updating the state
        if (name === 'email_address') {
            if (!validator.isEmail(value)){
                //handle the invalid address
                alert('Please enter a valid email address');
            } else {
                //update the state
                setFormData({
                    ...formData,
                    [name]: value,
                });
            } 
        }
        else if (name === 'student_identity_number' && !validator.isNumeric(value)){
            //alert the user if the student number is invalid
            alert('Please enter a valid student number');
            return;
        }
        else {
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
            <input type='text'
            name='first_name'
            placeholder='First Name'
            value={formData.first_name}
            onChange={handleChange}
            />
            {/* Add similar inputs field for last name, email, address and student number */}
            <input type="text" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} /> 
            <input type="text" name="email_address" placeholder="Email Address" value={formData.email_address} onChange={handleChange} />
            <input type="text" name="residential_address" placeholder=" Residential Address" value={formData.residential_address} onChange={handleChange} />
            <input type="text" name="student_identity_number" placeholder="Student Number" value={formData.student_identity_number} onChange={handleChange} />
        {/* Radio buttons for student status */}
        <div> <label>
            <input type='radio' name = 'student_status' value= 'New Student' checked={formData.student_status === 'New Student'} onChange={handleChange} />
            New Student
        </label>
        </div>
        <div> <label>
            <input type='radio' name = 'student_status' value= 'Returning Student' checked={formData.student_status === 'Returning Student'} onChange={handleChange} />
            Returning Student
        </label>
        </div>
        </form>
    </div>
);
}

export default PersonalInfo;