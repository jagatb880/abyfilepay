import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForfaitListePage } from './forfait-liste.page';

describe('ForfaitListePage', () => {
  let component: ForfaitListePage;
  let fixture: ComponentFixture<ForfaitListePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForfaitListePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForfaitListePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
