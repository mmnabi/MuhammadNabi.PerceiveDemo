import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordConfirmationValidatorService } from '../../shared/custom-validators/password-confirmation-validator.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { UserForRegistrationDto } from '../../_interfaces/user/userForRegistrationDto';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})

export class RegisterUserComponent implements OnInit {
  public registerForm!: FormGroup;
  public errorMessage: string = '';
  public showError: boolean = false;
  private dialogConfig: any;

  constructor(private location: Location,
    private authService: AuthenticationService,
    private passConfValidator: PasswordConfirmationValidatorService,
    private dialog: MatDialog,
    private errorService: ErrorHandlerService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirm: new FormControl(''),
      dateOfBirth: new FormControl(''),
    });

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: {}
    }

    this.registerForm.get('confirm')!.setValidators([Validators.required, this.passConfValidator.validateConfirmPassword(this.registerForm.get('password')!)]);
  }

  public validateControl = (controlName: string) => {
    return this.registerForm.get(controlName)!.invalid && this.registerForm.get(controlName)!.touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.get(controlName)!.hasError(errorName)
  }

  public registerUser = (registerFormValue: any) => {
    if (this.registerForm.valid) {
      this.executeRegistration(registerFormValue);
    }
  }

  private executeRegistration = (registerFormValue: any) => {
    const formValues = { ...registerFormValue };
    let user: UserForRegistrationDto = {
      userName: formValues.userName,
      email: formValues.email,
      password: formValues.password,
      confirmPassword: formValues.confirm,
      dateOfBirth: formValues.dateOfBirth
    }

    this.authService.registerUser("api/account/register", user)
      .subscribe(res => {
        let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);
        //we are subscribing on the [mat-dialog-close] attribute as soon as we click on the dialog button
        dialogRef.afterClosed()
          .subscribe(result => {
            this.location.back();
          });
      },
        (error => {
          this.errorService.dialogConfig = { ...this.dialogConfig };
          this.errorService.handleError(error);
        })
      )
  }

  public onCancel = () => {
    this.location.back();
  }
}
