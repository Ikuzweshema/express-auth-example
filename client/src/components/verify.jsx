import { useLocation } from "react-router-dom";
import VerifyForm from "./verify-form.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Verify() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  const [isLoading, setIsLoading] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  if (!id) {
    navigate("/");
  }
  function handleChange(e) {
    setCode(e.target.value);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsLoading(true)
      const res = await axios.post(
        `https://express-auth-example.onrender.com/api/auth/verify/`,
        {
          id: id,
          code: code,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (res.status === 200) {
        return window.location.replace("/dashboard");
      }
    } catch (e) {
      setError(e.response.data.message);
    }
    finally {
      setIsLoading(false)
    }
  }

  //handling sending new code
  const handleSendNewCode = async () => {
    setTimeLeft(120);
    setIsDisabled(true);
    setIsRequesting(true)
    try {
      const res = await axios.post(
        "https://express-auth-example.onrender.com/api/auth/resend",
        {
          id: id,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (res.status === 200) {
        const message = await res.data.message;
        return setMessage(message);
      }
    } catch (e) {
      setError(e.response.data.message);
    }
    finally {
      setIsRequesting(false)
    }
  };
  useEffect(() => {
    if (timeLeft > 0 && isDisabled) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsDisabled(false);
    }
  }, [timeLeft, isDisabled]);
  return (
    <div className="dark text-foreground bg-background h-[100vh]">
      <VerifyForm
        code={code}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        error={error}
        handleSendNewCode={handleSendNewCode}
        resendMessage={message}
        timeLeft={timeLeft}
        isDisabled={isDisabled}
       isLoading={isLoading}
      />
    </div>
  );
}
