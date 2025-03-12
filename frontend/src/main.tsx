import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { Provider } from "react-redux";
import AppModal from "./admin/AdminUi/AppModal/AppModal.tsx";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./admin/redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <BrowserRouter
          future={{
            v7_relativeSplatPath: true,
          }}
        >
          <ToastContainer className="text-sm" />
          <App />
          <AppModal />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
