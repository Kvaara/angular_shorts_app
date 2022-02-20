import { Injectable } from '@angular/core';
import { createFFmpeg, fetchFile, FFmpeg } from '@ffmpeg/ffmpeg';

@Injectable({
  providedIn: 'root'
})
export class FFmpegService {
  isReady = false;
  inProgress = false;
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

  async getScreenshots(videoFile: File) {
    this.inProgress = true;
    const data = await fetchFile(videoFile);

    this.ffmpeg!.FS("writeFile", videoFile.name, data);

    const seconds = [1, 2, 3];
    const commands: string[] = [];

    seconds.forEach((second) => {
      commands.push(
        "-i", videoFile.name, 
        "-ss", `00:00:0${second}`, "-frames:v", "1", "-filter:v", "scale=510:-1",
        `output_0${second}.png`,
      )
    });

    await this.ffmpeg!.run(
      ...commands
    );

    const screenshots: string[] = [];

    seconds.forEach((second) => {
      const screenshotFile = this.ffmpeg!.FS(
        "readFile", `output_0${second}.png`,
      );

      const screenshotBlob = new Blob(
        [screenshotFile.buffer], {
          type: "image/png",
      });

      const screenshotURL = URL.createObjectURL(screenshotBlob);
      screenshots.push(screenshotURL);
    });

    this.inProgress = false;

    return screenshots;
  }

  async blobFromURL(url: string): Promise<Blob> {
    const response = await fetch(url);
    const blob = await response.blob();

    return blob
  }
}
