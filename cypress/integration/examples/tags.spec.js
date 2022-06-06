// <reference types="cypress"/>

describe('Test tags with mock APIs',() => {

    beforeEach('Show tags in Popular Tags list', () => {
        cy.intercept('GET', '**/tags', 'fixture:tags.json')

    })

    it('Should display Tags list in Popular Tags',() => { 

        cy.visit('http://localhost:4200')
    
        //Go to Popular Tags where tag list showing tags 
        cy.get('.tag-list')
        // .should('contains','welcome')
        // .and('contain','implementations')
        // .and('contain','introduction')
        // .and('contain','codebaseShow')
        .should('contains','cypress')
        .and('contain','automation')
        .and('contain','testing')
    })
})