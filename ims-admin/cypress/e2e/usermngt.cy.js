describe('User Management', () => {
    const validCredentials = {
        username: 'admin',
        password: 'Admin123!'
    }

    const newUser = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'Test123!',
        role: 'Worker'
    }

    beforeEach(() => {
        // Intercept API calls
        cy.intercept('GET', '/api/Auth/me').as('authCheck')
        cy.intercept('POST', '/api/Auth/login').as('loginRequest')
        cy.intercept('GET', '/api/Admin/users').as('getUsers')
        cy.intercept('POST', '/api/Auth/register').as('registerRequest')
        cy.intercept('PUT', '/api/Admin/users/*').as('updateUser')
        cy.intercept('DELETE', '/api/Admin/users/*').as('deleteUser')

        // Login flow
        cy.visit('/auth/login')
        cy.get('[data-testid=username]').type(validCredentials.username)
        cy.get('[data-testid=password]').type(validCredentials.password)
        cy.get('[data-testid=login-button]').click()
        
        // Wait for authentication
        cy.wait('@loginRequest')
        cy.wait('@authCheck')
        
        // Navigate to users page
        cy.visit('/dashboard/users')
        cy.wait('@getUsers')
    })

    it('should create new user', () => {
        // Navigate to users page and cleanup
        cy.visit('/dashboard/users')
        cy.wait('@getUsers')
        
        // Check and cleanup existing test user
        cy.wait('@getUsers')
        cy.get('body').then(($body) => {
            if ($body.text().includes(newUser.username)) {
                cy.get(`[data-testid=delete-${newUser.username}]`).click()
                cy.wait('@deleteUser')
            }
        }).then(() => {
            // Create user flow
            cy.get('[data-testid=create-user-button]').click()
            cy.get('[data-testid=create-username]').type(newUser.username)
            cy.get('[data-testid=create-email]').type(newUser.email)
            cy.get('[data-testid=create-password]').type(newUser.password)
            cy.get('[data-testid=create-role]').select(newUser.role)
            cy.get('[data-testid=create-submit]').click()
    
            // Verify creation
            cy.wait('@registerRequest').its('response.statusCode').should('eq', 200)
            cy.wait('@getUsers')
            cy.get('[data-testid=user-row]').should('contain', newUser.username)
        })
    })

    it('should edit existing user', () => {
    
        const updatedData = {
            username: 'updateduser',
            email: 'updated@example.com',
            role: 'Admin'
        }
    
        // Edit the user we just created
        cy.get(`[data-testid=edit-${newUser.username}]`).click()
        cy.get('[data-testid=edit-username]').clear().type(updatedData.username)
        cy.get('[data-testid=edit-email]').clear().type(updatedData.email)
        cy.get('[data-testid=edit-role]').select(updatedData.role)
        cy.get('[data-testid=save-button]').click()
    
        // Verify update
        cy.wait('@updateUser').its('response.statusCode').should('eq', 200)
        cy.wait('@getUsers')
        cy.contains('td', updatedData.username).should('be.visible')
        // Delete the updated user
        cy.get(`[data-testid=delete-${updatedData.username}]`).click()
        cy.wait('@deleteUser').its('response.statusCode').should('eq', 204)
        cy.contains('td', updatedData.username).should('not.exist')
    })
})