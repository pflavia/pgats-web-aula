class Produtos {
    validarTelaProdutos() {
        cy.get('[class="title text-center"]').parent().contains('All Products').should('be.visible')
        return this;
    }
    clicarNoPrimeiroProduto() {
        const primeiroProduto = cy.get('[class="fa fa-plus-square"]').parentsUntil('[class="single-products"]').first();
        const ultimoProduto = cy.get('[class="fa fa-plus-square"]').parentsUntil('[class="single-products"]').last();
        if (primeiroProduto.hash() == ultimoProduto.hash()) {
            cy.should(false);
        }
        cy.get('[class="fa fa-plus-square"]').parent().first().click();
        return this;
    }
    validarProdutoClicado(posicao) {
        if (posicao == 'Primeiro')
            cy.url().should('include', 'product_details/1')
        else if (posicao == 'Segundo')
            cy.url().should('include', 'product_details/2');
        else if (posicao == 'Terceiro')
            cy.url().should('include', 'product_details/3');
        else if (posicao == 'Ultimo')
            cy.url().should('include', 'product_details/43');
        return this;
    }
    pesquisarProduto(produto) {
        cy.get('input#search_product').type(produto);
        cy.get('button#submit_search').click();
        cy.url().should('include', `/products?search=${produto}`);
        cy.get('.title').should('be.visible').and('contain', 'Searched Products');
        cy.get('.single-products').should('be.visible').and('have.length.at.least', 1);
    }
    adicionarCarrinho(posicao){
        cy.get('[class="product-image-wrapper"]').eq(posicao-1).find('[class="btn btn-default add-to-cart"]').first().click();
        return this;
    }    continuarComprando(){
        cy.get('[class="modal-dialog modal-confirm"]')
        cy.contains('Added!').should('be.visible')
        cy.get('[class="btn btn-success close-modal btn-block"]').click()
        return this;
    }
    irParaCarrinhoDuranteInclusaoProduto(){
        cy.contains('View Cart').click();
        return this;
    }
    alterarQuantidadeTelaDetalhes(quantidade){
        cy.get('#quantity').clear().type(quantidade)
        return this;
    }
    adicionarAoCarrinhoTelaDetalhes(){
        cy.get('[class="btn btn-default cart"]').click()
        return this;
    }
    irParaCarrinhoDuranteInclusaoProdutoTelaDetalhes(){
        cy.contains('View Cart').click();
        return this;
    }
}
export default new Produtos()