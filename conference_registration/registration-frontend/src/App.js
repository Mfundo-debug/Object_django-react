import React from "react";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import RegistrationForm from "./components/RegistrationForm";

function App() {
  return (
    <div className="App">
      <BrowserRouter> {/* Wrap your entire application with BrowserRouter */}
        <RegistrationForm />
      </BrowserRouter>
    </div>
  );
}

export default App;
