import * as Helpers from '../utils/helpers';
import * as Http from '../utils/http-mocks';

const path = /surveys/;

const mockLoadSuccess = (delay?: number): void => {
  Http.mockOk({ url: path, method: 'GET', delay, fixture: 'survey-result' });
};

describe('SurveyResult', () => {
  describe('load', () => {
    const mockUnexpectedError = (): void => {
      Http.mockServerError(path, 'GET');
    };

    const mockAccessDeniedError = (): void => {
      Http.mockForbiddenError(path, 'GET');
    };
    beforeEach(() => {
      cy.fixture('account').then((account) => {
        Helpers.setLocalStorageItem('account', account);
      });
    });

    it('Should present error on UnexpectedError', () => {
      cy.visit('/surveys/any_id');
      mockUnexpectedError();
      cy.getByTestId('error').should(
        'contain.text',
        'Algo de errado aconteceu. Tente novamente em breve.'
      );
    });

    it('Should reload on button click', () => {
      cy.visit('/surveys/any_id');
      mockUnexpectedError();
      cy.getByTestId('error').should(
        'contain.text',
        'Algo de errado aconteceu. Tente novamente em breve.'
      );
      mockLoadSuccess();
      cy.getByTestId('reload').click();
      cy.getByTestId('question').should('exist');
    });

    it('Should logout on AccessDeniedError', () => {
      cy.visit('/surveys/any_id');
      mockAccessDeniedError();
      Helpers.testUrl('/login');
    });

    it('Should present survey items', () => {
      cy.visit('/surveys/any_id');
      mockLoadSuccess(100);
      cy.getByTestId('question').should('have.text', 'Qual o seu nome?');
      cy.getByTestId('day').should('have.text', '28');
      cy.getByTestId('month').should('have.text', 'jun');
      cy.getByTestId('year').should('have.text', '2023');
      cy.get('li:nth-child(1)').then((li) => {
        assert.equal(li.find('[data-testid="answer"]').text(), 'any_answer');
        assert.equal(li.find('[data-testid="image"]').attr('src'), 'any_image');
        assert.equal(li.find('[data-testid="percent"]').text(), '70%');
      });
      cy.get('li:nth-child(2)').then((li) => {
        assert.equal(li.find('[data-testid="answer"]').text(), 'other_answer');
        assert.notExists(li.find('[data-testid="image"]'));
        assert.equal(li.find('[data-testid="percent"]').text(), '30%');
      });
    });

    it('Should goto SurveyList on back button click', () => {
      cy.visit('');
      cy.visit('/surveys/any_id');
      mockLoadSuccess();
      cy.getByTestId('back-button').click();
      Helpers.testUrl('/');
    });
  });
  describe('save', () => {
    const mockUnexpectedError = (): void => {
      Http.mockServerError(path, 'PUT');
    };

    beforeEach(() => {
      cy.fixture('account').then((account) => {
        Helpers.setLocalStorageItem('account', account);
      });

      cy.visit('/surveys/any_id');
      mockLoadSuccess(100);
    });

    it('Should present error on UnexpectedError', () => {
      mockUnexpectedError();
      cy.get('li:nth-child(2)').click();
      cy.getByTestId('error').should(
        'contain.text',
        'Algo de errado aconteceu. Tente novamente em breve.'
      );
    });
  });
});
