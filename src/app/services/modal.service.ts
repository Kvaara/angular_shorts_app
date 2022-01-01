import { Injectable } from '@angular/core';

interface IModal {
  id: string;
  isHidden: boolean;
};

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modals: IModal[] = [];

  constructor() { }

  registerModal(id: string): void {
    this.modals.push({
      id,
      isHidden: true,
    });
  }

  // Very useful for preventing memory leaks by unregistering the modal from the modals array
  unregisterModal(id: string): void {
    this.modals = this.modals.filter((modal) => {
      modal.id !== id;
    });
  }

  isModalHidden(id: string): boolean {
    return !!this.modals.find((modal) => modal.id === id)?.isHidden;
  }

  toggleModal(id: string, $event?: Event): void {
    if ($event) $event.preventDefault();
    
    const modal = this.modals.find((modal) => modal.id === id);
    if (modal) modal.isHidden = !modal.isHidden;
  }
}
