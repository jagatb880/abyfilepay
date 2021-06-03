import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReloadRecapPage } from './reload-recap.page';

describe('ReloadRecapPage', () => {
  let component: ReloadRecapPage;
  let fixture: ComponentFixture<ReloadRecapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReloadRecapPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReloadRecapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
