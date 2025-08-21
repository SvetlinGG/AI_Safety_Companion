import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({providedIn: 'root'})
export class TtsService {

  constructor(private http: HttpClient) { }

  speak(text: string, lang: string = 'en'){
    return this.http.post(`${environment.API_BASE}/api/tts`, {text, lang}, {responseType: 'blob'});
  }
}
