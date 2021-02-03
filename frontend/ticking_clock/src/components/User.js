import { useRef, useState, useEffect } from "react";
import css from "../styles/user.css";
import { Redirect, useHistory } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default (props) => {
  const [token, setToken] = useState("");
  const nameInput = useRef(null);
  const passwordInput = useRef(null);
  const regNameInput = useRef(null);
  const regPasswordInput = useRef(null);

  const history = useHistory();

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
      const response = await fetch(
        "https://tickingclock.herokuapp.com/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body,
        }
      );
      const data = await response.json();
      alert(
        `Welcome ${regNameInput.current.value}! Your account has been created.`
      );
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
      const response = await fetch(
        "https://tickingclock.herokuapp.com/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body,
        }
      );
      const data = await response.json();
      window.localStorage.setItem("token", `Bearer ${data.token}`);
      window.localStorage.setItem("username", `${data.username}`);

      setToken(`Bearer ${data.token}`);
      console.log("heyyyyy");
      history.push("/journal");
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
    <div className="user">
      <h2 className="userIntro">
        <span id="userH1">
          The Ticking Clock
          <iframe
            src="https://giphy.com/embed/YMdhF7u01diFhOx4Zy"
            width="60"
            height="60"
            frameBorder="0"
            class="giphy-embed"
            allowFullScreen
          ></iframe>
          {/* <iframe
            src="https://giphy.com/embed/kaUIoIsHxbUAkiieAv"
            width="60"
            height="60"
            frameBorder="0"
            class="giphy-embed"
          ></iframe> */}
        </span>
        <br />
        <br />
        The Ticking Clock is a space where you can keep track of your busy life
        + personal growth. Helping you to keep track of your goals so you can
        reach your fullest potential
      </h2>

      <br />
      <h4>Please create an account or sign in to continue.</h4>
      <h2 className="userFormh2"> Register Form</h2>
      <form onSubmit={register}>
        <label>
          <input
            type="text"
            ref={regNameInput}
            placeholder="Username"
            className="userFormInput"
          />
        </label>
        <br />
        <label>
          <input
            type="password"
            ref={regPasswordInput}
            placeholder="Password"
            className="userFormInput"
          />
        </label>
        <br />
        <input type="submit" value="Register" className="userBtn" />
      </form>
      <h2 className="userFormh2">Login Form</h2>
      <form onSubmit={login}>
        <label>
          <input
            type="text"
            ref={nameInput}
            placeholder="Username"
            className="userFormInput"
          />
        </label>
        <br />

        <label>
          <input
            type="password"
            ref={passwordInput}
            placeholder="Password"
            className="userFormInput"
          />
        </label>
        <br />

        <input type="submit" value="Login" className="userBtn" />
      </form>
      <br />
      <br />

      <footer>
        Designed + Built by{" "}
        <a
          href="https://www.linkedin.com/in/xilareyna/"
          className="footerLink"
          target="_blank"
        >
          Xila Reyna
        </a>
      </footer>
    </div>
  );
};
