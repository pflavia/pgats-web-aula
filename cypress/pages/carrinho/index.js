import { faker } from '@faker-js/faker';
class Carrinho {
    validarTelaCarrinho() {
        cy.contains('Shopping Cart').should('be.visible')
        return this
    }
    contarNumeroProdutosCarrinho(quantidadeEsperada) {
        cy.get('[class="product_image"]').should('be.visible').and('have.length', quantidadeEsperada)
        return this
    }

    validarProdutoCarrinho(posicaoProduto, precoUnitario, quantidade, precoTotal) {
        cy.get(`#product-${posicaoProduto}`).children('[class="cart_price"]').invoke('text').should('include', precoUnitario)
        cy.get(`#product-${posicaoProduto}`).children('[class="cart_quantity"]').invoke('text').should('include', quantidade)
        cy.get(`#product-${posicaoProduto}`).children('[class="cart_total"]').invoke('text').should('include', precoTotal)
        return this;
    }
    efutuarCompraDeslogado() {
        cy.contains('Proceed To Checkout').click()
        return this;
    }
    irParaLoginAoEfetuarCompra() {
        cy.get('#checkoutModal').wait(10000)
        cy.get('[href="/login"]').first().click({force: true})
        return this;
    }
    efutuarCompraLogado() {
        cy.contains('Proceed To Checkout').click()
        return this;
    }
    verificarDadosPedido(produto) {
        var regexp = require('regexp')
        var res = regexp('(.*?)New York(.*?)New York(.*?)89562(.*?)')
        cy.get('[class="address_city address_state_name address_postcode"]').invoke('text').should('include', 'New York New York\n\t\t\t\t\t\t\t\t89562New York New York\n\t\t\t\t\t\t\t\t89562')
        cy.get('[class="address_country_name"]').invoke('text').should('include', 'United States')
        cy.get('[class="address_phone"]').invoke('text').should('include', '1234567890')
        cy.get(`#product-${produto}`).should('be.visible')
        return this;
    }
    confirmarPedidoECadatrarMensagem() {
        cy.get('[name="message"]').type('Teste de mensagem. Pedido em andamento')
        cy.get('[class="btn btn-default check_out"]').click()
        return this;
    }
    dadosPagamento() {
        cy.get('[data-qa="name-on-card"]').type(faker.person.fullName())
        cy.get('[data-qa="card-number"]').type(faker.finance.creditCardNumber())
        cy.get('[data-qa="cvc"]').type(faker.finance.creditCardCVV())
        cy.get('[data-qa="expiry-month"]').type(12)
        cy.get('[data-qa="expiry-year"]').type(2035)
        cy.get('[data-qa="pay-button"]').click()
        //cy.contains('Your order has been placed successfully!').should('be.visible')
        cy.contains('Congratulations! Your order has been confirmed!').should('be.visible')
        return this;
    }

}

export default new Carrinho()