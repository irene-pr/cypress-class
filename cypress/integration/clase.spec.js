describe("login page", () => {
  it("mocha - chai", () => {
    expect(2).to.equal(2);
    expect([1, 2]).to.deep.equal([1, 2]);
    expect([1, 2]).to.not.deep.equal([1, 2, 3]);
    expect({ a: 1, b: 2 }).to.have.property("a", 1);
  });
  it("has a header", () => {
    cy.visit("/login");

    cy.get("h1.login-container__main-heading").should("have.text", "ireNotion");
  });
  it("has a login button that enables when typing on all inputs", () => {
    cy.visit("/login");

    cy.get("button.login-form__button--login").as("loginButton");

    cy.get("@loginButton").should("be.disabled");

    cy.get("input#username").type("hola");

    cy.get("@loginButton").should("be.disabled");

    cy.get("input#password").type("hola");

    cy.get("@loginButton").should("not.be.disabled");
  });
  it("logs in when providing correct username and password", () => {
    cy.visit("/login");
    cy.intercept("POST", "/user/login").as("login");

    cy.get("input#username").type(Cypress.env("USERNAME"));
    cy.get("input#password").type(Cypress.env("PASSWORD"));

    cy.get("button.login-form__button--login").click();

    cy.wait("@login").its("response.statusCode").should("be.equal", 201);

    cy.location("pathname").should("include", "/user-board");
  });
});
describe("user page", () => {
  it("header disappears in tablet and mobile viewport", () => {
    cy.visit("/login");

    cy.get("input#username").type(Cypress.env("USERNAME"));
    cy.get("input#password").type(Cypress.env("PASSWORD"));

    cy.get("button.login-form__button--login").click();

    cy.get("h1.nav-bar__header").should("be.visible");

    cy.viewport(400, 600);

    cy.get("h1.nav-bar__header").should("not.be.visible");
  });
});
