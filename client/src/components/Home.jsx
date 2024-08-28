import { useState, useActionState } from "react";
import axios from "axios";
import LoginForm from "./login-form.jsx";
import { useNavigate } from "react-router-dom";
import {useSession} from "../hooks/use-session.jsx";

export default function Home() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const {redirect}=useSession()
  const handleChange = (event) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      };
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post(
        "https://express-auth-example.onrender.com/api/auth/login",

        {
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (res.status === 200) {
        return window.location.replace("/dashboard")
      }
      if (res.status === 401) {
        setError("Invalid credentials ");
      } else {
        setError("Something Went Wrong !");
      }
    } catch (e) {
      setError("Invalid credentials ");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="dark text-foreground bg-background h-[100vh]">
      <LoginForm
        formData={formData}
        error={error}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        isLoading={isLoading}
      />
    </div>
  );
}
