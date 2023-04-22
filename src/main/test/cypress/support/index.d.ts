declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId: (value: string) => Chainable<JQuery<HTMLElement>>;
    }
  }
}

export {};
