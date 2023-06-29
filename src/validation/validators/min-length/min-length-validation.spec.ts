import { MinLengthValidation } from './min-length-validation';
import { InvalidFieldError } from '@/validation/errors';
import { faker } from '@faker-js/faker';

const makeSut = (field: string): MinLengthValidation =>
  new MinLengthValidation(field, 5);

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: faker.string.alphanumeric(4) });
    expect(error).toEqual(new InvalidFieldError());
  });

  test('Should return falsy if value is valid', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: faker.string.alphanumeric(5) });
    expect(error).toBeFalsy();
  });

  test('Should return falsy field does not exists in schema', () => {
    const sut = makeSut('any_field');
    const error = sut.validate({
      invalid_field: faker.string.alphanumeric(5),
    });
    expect(error).toBeFalsy();
  });
});
