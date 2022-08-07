import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordConfirmationValidatorService } from '../../shared/custom-validators/password-confirmation-validator.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { UserForRegistrationDto } from '../../_interfaces/user/userForRegistrationDto';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirm: new FormControl(''),
    dateOfBirth: new FormControl(''),
  });
  public errorMessage: string = '';
  public showError: boolean = false;

  constructor(private authService: AuthenticationService, private passConfValidator: PasswordConfirmationValidatorService) { }

  ngOnInit(): void {
    this.registerForm.get('confirm')!.setValidators([Validators.required, this.passConfValidator.validateConfirmPassword(this.registerForm.get('password')!)]);
  }

  public validateControl = (controlName: string) => {
    return this.registerForm.get(controlName)!.invalid && this.registerForm.get(controlName)!.touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.get(controlName)!.hasError(errorName)
  }

  public registerUser = (registerFormValue: any) => {
    const formValues = { ...registerFormValue };
    const user: UserForRegistrationDto = {
      userName: formValues.userName,
      email: formValues.email,
      password: formValues.password,
      confirmPassword: formValues.confirm,
      dateOfBirth: "1994-04-19"
    };
    this.authService.registerUser("api/account/register", user)
      .subscribe({
        next: (_) => console.log("Successful registration"),
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.message;
          this.showError = true;
        }
      });
  }
}
