describe('Authentication Flow', () => {
    const validCredentials = {
        username: 'admin',
        password: 'Admin123!'
    }

    beforeEach(() => {
        cy.intercept('POST', '/api/Auth/login').as('loginRequest')
        cy.intercept('GET', '/api/Auth/me').as('getMeRequest')
        cy.intercept('GET', '/api/Admin/dashboard').as('getDashboard')
        cy.visit('/auth/login')  // Remove IMS-Admin prefix
    })

    it('should login successfully', () => {
        cy.get('[data-testid=username]').type(validCredentials.username)
        cy.get('[data-testid=password]').type(validCredentials.password)
        cy.get('[data-testid=login-button]').click()
        
        cy.wait('@loginRequest').its('response.statusCode').should('eq', 200)
        cy.wait('@getMeRequest')
        cy.url().should('include', '/dashboard')
    })

    it('should show error with invalid credentials', () => {
        cy.get('[data-testid=username]').type('wrong')
        cy.get('[data-testid=password]').type('wrong123')
        cy.get('[data-testid=login-button]').click()
        
        cy.wait('@loginRequest').its('response.statusCode').should('eq', 401)
        cy.get('[data-testid=error-message]').should('be.visible')
        cy.url().should('include', '/auth/login')
    })

    it('should redirect to login when accessing protected route', () => {
        cy.visit('/dashboard')
        cy.url().should('include', '/auth/login')
    })

    it('should logout successfully', () => {
        cy.get('[data-testid=username]').type(validCredentials.username)
        cy.get('[data-testid=password]').type(validCredentials.password)
        cy.get('[data-testid=login-button]').click()
        cy.wait('@loginRequest')
        cy.wait('@getMeRequest')  // Wait for layout to load
        
        cy.get('[data-testid=logout-button]').should('be.visible').click()
        cy.url().should('include', '/auth/login')
    })
})