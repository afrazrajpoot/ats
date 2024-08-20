import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from "./context/useGlobal.jsx";
import { AuthProvider } from "./providers/AuthProvider.jsx";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <GlobalProvider>
            <App />
          </GlobalProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </>
);
