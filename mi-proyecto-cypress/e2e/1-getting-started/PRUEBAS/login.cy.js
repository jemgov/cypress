it('Hago el request del login', function(){
   var resp=cy.request({
       method:"POST",
       url: 'https://practicetestautomation.com/practice-test-login/',
       form: true,
       body: {
           Email1: "student",
           Password:"Password123!",
           send:"1"
       }
   }).then((resp)=> {
       expect(resp.status).to.eq(200)
   })
   cy.visit('https://practicetestautomation.com/logged-in-successfully/')
   cy.get('.post-title').should("have.text","Logged In Successfully")
})

