declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId: (id: string) => Chainable<JQuery<HTMLElement>>;
    }
  }
}

export {};
