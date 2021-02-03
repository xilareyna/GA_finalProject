import { useRef, useState, useEffect } from "react";
import { Router, Switch, Route, Link } from "react-router-dom";
import css from "../styles/inspo.css";

export default (props) => {
  const [inspo, setInspo] = useState([]);
  const imgInput = useRef(null);
  const titleInput = useRef(null);

  /////////
  //Read
  /////////
  const fetchInspo = async () => {
    try {
      const response = await fetch(
        "https://tickingclock.herokuapp.com/api/inspo"
      );
      const data = await response.json();
      setInspo(data);
    } catch (error) {
      console.log(error);
    }
  };

  /////////
  //Delete
  /////////
  const deleteInspo = async (id) => {
    try {
      const response = await fetch(
        `https://tickingclock.herokuapp.com/api/inspo/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      const filteredInspo = inspo.filter((item) => item._id !== data._id);
      setInspo(filteredInspo);
    } catch (error) {
      console.error(error);
    }
  };

  /////////
  //Create
  /////////

  const createInspo = async (event) => {
    event.preventDefault();
    const img = imgInput.current.value;
    const title = titleInput.current.value;

    const body = JSON.stringify({
      inspo: {
        img,
        title,
      },
      username: window.localStorage.getItem("username"),
    });
    event.currentTarget.reset();

    try {
      const response = await fetch(
        "https://tickingclock.herokuapp.com/api/inspo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        }
      );
      const data = await response.json();
      setInspo([...data.inspo]);
      console.log(event.currentTarget);
      console.log(event.target);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchInspo();
  }, [inspo]);

  return (
    <div>
      <header className="navBar">
        <ul className="ulNavBar">
          <li className="liNavBar">
            <Link to={"/journal"} className="headerLink">
              Journal
            </Link>
          </li>
          <li className="liNavBar">
            <Link to={"/goals"} className="headerLink">
              Goals
            </Link>
          </li>
          <li className="liNavBar">
            <Link to={"/inspo"} className="headerLink">
              Inspo
            </Link>
          </li>
          <li className="liNavBar">
            <Link to={"/recipes"} className="headerLink">
              Recipes
            </Link>
          </li>
          <li className="liNavBar">
            <Link to={"/todolist"} className="headerLink">
              List
            </Link>
          </li>
          <li className="liNavBar">
            <Link to={"/calendar"} className="headerLink">
              Calendar
            </Link>
          </li>
          <li className="liNavBar">
            <Link to={"/"} className="headerLink">
              <i class="fas fa-sign-out-alt"></i>
            </Link>
          </li>
        </ul>
      </header>
      <h1 className="inspoH1">Inspo Board</h1>

      <form onSubmit={createInspo} className="inspoForm">
        <input
          type="text"
          ref={imgInput}
          placeholder="Image Link"
          className="inspoForms"
        />
        <br />
        <input
          type="text"
          ref={titleInput}
          placeholder="Title"
          className="inspoForms"
        />
        <br />
        <input type="submit" value="Add to Inspo" className="inspoAddBtn" />
      </form>

      <ul className="inspoUlPost">
        {inspo.map((item) => {
          return (
            <li key={item._id} className="inspo">
              <h3>{item.title}</h3>
              <br />
              <img src={item.img} className="inspoImg" />
              <br />
              <button
                onClick={(event) => {
                  deleteInspo(item._id);
                }}
                id="inspoDeleteBtn"
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
