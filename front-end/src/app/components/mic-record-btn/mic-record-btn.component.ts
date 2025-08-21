import { Component, EventEmitter, Output } from '@angular/core';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-mic-record-btn',
  standalone: true,
  imports: [],
  templateUrl: './mic-record-btn.component.html',
  styleUrl: './mic-record-btn.component.css'
})
export class MicRecordBtnComponent {
  @Output() recorded = new EventEmitter<Blob>();
  private mediaRecorder!: MediaRecorder;
  isRecording = false;

  async toggleRecording(){
    if (!this.isRecording){
      const stream = await navigator.mediaDevices.getUserMedia({audio: true});
      this.mediaRecorder = new MediaRecorder(stream);
      const chunk: BlobPart[] = [];
      this.mediaRecorder.ondataavailable = e => chunk.push(e.data);
      this.mediaRecorder.onstop = () => this.recorded.emit(new Blob(chunk, {type: 'audio/webm'}));
      this.mediaRecorder.start();
      this.isRecording = true;
    }else {
      this.mediaRecorder.stop();
      this.isRecording = false;
    }
  }

}
