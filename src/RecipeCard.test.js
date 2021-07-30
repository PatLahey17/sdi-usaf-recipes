import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecipeCard from './RecipeCard';

const makeid = (length) => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}
// const setup = () => {
//   const recipeCard = render(<RecipeCard />);

//   userEvent.click(app.getByText('Add Recipe'));
//   const instructionsInput = app.getByLabelText('Instructions:')
//   return {
//     instructionsInput,
//   }
// }


test('the recipe card component should exist', () => {

  render(<RecipeCard />);

});

test('outputs recipeTitle and recipeInstructions that was passed in the props', () => {
  let var1 = makeid(6);
  let var2 = makeid(6);
  const recipeCard = render(<RecipeCard recipeTitle={var1} recipeInstructions={var2}/>)
  const recipeCardOutput1 = screen.getByText(var1);
  const recipeCardOutput2 = screen.getByText(var2);

  expect(recipeCardOutput1).toExist;
  expect(recipeCardOutput2).toExist;
  cleanup(recipeCard)
});


