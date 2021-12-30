import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  isHidden: Boolean = true;

  constructor() { }

  isModalOpen() {
    return this.isHidden;
  }

  toggleModal($event?: Event) {
    if ($event) $event.preventDefault();
    this.isHidden = !this.isHidden;
  }
}
