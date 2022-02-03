import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { Short } from '../models/short';
import { ShortService } from '../services/short.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  videoOrder = "1";
  shorts: Short[] = [];

  constructor(private router: Router, 
    private activatedRoute: ActivatedRoute,
    private shortService: ShortService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe( (queryParams: ParamMap) => 
      this.videoOrder = queryParams.get("sort") === "2" 
      ? "2"
      : "1"
    );
    this.shortService.getShortsMadeByUser().subscribe((docs) => {
      this.shorts = [];

      docs.forEach((doc) => {
        this.shorts.push({
          docID: doc.id,
          ...doc.data(),
        });
      });
    });
  }

  sort(event: Event) {
    const selectedOption: string = (event.target as HTMLSelectElement).value;
    this.router.navigateByUrl(`manage?sort=${selectedOption}`);
  }

}
