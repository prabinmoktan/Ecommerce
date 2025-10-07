import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import { persistor, store } from "./admin/redux/store";
import AppModal from "./admin/AdminUi/AppModal/AppModal";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
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
  // </StrictMode>
);
