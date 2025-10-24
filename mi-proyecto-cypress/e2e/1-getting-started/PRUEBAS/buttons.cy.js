describe("Botones",() =>{
    it("verificar texto de botón",()=>{
        cy.visit("https://formy-project.herokuapp.com/buttons")
        cy.get('.btn-warning').click()
        cy.get('#btnGroupDrop1').click()
        cy.get('.btn-group > .dropdown-menu > :nth-child(2)').should("have.text","Dropdown link 2")
    })
})