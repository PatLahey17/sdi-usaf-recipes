import React from 'react';

class App extends React.Component {
  state = {
    isAddRecipeFormDisplayed: false,
    recipes: [],
    newRecipeName: "",
    newRecipeInstructions: ""
  }
  
  handleRecipeNameChange = (event) => {
    const value = event.target.value;
  
    this.setState({newRecipeName: value});
  }

  handleRecipeInstructionsChange = (event) => {
    const value = event.target.value;
  
    this.setState({newRecipeInstructions: value});
  }

  toggleAddRecipeForm = () => {
    this.setState({isAddRecipeFormDisplayed: !this.state.isAddRecipeFormDisplayed})
  }

  submitRecipe = (event) => {
    event.preventDefault()
    //add new recipe object
    const currentRecipes = this.state.recipes
    currentRecipes.push(
      {
      name: this.state.newRecipeName,
      instructions: this.state.newRecipeInstructions
      }
    )
    this.setState({recipes: currentRecipes})

    //clear old input state
    this.setState({newRecipeName: ''});
    this.setState({newRecipeInstructions: ''});


  }

  render(){
    const addNewRecipeForm = (
 
      <form id="recipe-form" className="" onSubmit={this.submitRecipe}>
        <div className="mb-3">
        <label htmlFor="newRecipeName" className="form-label">Recipe name: </label>
        <input type="text" className="form-control" name="newRecipeName" id="newRecipeName" onChange={this.handleRecipeNameChange} placeholder="write recipe name here..." value={this.state.newRecipeName}/>
        </div>
        <div className="mb-3">
        <label htmlFor="newRecipeInstructions" className="form-label">Instructions:</label>
        <textarea className="form-control" onChange={this.handleRecipeInstructionsChange}  name="newRecipeInstructions"
          id="newRecipeInstructions" value={this.state.newRecipeInstructions}
          placeholder="write recipe instructions here..." />
           </div>
           <div className="mb-3">
            <input type="submit" className="btn btn-primary"/>
           </div>
      </form>
  
    )


    return (
      <div className="App container" >
        <main className="row">
          <section className ="col">
            <header className="row">
              <div className="col text-center">
               <h1 className="App-header">My Recipes</h1>
               </div>
            </header>
            <section className="row"> 
              <div className="col">              
                {
                  this.state.isAddRecipeFormDisplayed
                  ? addNewRecipeForm
                  : <button type="button" className="btn btn-info mb-3" id="add-recipe" onClick={this.toggleAddRecipeForm}>Add Recipe</button>
                }
              </div>
            </section>
            <section className ="row">
              <div className="col"> 
                <header>
                  <h2>
                    Current Recipe List
                  </h2>
                </header>           
                {
                this.state.recipes.length > 0 ?
                <ul>
                  { this.state.recipes.map((recipeName, each) => {
                    return <li key={each}>{recipeName.name +'  '+ recipeName.instructions}</li>
                  }) }
                </ul> :
                <p>There are no recipes to list.</p>
              }
              </div>
            </section>
          </section>
        </main>
      </div>
    )
  }
}

export default App;
