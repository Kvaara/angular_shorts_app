import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { v4 as uuidv4 } from "uuid";


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  isUserDragging = false;
  videoFile: File | null = null;
  showUploadDropbox = true;
  alertMessage: string = "";
  alertBackgroundColor: string = "";
  inSubmission = false;

  titleControl = new FormControl("", [
    Validators.required,
    Validators.minLength(3),
  ]);

  uploadForm = new FormGroup({
    title: this.titleControl,
  });
  
  constructor(private storage: AngularFireStorage) { }


  ngOnInit(): void {
  }

  setIsUserDraggingTo(isUserDragging: boolean): void {
    this.isUserDragging = isUserDragging;
  }

  storeFile($event: Event): void {
    this.setIsUserDraggingTo(false);

    this.videoFile = ($event as DragEvent).dataTransfer?.files[0] ?? null

    if (!this.videoFile || this.videoFile.type !== "video/mp4") {
      this.setAlertMessageWith(`Only MP4 files are allowed. You tried uploading type "${this.videoFile?.type}" file...`, "bg-red-400");
    } else {
      this.setAlertMessageWith("", "");

      this.titleControl.setValue(
        // Any character after the latest dot (.) character get's removed.
        this.videoFile.name.replace(/\.[^/.]+$/, "")
      );
  
      this.showUploadDropbox = false;
    }

  }

  uploadVideoFile(): void {
    this.inSubmission = true;
    this.setAlertMessageWith("Your short is being uploaded...", "bg-cornflower-blue");

    const videoUniqueID = uuidv4();
    const videoPath = `videos/${videoUniqueID}.mp4`;
    
    this.storage.upload(videoPath, this.videoFile)
    .then((_) => {
      this.setAlertMessageWith("Video uploaded successfully!", "bg-forest-green");
    })
    .catch((error) => {
      this.setAlertMessageWith("There was an unexpected error. Please try again...", "bg-red-400");
      console.error("There was an unexpected error:", error);
    })
    .finally(() => this.inSubmission = false);
  }

  setAlertMessageWith(alertMessage: string, alertBackgroundColor: string, ): void {
    this.alertBackgroundColor = alertBackgroundColor;
    this.alertMessage = alertMessage;
  }
}
