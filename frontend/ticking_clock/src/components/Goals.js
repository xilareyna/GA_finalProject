import { useRef, useState, useEffect } from "react";
import { Router, Switch, Route, Link } from "react-router-dom";

import css from "../styles/goals.css";

// import journal from "./components/home.js";
// import recipes from "./components/recipes.js";
// import inspo from "./components/inspoBoard.js";
// import list from "./components/toDoList.js";

export default (props) => {
  const [goals, setGoals] = useState([]);
  const expectedDateInput = useRef(null);
  const goalsInput = useRef(null);
  const [affirmation, setAffirmation] = useState([]);

  /////////
  //Read
  /////////
  const fetchGoal = async () => {
    try {
      const response = await fetch("http://localhost:3000/goals");
      const data = await response.json();
      setGoals(data);
    } catch (error) {
      console.log(error);
    }
  };

  /////////
  //Delete
  /////////
  const deleteGoals = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/goals/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();
      const filteredGoals = goals.filter((item) => item._id !== data._id);
      setGoals(filteredGoals);
    } catch (error) {
      console.error(error);
    }
  };

  const createGoal = async (event) => {
    event.preventDefault();
    const goals = goalsInput.current.value;
    const expectedDate = expectedDateInput.current.value;

    const body = JSON.stringify({
      expectedDate,
      goals,
    });
    event.currentTarget.reset();

    try {
      const response = await fetch("http://localhost:3000/goals", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: body,
      });
      const data = await response.json();
      setGoals([...goals, data]);
      console.log(event.currentTarget);
      console.log(event.target);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGoal();
  }, [goals]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://dulce-affirmations-api.herokuapp.com/affirmation"
        );
        const data = await response.json();
        setAffirmation(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

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
        </ul>
      </header>
      <h2>
        Todays Affirmation✨
        <br />"{affirmation[0] ? affirmation[0].phrase : ""} "
      </h2>

      <form onSubmit={createGoal} className="goalsForm">
        <br />
        <input type="text" ref={expectedDateInput} placeholder="Finish Date" />
        <br />
        <textarea
          type="text"
          rows="10"
          cols="40"
          ref={goalsInput}
          placeholder="Write your goals here..."
          className="goalz"
        />
        <br />
        <input type="submit" value="Add to Goals" className="goalsSubmitBtn" />
      </form>

      <ul className="goalsUlPost">
        {goals.map((item) => {
          return (
            <li key={item._id} class="goal">
              <br />
              <h3>{item.goals}</h3>
              <h3>Date: {item.expectedDate}</h3>
              <br />
              <button
                onClick={(event) => {
                  deleteGoals(item._id);
                }}
                id="goalDeleteBtn"
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
