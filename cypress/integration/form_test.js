describe('Pizza Form App', () => {
    // ---------- Refresh ---------- //
    beforeEach(() => {
        cy.visit('http://localhost:3000/pizza')
    })

    // ---------- Helpers ---------- //
    const orderBtn = () => cy.get('button[id="order-button"]');
    const nameInput = () => cy.get('input[id="name-input"]');
    const sizeInput = () => cy.get('select[id="size-dropdown"]');
    const sauceInput = () => cy.get('[type="radio"]');
    const pepperoniInput = () => cy.get('input[name="pepperoni"]');
    const sausageInput = () => cy.get('input[name="sausage"]');
    const canBaconInput = () => cy.get('input[name="canBacon"]');
    const onionsInput = () => cy.get('input[name="onions"]');
    const specialTextInput = () => cy.get('input[id="special-text"]');
    // Fake const
    const foobar = () => cy.get('input[name=foobar]');

    // ---------- Tests ---------- //
    it('Sanity Check', () => {
        expect(1 + 2).to.equal(3);
        expect(2 + 2).not.to.equal(5);
        expect({}).not.to.equal({});
    });

    it('Proper elements are showing', () => {
        foobar().should('not.exist');

        orderBtn().should('exist');
        nameInput().should('exist');
        sizeInput().should('exist');
        sauceInput().should('exist');
        pepperoniInput().should('exist');
        sausageInput().should('exist');
        canBaconInput().should('exist');
        onionsInput().should('exist');
        specialTextInput().should('exist');
    });

    describe('Filling out inputs', () => {
        it('Can navigate to site', () => {
            cy.url().should('include', 'localhost');
        });

        it('Order button starts disabled', () => {
            orderBtn().should('be.disabled');
        });

        it('Can fill out inputs + Order enables when filled properly', () => {
            nameInput()
                .should('have.value', '')
                .type('Amy')
                .should('have.value', 'Amy')
            sizeInput()
                .should('have.value', '')
                .select('Small')
                .should('have.value', 'Small')
            sauceInput()
                .should('not.be.checked')
                .check('Garlic Ranch')
                .should('have.value', 'Garlic Ranch')
            pepperoniInput()
                .should('not.be.checked')
                .check()
                .should('be.checked')
            sausageInput()
                .should('not.be.checked')
                .check()
                .should('be.checked')
            canBaconInput()
                .should('not.be.checked')
                .check()
                .should('be.checked')
            onionsInput()
                .should('not.be.checked')
                .check()
                .should('be.checked')
            specialTextInput()
                .should('have.value', '')
                .type('Beep')
                .should('have.value', 'Beep')

            orderBtn()
                .should('not.be.disabled');
        });

        it('Incorrect inputs do not enable submit + Errors show up', () => {
            nameInput().type('q');
            sizeInput().select('Small').select('');

            cy.contains('must').should('exist'); // Check for name error
            cy.contains("We can't").should('exist'); // Check for pizza error

            orderBtn().should('be.disabled');
        });
    });

    describe('Order a pizza', () => {
        it('Can submit a pizza', () => {
            nameInput().type('Amy');
            sizeInput().select('Small');
            sauceInput().check('Original Red');
            specialTextInput().type('Testing...');

            orderBtn().click();

            cy.contains('You Ordered Pizza!!').should('exist');
        });
    });
});