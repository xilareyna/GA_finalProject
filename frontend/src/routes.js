import Goals from "./components/Goals.js";
import Home from "./App";
import InspoBoard from "./components/InspoBoard.js";
import Recipes from "./components/Recipes.js";
import ToDoList from "./components/ToDoList.js";
import Calendar from "./components/Calendar.js";
import User from "./components/User.js";

const routes = [
  {
    path: "/goals",
    name: "Goals Page",
    component: Goals,
  },

  {
    path: "/inspo",
    name: "Inspo Board Page",
    component: InspoBoard,
  },
  {
    path: "/recipes",
    name: "Recipes Page",
    component: Recipes,
  },
  {
    path: "/todolist",
    name: "To Do List Page",
    component: ToDoList,
  },
  {
    path: "/journal",
    name: "Home Page",
    component: Home,
  },
  {
    path: "/calendar",
    name: "Calendar Page",
    component: Calendar,
  },
  {
    path: "/",
    name: "Login Page",
    component: User,
  },
];

export default routes;
