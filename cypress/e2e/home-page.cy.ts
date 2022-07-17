function selectTestElement(selector: string) {
  return `[data-test-id="${selector}"]`;
}

function getTestElement(selector: string) {
  return cy.get(selectTestElement(selector));
}

describe('home page', () => {
  it('should open list of movies', () => {
    cy.visit('localhost:8080');

    cy.url().should('include', '/search');
    getTestElement('MoviesDashboard__items-grid').children().should('have.length.above', 0);
  });

  it('should search movies', () => {
    cy.visit('localhost:8080');

    getTestElement('SearchPanel__controls').find('input').type('hell');
    getTestElement('SearchPanel__controls').find('button').click();
    getTestElement('MovieCard__info__title').should('contain.text', 'hell');
  });

  it('should select movie', async () => {
    cy.visit('localhost:8080');

    let randomMovieItemTitle: string;

    getTestElement('MoviesDashboard__items-grid').children().first()
      .then(($div) => {
        randomMovieItemTitle = $div.text();
      })
      .then(($div) => {
        $div.trigger('click');
      });

    getTestElement('MovieDetails')
      .find(selectTestElement('MovieCard__info__title'))
      .find('h1')
      .then(($h1) => {
        expect($h1.text()).eq(randomMovieItemTitle);
      });
  });
});
