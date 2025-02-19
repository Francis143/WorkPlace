describe("Handling alerts", () => {
  beforeEach("", () => {
    cy.visit("https://testautomationpractice.blogspot.com/");
  });
  it("Simple alert ", () => {
    cy.on("window:alert", (message) => {
      expect(message).to.equal("I am an alert box!");
    });
    cy.get("#alertBtn").click();
  });
  it("Confirm Alert ", () => {
    cy.on("window:confirm", (message) => {
      expect(message).to.equal("Press a button!");
      return true;
    });
    cy.get("#confirmBtn").click();
  });
  it("Confirm Alert ", () => {
    cy.on("window:confirm", (message) => {
      expect(message).to.equal("Press a button!");
      return false;
    });
    cy.get("#confirmBtn").click();
  });
});
