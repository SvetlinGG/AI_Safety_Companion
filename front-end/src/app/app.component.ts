import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { MicRecordBtnComponent } from './components/mic-record-btn/mic-record-btn.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MicRecordBtnComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  question = '';
  answer = '';
  audioUrl = '';
  sttText = '';

  constructor(private api: ApiService){}

  onAsk(){
    this.api.ask(this.question).subscribe( r => this.answer = r.answer);
  }

  onSpeak(){
    this.api.tts(this.answer, 'en').subscribe(blob => {
      this.audioUrl = URL.createObjectURL(blob);
      const a = new Audio(this.audioUrl);
      a.play();
      
    });
  }
  onFile(e: any){
    const file: File = e.target.files?.[0];
    if (!file) return;
    this.api.stt(file).subscribe( r => {
      this.sttText = r.text;
      this.question = this.sttText;
      
    });
  }

}
