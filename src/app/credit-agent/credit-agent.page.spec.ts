import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditAgentPage } from './credit-agent.page';

describe('CreditAgentPage', () => {
  let component: CreditAgentPage;
  let fixture: ComponentFixture<CreditAgentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditAgentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditAgentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
