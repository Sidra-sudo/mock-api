/// <reference types="cypress"/>

describe('Login user',() => {

    it('Should Verify that user is able to login',() => { 

        cy.visit('http://localhost:4200/login')
        cy.get('[placeholder="Email"]').type('devqa123@gmail.com')
        cy.get('[placeholder="Password"]').type('123456')
        cy.get('form').submit()
    })
    it ('should login', () => {
        cy.log('Yeey we logged in!')
    })
})

describe('Creating new article',() => {
    it('Should verify correct request and response while creating new article', () => {

        cy.intercept('POST', '**/articles').as('postArticles')

        cy.contains('New Article').click()
        cy.get('[formcontrolname="title"]').type('Article from cypress')
        cy.get('[formcontrolname="description"]').type('Automatically created this artcle')
        cy.get('[formcontrolname="body"]').type('Test Article ro delete automatically')
        cy.get('[formcontrolname="body"]').type('#cypress')
        cy.contains('Publish Article').click()
        })
})
    it('Should display Tags list in Popular Tags',() => {
        cy.intercept('GET', '**/tags*', { fixture: "tags.json" }).as('gettags')

        cy.visit('http://localhost:4200')
        cy.wait('@gettags').then((tagdata) => {
                cy.log(tagdata.body)
                expect(tagdata.response.body.tags).to.contain('welcome')
                expect(tagdata.response.body.tags).to.contain('implementations')
                expect(tagdata.response.body.tags).to.contain('introduction')
                expect(tagdata.response.body.tags).to.contain('codebaseShow')
                expect(tagdata.response.body.tags).to.contain('cypress')
                expect(tagdata.response.body.tags).to.contain('automation')
                expect(tagdata.response.body.tags).to.contain('testing')
        })
        
    })
    it('should verify global feed', () => {
        cy.intercept('GET', '**articles/feed*', '{"articles":[],"articlesCount":0}')
        cy.intercept('GET', '**/articles*', { fixture: "article.json" }).as('getglobalfeed')

        cy.contains(' Global Feed ').click()
        cy.wait('@getglobalfeed').then((inter) => {
            cy.log(inter.body)
            expect(inter.response.body.articles).to.have.length(4)
        
        cy.get('app-article-list button').then( listofbuttons => {
            expect(listofbuttons[0]).to.contain('100')
            expect(listofbuttons[1]).to.contain('2563')
            expect(listofbuttons[2]).to.contain('1486')
            expect(listofbuttons[3]).to.contain('1036')
        })
    })

})

    it('Should verify user is able to update profile from settings', () => {
        cy.visit('http://localhost:4200/login')
        cy.get('[placeholder="Email"]').type('devqa123@gmail.com')
        cy.get('[placeholder="Password"]').type('123456')
        cy.get('form').submit()
        cy.intercept('GET', '**/profiles/*', { fixture: "user.json" }).as('updateprofile')

        cy.contains('Settings').click()
    // cy.get('[formcontrolname="image"]').clear().type('Sidra')
        cy.get('[formcontrolname="bio"]').clear().type('Automation Engineer')
        cy.contains('Update Settings').click()
        cy.wait('@updateprofile').then((profile) => {
        cy.log(profile.response)
        expect(profile.response.statusCode).to.equal(200)
    })

})
