it("Visita una página remota",()=>{
cy.visit('https://example.cypress.io/commands/navigation', {
  timeout: 50000, //define el tiempo de respuesta
  onBeforeLoad: function(contentWindow){        //onBeforeLoad: antes cargar
    //contentWindow es el objeto de ventana de la página remota
    console.log('Antes de cargar')
},
  onLoad: function(contentWindow){              //onLoad: después de cargar
    console.log('Después de cargar')
}
    })
})



it("Ejemplo de autenticación básica",()=>{
cy.visit('https://example.cypress.io/', {
    auth: {
        username: 'wile',
        password: 'coyote',
    },
    })
    console.log('Autenticación correcta')
})