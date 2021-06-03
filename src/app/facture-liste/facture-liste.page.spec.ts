import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureListePage } from './facture-liste.page';

describe('FactureListePage', () => {
  let component: FactureListePage;
  let fixture: ComponentFixture<FactureListePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactureListePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactureListePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
