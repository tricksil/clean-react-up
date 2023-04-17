import { FieldValidation } from '@/validation/protocols/field-validation';
import { RequiredFieldValidation } from '@/validation/validators';

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

  build(): FieldValidation[] {
    return this.validations;
  }
}
