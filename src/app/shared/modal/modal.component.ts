import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() modalID: string = "";

  constructor(
    public modal: ModalService,
    public thisElement: ElementRef
  ) {
    
  }

  ngOnInit(): void {
    document.body.appendChild(this.thisElement.nativeElement);
  }

  ngOnDestroy(): void {
      document.body.removeChild(this.thisElement.nativeElement);
  }

}
