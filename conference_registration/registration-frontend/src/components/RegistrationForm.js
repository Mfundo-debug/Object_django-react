import React from 'react';
import PersonalInfo from './PersonalInfo';
import styles from './RegistrationForm.css';

function RegistrationForm(){
    const handleSubmit = (e) => {
        e.preventDefault();
        //Placeholder: Implement form submission logic here
        //console.log('Form submitted', formData);
    };


    return (
        <div className={styles["registration-form"]}>
          <h1>User Registration</h1>
          <form onSubmit={handleSubmit}>
            <PersonalInfo />
            <button type="submit">Submit</button>
          </form>
        </div>
      );
    }

export default RegistrationForm;