import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalisePage } from './localise.page';

describe('LocalisePage', () => {
  let component: LocalisePage;
  let fixture: ComponentFixture<LocalisePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalisePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalisePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
