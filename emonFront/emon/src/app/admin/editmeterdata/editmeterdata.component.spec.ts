import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmeterdataComponent } from './editmeterdata.component';

describe('EditmeterdataComponent', () => {
  let component: EditmeterdataComponent;
  let fixture: ComponentFixture<EditmeterdataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditmeterdataComponent]
    });
    fixture = TestBed.createComponent(EditmeterdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
