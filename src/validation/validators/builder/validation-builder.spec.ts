import {
  CompareFieldsValidation,
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation,
} from '@/validation/validators';
import { ValidationBuilder as sut } from './validation-builder';
import { faker } from '@faker-js/faker';

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const field = faker.database.column();
    const validations = sut.field(field).required().build();
    expect(validations).toEqual([new RequiredFieldValidation(field)]);
  });

  test('Should return EmailValidation', () => {
    const field = faker.database.column();
    const validations = sut.field(field).email().build();
    expect(validations).toEqual([new EmailValidation(field)]);
  });

  test('Should return MinLengthValidation', () => {
    const field = faker.database.column();
    const length = faker.number.int();
    const validations = sut.field(field).min(length).build();
    expect(validations).toEqual([new MinLengthValidation(field, length)]);
  });

  test('Should return CompareFieldsValidation', () => {
    const field = faker.database.column();
    const fieldToCompare = faker.database.column();
    const validations = sut.field(field).sameAs(fieldToCompare).build();
    expect(validations).toEqual([
      new CompareFieldsValidation(field, fieldToCompare),
    ]);
  });

  test('Should return a list of Validations', () => {
    const field = faker.database.column();
    const fieldToCompare = faker.database.column();
    const length = faker.number.int();
    const validations = sut
      .field(field)
      .required()
      .min(length)
      .email()
      .sameAs(fieldToCompare)
      .build();
    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new MinLengthValidation(field, length),
      new EmailValidation(field),
      new CompareFieldsValidation(field, fieldToCompare),
    ]);
  });
});
