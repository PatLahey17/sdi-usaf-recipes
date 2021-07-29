Using TDD to Build a New Feature
Learning Objectives
By the end of this lesson you will be able to:

Test drive a feature with both UI and unit tests.
Lesson Content
You are now ready to use all that you have learned to test drive a React application. This lesson will walk you through using outside-in TDD to build a React application to keep track of your favorite recipes. At the end of the walkthrough, you will demonstrate that you can build on the application's functionality to be able to add recipes to the application.

You will use Cypress and its extension Cypress Testing Library for the UI tests and Jest with React Testing Library for the unit tests.

Use the below user stories to drive the creation of the recipe application:

User Stories

As a Chef, I want to store my recipes so that I can keep track of them.

Acceptance Criteria: Given I am on the landing page, When the page loads, Then I should see a heading that reads "My Recipes" And I should see text beneath the heading that reads "There are no recipes to list".
As a Chef, I want to be able to add recipes to my collection so that I may have a record of them.

Acceptance Criteria: Given I am on the landing page, When the page loads, Then I should see a button that says "Add Recipe" beneath the "My Recipes" heading.

Acceptance Criteria: Given I am on the landing page, When I click the add recipe button, Then I should see a form with fields: "Recipe Name" and "Recipe Instructions" And the "Add Recipe" button should no longer be on the screen.

As a Chef, I want to be able to see a recipe that I have added show up under "My Recipes".

Acceptance Criteria: Given I have clicked the add recipe button, When I enter the details of a recipe in the form And I click the submit button Then I should see that recipe's name in the list under a heading that reads "My Recipes".
You need a React application so, let's run:

[x]  npx create-react-app recipe-collection
After the application is generated, you need to add Cypress and then run it so that you can write your first UI test.

[x]npm install --save-dev cypress @testing-library/cypress
Once it is installed, open Cypress by running:

 [x] npx cypress open
A Cypress window should open and now you will remove the default example specs that Cypress comes with by default (you will replace them with your own test cases).

 [x] rm -rf cypress/integration/examples
By default, Cypress uses an assertion library called Chai. You want to be able to use Jest, so you will install a libary that allows us to use the Jest API in Cypress tests.

[x]  npm install --save-dev cypress-jest-adapter
In addition to installing the cypress-jest-adapter, you need to update your configuration of cypress to import the adapter. In cypress/support/index.js add the following line below import './commands'

[zx]import 'cypress-jest-adapter'
In order to extend Cypress' functions to include the Cypress Testing Library, you need to add this line to cypress/support/commands.js:

[x]import '@testing-library/cypress/add-commands';
Now you are ready to write the first UI test based on the requirement above.

[x]mkdir cypress/integration/home
[x]touch cypress/integration/home/home.spec.js
The file cypress/integration/home/home.spec.js will contain the UI test. It looks like the following:

[x]describe("Home page", () => {
  beforeEach(() => {
      cy.visit('/')
  })
  it("header contains recipe heading with a message that there are no recipes", () => {
    cy.findByRole('heading').should('contain', 'My Recipes')
    cy.get('p')
      .findByText('There are no recipes to list.')
      .should('exist')
  })
})
In Cypress UI click the run all specs button and notice that the test fails with 404 error. This is expected - you have to configure Cypress to hit the URL of your application.

We will add the following to ./cypress.json

{
    "baseUrl": "http://localhost:3000"
}
After refreshing the cypress page, there will still be a 404 error because the application is not running.

tests will fail because the app is not running

In a new terminal tab, change directories to the application and run npm start.

After starting the application, you have the failure you want to drive your development.

test fails as expected

Now, you can write some code. We'll start by clearing out the boilerplate in src/App.css in order to start from a clean visual slate.

Once you change the src/App.js to reflect the assertions you make in the acceptance test, the tests should pass.

To make the test pass the App component should look like:

function App() {
  return (
    <div className="App">
      <h1 className="App-header">My Recipes</h1>
      <p>There are no recipes to list.</p>
    </div>
  );
}
We have completed a cycle of test driven development for the first user story. This process repeats (with the addition of unit tests) until you have an application that meets the requirements.

The development continues on with the second user story. Its first acceptance criteria is below:

Given I am on the landing page,
When the page loads,
Then I should see a button that says "Add Recipe" beneath the "My Recipes" heading.
We will write a Cypress test case for the ability to click on an "Add Recipe" button to open a form for adding a new recipe.

// cypress/integration/home/home.spec.js
it("contains an add recipe button that when clicked opens a form", () => {
  cy.findByRole('button').click();

  cy.get('form')
    .findByRole('button')
    .should('exist')
})
Up until this point, all of the implementation has been purely presentational without any custom logic, but in order to satisfy the assertions in the above test, you're going to need to add functionality. In order to do so, you need a unit test to drive the functionality.

Before you can write your first unit test, you need to install and setup React Testing Library.

npm install --save-dev @testing-library/dom @testing-library/user-event
In your App component, you want the "Add Recipe" button to display a form, so let's write the test for that.

To start, you will delete the boilerplate code in src/App.js and replace it with this:

import './App.css';

import React from 'react';

class App extends React.Component {
  state = {
    isAddRecipeFormDisplayed: false
  }

  render(){
    const addNewRecipeForm = (
      <form id="recipe-form" >
        <label htmlFor="newRecipeName">Recipe name: </label>
        <input type="text" id="newRecipeName" />
        <label htmlFor="newRecipeInstructions">Instructions:</label>
        <textarea id="newRecipeInstructions" placeholder="write recipe instructions here..." />
        <input type="submit" />
      </form>
    )

    return (
      <div className="App">
        <h1 className="App-header">My Recipes</h1>
        {
          this.state.isAddRecipeFormDisplayed
           ? addNewRecipeForm
          : <button id="add-recipe" > Add Recipe</button>
        }
        <p>There are no recipes to list.</p>
      </div>
    )
  }
}

export default App;
userEvent is a companion library that simulates user interactions: user-event Companion Library for React Testing Library 

//src App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('Add recipe button toggles visibility of a form on the page ', () => {

  render(<App />);
  // `queryBy...` methods will return null if the element is not found:
  const recipeForm = screen.queryByText("Instructions:");

  // `getBy...` methods will "throw" an error if the element is not found:
  // const recipeForm = screen.getByText("Instructions:");

  expect(recipeForm).toBeNull();
  userEvent.click(screen.getByText("Add Recipe"));

  expect(screen.getByLabelText("Instructions:")).toBeInTheDocument();
});
screen methods vs. querySelector()
  // using vanilla JavaScript with Jest
  const form = document.querySelector("#recipe-form");
  expect(form).toBeInTheDocument();

Cheatsheet  for the return values of the various Testing Library query methods: selection cheatsheet

screen.debug()
Use screen.debug() to see an HTML representation of your component in the test output.

In order for your button to do anything, you need to create a method for it to call when clicked, so you'll create one named toggleAddRecipeForm, and validate that it does what you want it to when called. Our approach to this is to modify a boolean property on the state object and conditionally render the form based on that property.

// App.js
import React from 'react';

class App extends React.Component {
  state = {
    isAddRecipeFormDisplayed: false
  }

  toggleAddRecipeForm = () => {
    this.setState({isAddRecipeFormDisplayed: !this.state.isAddRecipeFormDisplayed})
  }

  render(){
  const addNewRecipeForm = (
      <form id="recipe-form" >
        <label htmlFor="newRecipeName">Recipe name: </label>
        <input type="text" id="newRecipeName" />
        <label htmlFor="newRecipeInstructions">Instructions:</label>
        <textarea id="newRecipeInstructions" placeholder="write recipe instructions here..." />
        <input type="submit" />
      </form>
    )

    return (
      <div className="App">
        <h1 className="App-header">My Recipes</h1>
        {
          this.state.isAddRecipeFormDisplayed
          ? addNewRecipeForm
          : <button id="add-recipe" >Add Recipe</button>
        }
        <p>There are no recipes to list.</p>
      </div>
    )
  }
}

export default App;
You want to be able to display a form upon clicking a button. Since there is a method that changes the isAddRecipeFormDisplayed value in the component's state, you want the button to call that method.

Running this test will fail, as you have not added an event handler to the button, let's do that now.

Modify the the button in the component to be as follows:

<button id="add-recipe" onClick={this.toggleAddRecipeForm}>Add Recipe</button>
Now the unit tests pass, but of course the functionality of the form has not been implemented. You will move up the testing pyramid to drive the development of the form via an acceptance test.

// cypress/integration/home/home.spec.js

it("contains a form with fields 'Recipe Name' and 'Recipe Instructions' after clicking the 'Add Recipe' button", () => {
  cy.findByRole('button').click();
  expect(cy.findByRole('textbox', {name: /Recipe name/i})).toExist()
  cy.findByRole('textbox', {name: /instructions/i}).should('exist')
})
TextMatch
The Testing Library (Cypress and React) queryAPI  accepts strings, regular expressions, or functions as arguments. Above, you'll see that /Recipe name/i and /instructions/i are regular expressions, rather than strings: 'Recipe name:' and 'Instructions:'. The regular expressions and the strings are interchangable in this situation, but the regular expressions are case insensitive and are simply checking that the contents between / and / are present.

Click here  to read more about Regular Expressions.

Based on the requirements, you know that when a user submits a recipe using the form you just developed, that recipe should appear on the page beneath the "My Recipes" heading. You should begin with another UI test to drive the creation of the list.

// cypress/integration/home/home.spec.js

it("displays a recipe name under the 'My Recipes' heading after it has been added through the 'Add Recipe' form", () => {
  const recipeName = 'Tofu Scramble Tacos';
  cy.findByRole('button').click()
  cy.findByRole('textbox', {name: /Recipe name/i}).type(recipeName)
  cy.findByRole('textbox', {name: /instructions/i}).type("1. heat a skillet on medium with a dollop of coconut oil {enter} 2. warm flour tortillas")

  return cy.findByRole('button').click()
    .then(() => {
    expect(cy.findByRole('listitem', /tofu scramble tacos/i)).toExist();
    })
})
Async Events
Notice in the test above that you have to treat the second .click() as a Promise, and only when it resolves can you assert for the tofu scramble tacos list item. Also notice that this was not required for the first button click. If you find that Cypress is not finding an element after an event, make sure that you are handling any Promises as necessary.

This acceptance test will fail because a unit test has not yet driven how the component should respond to the form submission. In order to capture user input, you can track recipe submissions in the state of the App component.

This test fails because submitRecipe() does not exist on the App class. To make it pass, you'll modify the class to have the method and provide the form with the event handler for submission.

First, you will add the method to the class:

// src/App.js

// ...

submitRecipe = () => {}

// ...
Then, you will give the form an event handler.

// src/App.js

// Add `submitRecipe` to `form`:
const addNewRecipeForm = (
  <form id="recipe-form" onSubmit={this.submitRecipe}>
  </form>
)

// ...
1
Brain Break Challenge
  const submittedRecipe = { name: recipeName, instructions: recipeInstructions }
For the above submittedRecipe, which of the following assignments will contain the value for the name.

SELECT ALL CORRECT OPTIONS

const name = name


const name = submittedRecipe["name"]


const submittedRecipe.name = name


const { name, instructions } = submittedRecipe


const name = submittedRecipe.name


const recipeName


const { name } = submittedRecipe

RESET INPUT
CHECK ANSWER
The default behavior of a form submission is to refresh the page. You do not want that to happen since your list depends on the state object being in memory. So, above the assertion on the recipes value in state, you asserted that the event submission calls the method on the event object to prevent its default behavior - refreshing the page - upon submission of a new recipe.

Read the following from the React documentation about your approach for handling form data in this component. Give particular attention to the section near the end about handling multiple inputs.

Forms - React 

To make this test pass, you will add functionality to the submitRecipe() to set state with the recipe that is submitted from the form.

// src/App.js

// ...

submitRecipe = (event) => {
  event.preventDefault()
  this.setState({recipes: [
      {
        name: this.state.newRecipeName,
        instructions :this.state.newRecipeInstructions
      }
    ]
  })
}

// ...
HTML forms have their own approach to handling form data, but you want React to handle the data in to the form, so you need a way to give React control of the component. Since React is managing the state of your form, you need to create properties on your state object to keep track of any changes to the values in the input fields of the form. To do this, we need to define an event handler for each input field that will update state every time a user types something into the input. Do that now.

// src/App.test.js
test('typing in the recipe name makes the recipe name appear in the input', async () => {
  render(<App />);

  const recipeName = 'No pockets';
  userEvent.click(screen.getByText("Add Recipe"));
  await userEvent.type(screen.getByLabelText('Recipe name:'), recipeName);

  expect(screen.getByLabelText('Recipe name:').value).toEqual(recipeName);
})
You will write the simplest bit of code to pass the test:

//src/App.js
// ...
state = {
  isAddRecipeFormDisplayed: false,
  recipes: [],
  newRecipeName: ""
}

handleRecipeNameChange = (event) => {
  const value = event.target.value;

  this.setState({newRecipeName: value});
}

// ...
render(){
  const addNewRecipeForm = (
    <form id="recipe-form" onSubmit={this.submitRecipe}>
      <label htmlFor="newRecipeName">Recipe name: </label>
      <input type="text" name="newRecipeName" id="newRecipeName" onChange={this.handleRecipeNameChange} value={this.state.newRecipeName} />
      <label htmlFor="newRecipeInstructions">Instructions:</label>
      <textarea name="newRecipeInstructions"
        id="newRecipeInstructions"
        placeholder="write recipe instructions here..." />
      <input type="submit" />
    </form>
  )

// ...
}

Now that the first assertion is passing, let's do the same for the recipe instructions with a new test. Notice that you can make your code more DRY  by extracting the logic by having a setup method:

const setup = () => {
  const app = render(<App />);

  userEvent.click(app.getByText('Add Recipe'));
  const instructionsInput = app.getByLabelText('Instructions:')
  return {
    instructionsInput,
  }
}

test('typing in the recipe instructions makes the instructions appear in the form', async () => {
  const {instructionsInput} = setup();

  const recipeInstructions = "kinda hard to write instructions without knowing what I'm cooking"

  await userEvent.type(instructionsInput, recipeInstructions)
  expect(instructionsInput.value).toEqual(recipeInstructions);
})
You will write the simplest bit of code to pass the test:

//src/App.js
// ...
state = {
  isAddRecipeFormDisplayed: false,
  recipes: [],
  newRecipeName: "",
  newRecipeInstructions: ""
}

handleRecipeInstructionsChange = (event) => {
  const value = event.target.value;

  this.setState({newRecipeInstructions: value});
}

// ...
render(){
  const addNewRecipeForm = (
    <form id="recipe-form" onSubmit={this.submitRecipe}>
      <label htmlFor="newRecipeName">Recipe name: </label>
      <input type="text"
        name="newRecipeName"
        id="newRecipeName"
        onChange={this.handleRecipeNameChange}
        value={this.state.newRecipeName} />
      <label htmlFor="newRecipeInstructions">Instructions:</label>
      <textarea name="newRecipeInstructions"
        id="newRecipeInstructions"
        placeholder="write recipe instructions here..."
        onChange={this.handleRecipeInstructionsChange}
        value={this.state.newRecipeInstructions} />
      <input type="submit" />
    </form>
  )

// ...
}

Our tests are passing, but your implementation feels a little redundant in that you have two event handler functions for handling data from the same form. This is a perfect opportunity to refactor your code! You can replace both event handlers with a new method called handleChange and update your render method appropriately:

// src/App.js

handleChange = (event) => {
  const target = event.target;
  const name = target.name;

  this.setState({[name]: target.value});
}

// ...
render(){
  const addNewRecipeForm = (
      <form id="recipe-form" onSubmit={this.submitRecipe} >
        <label htmlFor="newRecipeName">Recipe name: </label>
        <input type="text"
          id="newRecipeName"
          name="newRecipeName"
          onChange={this.handleChange}
          value={this.state.newRecipeName} />
        <label htmlFor="newRecipeInstructions">Instructions:</label>
        <textarea id="newRecipeInstructions"
          name="newRecipeInstructions"
          placeholder="write recipe instructions here..."
          onChange={this.handleChange}
          value={this.state.newRecipeInstructions} />
        <input type="submit" />
      </form>
    )


// ...
}
2
Computed Properties?
Describe how computed properites are being used below and why this state assignment produces the desired behavior in your application.

  this.setState({[name]: target.value});
Explain your thinking here.
RESET INPUT
SUBMIT
Now, in order to meet the final requirement, the application needs to display the submitted recipe beneath the "My Recipes" heading in an unordered list. You will add the following test. Please notice the updated setup() method:

// src/App.test.js
const setup = () => {
  const app = render(<App />);

  userEvent.click(app.getByText('Add Recipe'));

  // Add the submit button to your setup method:
  const submitButton = app.getByRole('button')
  const instructionsInput = app.getByLabelText('Instructions:')
  const nameInput = app.getByLabelText('Recipe name:')

  return {
    instructionsInput,
    nameInput,
    submitButton
  }
}

test('recipe name from state appears in an unordered list', async () => {
  const {instructionsInput, nameInput, submitButton} = setup();
  const recipeName = "Lean Pockets"
  const recipeInstructions = "place in toaster oven on 350 for 45 minutes"

  await userEvent.type(instructionsInput, recipeInstructions)
  await userEvent.type(nameInput, recipeName)
  userEvent.click(submitButton);

  expect(screen.getByRole('listitem')).toBeInTheDocument();
  expect(screen.getByText(recipeName)).toBeInTheDocument();
})

getByRole()
getByRole()Queries for elements with the given role

This test will fail at the first assertion because there is no code to render a list item. You will implement that behavior now.

// src/App.js

// ...

return (
  <div className="App">
    <h1 className="App-header">My Recipes</h1>
    {
      this.state.isAddRecipeFormDisplayed
      ? addNewRecipeForm
      : <button id="add-recipe" onClick={this.toggleAddRecipeForm}>Add Recipe</button>
    }
    {
      this.state.recipes.length > 0 ?
      <ul>
        <li></li>
      </ul> :
      <p>There are no recipes to list.</p>
    }
  </div>
)

// ...

Now the first assertion reflects what happens in the code. The second assertion has to now be addressed.

● recipe name from state appears in an unordered list

    TestingLibraryElementError: Unable to find an element with the text: Lean Pockets. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.
You have to make the name from the first recipe in the recipes in state name appear under "My Recipes". The mock recipe in the test is a recipe for "Lean Pockets" which is why line 61 asserts that as the name. You are not suggesting that all of the recipes should be for Lean Pockets.

// src/App.js

//  ...

{
  this.state.recipes.length > 0 ?
  <ul>
    <li>{ this.state.recipes[0].name }</li>
  </ul> :
  <p>There are no recipes to list.</p>
}

// ...
All of the tests are passing and you have actually met all of the requirements that you have seen thus far.

Complete the following challenge to meet the remaining requirements.

Challenges
3
Test Driving a New Feature
So far, we’ve implemented the feature to add a single recipe and now it’s your turn to take it to the next level.

Using Test-Driven Development practices, work the following user stories.

Remember:

Do not write code unless it is in response to a failing test
Do not write more test cases beyond those which are required by the next logical step
Do not write more code than will address the most recent failing test
User Stories
MVP, continued
As Chef Boyardee, I want to see all of the recipes I’ve come up with so that I don’t forget them
    Given I am on the home page
    When I add multiple recipes
    Then I see all of them displayed below the ‘My Recipes’ heading