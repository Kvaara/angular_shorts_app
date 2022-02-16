import { Injectable } from '@angular/core';
import { createFFmpeg, FFmpeg } from '@ffmpeg/ffmpeg';

@Injectable({
  providedIn: 'root'
})
export class FFmpegService {
  isReady = false;
  private ffmpeg?: FFmpeg;

  constructor() {
    this.ffmpeg = createFFmpeg({log: true,});
  }

  async loadFFmpegWA() {
    if(!this.isReady) {
      await this.ffmpeg!.load();
      this.isReady = true;
    }
  }
}
