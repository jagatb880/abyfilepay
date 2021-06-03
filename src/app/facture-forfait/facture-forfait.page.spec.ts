import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureForfaitPage } from './facture-forfait.page';

describe('FactureForfaitPage', () => {
  let component: FactureForfaitPage;
  let fixture: ComponentFixture<FactureForfaitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactureForfaitPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactureForfaitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
