import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionPage } from './commission.page';

describe('CommissionPage', () => {
  let component: CommissionPage;
  let fixture: ComponentFixture<CommissionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommissionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
