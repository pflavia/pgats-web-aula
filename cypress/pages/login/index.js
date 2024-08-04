import cadastro from '../cadastro';
class Login {
    preencherLoginComEssesDados(usuario, senha) {
        cy.get(`[data-qa="login-email"]`).type(usuario);
        cy.get(`[data-qa="login-password"]`).type(senha, { log: false });
        cy.get('[data-qa="login-button"]').click();
        return this;
    }
    preencherLogin() {
        cy.get(`[data-qa="login-email"]`).type(Cypress.env('emailLogin'));
        cy.get(`[data-qa="login-password"]`).type(Cypress.env('senha'), { log: false });
        cy.get('[data-qa="login-button"]').click();
        return this;
    }

    validarLogin() {
        cy.get('[class="fa fa-user"]').should('be.visible');
        cy.get(`i.fa-user`).parent().should('contain', Cypress.env('nomeLogin'));
        return this;
    }
    validarLogin(nome) {
        cy.get('[class="fa fa-user"]').should('be.visible');
        cy.get(`i.fa-user`).parent().should('contain', nome);
        return this;
    }
    logout() {
        cy.contains(' Logout').click();
        return this;
    }
    validarTelaLogin() {
        cy.contains('Login to your account').should('be.visible');
        return this;
    }
    validarEmailOuSenhaIncorreta() {
        cy.get(`#form > div > div > div.col-sm-4.col-sm-offset-1 > div > form > p`).should('be.visible');
        cy.get(`#form > div > div > div.col-sm-4.col-sm-offset-1 > div > form > p`).should('contain', 'Your email or password is incorrect!');
        return this;
    }
}

export default new Login() 