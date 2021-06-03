import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiePage } from './verifie.page';

describe('VerifiePage', () => {
  let component: VerifiePage;
  let fixture: ComponentFixture<VerifiePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifiePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifiePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
