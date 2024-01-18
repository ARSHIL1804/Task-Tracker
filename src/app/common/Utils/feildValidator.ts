import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Custom validator function
export function fieldValidator(feildBoolean: boolean): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (feildBoolean) {
        return {feildError: true};
    }

    return null;
  };
}
