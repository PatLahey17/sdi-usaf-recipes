describe("Home page", () => {
  beforeEach(() => {
      cy.visit('/')
  })
  it("a header that contains my recipes and a message that there are no recipes to list", () => {
    cy.get('h2').contains('Current Recipe List')
    cy.get('h1').contains('My Recipes')
    cy.get('p')
      .findByText('There are no recipes to list.')
      .should('exist')
  })

  it("contains an add recipe button that when clicked opens a form", () => {
    cy.findByRole('button').click();
  
    cy.get('form')
      .findByRole('button')
      .should('exist')
  })

  it("contains a form with fields 'Recipe Name' and 'Recipe Instructions' after clicking the 'Add Recipe' button", () => {
    cy.findByRole('button').click();
    expect(cy.findByRole('textbox', {name: /Recipe name/i})).toExist()
    cy.findByRole('textbox', {name: /instructions/i}).should('exist')
  })

  it("displays a recipe name under the 'My Recipes' heading after it has been added through the 'Add Recipe' form", () => {
    //execute
    const recipeName = 'Tofu Scramble Tacos';
    cy.findByRole('button').click()
    cy.findByRole('textbox', {name: /Recipe name/i}).type(recipeName)
    cy.findByRole('textbox', {name: /instructions/i}).type("1. heat a skillet on medium with a dollop of coconut oil {enter} 2. warm flour tortillas")
  
    //assert
    return cy.findByRole('button').click()
      .then(() => {
      //expect(cy.findByRole('listitem', /tofu scramble tacos/i)).toExist();      
        expect(cy.get('h3').contains(/Tofu Scramble Tacos/i)).toExist();
        expect(cy.get('p').contains("1. heat a skillet on medium with a dollop of coconut oil 2. warm flour tortillas")).toExist();
      })
  })

  it("after a recipe is submitted, the recipe name and instructions text boxes clear", () => {
    const recipeName = 'Tofu Scramble Tacos';
    cy.findByRole('button').click()
    cy.findByRole('textbox', {name: /Recipe name/i}).type(recipeName)
    cy.findByRole('textbox', {name: /instructions/i}).type("1. heat a skillet on medium with a dollop of coconut oil {enter} 2. warm flour tortillas")

    return cy.findByRole('button').click()
      .then(() => {
        cy.findByRole('textbox', {name: /Recipe name/i}).should('have.value', '')
        cy.findByRole('textbox', {name: /instructions/i}).should('have.value', '')
      })
  })

  it("displays multiple recipe names under the 'My Recipes' heading after multiple recipes have been added through the 'Add Recipe' form", () => {
    //execute
    const recipeName = 'Tofu Scramble Tacos';
    cy.findByRole('button').click()
    cy.findByRole('textbox', {name: /Recipe name/i}).type(recipeName)
    cy.findByRole('textbox', {name: /instructions/i}).type("1. heat a skillet on medium with a dollop of coconut oil {enter} 2. warm flour tortillas")

    cy.findByRole('button').click()

    const recipeName1 = 'Grilled Beets';
    cy.findByRole('button').click()
    cy.findByRole('textbox', {name: /Recipe name/i}).type(recipeName1)
    cy.findByRole('textbox', {name: /instructions/i}).type("1. Boil beets until soft. 2. Grill beets.")

    //assert
    return cy.findByRole('button').click()
    .then(() => {
    //expect(cy.findByRole('listitem', /tofu scramble tacos/i)).toExist();      
      expect(cy.get('h3').contains(/Tofu Scramble Tacos/i)).toExist();
      expect(cy.get('p').contains("1. heat a skillet on medium with a dollop of coconut oil 2. warm flour tortillas")).toExist();
      expect(cy.get('h3').contains(/Grilled Beets/i)).toExist();
      expect(cy.get('p').contains("1. Boil beets until soft. 2. Grill beets.")).toExist();
    })
  
  })


  it("does not submit an empty recipe name-instruction card upon submit", () => {
    //execute
    const recipeName = 'TofuScrambleTacos';
    cy.findByRole('button').click()
    cy.findByRole('textbox', {name: /Recipe name/i}).type(recipeName)
    cy.findByRole('textbox', {name: /instructions/i}).type("1. heat a skillet on medium with a dollop of coconut oil {enter} 2. warm flour tortillas")

    cy.findByRole('button').click()
    //assert
    return cy.findByRole('button').click()
    .then(() => {
      // expect(cy.get('h3').contains(/^$/i)).should('not.have.value', ''))
      // expect(cy.get('p').contains(/^$/i).to.not('have.value', ''))
      // expect(cy.get('h3').contains(/^$/i)).toExist();
      //expect(cy.get('p').contains(/^$/i)).toExist();
      
      expect(cy.get('h3').contains(/^$/i).should('not.exist'));
      expect(cy.get('p').contains(/^$/i).should('not.exist'));
      
    })
  
  })
})

