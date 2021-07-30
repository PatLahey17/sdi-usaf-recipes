import React from "react";

class RecipeCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCard: true,
      newRecipeName: this.props.recipeTitle,
      newRecipeInstructions: this.props.recipeInstructions,
    };
  }

  handleRecipeNameChange = (event) => {
    const value = event.target.value;

    this.setState({ newRecipeName: value });
  };

  handleRecipeInstructionsChange = (event) => {
    const value = event.target.value;

    this.setState({ newRecipeInstructions: value });
  };

  toggleEditRecipeForm = () => {
    this.setState({ displayCard: !this.state.displayCard });
  };

  submitRecipe = (event) => {
    event.preventDefault();
    //add new recipe object
    const updatedRecipe = {
      name: this.state.newRecipeName,
      instructions: this.state.newRecipeInstructions,
    };

    this.props.callBack(updatedRecipe, this.props.id);

    //clear old input state
    this.toggleEditRecipeForm();
  };

  render() {
    const displayRecipeCard = (
      <div className="card">
        <h3 className="card-title text-center">{this.props.recipeTitle}</h3>
        <div class="row justify-content-center">
          <div class="col-8">
            <p className="card-text">{this.props.recipeInstructions}</p>
            <div className="d-grid gap-2 mb-3">
              <button
                type="button"
                className="btn btn-info"
                id="edit-recipe"
                onClick={this.toggleEditRecipeForm}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
    const displayRecipeEditForm = (
      <div className="card">
        <h3 className="card-title text-center">Edit Recipe</h3>
        <div class="row justify-content-center">
          <div class="col-8">
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
                  required
                />
              </div>

              <div className="d-grid gap-2 mb-3">
                <input type="submit" className="btn btn-primary btn-block" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );

    return this.state.displayCard ? displayRecipeCard : displayRecipeEditForm;
  }
}

export default RecipeCard;
