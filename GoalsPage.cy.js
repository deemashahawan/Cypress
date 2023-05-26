describe('Staff page',()=>{

    beforeEach(()=>{
        cy.visit('https://goal-dev.mdx.ac.uk/');
        cy.get('#id_username').type('Deema');
        cy.get('#id_password').type('DEEMA_shahwan');
        cy.get('select[name="login_as"]').select('staff');
        cy.get('form[action="/login/"]> button[type="submit"]').click();
        cy.get('a[href="/staff/34"]').click();
        cy.visit('https://goal-dev.mdx.ac.uk/staff/34/goals/');

    });

    it('Open Goals page',()=>{
        cy.get('.tab-content').should('exist');
        cy.get('.navbar').should('exist');
        cy.get('.container-fluid').should('exist');
        cy.get('.row').should('exist');
        cy.get('.col-sm-8').should('exist');
        cy.get('#goal_filter').should('exist');
        cy.get('.col-2').should('exist');
        cy.get('#observer_table_div').should('exist');
    });

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

    it('test applaying filtter without any auther filters',()=>{
        ////////////
        ///////////////////////

    });

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


});