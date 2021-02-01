import { useRef, useEffect, useState } from "react";
import { Router, Switch, Route, Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import css from "../styles/calendar.css";

export default (props) => {
  const [list, setList] = useState([]);
  const listInput = useRef(null);
  const [value, onChange] = useState(new Date());

  /////////
  //Read
  /////////
  const fetchList = async () => {
    try {
      const response = await fetch("http://localhost:3000/todolist");
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
      const response = await fetch(`http://localhost:3000/todolist/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();
      const filteredList = list.filter((item) => item._id !== data._id);
      setList(filteredList);
    } catch (error) {
      console.error(error);
    }
  };

  const createList = async (event) => {
    event.preventDefault();
    const list = listInput.current.value;

    const body = JSON.stringify({
      list,
    });
    event.currentTarget.reset();

    try {
      const response = await fetch("http://localhost:3000/todolist", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: body,
      });
      const data = await response.json();
      setList([...list, data]);
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
    <div>
      <header className="navBar">
        <ul className="ulNavBar">
          <li className="liNavBar">
            <Link to={"/"} className="headerLink">
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
        </ul>
      </header>
      <Calendar className="cal" onChange={onChange} value={value} />
      <form onSubmit={createList}>
        <input type="text" ref={listInput} placeholder="List Items" />
        <br />
        <input type="submit" value="Add to list" />
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
