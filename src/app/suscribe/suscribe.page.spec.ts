import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuscribePage } from './suscribe.page';

describe('SuscribePage', () => {
  let component: SuscribePage;
  let fixture: ComponentFixture<SuscribePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuscribePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuscribePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
