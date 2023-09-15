// GoogleSignInButton.js
import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "./Configure"; // Import the Firebase app
import "./RegistrationForm.css";
import ConfirmationPage from "./ConfirmationPage";

const GoogleSignInButton = () => {
  const value = localStorage.getItem("user_id");
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log("Successfully signed in with Google", user);

      // Handle the token, if needed
      console.log("Access token:", token);

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
      console.error("Error signing in with Google", error);
      alert("An error occurred during sign-in. Please try again later!");
    }
  };

  return (
    <div className="google-button">
      {value ? <ConfirmationPage /> : <button onClick={handleGoogleSignIn}>Sign in with Google</button>}
    </div>
  );
};

export default GoogleSignInButton;
