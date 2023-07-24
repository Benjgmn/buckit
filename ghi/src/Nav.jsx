import { Link, NavLink, useLocation } from "react-router-dom";
import { useGetAccountQuery, useLogoutMutation } from "./app/apiSlice";

const Nav = () => {
    const { data: account, } = useGetAccountQuery();
    const [logout] = useLogoutMutation();
    const location = useLocation();

    const handleHomeLinkClick = (e) => {
        if (location.pathname === "/") {
          window.location.reload();
        }
      };

    const handleLogout = async () => {
      try {
        await logout();
        window.location.reload();
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to={"/"} className="navbar-brand">
            Films
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  to={"/"}
                  className={"nav-link"}
                  onClick={handleHomeLinkClick}
                >
                  Home
                </NavLink>
              </li>
              {account && (
                <li className="nav-item">
                  <NavLink to={"/buckets"} className={"nav-link"}>
                    Buckets
                  </NavLink>
                </li>
              )}
              {!account && (
                <li className="nav-item">
                  <NavLink to={"/login"} className={"nav-link"}>
                    Login
                  </NavLink>
                </li>
              )}
              {!account && (
                <li className="nav-item">
                  <NavLink to={"/signup"} className={"nav-link"}>
                    Sign Up
                  </NavLink>
                </li>
              )}
              <li className="nav-item">
                <NavLink to={"/search"} className={"nav-link"}>
                  Search
                </NavLink>
              </li>
            </ul>
            {account && (
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    );
}

export default Nav;
