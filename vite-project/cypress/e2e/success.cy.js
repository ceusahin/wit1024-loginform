/* eslint-disable no-undef */
// eslint-disable-next-line no-undef

describe("success page test", () => {
  it("when the form is successfully submit, it redirects to the success page.", () => {
    cy.visit("http://localhost:5173");

    cy.intercept(
      "GET",
      "https://6540a96145bedb25bfc247b4.mockapi.io/api/login",
      {
        statusCode: 200,
        body: [
          { email: "erdem.guntay@wit.com.tr", password: "9fxIH0GXesEwH_I" }, // Geçerli kullanıcı bilgileri
        ],
      }
    ).as("mockLogin");

    cy.get('input[name="email"]').type("erdem.guntay@wit.com.tr");

    cy.get('input[name="password"]').type("9fxIH0GXesEwH_I");

    cy.get('input[name="terms"]').check().should("be.checked");

    cy.get('button[type="submit"]').should("not.be.disabled").click();

    cy.wait("@mockLogin").its("response.statusCode").should("eq", 200);

    cy.url().should("include", "/Success");
  });
});
