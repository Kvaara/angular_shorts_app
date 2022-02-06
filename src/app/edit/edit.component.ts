import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {

  constructor(
    private modal: ModalService,
  ) { }

  ngOnInit(): void {
    this.modal.registerModal("editShort");
  }

  ngOnDestroy(): void {
      this.modal.unregisterModal("editShort");
  }

}