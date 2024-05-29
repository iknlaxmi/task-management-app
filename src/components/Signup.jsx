import React, { useState } from "react";
import axios from "axios";
import Login from "./Login";
import { Navigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSignup = () => {
    const url = "http://localhost:3000/api/auth/signup";
    const data = {
      username: username,
      password: password,
    };
    axios
      .post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        setShowLogin(true);
      })
      .catch((error) => {
        console.error("POST ERROR", error);
        setShowLogin(false);
      });
  };
  return (
    <>
      {showLogin && <Login />}
      {!showLogin && (
        <div className="flex items-center justify-center h-screen flex-col">
          <div className="">
            <label className="m-8">Username</label>
            <input
              className="border-2 w-64 h-10 rounded p-2 justify-center m-4"
              name="username"
              onChange={handleUsername}
            />
          </div>
          <div>
            <label className="m-8">Password</label>
            <input
              className="border-2 w-64 h-10 rounded p-2 justify-center m-4"
              name="password"
              onChange={handlePassword}
            />
          </div>
          <div>
            <button
              className="w-64 h-10 rounded bg-blue-600 text-white m-4 ml-36"
              onClick={handleSignup}
            >
              Signup
            </button>
            <div className="m-4 sm:ml-24 ml-16">
              Already a user?{" "}
              <a className="text-blue-600" href="/login">
                Login
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
