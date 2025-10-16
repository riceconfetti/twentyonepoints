import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('Preferences e2e test', () => {
  const preferencesPageUrl = '/preferences';
  const preferencesPageUrlPattern = new RegExp('/preferences(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  // const preferencesSample = {"weightUnits":"LB"};

  let preferences;
  // let user;

  beforeEach(() => {
    cy.login(username, password);
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/users',
      body: {"login":"Chips Refined Unbranded","firstName":"Liana","lastName":"Graham"},
    }).then(({ body }) => {
      user = body;
    });
  });
   */

  beforeEach(() => {
    cy.intercept('GET', '/api/preferences+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/preferences').as('postEntityRequest');
    cy.intercept('DELETE', '/api/preferences/*').as('deleteEntityRequest');
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // Simulate relationships api for better performance and reproducibility.
    cy.intercept('GET', '/api/users', {
      statusCode: 200,
      body: [user],
    });

  });
   */

  afterEach(() => {
    if (preferences) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/preferences/${preferences.id}`,
      }).then(() => {
        preferences = undefined;
      });
    }
  });

  /* Disabled due to incompatibility
  afterEach(() => {
    if (user) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/users/${user.id}`,
      }).then(() => {
        user = undefined;
      });
    }
  });
   */

  it('Preferences menu should load Preferences page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('preferences');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Preferences').should('exist');
    cy.url().should('match', preferencesPageUrlPattern);
  });

  describe('Preferences page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(preferencesPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Preferences page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/preferences/new$'));
        cy.getEntityCreateUpdateHeading('Preferences');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', preferencesPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      /* Disabled due to incompatibility
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/preferences',
          body: {
            ...preferencesSample,
            user: user,
          },
        }).then(({ body }) => {
          preferences = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/preferences+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/preferences?page=0&size=20>; rel="last",<http://localhost/api/preferences?page=0&size=20>; rel="first"',
              },
              body: [preferences],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(preferencesPageUrl);

        cy.wait('@entitiesRequestInternal');
      });
       */

      beforeEach(function () {
        cy.visit(preferencesPageUrl);

        cy.wait('@entitiesRequest').then(({ response }) => {
          if (response.body.length === 0) {
            this.skip();
          }
        });
      });

      it('detail button click should load details Preferences page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('preferences');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', preferencesPageUrlPattern);
      });

      it('edit button click should load edit Preferences page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Preferences');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', preferencesPageUrlPattern);
      });

      it('edit button click should load edit Preferences page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Preferences');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', preferencesPageUrlPattern);
      });

      it.skip('last delete button click should delete instance of Preferences', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('preferences').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', preferencesPageUrlPattern);

        preferences = undefined;
      });
    });
  });

  describe('new Preferences page', () => {
    beforeEach(() => {
      cy.visit(`${preferencesPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Preferences');
    });

    it.skip('should create an instance of Preferences', () => {
      cy.get(`[data-cy="weeklyGoal"]`).type('17').should('have.value', '17');

      cy.get(`[data-cy="weightUnits"]`).select('LB');

      cy.get(`[data-cy="user"]`).select(1);

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        preferences = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', preferencesPageUrlPattern);
    });
  });
});
