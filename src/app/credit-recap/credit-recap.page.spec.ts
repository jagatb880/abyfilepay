import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditRecapPage } from './credit-recap.page';

describe('CreditRecapPage', () => {
  let component: CreditRecapPage;
  let fixture: ComponentFixture<CreditRecapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditRecapPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditRecapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
