import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';

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
    let url = `${env.baseUrl}chat/message`;
    return this.http.post(url, message, this.options);
  }

  getChatHistory(sessionId: number): Observable<any> {
    let url = `${env.baseUrl}chat/history/${sessionId}`;
    return this.http.get(url, this.options);
  }

  getRecentChats(): Observable<any> {
    let url = `${env.baseUrl}chat/conversations`;
    return this.http.get(url, this.options);
  }
}
