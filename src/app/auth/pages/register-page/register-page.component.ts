import { Component } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import * as customValidatorts from '../../../shared/validators/validators';
import { ValidatorsService } from '../../../shared/service/validator.service';
import { EmailValidatorService } from '../../../shared/validators/email-validators.service';

@Component({
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.pattern(this.ValidatorsService.firstNameAndLastnamePattern) ]],
    // email: ['', [ Validators.required, Validators.pattern(this.ValidatorsService.emailPattern )], [ new EmailValidator() ]],
    email: ['', [ Validators.required, Validators.pattern(this.ValidatorsService.emailPattern )], [ this.EmailValidator ]],
    username: ['', [ Validators.required, this.ValidatorsService.cantBeStrider ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required ]],
  }, {
    validators: [
      this.ValidatorsService.isFieldOneEqualFieldTwo('password', 'password2'),
    ]
  });

  constructor(
    private fb: FormBuilder,
    private ValidatorsService: ValidatorsService,
    private EmailValidator: EmailValidatorService
   ) {}

  isValidField( field: string ) {
    return this.ValidatorsService.isValidField( this.myForm, field );
  }

  OnSubmit() {
    this.myForm.markAllAsTouched();
  }



}
