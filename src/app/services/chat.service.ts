import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  private options = {
    headers: this.headers,
  };

  constructor(private http: HttpClient) {}

  sendMessage(message: any): Observable<any> {
    return this.http.post('http://fz.n26n.com/api/send', message, this.options);
  }
}
