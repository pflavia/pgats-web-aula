class InscreverEmail{
    inscreverEmail(){
        cy.contains("Subscription").should('be.visible');
        cy.get("#susbscribe_email").type(Cypress.env('emailLogin'));
        cy.get('[class="fa fa-arrow-circle-o-right"]').click();
        cy.contains('You have been successfully subscribed!').should('be.visible');
        return this;
    }
}
export default new InscreverEmail()