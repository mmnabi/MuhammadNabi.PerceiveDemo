import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../dialogs/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  public errorMessage: string = '';
  public dialogConfig: any;

  constructor(private router: Router, private dialog: MatDialog) { }


  public handleError = (error: HttpErrorResponse) => {
    if (error.status === 500) {
      this.handle500Error(error);
    }
    else if (error.status === 404) {
      this.handle404Error(error)
    }
    else {
      this.handleOtherError(error);
    }
  }

  private handle500Error = (error: HttpErrorResponse) => {
    this.createErrorMessage(error);
    this.router.navigate(['/500']);
  }

  private handle404Error = (error: HttpErrorResponse) => {
    this.createErrorMessage(error);
    this.router.navigate(['/404']);
  }

  private handleOtherError = (error: HttpErrorResponse) => {
    this.createErrorMessage(error);
    this.dialogConfig.data = { 'errorMessage': this.errorMessage };
    this.dialog.open(ErrorDialogComponent, this.dialogConfig);
  }

  private createErrorMessage(error: HttpErrorResponse) {
    //this.errorMessage = error.error ? error.error : error.statusText;
    console.log(error);
    let message = '';
    if (this.router.url === '/authentication/register') {
      const values: any[] = Object.values(error.error.errors);
      values.map((m: string) => {
        message += m + '<br>';
      })
      message = message.slice(0, -4);
    }
    else {
      message = error.error ? error.error.errors.join("<br>") : error.statusText;
    }
    this.errorMessage = message;
  }
}
