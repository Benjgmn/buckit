import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSignupMutation } from "./app/apiSlice";

const SignupForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signup, { isLoading, isError }] = useSignupMutation();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await signup({ username, password });
      // Dispatch action with signup data
      dispatch({ type: "user/signup", payload: data });
    } catch (error) {
      console.log("Signup failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      {isError && <div>Signup failed. Please try again.</div>}
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
};

export default SignupForm;
