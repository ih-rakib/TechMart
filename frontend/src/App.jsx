import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./pages/Auth/Navigation";

function App() {
  return (
    <>
      <ToastContainer />
      <Navigation />
      <main className="w-full min-w-0 overflow-x-hidden px-0 py-3 pb-24 md:pl-16 md:pb-3">
        <Outlet />
      </main>
    </>
  );
}

export default App;
