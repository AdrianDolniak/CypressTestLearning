/// <reference types="Cypress" />

describe('Login test', () => {
  beforeEach(() => {
    cy.visit('http://automationpractice.com/index.php')
    cy.get('.login').contains('Sign in').click()
    cy.url().should('include', 'my-account')
  })
  it('requires email', () => {

    // Gets and asserts
    cy.get('#SubmitLogin').click()
    cy.get('.alert')
      .should('contain.text','An email address required.')
  })
  it('requires password', () => {

    // Gets, types and asserts
    cy.get('#email')
    .type('aaa@ob.pl')
    cy.get('#SubmitLogin').click()
    cy.get('.alert')
    .should('contain.text','Password is required.')
  })
  it('requires valid username and password', () => {
    
    // Gets, types and asserts
    cy.log('**enter wrong password**')
    cy.get('#email')
      .type('aaa@ob.pl')
      .should('have.value', 'aaa@ob.pl')
    cy.get('#passwd')
      .type('54321')
      .should('have.value', '54321')
    cy.get('#SubmitLogin').click()

    // Should get an alert 'Authentication failed.'
    cy.get('.alert')
      .should('contain.text', 'Authentication failed.')
  })
  it('invalid credentials', () => {
    
    // Gets, types and asserts
    cy.log('**enter incorrect credentials**')
    cy.get('#email')
      .type('wrongemail@ob.pl')
      .should('have.value', 'wrongemail@ob.pl')
    cy.get('#passwd')
      .type('wrongpassword')
      .should('have.value', 'wrongpassword')
    cy.get('#SubmitLogin').click()

    // Should get an alert 'Authentication failed.'
    cy.get('.alert')
      .should('contain.text', 'Authentication failed.')
  })
  it('should be log in', () => {
    
    // Gets, types and asserts
    cy.log('**enter the right credentials**')
    cy.get('#email')
      .type('aaa@ob.pl')
      .should('have.value', 'aaa@ob.pl')
    cy.get('#passwd')
      .type('12345')
      .should('have.value', '12345')
    cy.get('#SubmitLogin').click()

    // Should be logged in
    cy.get('.account')
      .should('contain.text', 'ad ad')
  })
})