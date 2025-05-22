describe('Bookings Form', () => {
  beforeEach(() => { // clear the local storage before each test
    cy.visit('http://localhost:5174/') // Visit the app URL
  });

  // Click the button to open the booking form
  it('User can add a Booking', () => {
    cy.get('[data-cy="add-booking-btn"]').click(); 

    cy.get('[data-cy="input-rental"]').select('Mountain Retreat'); // select a rental
    cy.get('[data-cy="input-date"]').type('2025-05-30'); // change to a future date
    cy.get('[data-cy="input-guests"]').clear().type('5'); // enter number of guests

    cy.get('[data-cy="booking-form"]').submit(); // submit the form
    cy.get('[data-cy="booking-btn"]').click();
    cy.contains('p', 'Rental: Mountain Retreat Date: 2025-05-30 Guests: 5'); // check if the booking is displayed
  });
});