Cypress.Commands.add("login", (username, password) => {
  cy.log(`Logged in as ${username}`);

  cy.request({
    method: "POST",
    url: `${Cypress.env("PRODUCTION_SERVER")}/user/login`,
    body: {
      username,
      password,
    },
  }).then(({ body }) => {
    window.localStorage.setItem("token", JSON.stringify(body));
    cy.visit("/user-board");
  });
});
