import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbyfouRecapPage } from './abyfou-recap.page';

describe('AbyfouRecapPage', () => {
  let component: AbyfouRecapPage;
  let fixture: ComponentFixture<AbyfouRecapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbyfouRecapPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbyfouRecapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
