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
});
