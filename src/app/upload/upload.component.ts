import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  isUserDragging = false;
  videoFile: File | null = null;
  showUploadDropbox = true;


  constructor() { }

  ngOnInit(): void {
  }

  setIsUserDraggingTo(isUserDragging: boolean): void {
    this.isUserDragging = isUserDragging;
  }

  storeFile($event: Event): void {
    this.setIsUserDraggingTo(false);

    this.videoFile = ($event as DragEvent).dataTransfer?.files[0] ?? null

    if (!this.videoFile || this.videoFile.type !== "video/mp4") {
      return;
    }

    this.showUploadDropbox = false;

  }

}
