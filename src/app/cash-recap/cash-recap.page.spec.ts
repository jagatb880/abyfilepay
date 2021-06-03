import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashRecapPage } from './cash-recap.page';

describe('CashRecapPage', () => {
  let component: CashRecapPage;
  let fixture: ComponentFixture<CashRecapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashRecapPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashRecapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
