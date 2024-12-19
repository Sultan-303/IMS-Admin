Cypress.Commands.add('login', (username, password) => {
    cy.visit('/auth/login')
    cy.get('[data-testid=username]').type(username)
    cy.get('[data-testid=password]').type(password)
    cy.get('[data-testid=login-button]').click()
    
    // Wait for API response
    cy.wait('@loginRequest')
    cy.url().should('include', '/dashboard', { timeout: 10000 })
})

Cypress.Commands.add('logout', () => {
    cy.get('[data-testid=logout-button]').click()
    cy.url().should('include', '/auth/login')
})

Cypress.Commands.add('interceptAuth', () => {
    cy.intercept('POST', '/api/Auth/login').as('loginRequest')
})