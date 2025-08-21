import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tts-player',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tts-player.component.html',
  styleUrl: './tts-player.component.css'
})
export class TtsPlayerComponent implements OnChanges {

  @Input() blob?: Blob;
  src?: string;

  ngOnChanges(): void {
    if (this.blob){
      this.src = URL.createObjectURL(this.blob);
    }
  }

}
