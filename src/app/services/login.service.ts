import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  private options = {
    headers: this.headers,
  };

  constructor(private http: HttpClient) {}

  login(request: any) {
    let url = `${env.baseUrl}auth/token`;
    return this.http.post(url, request, this.options);
  }
}
