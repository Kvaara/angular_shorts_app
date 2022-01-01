import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss']
})
export class AuthModalComponent implements OnInit, OnDestroy {

  constructor(public modal: ModalService) { }

  ngOnInit(): void {
    this.modal.registerModal("auth");
  }

  // Just in case to prevent memory leaks, we unregister the modal when component is destroyed.
  ngOnDestroy(): void {
    this.modal.unregisterModal("auth");
  }

}
