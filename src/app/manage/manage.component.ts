import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Short } from '../models/short';
import { ModalService } from '../services/modal.service';
import { ShortService } from '../services/short.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  videoOrder = "1";
  shorts: Short[] = [];
  shortToEdit: Short | null = null;
  sort$: BehaviorSubject<string>

  constructor(private router: Router, 
    private activatedRoute: ActivatedRoute,
    private shortService: ShortService,
    private modalService: ModalService
  ) {
    this.sort$ = new BehaviorSubject(this.videoOrder);
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe( (queryParams: ParamMap) => {
      this.videoOrder = queryParams.get("sort") === "2" 
      ? "2"
      : "1";
      this.sort$.next(this.videoOrder);
    });
    this.shortService.getShortsMadeByUser(this.sort$).subscribe((docs) => {
      this.shorts = [];

      docs.forEach((doc) => {
        this.shorts.push({
          docID: doc.id,
          ...doc.data(),
        });
      });
    });
  }

  sort(event: Event): void {
    const selectedOption: string = (event.target as HTMLSelectElement).value;
    this.router.navigateByUrl(`manage?sort=${selectedOption}`);
  }

  openModal($event: Event, short: Short): void {
    this.modalService.toggleModal("editShort", $event);
    
    this.shortToEdit = short;
    
  }

  update($event: Short): void {
    this.shorts.forEach((short, index) => {
      if (short.docID == $event.docID) {
        this.shorts[index].title = $event.title;
      }
    });
  }

  async deleteShort($event: Event, short: Short) {
     $event.preventDefault();

     await this.shortService.deleteShort(short);

     this.shorts.forEach((shortElement, index) => {
      if (shortElement.docID == short.docID) {
        this.shorts.splice(index, 1);
      }
     });
  }

}
