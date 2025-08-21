import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({providedIn: 'root'})
export class SttService {

  constructor(private http: HttpClient) { }

  transcribe(audio: File){
    const fd = new FormData();
    fd.append('audio', audio);
    return this.http.post<{text: string}>(`${environment.API_BASE}/api/stt`, fd);
  }
}
