// You can scroll to 9 specific positions of an element:
//  -----------------------------------
// | topLeft        top       topRight |
// |                                   |
// |                                   |
// |                                   |
// | left          center        right |
// |                                   |
// |                                   |
// |                                   |
// | bottomLeft   bottom   bottomRight |
//  -----------------------------------

//se utiliza para indicar a cypress dónde tiene que buscar el elemento
  it('Desplazar la ventana o un elemento desplazable a una posición específica', () => {
    cy.visit("https://example.cypress.io/commands/actions")

// if you chain .scrollTo() off of cy, we will
// scroll the entire window
cy.scrollTo('bottom')

cy.get('#scrollable-horizontal').scrollTo('right')

// or you can scroll to a specific coordinate:
// (x axis, y axis) in pixels
cy.get('#scrollable-vertical').scrollTo(250, 250)       //por coordenadas

// or you can scroll to a specific percentage
// of the (width, height) of the element
cy.get('#scrollable-both').scrollTo('75%', '25%')       //por % de anchura y altura

// control the easing of the scroll (default is 'swing')
cy.get('#scrollable-vertical').scrollTo('center', { easing: 'linear' })     //con indicación mediante easing

// control the duration of the scroll (in ms)
cy.get('#scrollable-both').scrollTo('center', { duration: 2000 })           //con intervalo de duración de tiempo
})

// Tipos de easing para animaciones de scroll en cypress:

// linear: velocidad constante durante todo el desplazamiento
// swing: empieza lento, acelera en el medio y termina lento (valor por defecto)
// ease-in: empieza lento y acelera progresivamente
// ease-out: empieza rápido y desacelera hacia el final
// ease-in-out: empieza lento, acelera en el medio y vuelve a desacelerar al final
