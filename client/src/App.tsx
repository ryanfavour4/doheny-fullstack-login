import { BrowserRouter } from "react-router-dom";
import Routers from "./routes/Router";
import "./styles/pages/index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routers />
    </BrowserRouter>
  );
}

export default App;
