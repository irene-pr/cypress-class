it("mocha - chai", () => {
  expect(2).to.equal(2);
  expect([1, 2]).to.deep.equal([1, 2]);
  expect([1, 2]).to.not.deep.equal([1, 2, 3]);
  expect({ a: 1, b: 2 }).to.have.property("a", 1);
});
describe("home page", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("the login button has text 'LOG IN' and redirects to login page when clicked", () => {
    cy.get(".nav__button--login").should("have.text", " LOG IN");

    cy.get(".nav__button--login").click();

    cy.location("pathname").should("include", "/login");
  });
});
describe("user page", () => {
  beforeEach(() => {
    cy.login(Cypress.env("USERNAME"), Cypress.env("PASSWORD"));
  });
  it("has a header that disappears in tablet and mobile viewport", () => {
    cy.get("h1.nav-bar__header").should("be.visible");

    cy.viewport(400, 600);

    cy.get("h1.nav-bar__header").should("not.be.visible");
  });
  it("has a button that creates a new table", () => {
    cy.intercept("POST", "/boards/create").as("createBoard");

    cy.get("button.nav-bar__button--new-board").click();

    cy.wait("@createBoard").its("response.statusCode").should("be.equal", 201);
  });
  it("has notes that can be modified with a modal", () => {
    cy.intercept("PUT", "/note/update").as("updateNote");

    cy.get(".note.note-paragraph").eq(0).dblclick();

    cy.get("textarea#text.note-update-form-paragraph__input")
      .clear()
      .type("hello isdi");

    cy.get("#pink.note-update-form-paragraph__input").check();

    cy.get(".note-update-form-paragraph__button").click();

    cy.wait("@updateNote").then((intercepted) => {
      const { request, response } = intercepted;

      expect(response.statusCode).to.equal(200);
      expect(request.body.updatedNote).to.have.property("color", "pink");
      expect(request.body.updatedNote).to.have.property(
        "paragraph",
        "hello isdi"
      );
    });
  });
});
