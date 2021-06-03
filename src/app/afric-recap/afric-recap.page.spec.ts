import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfricRecapPage } from './afric-recap.page';

describe('AfricRecapPage', () => {
  let component: AfricRecapPage;
  let fixture: ComponentFixture<AfricRecapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfricRecapPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfricRecapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
