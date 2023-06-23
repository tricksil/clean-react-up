import { RequiredFieldError } from '@/validation/errors';
import { RequiredFieldValidation } from './required-field-validation';
import { faker } from '@faker-js/faker';

const makeSut = (field: string): RequiredFieldValidation =>
  new RequiredFieldValidation(field);

describe('RequiredFieldValidation', () => {
  test('Should return error if fields is empty', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: '' });
    expect(error).toEqual(new RequiredFieldError());
  });

  test('Should return falsy if fields is not empty', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: faker.string.sample() });
    expect(error).toBeFalsy();
  });
});
