import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewheaderComponent } from './newheader.component';

describe('NewheaderComponent', () => {
  let component: NewheaderComponent;
  let fixture: ComponentFixture<NewheaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewheaderComponent]
    });
    fixture = TestBed.createComponent(NewheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
