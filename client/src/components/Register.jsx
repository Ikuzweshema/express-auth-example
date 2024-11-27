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
    email: undefined,
    username: undefined,
    password: undefined,
    cpassword: undefined,
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

    const validation = validate(email, username, password, cpassword);
    if (!validation.success) {
      setError(validation.errors.fieldErrors);

      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_SEVER_URL}/api/auth/register`,
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
        }
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
    <div className="dark w-full text-foreground bg-background h-screen">
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
