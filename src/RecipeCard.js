import React from 'react';

class RecipeCard extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      recipeTitle: '',
      recipeInstructions: ''
    }
  }


  render(){
    console.log(this.props)
    return (<div>
              <div>
                {this.props.recipeInstructions}
              </div>
              <div>
                {this.props.recipeTitle}
              </div>
            </div>
    )
  }
}

export default RecipeCard