import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturePage } from './facture.page';

describe('FacturePage', () => {
  let component: FacturePage;
  let fixture: ComponentFixture<FacturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
