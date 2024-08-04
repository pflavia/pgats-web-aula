class Contato {
    preencherContato(nome, email) {
        cy.get('[data-qa="name"]').type(nome);
        cy.get(`[data-qa="email"]`).type(email);
        cy.get(`[name="subject"]`).type("Texto para contato.");
        cy.get(`[data-qa="message"]`).type("Teste de texto grande para teste. Geração de texto grande para teste da tela de contato.");
        cy.get(`input[name="upload_file"]`).selectFile("cypress/pages/contato/contato.txt", "{force: true}");
        cy.get(`[data-qa="submit-button"]`).click();
        return this;
    }
    validarContatoCadastrado() {
        cy.contains('Success! Your details have been submitted successfully.').should('be.visible');
        return this;
    }
    validarTelaContato() {
        cy.contains('Get In Touch').should('be.visible')
        return this;
    }
    voltarHome() {
        cy.contains('Home').click();
        return this;
    }

}
export default new Contato()