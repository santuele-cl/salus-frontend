import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from "./router/Router";
import store from "./app/store";
import { initFlowbite } from "flowbite";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    initFlowbite();
  });

  return (
    <Provider store={store}>
      <ToastContainer autoClose={2500} hideProgressBar={true} closeOnClick />
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
