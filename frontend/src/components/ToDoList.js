import { useRef, useEffect, useState } from "react";
import { Router, Switch, Route, Link } from "react-router-dom";
import css from "../styles/list.css";

// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import css from "../styles/calendar.css";

export default (props) => {
  const [list, setList] = useState([]);
  const listInput = useRef(null);
  // const [value, onChange] = useState(new Date());

  /////////
  //Read
  /////////
  const fetchList = async () => {
    try {
      const response = await fetch(
        `https://tickingclock.herokuapp.com/api/todolist/v1/${localStorage.getItem(
          "username"
        )}`
      );
      const data = await response.json();
      setList(data);
    } catch (error) {
      console.log(error);
    }
  };

  /////////
  //Delete
  /////////
  const deleteList = async (id) => {
    try {
      const response = await fetch(
        `https://tickingclock.herokuapp.com/api/todolist/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      const filteredList = list.filter((item) => item._id !== data._id);
      setList(filteredList);
    } catch (error) {
      console.error(error);
    }
  };

  /////////
  //Create
  /////////

  const createList = async (event) => {
    event.preventDefault();
    const list = listInput.current.value;

    const body = JSON.stringify({
      list: {
        list,
      },
      username: window.localStorage.getItem("username"),
    });
    event.currentTarget.reset();

    try {
      const response = await fetch(
        "https://tickingclock.herokuapp.com/api/todolist",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: body,
        }
      );
      const data = await response.json();
      setList([...data.list]);
      console.log(event.currentTarget);
      console.log(event.target);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, [list]);

  return (
    <div className="list">
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
              Board
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
      <h1 className="h1List">To Do List</h1>
      {/* <Calendar className="cal" onChange={onChange} value={value} /> */}
      <form onSubmit={createList}>
        <textarea
          type="text"
          rows="10"
          cols="41"
          ref={listInput}
          placeholder=" List Items"
        />

        <br />
        <input type="submit" value="Add to list" className="listBtn" />
      </form>
      <ul>
        {list.map((item) => {
          return (
            <li key={item._id} class="list">
              <br />
              <h3>{item.list}</h3>
              <br />
              <button
                onClick={(event) => {
                  deleteList(item._id);
                }}
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
