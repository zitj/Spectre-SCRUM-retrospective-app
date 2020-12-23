import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTeamSuccessComponent } from './create-team-success.component';

describe('CreateTeamSuccessComponent', () => {
  let component: CreateTeamSuccessComponent;
  let fixture: ComponentFixture<CreateTeamSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTeamSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTeamSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
