/* eslint-disable no-undef */

describe("error messages", () => {
  it("wrong email", () => {
    cy.visit("http://localhost:5173");

    cy.get('input[name="email"]').type("wrongemail");

    cy.get('input[name="password"]').type("9fxIH0GXesEwH_I");

    cy.get('input[name="terms"]').check().should("be.checked");

    cy.get('[data-cy="error-email"]').contains(
      "Please enter a valid email address"
    );
  });
  it("wrong email and password", () => {
    cy.visit("http://localhost:5173");

    cy.get('input[name="email"]').type("wrongemail");

    cy.get('input[name="password"]').type("123");

    cy.get('input[name="terms"]').check().should("be.checked");

    cy.get('[data-cy="error-email"]').contains(
      "Please enter a valid email address"
    );

    cy.get('[data-cy="error-password"]').contains(
      "Password must be at least 4 characters long"
    );
  });
  it("terms are not be checked", () => {
    cy.visit("http://localhost:5173");

    cy.get('input[name="email"]').type("erdem.guntay@wit.com.tr");

    cy.get('input[name="password"]').type("9fxIH0GXesEwH_I");

    cy.get('[data-cy="checkbox"]').should("not.be.checked");

    cy.get('button[type="submit"]').should("be.disabled");
  });
});
