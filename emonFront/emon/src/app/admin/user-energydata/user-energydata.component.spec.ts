import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEnergydataComponent } from './user-energydata.component';

describe('UserEnergydataComponent', () => {
  let component: UserEnergydataComponent;
  let fixture: ComponentFixture<UserEnergydataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserEnergydataComponent]
    });
    fixture = TestBed.createComponent(UserEnergydataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
