it('Open staff page',()=>{
        cy.get('#staffs_wrapper').should('exist');
        cy.get('#staffs_filter').should('exist');
        cy.get('.dataTables_scroll').should('exist');
    });

*This test case determines whether three items on the staff page have particular selectors or classes. The test case will not pass if any of these components cannot be identified. By doing this, it is made sure that the staff page is presented properly and has all of the necessary components.

 it('Add staff with valid name',()=>{
        cy.get('.toolbar').should('exist');
        cy.get('#new_staff').type('Tala');
        cy.get('.toolbar > .row > :nth-child(2) > .btn').click();
        cy.get('tr#staff_Tala').should('exist');
    });

*This test case verifies that a new staff member row with the name "Tala" is added to the table when a valid name "Tala" is typed in the input field and the add button is pressed. To ensure that the inclusion of the staff member was successful, the existence of the necessary components is confirmed.

it('Add staff with not exist name',()=>{
        cy.get('.toolbar').should('exist');
        cy.get('#new_staff').type('Ahmad55');
        cy.get('.toolbar > .row > :nth-child(2) > .btn').click();
        cy.get('tr#staff_Ahmad55').should('exist');
    });

*This test case confirms that a new staff member row with the specified name is added to the table when an invalid name, such as "Ahmad55," is provided in the input field and the add button is pressed. To ensure that the inclusion of the staff member was successful, the existence of the necessary components is confirmed.

it('search for valid staff',()=>{
        cy.get('label').contains('Search').should('exist');
        cy.get('input[type="search"]').type('Deema');
        cy.get('tr#staff_Deema').should('exist');
    });


*This test case makes sure that the staff member row in the table is displayed when the search phrase "Deema" is typed into the search input box. To ensure that the search feature is functioning as intended, the existence of the pertinent items is confirmed.

it('search for invalid staff',()=>{
        cy.get('label').contains('Search').should('exist');
        cy.get('input[type="search"]').type('Ali');
        cy.get('td.dataTables_empty').should('be.visible').and('contain.text', 'No matching records found');
    });

*This test case confirms that the table shows a message stating the lack of matching entries when an invalid search word, such as "Ali," is typed into the search input box. To ensure that the search capability is functioning as intended, the existence of the pertinent items and the displayed text are checked.




it('remove a staff',()=>{
        cy.get('a[data-href="didoo"]').click({ force: true });

        cy.get('#confirm-delete')
          .should('be.visible')
          .within(() => {
            cy.get('.btn-default').click(); // Click on the "Cancel" button
            cy.get('.btn-danger').click(); // Click on the "Remove" button
          });
    });

*This test case makes sure that a confirmation dialog is shown when the staff removal procedure is started by clicking on the employee with the data-href attribute value "didoo." Additionally, the test case replicates selecting the "Cancel" and "Remove" buttons in the confirmation window. This validates how the employee dismissal request was confirmed and then cancelled.

it('Test applaying filtter for some data',()=>{
        cy.get('#topic_90').check({force: true});
        cy.get('.topic_90').each(($el) => { 
            cy.wrap($el).check({force: true}); 
          });
        cy.get('#all_levels').check();
        cy.get('input[name="level_filter"]').should('be.checked');
        cy.get('input[name="groups_filter"][group="g4"]').check({force: true});
        cy.get('button[onclick="applyGoalFilters(this)"]').click()
    });

*This test case verifies the application of filters for subject 90, all levels, and group "g4". It mimics selecting the appropriate checkboxes and pressing the filter application button. To ensure that the filters are used properly, the existence of the pertinent items and the status of the checkboxes are examined.

it('Test observe filter',()=>{
        cy.get('#topic_90').check({force: true});
        cy.get('.topic_90').each(($el) => { 
            cy.wrap($el).check({force: true}); 
          });
        cy.get('#all_levels').check();
        cy.get('input[name="level_filter"]').should('be.checked');
        cy.get('input[name="groups_filter"][group="g4"]').check({force: true});
        cy.get('button[onclick="observeAll(\'add\', this)"]').click();
        
    });

*This test case verifies the application of filters for subject 90, all levels, and group "g4". It acts as if you were to observe the filters by ticking the appropriate boxes and pressing the button. To ensure that the filters are used properly, the existence of the pertinent items and the status of the checkboxes are examined.

it('test Grade with all outher filters',()=>{
        cy.get('#topic_90').check({force: true});
        cy.get('.topic_90').each(($el) => { 
            cy.wrap($el).check({force: true}); 
          });
        cy.get('#all_levels').check();
        cy.get('input[name="level_filter"]').should('be.checked');
        cy.get('input[name="groups_filter"][group="g4"]').check({force: true});
        cy.get('select[name="grade"]').find('option').should(($option)=>{
            expect($option).to.have.length(12);
            expect($option.eq(0)).to.have.value('Grade');
            expect($option.eq(1)).to.have.value('0');
            expect($option.eq(2)).to.have.value('1');
            expect($option.eq(3)).to.have.value('2');
            expect($option.eq(4)).to.have.value('3');
            expect($option.eq(5)).to.have.value('4');
            expect($option.eq(6)).to.have.value('5');
            expect($option.eq(7)).to.have.value('6');
            expect($option.eq(8)).to.have.value('7');
            expect($option.eq(9)).to.have.value('8');
            expect($option.eq(10)).to.have.value('9');
            expect($option.eq(11)).to.have.value('10');
            });
        cy.get('select[name="grade"]').select('10');   
        cy.get('#snackbar').should('exist');
        cy.get('#snackbar').should('contain', 'The goal(s) have been graded successfully.');    
    });

*This test case verifies the accurate application of the filters for subject 90, all levels, and group "g4". Additionally, it confirms that the grade filter can be used and that the snackbar displays the anticipated success message once the grade has been applied.

it('Test Unobserve filter',()=>{
        cy.get('#all_goals').check({force: true})
        cy.get('.topic_filter').each((topic) => {
        cy.wrap(topic).check({force: true})
        cy.get(`.filter.${topic.attr('id')}`).each((goal) => {
        cy.wrap(goal).check({force: true})
       });
       });
        cy.get('#all_levels').check();
        cy.get('input[name="level_filter"]').should('be.checked');
        cy.get('input[name="groups_filter"][group="g4"]').check({force: true});
        cy.get('button').contains('Unobserve').click()

    });

*The criteria used in this test case are applied to all goals, subjects, levels, and group "g4". Next, it confirms that the level filter checkbox is indeed selected. By pressing the relevant button, it finally initiates the "Unobserve" operation.
