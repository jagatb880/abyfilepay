import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReloadPage } from './reload.page';

describe('ReloadPage', () => {
  let component: ReloadPage;
  let fixture: ComponentFixture<ReloadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReloadPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReloadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
