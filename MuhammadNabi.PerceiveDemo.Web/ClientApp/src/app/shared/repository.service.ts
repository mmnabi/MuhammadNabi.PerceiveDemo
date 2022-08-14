import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  public getData = (route: string) => {
    return this.http.get(this.createCompleteRoute(route, this.baseUrl));
  }

  public create = (route: string, body: any) => {
    return this.http.post(this.createCompleteRoute(route, this.baseUrl), body, this.generateHeaders());
  }

  public update = (route: string, body: any) => {
    return this.http.put(this.createCompleteRoute(route, this.baseUrl), body, this.generateHeaders());
  }

  public delete = (route: string) => {
    return this.http.delete(this.createCompleteRoute(route, this.baseUrl));
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}${route}`;
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
  }
}
