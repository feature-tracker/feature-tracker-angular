import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureDetails } from './feature-details';

describe('FeatureDetails', () => {
  let component: FeatureDetails;
  let fixture: ComponentFixture<FeatureDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
