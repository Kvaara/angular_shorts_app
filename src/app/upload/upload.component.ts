import { Component, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { combineLatest, forkJoin, last, switchMap } from 'rxjs';
import { v4 as uuidv4 } from "uuid";
import { Short } from '../models/short';
import firebase from "firebase/compat/app";
import { ShortService } from '../services/short.service';
import { Router } from '@angular/router';
import { FFmpegService } from '../services/ffmpeg.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnDestroy {
  isUserDragging = false;
  videoFile: File | null = null;
  showUploadDropbox = true;
  alertMessage: string = "";
  alertBackgroundColor: string = "";
  inSubmission = false;
  uploadPercentage = 0;
  showPercentage = false;
  user: firebase.User | null = null;
  uploadTask?: AngularFireUploadTask;
  screenshotTask?: AngularFireUploadTask;
  screenshots: string[] = [];
  selectedScreenshot = "";

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
    private shortService: ShortService,
    private route: Router,
    public ffmpegService: FFmpegService,
  ) {
    auth.user.subscribe((user) => this.user = user);
    this.ffmpegService.loadFFmpegWA();
  }

  ngOnDestroy(): void {
      this.uploadTask?.cancel();
  }

  setIsUserDraggingTo(isUserDragging: boolean): void {
    this.isUserDragging = isUserDragging;
  }

  async storeFile($event: Event): Promise<void> {
    if (!this.ffmpegService.inProgress) {
      this.setIsUserDraggingTo(false);

      const fileDragged = ($event as DragEvent).dataTransfer?.files.item(0) ?? null;
      const fileNotDragged = ($event.target as HTMLInputElement).files?.item(0) ?? null;
  
      fileDragged ? this.videoFile = fileDragged : this.videoFile = fileNotDragged;
  
      if (!this.videoFile || this.videoFile.type !== "video/mp4") {
        this.setAlertMessageWith(`Only MP4 files are allowed. You tried uploading a file of type "${this.videoFile?.type}"...`, "bg-red-400");
      } else {
        this.screenshots = await this.ffmpegService.getScreenshots(this.videoFile);
        this.selectedScreenshot = this.screenshots[0];
  
        this.setAlertMessageWith("", "");
  
        this.titleControl.setValue(
          // Any character after the latest dot (.) character get's removed.
          this.videoFile.name.replace(/\.[^/.]+$/, "")
        );
    
        this.showUploadDropbox = false;
      }

    }
  }

  async uploadVideoFile(): Promise<void> {
    this.uploadForm.disable();
    this.inSubmission = true;
    this.showPercentage = true;
    this.setAlertMessageWith("Your short is being uploaded...", "bg-cornflower-blue");

    const videoUniqueID = uuidv4();
    const videoPath = `videos/${videoUniqueID}.mp4`;
    
    const screenshotBlob = await this.ffmpegService.blobFromURL(this.selectedScreenshot);
    const screenshotPath = `screenshots/${videoUniqueID}.png`;

    this.uploadTask = this.storage.upload(videoPath, this.videoFile);
    const shortRef = this.storage.ref(videoPath);

    this.screenshotTask = this.storage.upload(screenshotPath, screenshotBlob);
    const screenshotRef = this.storage.ref(screenshotPath);

    combineLatest([
      this.uploadTask.percentageChanges(),
      this.screenshotTask.percentageChanges()
    ]).subscribe((progresses) => {
      const [videoProgress, screenshotProgress] = progresses;

      if (videoProgress && screenshotProgress) {
        const total = videoProgress + screenshotProgress;
        this.uploadPercentage = total as number / 200;
      }
    });

    forkJoin([
      this.uploadTask.snapshotChanges(),
      this.screenshotTask.snapshotChanges(),
    ]).pipe(
      switchMap(() => forkJoin([
       shortRef.getDownloadURL(),
       screenshotRef.getDownloadURL(),
      ]))
    ).subscribe(
      {
        next: async (urls) => {
          const [shortURL, screenshotURL] = urls;
          
          const short = this.returnShortDataObject(videoUniqueID, shortURL, screenshotURL, `${videoUniqueID}.png`);

          const shortDocumentRef = await this.shortService.createShort(short);

          this.showPercentage = false;
          this.setAlertMessageWith("Short uploaded successfully! You're being redirected...", "bg-forest-green");

          setTimeout(() => {
            this.route.navigate([
              "short", shortDocumentRef.id,
            ]);
          }, 1500)
        },
        error: (error) => {
          this.uploadForm.enable();
          this.showPercentage = false;
          this.inSubmission = false;
          this.setAlertMessageWith("There was an unexpected error. Please try again...", "bg-red-400");
          console.error("There was an unexpected error:", error);
        }
      }
    );
  }

  setAlertMessageWith(alertMessage: string, alertBackgroundColor: string, ): void {
    this.alertMessage = alertMessage;
    this.alertBackgroundColor = alertBackgroundColor;
  }

  returnShortDataObject(
    videoUniqueID: string, 
    shortURL: string, 
    screenshotURL: string, 
    screenshotFileName: string
  ): Short {
    return {
      uid: this.user!.uid,
      byUsername: this.user!.displayName,
      title: this.titleControl.value,
      fileName: `${videoUniqueID}.mp4`,
      shortURL,
      screenshotURL,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      screenshotFileName,
    }
  }
}
