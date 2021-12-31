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

  isModalOpen(id: string): boolean {
    return !!this.modals.find((modal) => modal.id === id)?.isHidden;
  }

  toggleModal(id: string, $event?: Event): void {
    if ($event) $event.preventDefault();
    
    const modal = this.modals.find((modal) => modal.id === id);
    if (modal) !modal.isHidden;
  }
}
