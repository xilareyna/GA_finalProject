import { useRef, useState, useEffect } from "react";
import { Router, Switch, Route, Link } from "react-router-dom";
import css from "../styles/recipe.css";

export default (props) => {
  const [recipes, setRecipe] = useState([]);
  const titleInput = useRef(null);
  const ingredientsInput = useRef(null);
  const directionsInput = useRef(null);
  const imgInput = useRef(null);
  const cookTimeInput = useRef(null);

  /////////
  //Read
  /////////
  const fetchRecipe = async () => {
    try {
      const response = await fetch("http://localhost:3000/recipes");
      const data = await response.json();
      setRecipe(data);
    } catch (error) {
      console.log(error);
    }
  };

  /////////
  //Delete
  /////////
  const deleteRecipe = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/recipes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();
      const filteredRecipes = recipes.filter((item) => item._id !== data._id);
      setRecipe(filteredRecipes);
    } catch (error) {
      console.error(error);
    }
  };

  const createRecipe = async (event) => {
    event.preventDefault();
    const title = titleInput.current.value;
    const ingredients = ingredientsInput.current.value;
    const directions = directionsInput.current.value;
    const img = imgInput.current.value;
    const cookTime = cookTimeInput.current.value;

    const body = JSON.stringify({
      title,
      ingredients,
      directions,
      img,
      cookTime,
    });
    event.currentTarget.reset();

    try {
      const response = await fetch("http://localhost:3000/recipes", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: body,
      });
      const data = await response.json();
      setRecipe([...recipes, data]);
      console.log(event.currentTarget);
      console.log(event.target);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [recipes]);

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

      <form onSubmit={createRecipe} className="recipeForm">
        <input type="text" ref={titleInput} placeholder="Recipe Title" />
        <input type="text" ref={cookTimeInput} placeholder="Cooking Time" />
        <br />

        <textarea
          type="text"
          rows="1"
          cols="41"
          ref={imgInput}
          placeholder="Image Link"
        />
        <br />
        <textarea
          type="text"
          rows="5"
          cols="41"
          ref={ingredientsInput}
          placeholder="Ingredients"
        />
        <br />
        <textarea
          type="text"
          rows="10"
          cols="41"
          ref={directionsInput}
          placeholder="Directions"
          className="goalz"
        />
        <br />

        <input type="submit" value="Add to Recipes" className="recipeAddBtn" />
      </form>

      <ul>
        {recipes.map((item) => {
          return (
            <li key={item._id} class="recipes">
              <br />
              <h3>{item.title}</h3>
              <h3>Cook Time:{item.cookTime}</h3>
              <img src={item.img} className="recipeImg" />
              <h3>Ingredients:{item.ingredients}</h3>
              <h3>Directions:{item.directions}</h3>
              <br />
              <button
                onClick={(event) => {
                  deleteRecipe(item._id);
                }}
                id="recipeDeleteBtn"
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
