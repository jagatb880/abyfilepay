import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureRecapPage } from './facture-recap.page';

describe('FactureRecapPage', () => {
  let component: FactureRecapPage;
  let fixture: ComponentFixture<FactureRecapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactureRecapPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactureRecapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
