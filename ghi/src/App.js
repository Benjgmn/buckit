import { Outlet } from "react-router-dom";
import Nav from "./Components/Accounts/Nav";
import "./base.css";

const App = () => (
  <div className="container">
    <Nav />
    <div className="mt-5">
      <Outlet />
    </div>
  </div>
);

export default App;
