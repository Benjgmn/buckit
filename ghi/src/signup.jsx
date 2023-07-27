import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSignupMutation } from "./app/apiSlice";
import { Navigate } from "react-router-dom";

const SignupForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signup, { isLoading, isError }] = useSignupMutation();
  const [isSignedUp, setIsSignedUp] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.trim() === "" || password.trim() === "") {

      return console.log("Invalid Signup form");
    }

    try {
      const { data } = await signup({ username, password });

      dispatch({ type: "user/signup", payload: data });
      setIsSignedUp(true);
    } catch (error) {
      console.log("Signup failed:", error);
    }
  };

  if (isSignedUp) {
    return <Navigate to="/" />
  }

  return (
    <div class="botom">
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
        {isError && <div>Signup failed. Please try again.</div>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
