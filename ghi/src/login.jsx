import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useLoginMutation } from "./app/apiSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, isError }] = useLoginMutation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ username, password });

      dispatch({ type: "user/login", payload: data });
      setIsLoggedIn(true);
    } catch (error) {
      console.log("Login failed:", error);
    }
  };

  return (
    <>
      <div className="botom">
        {isLoggedIn ? (
          <Navigate to="/" />
        ) : (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
                className="another-container"
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className="another-container"
              />
            </div>
            {isError && <div>Invalid username or password.</div>}
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default LoginForm;
