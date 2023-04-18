import { AuthenticationParams } from '@/domain/usecases';
import { faker } from '@faker-js/faker';
import { AccountModel } from '@/domain/models';

export const mockAuthencation = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid(),
  name: faker.name.firstName(),
});
