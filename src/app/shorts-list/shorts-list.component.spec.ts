import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortsListComponent } from './shorts-list.component';

describe('ShortsListComponent', () => {
  let component: ShortsListComponent;
  let fixture: ComponentFixture<ShortsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
