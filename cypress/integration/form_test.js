describe('Pizza Form App', () => {
    // ---------- Refresh ---------- //
    beforeEach(() => {
        cy.visit('http://localhost:3000/pizza')
    })

    // ---------- Helpers ---------- //
    const orderBtn = () => cy.get('button[id="order-button"]');
    const nameInput = () => cy.get('input[id="name-input"]');
    const sizeInput = () => cy.get('select[id="size-dropdown"]');
    const sauceInput = () => cy.get('input[id="sauce-radio"]');
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
});