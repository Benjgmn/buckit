import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useGetAccountQuery, useLogoutMutation } from "../../app/apiSlice";
import "./Nav.css";

const Nav = () => {
  const { data: account } = useGetAccountQuery();
  const [logout] = useLogoutMutation();
  const location = useLocation();
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 20;
      setIsNavbarVisible(scrollY < threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
    <div
      className={`navbar navbar-expand-lg navbar-dark bg-dark ${
        isNavbarVisible ? "" : "hidden"
      }`}
    >
      <div className="container-fluid">
        <div className="navbar-brand-container">
          <NavLink to={"/"} className="navbar-brand">
            <img src="/logo.png" alt="Brand Logo" className="brand-logo" />
          </NavLink>
        </div>
        <div className="nav-links-container">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  to={"/"}
                  className="nav-link"
                  onClick={handleHomeLinkClick}
                >
                  Home
                </NavLink>
              </li>
              {account && (
                <li className="nav-item">
                  <NavLink to={"/buckets"} className="nav-link">
                    Buckets
                  </NavLink>
                </li>
              )}
              {!account && (
                <li className="nav-item">
                  <NavLink to={"/login"} className="nav-link">
                    Login
                  </NavLink>
                </li>
              )}
              {!account && (
                <li className="nav-item">
                  <NavLink to={"/signup"} className="nav-link">
                    Sign Up
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
          <div className="buttons-container">
            <ul className="navbar-nav">
              {account && (
                <li className="nav-item">
                  <button
                    className="btn btn-outline-danger logout-button"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
