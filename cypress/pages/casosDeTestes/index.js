class casosDeTestes {
    validarTelaTestCase() {
        cy.get('[class="title text-center"]').parent().contains('Test Cases').should('be.visible')
        return this;
    }
}

export default new casosDeTestes()