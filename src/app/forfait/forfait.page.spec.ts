import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForfaitPage } from './forfait.page';

describe('ForfaitPage', () => {
  let component: ForfaitPage;
  let fixture: ComponentFixture<ForfaitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForfaitPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForfaitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
