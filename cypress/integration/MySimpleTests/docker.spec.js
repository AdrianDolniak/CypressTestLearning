/// <reference types="Cypress" />

describe('Docker Test', () => {
    it('clicking "Memory" navigates to a new url', () => {
        cy.visit('http://localhost:8080')

        cy.contains('Memory').click()

        // Should be on a new URL which includes '/mem'
        cy.url().should('include', '/mem')
    })
})