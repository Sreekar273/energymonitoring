import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMeterdataComponent } from './user-meterdata.component';

describe('UserMeterdataComponent', () => {
  let component: UserMeterdataComponent;
  let fixture: ComponentFixture<UserMeterdataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserMeterdataComponent]
    });
    fixture = TestBed.createComponent(UserMeterdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
