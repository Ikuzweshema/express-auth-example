import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { validate } from "../lib/actions.js";
import RegisterForm from "./register-form.jsx";

export default function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    cpassword: "",
  });

  const [error, setError] = useState({
    email: "",
    username: "",
    password: "",
    cpassword: "",
  });

  const handleChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, email, password, cpassword } = formData;

    const validationErrors = validate(email, username, password, cpassword);
    setError(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post(
        "https://express-auth-example.onrender.com/api/auth/register",
        {
          username: username,
          email: email,
          password: password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (res.status === 201) {
        const user = await res.data;
        const user_id = user._id;
        return navigate("/verify", { state: { id: user_id } });
      }
    } catch (e) {
      setError({
        email: e.response.data.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dark text-foreground bg-background h-[110vh]">
      <RegisterForm
        error={error}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formData={formData}
        isLoading={isLoading}
      />
    </div>
  );
}
