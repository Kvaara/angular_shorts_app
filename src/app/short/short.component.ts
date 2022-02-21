import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import videojs from 'video.js';
import { Short } from '../models/short';

@Component({
  selector: 'app-short',
  templateUrl: './short.component.html',
  styleUrls: ['./short.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    DatePipe
  ]
})
export class ShortComponent implements OnInit {
  @ViewChild("videoPlayer", { static: true }) videoPlayer?: ElementRef;
   videoJsPlayer?: videojs.Player;
   short?: Short;

  constructor(public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.videoJsPlayer = videojs(this.videoPlayer?.nativeElement);

    this.activatedRoute.data.subscribe(async (data) => {
      this.short = await data["short"] as Short;
      this.videoJsPlayer?.src({
        src: this.short.shortURL,
        type: "video/mp4"
      })
    });
  }

}
