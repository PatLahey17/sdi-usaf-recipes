import React from "react";
import RecipeCard from "./RecipeCard";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddRecipeFormDisplayed: false,
      recipes: [],
      newRecipeName: "",
      newRecipeInstructions: "",
    };
    //this.updatedRecipe = this.updatedRecipe.bind(this);
  }

  handleRecipeNameChange = (event) => {
    const value = event.target.value;

    this.setState({ newRecipeName: value });
  };

  handleRecipeInstructionsChange = (event) => {
    const value = event.target.value;

    this.setState({ newRecipeInstructions: value });
  };

  toggleAddRecipeForm = () => {
    this.setState({
      isAddRecipeFormDisplayed: !this.state.isAddRecipeFormDisplayed,
    });
  };

  submitRecipe = (event) => {
    event.preventDefault();
    //add new recipe object
    const currentRecipes = this.state.recipes;
    currentRecipes.push({
      name: this.state.newRecipeName,
      instructions: this.state.newRecipeInstructions,
    });
    this.setState({ recipes: currentRecipes });

    //clear old input state
    this.setState({ newRecipeName: "" });
    this.setState({ newRecipeInstructions: "" });
  };

  updatedRecipe = (updatedRecipe, id) => {
    const currentRecipes = this.state.recipes;
    currentRecipes[id] = updatedRecipe;
    this.setState({ recipes: currentRecipes });
  };

  render() {
    const addNewRecipeForm = (
      <form id="recipe-form" className="" onSubmit={this.submitRecipe}>
        <div className="mb-3">
          <label htmlFor="newRecipeName" className="form-label">
            Recipe name:{" "}
          </label>
          <input
            type="text"
            className="form-control"
            name="newRecipeName"
            id="newRecipeName"
            onChange={this.handleRecipeNameChange}
            placeholder="write recipe name here..."
            value={this.state.newRecipeName}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="newRecipeInstructions" className="form-label">
            Instructions:
          </label>
          <textarea
            className="form-control"
            onChange={this.handleRecipeInstructionsChange}
            name="newRecipeInstructions"
            id="newRecipeInstructions"
            value={this.state.newRecipeInstructions}
            placeholder="write recipe instructions here..."
            required
          />
        </div>
        <div className="mb-3">
          <div className="d-grid gap-2">
            <input type="submit" className="btn btn-primary btn-block" />
          </div>
        </div>
      </form>
    );

    return (
      <div className="App container">
        <main className="row justify-content-center">
          <section className="col-md-6 col-sm-12">
            <header className="row">
              <div className="col text-center">
                <h1 className="App-header">My Recipes</h1>
              </div>
            </header>
            <section className="row">
              <div className="col">
                {this.state.isAddRecipeFormDisplayed ? (
                  addNewRecipeForm
                ) : (
                  <div className="d-grid gap-2">
                    <button
                      type="button"
                      className="btn btn-info mb-3 "
                      id="add-recipe"
                      onClick={this.toggleAddRecipeForm}
                    >
                      Add Recipe
                    </button>
                  </div>
                )}
              </div>
            </section>
            <section className="row">
              <div className="col">
                <hr></hr>
                <header className="text-center">
                  <h2>Current Recipe List</h2>
                </header>
                {this.state.recipes.length > 0 ? (
                  this.state.recipes.map((recipe, each) => {
                    return (
                      <RecipeCard
                        key={`recipe-${each}`}
                        id={each}
                        recipeTitle={recipe.name}
                        recipeInstructions={recipe.instructions}
                        callBack={(updatedRecipe, id) => {
                          this.updatedRecipe(updatedRecipe, id);
                        }}
                      />
                    );
                  })
                ) : (
                  <p>There are no recipes to list.</p>
                )}
              </div>
            </section>
          </section>
        </main>
      </div>
    );
  }
}

export default App;