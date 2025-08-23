// cypress/e2e/auth.cy.ts

describe("Authentication Journey", () => {
  it("should allow a user to log in successfully and redirect to the dashboard", () => {
    // Arrange: Visit the login page
    cy.visit("http://localhost:3000/login");

    // Act: Fill out the form with the new, valid test credentials
    cy.get('[data-cy="login-identifier-input"]').type("test@example.com"); // Or use 'testuser'
    cy.get('[data-cy="login-password-input"]').type("Password123!"); // Use the correct password
    cy.get('[data-cy="login-submit-button"]').click();

    // Assert:
    // 1. The URL should change to the user dashboard
    cy.url().should("include", "/dashboard");

    // 2. The page should contain an element that only a logged-in user can see
    cy.contains(/خروج از حساب کاربری/i).should("be.visible");
  });

  it("should show an error message on failed login attempt", () => {
    // Arrange: Visit the login page
    cy.visit("http://localhost:3000/login");

    // Act: Fill out the form with an incorrect password
    cy.get('[data-cy="login-identifier-input"]').type("testuser@example.com");
    cy.get('[data-cy="login-password-input"]').type("ThisIsTheWrongPassword");
    cy.get('[data-cy="login-submit-button"]').click();

    // Assert:
    // 1. The user should remain on the login page
    cy.url().should("include", "/login");

    // 2. An error message should be displayed to the user
    // NOTE: Adjust the text to match your actual error message
    cy.contains(/نام کاربری یا رمز عبور اشتباه است/i).should("be.visible");
  });
});
