import React, {useState} from "react";

function UserValidationForm({validateUser}){
    const [formData, setFormData] = useState({
        student_identity_number: "",
        first_name: "",
        last_name: "",
});

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8000/api/validate/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const data = await response.json();
                // Pass the user data to the UserValidationForm component  
                alert("Validation successful");
                validateUser(data);
            } else {
                alert("Validation failed. Please try again");
            }
        } catch (error) {
            console.error("Validation failed", error);
            alert("An error occurred during validation. Please try again later!");
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="student_identity_number">Student Identity Number </label>
            <input
                type="text"
                id="student_identity_number"
                name="student_identity_number"
                value={formData.student_identity_number}
                onChange={(e) =>
                    setFormData({ ...formData, student_identity_number: e.target.value })
                }
            />
            <label htmlFor="first_name"> First Name </label>
            <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={(e) =>
                    setFormData({ ...formData, first_name: e.target.value })
                }
            />
            <label htmlFor="last_name"> Last Name </label>
            <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={(e) =>
                    setFormData({ ...formData, last_name: e.target.value })
                }
            />
            <button type="submit"> Validate </button>
        </form>
    );
}
export default UserValidationForm;