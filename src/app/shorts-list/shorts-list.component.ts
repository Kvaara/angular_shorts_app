import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShortService } from '../services/short.service';

@Component({
  selector: 'app-shorts-list',
  templateUrl: './shorts-list.component.html',
  styleUrls: ['./shorts-list.component.scss'],
  providers: [DatePipe],
})
export class ShortsListComponent implements OnInit, OnDestroy {

  constructor(public shortService: ShortService) {
    this.shortService.getShorts();
  }

  ngOnInit(): void {
    window.addEventListener("scroll", this.handleScroll);
  }

  ngOnDestroy(): void {
    window.removeEventListener("scroll", this.handleScroll);
  }

  private handleScroll = ()  => {
    const { scrollTop, offsetHeight } = document.documentElement;
    const { innerHeight } = window;

    const isUserBottom = this.checkIsUserAtBottomOfPage(scrollTop, innerHeight, offsetHeight);

    if (isUserBottom) {
      this.shortService.getShorts();
    }

  };

  private checkIsUserAtBottomOfPage = (scrollTop: number, innerHeight: number, offsetHeight: number) => {
    return Math.round(scrollTop) + innerHeight === offsetHeight;
  };
}
