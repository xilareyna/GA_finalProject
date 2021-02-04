import { useRef, useEffect, useState } from "react";
import { Router, Switch, Route, Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import css from "../styles/calendar.css";

export default (props) => {
  const [value, onChange] = useState(new Date());

  return (
    <div className="calendarDiv">
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
      <h1 className="calH1">Calendar</h1>
      <Calendar className="cal" onChange={onChange} value={value} />
    </div>
  );
};
