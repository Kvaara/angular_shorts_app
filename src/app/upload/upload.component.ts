import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { last, switchMap } from 'rxjs';
import { v4 as uuidv4 } from "uuid";
import { Short } from '../models/short';
import firebase from "firebase/compat";

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
  uploadPercentage = 0;
  showPercentage = false;
  user: firebase.User | null = null;

  titleControl = new FormControl("", [
    Validators.required,
    Validators.minLength(3),
  ]);

  uploadForm = new FormGroup({
    title: this.titleControl,
  });
  
  constructor(
    private storage: AngularFireStorage,
    private auth: AngularFireAuth,
  ) {
    auth.user.subscribe((user) => this.user = user);
  }


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
    this.showPercentage = true;
    this.setAlertMessageWith("Your short is being uploaded...", "bg-cornflower-blue");

    const videoUniqueID = uuidv4();
    const videoPath = `videos/${videoUniqueID}.mp4`;
    
    const uploadTask = this.storage.upload(videoPath, this.videoFile)
    const clipRef = this.storage.ref(videoPath);

    uploadTask.percentageChanges().subscribe((progress) => {
      this.uploadPercentage = progress as number / 100;
    });

    uploadTask.snapshotChanges().pipe(
      last(),
      switchMap(() => clipRef.getDownloadURL())
    ).subscribe(
      {
        next: (url) => {
          const clip: Short = new Short(
            this.user!.uid,
            this.user!.displayName,
            this.titleControl.value,
            `${videoUniqueID}.mp4`,
            url,
          );

          console.log(clip);
          this.showPercentage = false;
          this.setAlertMessageWith("Short uploaded successfully!", "bg-forest-green");
        },
        error: (error) => {
          this.showPercentage = false;
          this.inSubmission = false;
          this.setAlertMessageWith("There was an unexpected error. Please try again...", "bg-red-400");
          console.error("There was an unexpected error:", error);
        },
      }
    );
  }

  setAlertMessageWith(alertMessage: string, alertBackgroundColor: string, ): void {
    this.alertBackgroundColor = alertBackgroundColor;
    this.alertMessage = alertMessage;
  }
}
