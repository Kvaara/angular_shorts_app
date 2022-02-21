import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[app-to-clipboard]'
})
export class ToClipboardDirective {
  @Input() shortDocID?: string;

  constructor() { }

  @HostListener("click", ["$event"])
  public async handleEvent($event: MouseEvent) {
    $event.preventDefault();

    if (this.shortDocID) {
      const url = `${location.origin}/short/${this.shortDocID}`;
      await navigator.clipboard.writeText(url);
      alert("Link has been copied!");
    }
  }

}
