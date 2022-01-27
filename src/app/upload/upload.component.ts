import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  isUserDragging = false;
  videoFile: File | null = null;
  showUploadDropbox = true;

  titleControl = new FormControl("", [
    Validators.required,
    Validators.minLength(3),
  ]);

  uploadForm = new FormGroup({
    title: this.titleControl,
  });
  
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

    this.titleControl.setValue(
      // Any character after the latest dot (.) character get's removed.
      this.videoFile.name.replace(/\.[^/.]+$/, "")
      );

    this.showUploadDropbox = false;

  }

  uploadVideoFile(): void {

  }

}
