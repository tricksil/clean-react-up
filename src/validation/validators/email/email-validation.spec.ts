import { InvalidFieldError } from '@/validation/errors';
import { EmailValidation } from './email-validation';
import { faker } from '@faker-js/faker';

const makeSut = (field: string): EmailValidation => new EmailValidation(field);

describe('EmailValidation', () => {
  test('Should return error if is invalid', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: faker.word.sample() });
    expect(error).toEqual(new InvalidFieldError());
  });

  test('Should return falsy if is valid', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: faker.internet.email() });
    expect(error).toBeFalsy();
  });

  test('Should return falsy if is empty', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: '' });
    expect(error).toBeFalsy();
  });
});
