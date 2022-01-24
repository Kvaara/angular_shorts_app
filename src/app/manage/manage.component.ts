import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  videoOrder = "1";

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe( (queryParams: ParamMap) => 
      this.videoOrder = queryParams.get("sort") === "2" 
      ? "2"
      : "1"
    );
  }

  sort(event: Event) {
    const selectedOption: string = (event.target as HTMLSelectElement).value;
    this.router.navigateByUrl(`manage?sort=${selectedOption}`);
  }

}
