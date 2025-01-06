import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import AppModal from "./ui/AppModal/AppModal.tsx";
import { ToastContainer } from "react-toastify";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter future={{
    v7_relativeSplatPath: true,
  }} >
    <ToastContainer className="text-sm"/>
        <App />
        <AppModal/>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
