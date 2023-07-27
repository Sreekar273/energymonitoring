import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyheaderComponent } from './bodyheader.component';

describe('BodyheaderComponent', () => {
  let component: BodyheaderComponent;
  let fixture: ComponentFixture<BodyheaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyheaderComponent]
    });
    fixture = TestBed.createComponent(BodyheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
