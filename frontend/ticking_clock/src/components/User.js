import { useRef, useState, useEffect } from "react";
import css from "../styles/user.css";
import { Redirect } from "react-router";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default (props) => {
  const [token, setToken] = useState("");
  const nameInput = useRef(null);
  const passwordInput = useRef(null);
  const regNameInput = useRef(null);
  const regPasswordInput = useRef(null);

  /////////
  //Register
  /////////
  const register = async (event) => {
    event.preventDefault();
    const body = JSON.stringify({
      username: regNameInput.current.value,
      password: regPasswordInput.current.value,
    });
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body,
      });
      const data = await response.json();
    } catch (error) {
      console.error(error);
    }
  };
  /////////
  //Login
  /////////
  const login = async (event) => {
    event.preventDefault();
    const body = JSON.stringify({
      username: nameInput.current.value,
      password: passwordInput.current.value,
    });
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body,
      });
      const data = await response.json();
      window.localStorage.setItem("token", `Bearer ${data.token}`);
      setToken(`Bearer ${data.token}`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      setToken(window.localStorage.getItem("token"));
    }
  }, [token]);

  return (
    <div>
      <h1> Register Form</h1>
      <form onSubmit={register}>
        <label>
          <input type="text" ref={regNameInput} placeholder="Username" />
        </label>
        <br />
        <label>
          <input
            type="password"
            ref={regPasswordInput}
            placeholder="Password"
          />
        </label>
        <br />
        <input type="submit"></input>
      </form>
      <h1>Login Form</h1>
      <form onSubmit={login}>
        <label>
          <input type="text" ref={nameInput} placeholder="Username" />
        </label>
        <br />

        <label>
          <input type="password" ref={passwordInput} placeholder="Password" />
        </label>
        <br />

        <input type="submit"></input>
      </form>
    </div>
  );
};
