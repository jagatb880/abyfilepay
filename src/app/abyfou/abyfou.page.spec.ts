import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbyfouPage } from './abyfou.page';

describe('AbyfouPage', () => {
  let component: AbyfouPage;
  let fixture: ComponentFixture<AbyfouPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbyfouPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbyfouPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
