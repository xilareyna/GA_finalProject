import { useState, useEffect, useRef } from "react";
import { Router, Switch, Route, Link } from "react-router-dom";
import JournalForm from "./components/Home.js";
import Css from "./App.css";
// import goals from "./components/goals.js";
// import recipes from "./components/recipes.js";
// import inspo from "./components/inspoBoard.js";
// import list from "./components/toDoList.js";

function App() {
  const [journal, setJournal] = useState([]);

  /////////
  //Read
  /////////
  const fetchJournal = async () => {
    try {
      const response = await fetch("http://localhost:3000/home");
      const data = await response.json();
      setJournal(data);
    } catch (error) {
      console.log(error);
    }
  };

  /////////
  //Delete
  /////////
  const deleteJournal = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/home/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();
      const filteredJournals = journal.filter((item) => item._id !== data._id);
      setJournal(filteredJournals);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchJournal();
  }, [journal]);

  return (
    <div className="App">
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
          <li className="liNavBar">
            <Link to={"/calendar"} className="headerLink">
              Calendar
            </Link>
          </li>
        </ul>
      </header>

      <h1>Journal</h1>
      <JournalForm />
      <ul>
        {journal.map((item) => {
          return (
            <li key={item._id} class="journal">
              <br />
              <h3>
                {item.title} {item.date}
              </h3>
              <p>{item.journalEntry}</p>
              <br />
              <button
                onClick={(event) => {
                  deleteJournal(item._id);
                }}
                id="journalBtn"
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
