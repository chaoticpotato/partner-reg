/// <reference types="cypress" />

describe("Registration flow", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/register");
  });

  it("displays right page title", () => {
    cy.get("h1").should("have.text", "Join our network");
  });

  /*
    This test:
    - opens the registration page
    - fills out the form
    - submits the form
    - navigates to the listing page
    - verifies that the item it added is the most recent one
    - and finally, deletes it.
  */
  it("registers new partner on happy path", () => {
    const name = "NewName" + Math.round(Math.random() * 10000);
    cy.get('[name="name"]').type(name);
    cy.get('[name="company"]').type("NewCompany");
    cy.get('[name="mobile_phone"]').type("07543332211");
    cy.get('[name="email_address"]').type("new@company.com");

    cy.intercept("GET", "https://api.postcodes.io/postcodes/n6/autocomplete*")
      .as(
        "getSuggestions",
      );
    cy.get("#postcombo").type("n6");
    cy.wait("@getSuggestions");
    cy.get("#postcombo").type("{downarrow}{downarrow}{enter}");
    cy.get('[data-cy="chItem"]:first-child').click();
    cy.get(".cta-button").click();

    cy.get('[data-cy="success-title"]').should(
      "have.text",
      "You are successfully registered.",
    );

    cy.get('[data-cy="success-list"]').click();
    cy.get('[data-cy="dItem"]:first-child  > [data-cy="dItem-name"]').should(
      "have.text",
      name,
    );
    cy.get('[data-cy="dItem"]:first-child  > [data-cy="dItem-name"] > button')
      .click();
  });
});
