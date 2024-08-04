class Menu {
    menus = {
        PRODUTOS: 'Products',
        CARRINHO: 'Cart',
        LOGIN: ' Signup / Login',
        CADASTRO: ' Signup / Login',
        TEST_CASE: ' Test Cases',
        CONTATO:' Contact us'
    }
    irParaProdutos() {
        cy.contains(this.menus.PRODUTOS).click();
    }
    irParaCarrinho() {
        cy.contains(this.menus.CARRINHO).click();
    }
    irParaLogin() {
        cy.contains(this.menus.LOGIN).click();
    }
    irParaCadastrar() {
        cy.contains(this.menus.CADASTRO).click();
    }
    irParaTestCase() {
        cy.contains(this.menus.TEST_CASE).click();
    }
    irParaContato() {
        cy.contains(this.menus.CONTATO).click();
    }
}
export default new Menu()