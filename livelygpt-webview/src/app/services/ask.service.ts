import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AskService {

  private apiUrl = 'http:127.0.0.1:5000'; // replace with your API endpoint

  constructor(private http: HttpClient) { }

  explain(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/explain`, data);
  }
}
