import 'dotenv/config';
class Cadastro {
    preencherFormulário() {
        cy.get('input[type=radio]').check('Mrs');
        cy.get('[type="password"]').type(Cypress.env('senha', '12345'), { log: false });

        cy.get('#days').select('16');
        cy.get('#months').select('April');
        cy.get('#years').select('1987');

        cy.get('[name="newsletter"]').check();
        cy.get('[name="optin"]').check();

        cy.get('[data-qa="first_name"]').type('QA');
        cy.get('[data-qa="last_name"]').type('Tester');
        cy.get('[data-qa="company"]').type('Cypress');

        cy.get('[name="address1"]').type('123 Main St');
        cy.get('#address2').type('123 Main St');
        cy.get('[name="country"]').select('United States');
        cy.get('#state').type('New York');
        cy.get('#city').type('New York');
        cy.get('[data-qa="zipcode"]').type('89562');
        cy.get('[name="mobile_number"]').type('1234567890');
        cy.contains('Create Account').click();

        cy.contains('Account Created!').should('be.visible');
        cy.url().should('include', 'account_created');
        cy.contains(`Continue`).click();
        cy.get('[class="fa fa-user"]').should('be.visible');

        return this;
    }
    preencherCadastroComEssesDados(nome, email) {
        cy.get('[data-qa="signup-name"]').type(nome);
        cy.get('[data-qa="signup-email"]').type(email);
        cy.contains('button', 'Signup').click();
        return this;
    }
    preencherCadastro() {
        cy.get('[data-qa="signup-name"]').type(Cypress.env('nomeLogin'));
        cy.get('[data-qa="signup-email"]').type(Cypress.env('emailLogin'));
        cy.contains('button', 'Signup').click();
        return this;
    }
    verificaCadastro() {
        cy.contains("Logged in as " + Cypress.env('nomeLogin'));
        cy.get(`i.fa-user`).parent().should('contain', Cypress.env('nomeLogin'));
        return this;
    }
    verificaNomeCadastro(nome) {
        cy.get(`i.fa-user`).parent().should('contain', nome);
        return this;
    }

    deletarCadastro() {
        cy.contains(` Delete Account`).click();
        cy.contains('Account Deleted!').should('be.visible');
        cy.contains(` Continue`).click();
        return this;

    }
    verificaDeletarCadastro() {
        cy.url().should('include', 'delete_account');
        return this;
    }
    validarTelaCadastroLogin() {
        cy.contains('New User Signup!').should('be.visible');
        return this;
    }
    validarTelaCadastro() {
        cy.contains('Enter Account Information').should('be.visible');
        return this;
    }
    validarEmailJaCadastrado() {
        cy.contains('Email Address already exist!').should('be.visible');
        return this;
    }
}

export default new Cadastro()