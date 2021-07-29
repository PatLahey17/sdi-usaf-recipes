import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';


const setup = () => {
  const app = render(<App />);

  userEvent.click(app.getByText('Add Recipe'));
  const instructionsInput = app.getByLabelText('Instructions:')
  return {
    instructionsInput,
  }
}

// test('Add recipe button toggles visibility of a form on the page ', () => {

//   render(<App />);
//   // `queryBy...` methods will return null if the element is not found:
//   const recipeForm = screen.queryByText("Instructions:");

//   // `getBy...` methods will "throw" an error if the element is not found:
//   // const recipeForm = screen.getByText("Instructions:");

//   expect(recipeForm).toBeNull();
//   userEvent.click(screen.getByText("Add Recipe"));

//   expect(screen.getByLabelText("Instructions:")).toBeInTheDocument();
// });

test('typing in the recipe instructions makes the instructions appear in the form', async () => {
  const {instructionsInput} = setup();

  const recipeInstructions = "kinda hard to write instructions without knowing what I'm cooking"

  await userEvent.type(instructionsInput, recipeInstructions)
  expect(instructionsInput.value).toEqual(recipeInstructions);
})