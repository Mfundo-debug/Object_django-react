// GoogleSignInButton.js
import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "./Configure"; // Import the Firebase app
import "./RegistrationForm.css";

const GoogleSignInButton = () => {
  const handleGoogleSignIn = async () => {
    const auth = getAuth(app); // Use the Firebase app
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Successfully signed in with Google', user);

      // Handle the signed-in user here (e.g., save user data to the database)
      // You can make an API call to your Django backend here to save user data

      // Example API call to your Django backend
      const response = await fetch("http://localhost:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
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
      console.error('Error signing in with Google', error);
    }
  };

  return (
    <button className="google-button" onClick={handleGoogleSignIn}>Sign in with Google</button>
  );
};

export default GoogleSignInButton;
