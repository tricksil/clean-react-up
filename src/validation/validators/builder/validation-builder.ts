import { FieldValidation } from '@/validation/protocols/field-validation';
import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation,
} from '@/validation/validators';

export class ValidationBuilder {
  private constructor(
    private readonly fielName: string,
    private readonly validations: FieldValidation[]
  ) {}

  static field(fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, []);
  }

  required(): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.fielName));
    return this;
  }

  email(): ValidationBuilder {
    this.validations.push(new EmailValidation(this.fielName));
    return this;
  }

  min(length: number): ValidationBuilder {
    this.validations.push(new MinLengthValidation(this.fielName, length));
    return this;
  }

  build(): FieldValidation[] {
    return this.validations;
  }
}
