import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() control: FormControl = new FormControl();
  @Input() inputType: String = "text";
  @Input() inputPlaceholder: String = "Lorem Ipsum";
  @Input() inputId: String = "";

  constructor() { }

  ngOnInit(): void {
  }

}
