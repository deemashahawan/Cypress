describe('Staff page',()=>{

    beforeEach(()=>{
        cy.visit('https://goal-dev.mdx.ac.uk/');
        cy.get('#id_username').type('Deema');
        cy.get('#id_password').type('DEEMA_shahwan');
        cy.get('select[name="login_as"]').select('staff');
        cy.get('form[action="/login/"]> button[type="submit"]').click();
        cy.get('a[href="/staff/34"]').click();
        cy.visit('https://goal-dev.mdx.ac.uk/staff/34/staffs/');

    });

    it('Open staff page',()=>{
        cy.get('#staffs_wrapper').should('exist');
        cy.get('#staffs_filter').should('exist');
        cy.get('.dataTables_scroll').should('exist');
    });

    it('Add staff with valid name',()=>{
        cy.get('.toolbar').should('exist');
        cy.get('#new_staff').type('Tala');
        cy.get('.toolbar > .row > :nth-child(2) > .btn').click();
        cy.get('tr#staff_Tala').should('exist');
    });
    
    it('Add staff with not exist name',()=>{
        cy.get('.toolbar').should('exist');
        cy.get('#new_staff').type('Ahmad55');
        cy.get('.toolbar > .row > :nth-child(2) > .btn').click();
        cy.get('tr#staff_Ahmad55').should('exist');
    });

    it('search for valid staff',()=>{
        cy.get('label').contains('Search').should('exist');
        cy.get('input[type="search"]').type('Deema');
        cy.get('tr#staff_Deema').should('exist');
    });

    it('search for invalid staff',()=>{
        cy.get('label').contains('Search').should('exist');
        cy.get('input[type="search"]').type('Ali');
        cy.get('td.dataTables_empty').should('be.visible').and('contain.text', 'No matching records found');
    });

    it('remove a staff',()=>{
        cy.get('a[data-href="didoo"]').click({ force: true });

        cy.get('#confirm-delete')
          .should('be.visible')
          .within(() => {
            cy.get('.btn-default').click(); // Click on the "Cancel" button
            cy.get('.btn-danger').click({force: true}); // Click on the "Remove" button
          });
    });





});