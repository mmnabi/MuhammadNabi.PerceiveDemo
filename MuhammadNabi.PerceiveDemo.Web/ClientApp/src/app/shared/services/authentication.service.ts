import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { RegistrationResponseDto } from '../../_interfaces/response/registrationResponseDto';
import { UserForRegistrationDto } from '../../_interfaces/user/userForRegistrationDto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  public registerUser = (route: string, body: UserForRegistrationDto) => {
    return this.http.post<RegistrationResponseDto>(this.createCompleteRoute(route, this.baseUrl), body);
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}${route}`;
  }
}
