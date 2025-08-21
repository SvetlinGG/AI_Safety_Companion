import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({providedIn: 'root'})
export class AskService {

  constructor(private http: HttpClient) { }

  ask(question: string){
    return this.http.post<{answer: string}>(`${environment.API_BASE}/api/ask`, {question});
  }
}
