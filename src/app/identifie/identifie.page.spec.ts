import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentifiePage } from './identifie.page';

describe('IdentifiePage', () => {
  let component: IdentifiePage;
  let fixture: ComponentFixture<IdentifiePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentifiePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentifiePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
