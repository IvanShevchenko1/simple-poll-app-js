// cypress/e2e/app.cy.ts

describe('Polls App E2E', () => {
  const user = {
    name: 'Test User',
    email: 'user' + Date.now() + '@test.com',
    password: 'test12345',
    gender: 'Чоловіча',
    dob: '2000-01-01'
  };

  beforeEach(() => {
    cy.visit('http://localhost:3000'); // чи ваш порт
  });

  it('Відкриває головну сторінку та бачить форму входу', () => {
    cy.contains('Вхід до сайту').should('exist');
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
  });

  it('Реєструє нового користувача', () => {
    cy.contains('Реєстрація').click();
    cy.contains('Реєстрація користувача').should('exist');
    cy.get('input[name="name"]').type(user.name);
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);
    cy.get('select[name="gender"]').select(user.gender);
    cy.get('input[name="dob"]').type(user.dob);
    cy.contains('Зареєструватися').click();
    cy.contains('Створити нове опитування').should('exist');
  });

  it('Виходить з акаунта і заходить знову', () => {
    cy.login(user.email, user.password);
    cy.contains('Вийти').click();
    cy.contains('Вхід до сайту').should('exist');
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);
    cy.contains('Увійти').click();
    cy.contains('Створити нове опитування').should('exist');
  });

  it('Валідація неправильного логіну', () => {
    cy.get('input[name="email"]').type('wrong@mail.com');
    cy.get('input[name="password"]').type('wrongpass');
    cy.contains('Увійти').click();
    cy.contains('Неправильний email або пароль').should('exist');
  });

  it('Створення нового опитування', () => {
    cy.login(user.email, user.password);
    cy.get('input[placeholder="Питання"]').type('Скільки буде 2+2?');
    cy.get('input[placeholder="Варіант 1"]').type('4');
    cy.get('input[placeholder="Варіант 2"]').type('5');
    cy.contains('Створити опитування').click();
    cy.contains('Скільки буде 2+2?').should('exist');
  });

  it('Валідація полів реєстрації', () => {
    cy.contains('Реєстрація').click();
    cy.contains('Зареєструватися').click();
    cy.get('form').should('exist'); // Форма лишається
  });

  it('Неможливість створити опитування з 1 варіантом', () => {
    cy.login(user.email, user.password);
    cy.get('input[placeholder="Питання"]').type('Одноваріантне?');
    cy.get('input[placeholder="Варіант 1"]').type('Перший');
    cy.get('input[placeholder="Варіант 2"]').clear();
    cy.contains('Створити опитування').click();
    cy.contains('Створити нове опитування').should('exist'); // не створить
  });

});


Cypress.Commands.add('login', (email, password) => {
  cy.visit('http://localhost:3000');
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.contains('Увійти').click();
});
