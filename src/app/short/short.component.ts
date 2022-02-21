import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import videojs from 'video.js';

@Component({
  selector: 'app-short',
  templateUrl: './short.component.html',
  styleUrls: ['./short.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ShortComponent implements OnInit {
  @ViewChild("videoPlayer", { static: true }) videoPlayer?: ElementRef;
   id = "";
   videoJsPlayer?: videojs.Player;

  constructor(public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.videoJsPlayer = videojs(this.videoPlayer?.nativeElement);
    this.activatedRoute.params.subscribe( (params: Params) => 
      this.id = params["id"]
    );
  }

}
