import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ApiService {

  constructor(private http: HttpClient) { }

  ask(question: string){
    return this.http.post<{answer: string}>('/api/ask', {question});
  }
  stt(file: File){
    const fd = new FormData();
    fd.append('audio', file);
    return this.http.post<{text: string}>('/api/stt', fd);
  }

  tts(text: string, lang: 'en'){
    return this.http.post('/api/tts', {text, lang}, {responseType: 'blob'});
  }
}
