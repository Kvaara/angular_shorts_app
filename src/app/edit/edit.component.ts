import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Short } from '../models/short';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  @Input() shortToEdit: Short | null = null;

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
