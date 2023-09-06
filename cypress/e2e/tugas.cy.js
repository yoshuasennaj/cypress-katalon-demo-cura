//Membuat variabel yang dibutuhkan
const url = 'https://katalon-demo-cura.herokuapp.com/';
const validUsername = 'John Doe';
const validPassword = 'ThisIsNotAPassword';
const invalidUsername = 'InvalidUsername';
const invalidPassword = 'InvalidPassword';

beforeEach(() => {
  cy.visit(url); //Mengujungi website
  cy.get('#menu-toggle').click(); //Klik toglle
  cy.contains('Login').click(); //Klik Login untuk masuk login page
});

describe('Login Feature', () => {
  it('Should be able to log in with valid credentials', () => {
    cy.get('#txt-username').type(validUsername);
    cy.get('#txt-password').type(validPassword);
    cy.get('#btn-login').click();
    cy.get('#btn-book-appointment').should('be.visible');
  });

  it('Should not be able to log in with invalid credentials', () => {
    cy.get('#txt-username').type(invalidUsername);
    cy.get('#txt-password').type(invalidPassword);
    cy.get('#btn-login').click();
    cy.contains('Login failed! Please ensure the username and passw').should('be.visible');
  });
});

describe('Make Appointment Feature', () => {
  it('Should be able to make an appointment', () => {
    cy.get('#txt-username').type(validUsername);
    cy.get('#txt-password').type(validPassword);
    cy.get('#btn-login').click();
    cy.contains('Make Appointment').click();
    cy.get('#combo_facility').select('Hongkong CURA Healthcare Center');
    cy.get('#chk_hospotal_readmission').check();
    cy.get('#radio_program_medicaid').check();
    cy.get('#txt_visit_date').type('09/06/2023');
    cy.get('#txt_comment').type('TestTest', { force: true });
    cy.get('#btn-book-appointment').click();
    cy.get('.col-xs-12.text-center').should('contain', 'Appointment Confirmation');
  });
});
