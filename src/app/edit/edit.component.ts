import { Component, Input, OnDestroy, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
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
  @Output() update = new EventEmitter;

  inSubmission = false;
  alertMessage: string = "";
  alertBackgroundColor: string = "";

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
      this.editShortForm.enable();
      this.inSubmission = false;
      this.alertMessage = "";
    }
  }

  async updateShort() {
    if (!this.shortToEdit) {
      return;
    }

    this.editShortForm.disable();
    this.inSubmission = true;
    this.setAlertMessageWith("Your short is being updated...", "bg-cornflower-blue");

    try {
      await this.shortService.updateShort(
        this.shortID.value,
        this.titleControl.value,
      );
      this.shortToEdit.title = this.titleControl.value;
      this.update.emit(this.shortToEdit);
      this.inSubmission = false; 
      this.setAlertMessageWith("Short updated succesfully!", "bg-forest-green");
    } catch (error) {
      this.editShortForm.enable();
      this.inSubmission = false;
      this.setAlertMessageWith("There was an unexpected error. Please try again...", "bg-red-400");
      console.error("There was an unexpected error:", error);
    }

  }

  setAlertMessageWith(alertMessage: string, alertBackgroundColor: string, ): void {
    this.alertMessage = alertMessage;
    this.alertBackgroundColor = alertBackgroundColor;
  }
}
