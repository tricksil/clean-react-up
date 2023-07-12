import { Authentication } from '@/domain/usecases';
import { mockAccountModel } from '@/domain/test';
import { faker } from '@faker-js/faker';

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAuthenticationModel = (): Authentication.Model =>
  mockAccountModel();

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel();
  params: Authentication.Params;
  callsCount = 0;
  async auth(params: Authentication.Params): Promise<Authentication.Model> {
    this.params = params;
    this.callsCount++;
    return Promise.resolve(this.account);
  }
}
