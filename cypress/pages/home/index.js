class Home {

    validarHome() {
        cy.get('[alt="Website for automation practice"]').should('be.visible');
        cy.contains('Full-Fledged practice website for Automation Engineers');
        cy.url().should('eq', 'https://automationexercise.com/');
            return this;

    }
    acessarSite() {
        cy.visit('/');
        return this;
    }
    iniciarVariaveis() {
        const timestamp = new Date().getTime();
        const emailLogin = `qauser-${timestamp}@mail.com`;
        Cypress.env('emailLogin', emailLogin);

        Cypress.env('nomeLogin', "QA User")
        Cypress.env("senha", "12345")
        Cypress.env("nomeLoginJaCadastrado", "a@a")
        Cypress.env("emailLoginJaCadastrado", "a1@abc")
        Cypress.env("senhaCorreta", "1")
        Cypress.env("senhaIncorreta", "12345")
        return this;
    }
    inscreverEmail(){
        cy.contains("Subscription").should('be.visible');
        cy.get("#susbscribe_email").type(Cypress.env('emailLogin'));
        cy.get('[class="fa fa-arrow-circle-o-right"]').click();
        cy.contains('You have been successfully subscribed!').should('be.visible');
        return this;
    }
}
export default new Home()