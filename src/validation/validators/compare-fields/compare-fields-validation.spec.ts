import { CompareFieldsValidation } from './compare-fields-validation';
import { InvalidFieldError } from '@/validation/errors';
import { faker } from '@faker-js/faker';

const makeSut = (
  field: string,
  fieldToCompare: string
): CompareFieldsValidation =>
  new CompareFieldsValidation(field, fieldToCompare);

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const field = faker.database.column();
    const fieldToCompare = faker.database.column();
    const sut = makeSut(field, fieldToCompare);
    const error = sut.validate({
      [field]: 'any_field',
      [fieldToCompare]: 'other_field',
    });
    expect(error).toEqual(new InvalidFieldError());
  });

  test('Should return falsy if compare is valid', () => {
    const field = faker.database.column();
    const fieldToCompare = faker.database.column();
    const value = faker.word.sample();
    const sut = makeSut(field, fieldToCompare);
    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value,
    });
    expect(error).toBeFalsy();
  });
});
