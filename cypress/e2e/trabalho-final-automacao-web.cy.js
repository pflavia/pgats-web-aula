/// <reference types="cypress" />
//pom  - page object Model
require('cypress-xpath');
import { faker } from '@faker-js/faker';
import cadastro from '../pages/cadastro';
import login from '../pages/login';
import menu from '../pages/menu';
import home from '../pages/home';
import contato from '../pages/contato';
import casosDeTestes from '../pages/casosDeTestes';
import produtos from '../pages/produtos';
import inscreverEmail from '../pages/inscreverEmail';
import carrinho from '../pages/carrinho'
import 'dotenv/config';


describe('Automation Exercise', () => {
  beforeEach(() => {
    home
      .iniciarVariaveis()
      .acessarSite()
      .validarHome();
  });
  afterEach(() => {
    cy.screenshot()

  });

  it('Test Case 1: Register User', () => {
    menu.irParaCadastrar();
    cadastro
      .validarTelaCadastroLogin()
      .preencherCadastro()
      .validarTelaCadastro()
      .preencherFormulário()
      .verificaCadastro();
    cy.screenshot()
    cadastro
      .deletarCadastro()
      .verificaDeletarCadastro()

  });
  it('Test Case 2: Login correto', () => {
    menu.irParaCadastrar();
    cadastro
      .preencherCadastro()
      .preencherFormulário()
    login.logout();
    menu.irParaLogin();
    login
      .validarTelaLogin()
      .preencherLogin()
      .validarLogin(Cypress.env('nomeLogin'));
    cy.screenshot()
    cadastro
      .deletarCadastro()
      .verificaDeletarCadastro

  });
  it('Test Case 3: Login incorreto', () => {
    menu.irParaLogin();
    login
      .validarTelaLogin()
      .preencherLoginComEssesDados(Cypress.env('emailLoginJaCadastrado'), Cypress.env('senhaIncorreta'))
      .validarEmailOuSenhaIncorreta();
  });
  it('Test Case 4: Logout', () => {
    menu.irParaLogin();
    login
      .validarTelaLogin()
      .preencherLoginComEssesDados(Cypress.env('emailLoginJaCadastrado'), Cypress.env('senhaCorreta'))
      .validarLogin(Cypress.env('nomeLoginJaCadastrado'))
      .logout()
      .validarTelaLogin();
  });
  it('Test Case 5: Cadastro e-mail já cadastrado', () => {
    menu.irParaCadastrar();
    cadastro
      .validarTelaCadastroLogin()
      .preencherCadastroComEssesDados(Cypress.env('nomeLoginJaCadastrado'), Cypress.env('emailLoginJaCadastrado'))
      .validarEmailJaCadastrado();
  });
  it('Test Case 6: Formulário de contato', () => {
    menu.irParaContato();
    contato
      .validarTelaContato()
      .preencherContato(Cypress.env('nomeLogin'), Cypress.env('emailLogin'))
      .validarContatoCadastrado()
      .voltarHome();
    home.validarHome();
  });
  it('Test Case 7: Formulário de contato', () => {
    menu.irParaTestCase()
    casosDeTestes.validarTelaTestCase()
  });
  it('Test Case 8: Clicar no 1º produto da lista', () => {
    menu.irParaProdutos();
    produtos
      .validarTelaProdutos()
      .clicarNoPrimeiroProduto()
      .validarProdutoClicado('Primeiro');
  });
  it('Test Case 9: Pesquisa produto', () => {
    menu.irParaProdutos();
    produtos
      .validarTelaProdutos()
      .pesquisarProduto('Shirt')


  });
  it('Test Case 10: Verificar inscrever e-mail na home', () => {
    inscreverEmail.inscreverEmail()
  });
  it('Test Case 11: Verificar inscrever e-mail na tela carrinho', () => {
    menu.irParaCarrinho();
    inscreverEmail.inscreverEmail()
  });

  it('Test Case 12: Adicionar item ao carrinho', () => {
    menu.irParaProdutos();
    produtos
      .adicionarCarrinho(1)
      .continuarComprando()
      .adicionarCarrinho(3)
      .irParaCarrinhoDuranteInclusaoProduto()
    carrinho
      .contarNumeroProdutosCarrinho(2)
      .validarProdutoCarrinho(1, 'Rs. 500', '1', 'Rs. 500')
      .validarProdutoCarrinho(3, 'Rs. 1000', '1', 'Rs. 1000')

  });
  it('Test Case 13: Adicionar quatro unidades de um produto ao carrinho', () => {
    menu.irParaProdutos();
    produtos
      .validarTelaProdutos()
      .clicarNoPrimeiroProduto()
      .alterarQuantidadeTelaDetalhes(4)
      .adicionarAoCarrinhoTelaDetalhes()
      .irParaCarrinhoDuranteInclusaoProdutoTelaDetalhes()
    carrinho.validarProdutoCarrinho(1, 'Rs. 500', '4', 'Rs. 2000')
  });

  it('Test Case 14: Comprar com registro na compra', () => {
    menu.irParaProdutos();
    produtos
      .validarTelaProdutos()
      .clicarNoPrimeiroProduto()
      .alterarQuantidadeTelaDetalhes(4)
      .adicionarAoCarrinhoTelaDetalhes()
      .irParaCarrinhoDuranteInclusaoProdutoTelaDetalhes()
    carrinho.validarTelaCarrinho().efutuarCompraDeslogado().irParaLoginAoEfetuarCompra()
    cadastro
      .validarTelaCadastroLogin()
      .preencherCadastro()
      .validarTelaCadastro()
      .preencherFormulário()
      .verificaCadastro();
    menu.irParaCarrinho()
    carrinho
      .efutuarCompraLogado()
      .verificarDadosPedido(1)
      .confirmarPedidoECadatrarMensagem()
      .dadosPagamento()
    cy.screenshot()
    cadastro
      .deletarCadastro()
      .verificaDeletarCadastro()
  });

  it('Test Case 15: Comprar com registro antes da comprat', () => {
    menu.irParaCadastrar();
    cadastro
      .validarTelaCadastroLogin()
      .preencherCadastro()
      .validarTelaCadastro()
      .preencherFormulário()
      .verificaCadastro();

    menu.irParaProdutos();
    produtos
      .validarTelaProdutos()
      .clicarNoPrimeiroProduto()
      .alterarQuantidadeTelaDetalhes(4)
      .adicionarAoCarrinhoTelaDetalhes()
      .irParaCarrinhoDuranteInclusaoProdutoTelaDetalhes()

    carrinho
      .validarTelaCarrinho()
      .efutuarCompraLogado()
      .verificarDadosPedido(1)
      .confirmarPedidoECadatrarMensagem()
      .dadosPagamento()
    cy.screenshot()

    cadastro
      .deletarCadastro()
      .verificaDeletarCadastro()
  });
});