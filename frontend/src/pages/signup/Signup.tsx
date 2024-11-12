import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {   resetStatus, registerUser} from "../../store/userSlice"; 
import { RootState } from "../../store/store"; 
import { Link } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state: RootState) => state.user); 
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(resetStatus());
  }, [dispatch]);

  // פונקציה של התחברות
  const SignupFunc = () => {
    if (username && password) {
        //@ts-ignore
      dispatch(registerUser({ username, password }));
    }
  };

  return (
    <div className="signup-container">
      <h1>Signup Page</h1>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button onClick={SignupFunc} disabled={status === "loading"}>
        {status === "loading" ? "Loading..." : "Signup"}
      </button>

      {status === "failed" && <p style={{ color: "red" }}>{error}</p>}

      {status === "succeeded" && <p style={{ color: "green" }}>Signup successful</p>}

      <div>
        <Link  to="/" className="link-container">Back to Login</Link>
      </div>
    </div>
  );
};

export default Signup;
