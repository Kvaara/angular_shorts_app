import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  isUserDragging = false;

  constructor() { }

  ngOnInit(): void {
  }

  storeFile($event: Event): void {
    this.setIsUserDragging(false);
  }

  setIsUserDragging(isUserDragging: boolean): void {
    this.isUserDragging = isUserDragging;
  }
}
