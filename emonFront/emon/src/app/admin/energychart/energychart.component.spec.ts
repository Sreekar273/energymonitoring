import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergychartComponent } from './energychart.component';

describe('EnergychartComponent', () => {
  let component: EnergychartComponent;
  let fixture: ComponentFixture<EnergychartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnergychartComponent]
    });
    fixture = TestBed.createComponent(EnergychartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
