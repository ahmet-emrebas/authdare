describe("SidenavModule", () => {
  beforeEach(() => {
    cy.visit("localhost:4200/doc");
  });
  it("should display visible text value of title and sidenav items", () => {
    cy.get('[cy-data^="sidenavTitle"]').should(
      "have.text",
      "Authdare Material Doc"
    );

    cy.get('[cy-data^="sidenavItemForm"]').shouldHaveTrimmedText("Form");
    cy.get('[cy-data^="sidenavItemChart"]').shouldHaveTrimmedText("Chart");
    cy.get('[cy-data^="sidenavItemNavbar"]').shouldHaveTrimmedText("Navbar");
  });
});
