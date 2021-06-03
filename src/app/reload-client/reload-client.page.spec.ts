import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReloadClientPage } from './reload-client.page';

describe('ReloadClientPage', () => {
  let component: ReloadClientPage;
  let fixture: ComponentFixture<ReloadClientPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReloadClientPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReloadClientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
