//método 1
describe("Pruebas de cypress",() =>{
    it("visitar la pagina y marcar una tarea como terminada",()=>{
        cy.visit("https://example.cypress.io/todo")
        cy.get(".todo-list li").first().get(".toggle").first().click()
    })
})

//método 2
describe("Pruebas de cypress",() =>{
    it("visitar la pagina y marcar una tarea como terminada",()=>{
        cy.visit("https://example.cypress.io/todo")
        cy.get(".todo-list li .toggle").first().click()
    })
})



//buscar por css
//class="hola"
//.hola{
  //  color: red;
//}


//describe("titulo de mis pruebas")
    //it "titulo de mi prueba"
      //cy.visit("https://example.cypress.io")  //visita la página
        ///cy.get(elemento).click()    //busca un elemento dentro de la página