/// <reference types="Cypress" />

describe('Cart test', () => {
  beforeEach(() => {
    cy.login_automationpractice('aaa@ob.pl', '12345')
  })
  it('cart is empty', () => {
    cy.get('span.ajax_cart_no_product')
      .should('have.text', '(empty)')
  })
  it('add one item to cart', () => {
    cy.get('#block_top_menu').contains('T-shirts').click({force: true})
    cy.get('.button').contains('Add to cart').click()
    cy.get('.cross', { timeout: 10000 }).should('be.visible')
      .click()

    // Should be 1 item in a cart
    cy.get('span.ajax_cart_quantity.unvisible')
      .should('have.text', '1')
  })
})