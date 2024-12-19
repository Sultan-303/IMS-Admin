Cypress.Commands.add('login', (username: string, password: string) => {
    cy.visit('/login')
    cy.get('[data-testid=username]').type(username)
    cy.get('[data-testid=password]').type(password)
    cy.get('[data-testid=login-button]').click()
  })