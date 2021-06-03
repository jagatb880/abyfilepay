import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertePage } from './alerte.page';

describe('AlertePage', () => {
  let component: AlertePage;
  let fixture: ComponentFixture<AlertePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
