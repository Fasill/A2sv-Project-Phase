
describe('User Flow Test', () => {
  before(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('should log in, view job details, bookmark a job, verify bookmarked items, and log out', () => {
    cy.get('input#email', { timeout: 100000 }).type('wojec72682@iteradev.com');  
    cy.get('input#password', { timeout: 100000 }).type('wojec72682@iteradev.com');  
    cy.get('button[type="submit"]', { timeout: 100000 }).click();

    cy.url({ timeout: 100000 }).should('eq', 'http://localhost:3000/');

    cy.get('[data-testid="Opportunities"]', { timeout: 100000 }).should('exist');


    cy.get('[data-testid="job-card"]', { timeout: 100000 }).should('exist');





    cy.get('[data-testid="Add bookmark"]', { timeout: 100000 }).click();
    cy.get('[data-testid="Delete bookmark"]', { timeout: 100000 }).should('exist');
    

    cy.get('[data-testid="Saved Jobs"]', { timeout: 10000 }).click({ force: true });
    cy.get('[data-testid="Delete bookmark"]', { timeout: 100000 }).should('exist');


    cy.get('[data-testid="Logout"]', { timeout: 100000 }).click();  

    cy.url({ timeout: 100000 }).should('include', '/login');
  });
});
