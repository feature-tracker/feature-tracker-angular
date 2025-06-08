import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseDetails } from './release-details';

describe('ReleaseDetails', () => {
  let component: ReleaseDetails;
  let fixture: ComponentFixture<ReleaseDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReleaseDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReleaseDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
