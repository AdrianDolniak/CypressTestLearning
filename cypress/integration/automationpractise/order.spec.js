/// <reference types="Cypress" />

describe('Cart test', () => {
  beforeEach(() => {
    cy.login_automationpractice('aaa@ob.pl', '12345')
  })
  it('place order', () => {
    cy.log('**add 1 item to the cart**')
    cy.get('#block_top_menu').contains('T-shirts').click({force: true})
    cy.get('.button').contains('Add to cart').click()
    cy.get('.cross', { timeout: 10000 }).should('be.visible').click()

    // Should be 1 item in the cart
    cy.get('span.ajax_cart_quantity.unvisible')
      .should('have.text', '1')
    
    cy.log('**proceed to next step**')
    cy.contains('Proceed to checkout').click()
    
    // Should have text "Faded Short Sleeve T-shirts"
    cy.get('td > p.product-name > a')
      .should('have.text', 'Faded Short Sleeve T-shirts')

    // Should be a total price of $19.25
    cy.get('#total_price')
      .should('have.text', '$19.25')

    cy.log('**proceed to next step**')
    cy.get('.cart_navigation.clearfix > a').contains('Proceed to checkout').click()
      
    // Should be on Address step
    cy.get('.step_current.third > span')
      .should('have.text', '03. Address')

    cy.log('**proceed to next step**')
    cy.get('button[type=submit][name=processAddress]').click()
    
    // Should be on Shipping step
    cy.get('li.step_current.four > span')
      .should('have.text', '04. Shipping')

    // Assert message popup "You must agree to the terms of service before continuing."
    cy.get('button[type=submit][name=processCarrier]').click()
    cy.get('.fancybox-inner > p')
      .should('have.text', 'You must agree to the terms of service before continuing.')
    cy.get('.fancybox-item.fancybox-close').click()

    cy.log('**proceed to next step**')
    cy.get('[type="checkbox"]').check()
    cy.get('button[type=submit][name=processCarrier]').click()

    // Should be on Payment step
    cy.get('#step_end > span')
      .should('have.text', '05. Payment')

    // Assert pay by wire
    cy.get('.bankwire')
      .should('include.text', 'Pay by bank wire (order processing will be longer)')
    // Assert pay by check
    cy.get('.cheque')
      .should('include.text', 'Pay by check (order processing will be longer)')
  
    cy.log('**proceed to checkout**')
    cy.get('.bankwire').click()

    // Assert order summary before confirmation
    cy.get('.page-subheading')
      .should('include.text', 'Bank-wire payment.')
    cy.get('.cheque-indent')
      .should('include.text', 'You have chosen to pay by bank wire. Here is a short summary of your order:')
    cy.get('#amount')
      .should('have.text', '$19.25')
    cy.get('.box.cheque-box > p > b')
      .should('have.text', 'Dollar')

    // Confirm order
    cy.log('**confirm order**')
    cy.get('#cart_navigation > button').click()

     // Assert order after confirmation
    cy.get('.page-heading')
      .should('have.text', 'Order confirmation')
    cy.get('.cheque-indent')
      .should('include.text', 'Your order on My Store is complete.')
  })
})