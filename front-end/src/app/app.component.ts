import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { MicRecordBtnComponent } from './components/mic-record-btn/mic-record-btn.component';
import { TtsPlayerComponent } from './components/tts-player/tts-player.component';
import { TranslatePipe } from './pipes/t.pipe';
import { I18nService } from './services/i18n.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MicRecordBtnComponent, TtsPlayerComponent,TranslatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  private i18n = inject(I18nService);
  lang = computed(() => this.i18n.lang());

  setLang(l: 'en'){
    this.i18n.setLang(l);
  }
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
