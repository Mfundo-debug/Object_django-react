import React from 'react';
import './RegistrationForm.css';

function ConfirmationPage(props) {
  const { user_id } = props; // Destructure the user_id prop

  return (
    <div className='confirmation-page'>
      <h1>Registration Successful</h1>
      <div className='confirmation-message'>
        <p>Thank you for registering for the conference. Your registration is now complete.</p>
        <p>Your user ID is: {user_id}</p> {/* Render the user_id */}
        <p>We look forward to seeing you at the conference.</p>
      </div>
    </div>
  );
}

export default ConfirmationPage;