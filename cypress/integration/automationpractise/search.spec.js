/// <reference types="Cypress" />

describe('Window', () => {
  beforeEach(() => {
    cy.visit('http://automationpractice.com/index.php')
  })
  it('cy.window() - get the global window object', () => {

    cy.window().should('have.property', 'top')
  })
  it('cy.title() - get the title', () => {

    cy.title().should('include', 'My Store')
  })

  // Get an input, type into it and verify that the value has been updated and search
  it('Gets, types, search and asserts', () => {
    cy.get('.search_query')
      .type('T-Shirt').should('have.value', 'T-Shirt')
    cy.get('.button-search').click()

    // Should be on a new URL which includes 'T-Shirt'
    cy.url().should('include', 'T-Shirt')
  })
})