import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/features/auth";
import "./index.css";
import App from "./App.tsx";

const savedTheme =
  typeof window !== "undefined" ? localStorage.getItem("theme") : null;
if (typeof window !== "undefined") {
  const prefersDark = window.matchMedia?.(
    "(prefers-color-scheme: dark)",
  ).matches;
  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
