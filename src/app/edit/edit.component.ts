import { Component, Input, OnDestroy, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Short } from '../models/short';
import { ModalService } from '../services/modal.service';
import { ShortService } from '../services/short.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {
  @Input() shortToEdit: Short | null = null;

  shortID = new FormControl("");
  titleControl = new FormControl("", [
    Validators.required,
    Validators.minLength(3),
  ]);
  editShortForm = new FormGroup({
    title: this.titleControl,
    id: this.shortID,
  });

  constructor(
    private modal: ModalService,
    private shortService: ShortService,
  ) { }

  ngOnInit(): void {
    this.modal.registerModal("editShort");
  }

  ngOnDestroy(): void {
      this.modal.unregisterModal("editShort");
  }

  ngOnChanges(): void {
    if (this.shortToEdit) {
      this.shortID.setValue(this.shortToEdit.docID);
      this.titleControl.setValue(this.shortToEdit.title);
    }
  }
}
