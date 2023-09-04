import React, {useState} from 'react';
import './RegistrationForm.css'

function PersonalInfo(){
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        studentNumber: '',
});

const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
};

return (
    <div>
        <h1>Personal Information</h1>
        <form>
            <input type='text'
            name='firstName'
            placeholder='First Name'
            value={formData.firstName}
            onChange={handleChange}
            />
            {/* Add similar inputs field for last name, email, address and student number */}
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} /> 
            <input type="text" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
            <input type="text" name="studentNumber" placeholder="Student Number" value={formData.studentNumber} onChange={handleChange} />

        </form>
    </div>
);
}

export default PersonalInfo;