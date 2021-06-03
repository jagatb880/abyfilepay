import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfricPage } from './afric.page';

describe('AfricPage', () => {
  let component: AfricPage;
  let fixture: ComponentFixture<AfricPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfricPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfricPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
