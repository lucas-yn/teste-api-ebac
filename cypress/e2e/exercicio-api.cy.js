/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
import contrato from '../contracts/usuarios.contrato'

describe('Testes da Funcionalidade Usuários', () => {

  it('Deve validar contrato de usuários', () => {
     cy.request('usuarios').then(response =>{
      return contrato.validateAsync(response.body)
     })
  });

  it('Deve listar usuários cadastrados', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios'
    }).should((response) => {
      expect(response.status).equal(200)
    }) 
  });

  it('Deve cadastrar um usuário com sucesso', () => {
    cy.cadastrarUsuario(faker.person.fullName(), faker.internet.email(), 'teste', 'true')
    .should((response => {
      expect(response.status).to.equal(201)
      expect(response.body.message).equal('Cadastro realizado com sucesso')
    }))
  });

  it('Deve validar um usuário com email inválido', () => {
    cy.cadastrarUsuario("Fulano da Silva", "beltrano@qa.com.br", 'teste', 'true')
    .should((response =>{
      expect(response.status).to.equal(400)
      expect(response.body.message).equal('Este email já está sendo usado')
      
    }))
   
  });

  it('Deve editar um usuário previamente cadastrado', () => {
    cy.cadastrarUsuario("Lucas Nascimento", faker.internet.email(), 'teste', 'true')
    .then(response => {
      let id = response.body._id
      cy.request({
        method: 'PUT',
        url: `usuarios/${id}`,
        body: {
          "nome": "Lucas Nascimento editado",
          "email": faker.internet.email(),
          "password": "teste",
          "administrador": "true",
          
      }
      }).should((response =>{
        expect(response.body.message).to.equal('Registro alterado com sucesso')
        expect(response.status).to.equal(200)
      }))
    })

  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    cy.cadastrarUsuario(faker.person.fullName(), faker.internet.email(), 'teste', 'true')
    .then(response =>{
      let id = response.body._id
      cy.request({
        method: 'DELETE',
        url: `usuarios/${id}`
      }).should(response => {
        expect(response.body.message).to.equal('Registro excluído com sucesso')
      })
    })
  });


});
