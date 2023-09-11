import React from 'react';
import './RegistrationForm.css';

function ConfirmationPage(props){
    //Extract the user_id from the query parameter
    const user_id = new URLSearchParams(props.location.search).get("user_id");

    return (
        <div className='confirmation-page'>
            <h1>Registration Successful</h1>
            <div className='confirmation-message'>
                <p>Thank you for registering for the conference. Your registration is now complete.</p>
                <p>Your registration ID is: {user_id}</p>
                <p>We look forward to seeing you at the conference.</p>
            </div>
        </div>
    );
}

export default ConfirmationPage;