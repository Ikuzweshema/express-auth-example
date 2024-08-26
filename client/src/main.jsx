import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SessionProvider } from "./context/session";
import { NextUIProvider } from "@nextui-org/react";
import ErrorBoundary from "./components/error-boundary";
import Error from "./components/error";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <NextUIProvider>
        <SessionProvider>
          <ErrorBoundary fallback={<Error/>} >
            <App />
          </ErrorBoundary>
        </SessionProvider>
      </NextUIProvider>
    </BrowserRouter>
  </StrictMode>,
);
