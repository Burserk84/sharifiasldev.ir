// cypress/e2e/search.cy.ts

describe("User Search Journey", () => {
  it("should allow a user to open the search modal, type a query, and see the results page", () => {
    // Arrange: Start by visiting the homepage of your running application.
    cy.visit("http://localhost:3000");

    // Act: Find the search button using our data-cy selector and click it.
    cy.get('[data-cy="header-search-button"]').click();

    // Assert: The search modal should now be open. We'll verify this by finding the input field.
    // We use .should('be.visible') to make sure Cypress waits for any animations to finish.
    cy.get('[data-cy="search-modal-input"]').should("be.visible");

    // Act: Type a search query into the input and press the Enter key.
    cy.get('[data-cy="search-modal-input"]').type("پروژه نکست جی اس{enter}");

    // ✨ FIX: Check for content on the new page FIRST.
    // This command will automatically wait until the new page has loaded.
    cy.contains("h1", /نتایج جستجو برای/i).should("be.visible");

    // Now that we know the new page is loaded, we can safely check the URL.
    cy.url().then((url) => {
      const decodedUrl = decodeURIComponent(url);
      expect(decodedUrl).to.include("/search?q=پروژه نکست جی اس");
    });
  });
});
