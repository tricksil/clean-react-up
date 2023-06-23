import { FieldValidationSpy } from '@/validation/test';
import { ValidationComposite } from './vallidation-composite';
import { faker } from '@faker-js/faker';

type SubTypes = {
  sut: ValidationComposite;
  fieldValidationsSpy: FieldValidationSpy[];
};

const makeSut = (fieldName: string): SubTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName),
  ];
  const sut = ValidationComposite.build(fieldValidationsSpy);
  return {
    sut,
    fieldValidationsSpy,
  };
};

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const fieldName = faker.database.column();
    const { sut, fieldValidationsSpy } = makeSut(fieldName);
    const errorMessage = faker.word.words();
    fieldValidationsSpy[0].error = new Error(errorMessage);
    fieldValidationsSpy[1].error = new Error(faker.word.words());
    const error = sut.validate(fieldName, { [fieldName]: faker.word.sample() });
    expect(error).toBe(errorMessage);
  });

  test('Should return falsy if there is no error', () => {
    const fieldName = faker.database.column();
    const { sut } = makeSut(fieldName);
    const error = sut.validate(fieldName, { [fieldName]: faker.word.sample() });
    expect(error).toBeFalsy();
  });
});
