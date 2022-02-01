import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[app-event-blocker]'
})
export class EventBlockerDirective {
  constructor() {}

  @HostListener("drop", ["$event"])
  @HostListener("dragover", ["$event"])
  @HostListener("change", ["$event"])
  public handleEvent(event: Event) {
    event.preventDefault();
  }
}
